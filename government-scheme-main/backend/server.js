const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const { translate } = require('google-translate-api-x');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Translation Cache
const translationCache = new Map();

// ─── Load Enhanced Schemes ───────────────────────────────────────────────────
// ─── START OF NLP ENHANCED DATA LOADING ──────────────────────────────────────
const schemesPath = path.join(__dirname, 'schemes_enhanced.json');
let schemes = [];
try {
  const data = fs.readFileSync(schemesPath, 'utf8');
  schemes = JSON.parse(data);
  console.log(`Loaded ${schemes.length} enhanced schemes.`);
} catch (err) {
  console.error('Error loading schemes_enhanced.json:', err.message);
  try {
    schemes = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemes.json'), 'utf8'));
  } catch (e) { console.error('Total failure to load data'); }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const norm = (s) => (s || '').toString().toLowerCase().trim();

function toArray(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(norm);
  return [norm(val)];
}

function truncate(str, maxLen) {
  if (!str) return '';
  const s = str.toString();
  return s.length > maxLen ? s.substring(0, maxLen - 3) + '...' : s;
}

// ─── Occupation Detection (Legacy/Backup) ─────────────────────────────────────
const OCCUPATION_KEYWORD_MAP = {
  'farmer / agriculture':   ['farmer', 'agriculture', 'kisan', 'crop', 'horticulture', 'fisherman', 'fisheries', 'fishing', 'agri', 'cultivat'],
  'student / research':     ['student', 'scholarship', 'education', 'degree', 'college', 'school', 'university', 'research', 'academic', 'coaching', 'pre-matric', 'post-matric'],
  'entrepreneur / startup': ['entrepreneur', 'startup', 'msme', 'enterprise', 'business', 'industry', 'trade', 'manufacturing', 'powerloom', 'textile', 'tourism', 'msme'],
  'daily wage worker':      ['worker', 'labour', 'laborer', 'wage', 'construction', 'shramik', 'mazdoor', 'unorganised', 'migrant', 'bocw', 'building worker', 'sanitation'],
  'other / professional':   ['professional', 'salaried', 'government employee', 'doctor', 'engineer', 'teacher', 'nurse'],
};

function detectOccupationsFromText(schemeText) {
  const detected = new Set();
  for (const [occ, keywords] of Object.entries(OCCUPATION_KEYWORD_MAP)) {
    if (keywords.some((kw) => schemeText.includes(kw))) detected.add(occ);
  }
  return [...detected];
}

// ═════════════════════════════════════════════════════════════════════════════
// API ROUTES (with /api prefix)
// ═════════════════════════════════════════════════════════════════════════════
const router = express.Router();

const recommendHandler = (req, res) => {
  const {
    age        = 0,
    income     = 0,
    gender     = '',
    state      = '',
    occupation = '',
    category   = '',
    query      = '',
  } = req.body;

  const userAge      = parseInt(age, 10)  || 0;
  const userIncome   = parseFloat(income) || 0;
  const userGender   = norm(gender);
  const userState    = norm(state);
  const userOcc      = norm(occupation);
  const userCategory = norm(category);

  const queryWords = query
    ? query.toLowerCase().split(/\W+/).filter((w) => w.length > 2)
    : [];

  const results = [];

  for (const scheme of schemes) {
    // ─── START OF NLP POWERED FILTERING & MATCHING ────────────────────────────
    const nlp = scheme.nlp || {};
    
    const schemeText = [
      scheme.scheme_name || '',
      scheme.details     || '',
      scheme.tags        || '',
      nlp.keywords?.join(' ') || '',
      scheme.schemeCategory || '',
    ].join(' ').toLowerCase();

    // 1. STATE FILTER
    if (!scheme.is_central && userState) {
        const states = nlp.detected_states || [];
        if (states.length > 0 && !states.includes(userState)) {
            const explicit = toArray(scheme.state ?? scheme.states ?? null);
            if (explicit.length > 0 && !explicit.includes(userState)) continue;
        }
    }

    // 2. GENDER FILTER
    const schemeGenders = toArray(scheme.gender ?? scheme.eligibility?.gender ?? null);
    if (schemeGenders.length > 0 && userGender && !schemeGenders.includes(userGender)) continue;

    // 3. INCOME & AGE FILTER (NLP Powered)
    if (nlp.max_income && userIncome > nlp.max_income) continue;
    if (nlp.min_age && userAge < nlp.min_age) continue;
    if (nlp.max_age && userAge > nlp.max_age) continue;

    // 4. OCCUPATION FILTER
    let schemeOccs = toArray(scheme.occupation ?? scheme.eligibility?.occupation ?? null);
    if (schemeOccs.length === 0) schemeOccs = detectOccupationsFromText(schemeText);
    if (schemeOccs.length > 0 && userOcc && !schemeOccs.includes(userOcc)) continue;

    // 5. CATEGORY FILTER
    const schemeCat = norm(scheme.standard_category || '');
    if (userCategory && schemeCat && schemeCat !== 'general') {
        if (!schemeCat.includes(userCategory)) continue;
    }

    // ─── SCORING ──────────────────────────────────────────────────────────────
    let matchScore = 0;
    const reasons = [];

    // 1. Base Score for meeting all mandatory criteria
    matchScore += 75;

    // 2. Match State (Stronger signal)
    if (userState && (nlp.detected_states || []).includes(userState)) {
      matchScore += 10;
      reasons.push(`Targeted for ${userState}`);
    }

    // 3. Match Category
    if (userCategory && schemeCat.includes(userCategory)) {
        matchScore += 7;
        reasons.push(`Specifically matches the ${userCategory} social category requirements`);
    }

    // 3a. Match Age/Income (NLP)
    if (nlp.min_age || nlp.max_age) {
        reasons.push(`Age ${userAge} falls within the eligible bracket (${nlp.min_age || 0}-${nlp.max_age || '∞'})`);
    }
    if (nlp.max_income) {
        reasons.push(`Income level ₹${userIncome} is within the ₹${nlp.max_income} limit`);
    }

    // 4. Keyword relevance (Search query or NLP keywords)
    const lowerName = (scheme.scheme_name || '').toLowerCase();

    // Deprioritize marriage schemes if they dominate results
    if (lowerName.includes('marriage') || lowerName.includes('kalyana')) {
        matchScore -= 10; 
    }

    if (queryWords.length > 0) {
      const matches = queryWords.filter(w => schemeText.includes(w));
      matchScore += Math.min(matches.length * 4, 12);
      if (matches.length > 0) reasons.push(`Matches search: ${matches.join(', ')}`);
    }

    // 5. NLP Benefit Keywords (Incentives)
    if (nlp.keywords) {
        const benefitKeywords = ['subsidy', 'grant', 'incentive', 'pension', 'relief', 'assistance'];
        const matches = nlp.keywords.filter(k => benefitKeywords.includes(k));
        matchScore += Math.min(matches.length * 2, 6);
    }

    // 6. Add some random variance (1-3%) to distinguish similar schemes
    const variance = (scheme.scheme_name.length % 4);
    
    const finalScore = Math.min(matchScore + variance, 99);

    results.push({
      ...scheme,
      score: finalScore,
      reason: reasons.join('; ') || 'Highly relevant demographic match',
      category: scheme.schemeCategory || 'General',
      summary: truncate(scheme.details, 500)
    });
  }

  // Filter by score threshold (70+)
  const matches = results.filter(s => s.score > 70);

  // Take top 50 relevant schemes, then pick 20 randomly to satisfy "random 10-20" request
  const relevantSet = matches.sort((a, b) => b.score - a.score).slice(0, 50);
  const shuffled = relevantSet.sort(() => 0.5 - Math.random());
  const finalResults = shuffled.slice(0, 20);

  res.json(finalResults);
};

router.post('/recommend', recommendHandler);
router.post('/match-schemes', recommendHandler);

// CATEGORIZED SEARCH ENDPOINT (Karnataka vs Central)
router.get('/search-categorized', (req, res) => {
  const { type = 'karnataka', query = '' } = req.query;
  const searchTerm = query.toLowerCase();

  let filtered = schemes;

  if (type === 'karnataka') {
    // Filter for Karnataka only (Central is excluded here as per user request)
    filtered = schemes.filter(s => 
      !s.is_central && 
      (s.nlp?.detected_states?.includes('karnataka') || s.state?.toLowerCase() === 'karnataka')
    );
  } else if (type === 'central') {
    // Filter for Central only
    filtered = schemes.filter(s => s.is_central);
  } else if (type === 'women') {
    // Filter for Women Empowerment
    filtered = schemes.filter(s => 
        norm(s.gender).includes('female') || 
        norm(s.gender).includes('women') ||
        norm(s.schemeCategory).includes('women') ||
        [s.scheme_name, s.details, s.tags].join(' ').toLowerCase().includes('women empowerment')
    );
  } else if (type === 'general') {
    // Filter for General Category Schemes
    filtered = schemes.filter(s => 
        s.schemeCategory === 'General Category Scheme' ||
        (s.tags && s.tags.toLowerCase().includes('general'))
    );
  }

  if (searchTerm) {
    filtered = filtered.filter(s => {
      const text = [s.scheme_name, s.details, s.tags].join(' ').toLowerCase();
      return text.includes(searchTerm);
    });
  }

  // Take top 20 for search results
  res.json(filtered.slice(0, 20).map(s => ({
    ...s,
    summary: truncate(s.details, 500)
  })));
});

// ─── Placeholder for Live API Integration ─────────────────────────────────────
// Note: To use Data.gov.in, an API key is required. 
// This function shows how we would fetch live updates.
async function fetchLiveUpdates(resourceId, apiKey) {
  try {
    // const response = await fetch(`https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json`);
    // const data = await response.json();
    // return data.records;
    return []; // Placeholder
  } catch (err) {
    console.error('Live API Error:', err);
    return [];
  }
}

// ═════════════════════════════════════════════════════════════════════════════
// TRANSLATION ENDPOINT
// ═════════════════════════════════════════════════════════════════════════════
router.post('/translate', async (req, res) => {
  let { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });
  
  // Normalize language code (e.g., 'en-IN' -> 'en', 'kn-IN' -> 'kn')
  targetLang = targetLang.split('-')[0];
  
  if (targetLang === 'en') return res.json({ translatedText: text });

  const cacheKey = `${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) {
    return res.json({ translatedText: translationCache.get(cacheKey) });
  }

  try {
    const result = await translate(text, { to: targetLang });
    translationCache.set(cacheKey, result.text);
    res.json({ translatedText: result.text });
  } catch (err) {
    console.error('Translation Error:', err);
    res.json({ translatedText: text, error: 'Translation failed' });
  }
});

// ─── Chatbot Endpoint with Fallbacks ──────────────────────────────────────────
const MODELS = [
    "google/gemini-2.0-flash-lite-001",
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.1-8b-instruct:free",
    "mistralai/mistral-7b-instruct:free"
];

async function callOpenRouter(messages, modelIndex = 0) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
        throw new Error("API Key not configured");
    }

    if (modelIndex >= MODELS.length) {
        throw new Error("All models failed");
    }

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: MODELS[modelIndex],
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "Gov Scheme Assistant"
                },
                timeout: 15000 // 15s timeout
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(`Error with model ${MODELS[modelIndex]}:`, error.message);
        return callOpenRouter(messages, modelIndex + 1);
    }
}

router.post('/chat', async (req, res) => {
    const { messages, language = 'en' } = req.body;
    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    const langName = language === 'kn' ? 'Kannada' : (language === 'hi' ? 'Hindi' : 'English');

    // Add context to the system message if not present
    if (messages[0].role !== 'system') {
        messages.unshift({
            role: "system",
            content: `You are the 'GovAssist AI', a helpful assistant for Indian Government Schemes. You help users understand eligibility, benefits, and application processes. Be concise and professional. Respond in ${langName} language. If you don't know something, suggest checking the official scheme document.`
        });
    } else {
        // Update existing system message with language instruction
        messages[0].content += ` Respond in ${langName} language.`;
    }

    try {
        const reply = await callOpenRouter(messages);
        res.json({ reply });
    } catch (error) {
        console.error('Chat Error:', error.message);
        res.status(500).json({ error: 'Failed to get response from AI' });
    }
});

router.get('/explain/:id/:userId', async (req, res) => {
    const { id } = req.params;
    const scheme = schemes.find(s => s.scheme_id === id || s.id === id);

    if (!scheme) {
        return res.status(404).json({ error: 'Scheme not found' });
    }

    const messages = [
        {
            role: "system",
            content: "You are an expert on Indian government schemes. Explain why this scheme is beneficial for the user in 2-3 concise sentences."
        },
        {
            role: "user",
            content: `Scheme Name: ${scheme.scheme_name}\nDetails: ${scheme.details}\nExplain why this is a good match.`
        }
    ];

    try {
        const explanation = await callOpenRouter(messages);
        res.json({ explanation });
    } catch (error) {
        res.json({ 
            explanation: "This scheme matches your profile because it aligns with your eligibility criteria. (AI service error)" 
        });
    }
});

app.use('/api', router);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Force event loop to stay active
setInterval(() => {
  // Keep alive
}, 60000);
