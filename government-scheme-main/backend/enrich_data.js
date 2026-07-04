const fs = require('fs');
const path = require('path');
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

// ─── Configuration ────────────────────────────────────────────────────────────
const INPUT_FILE = path.join(__dirname, 'schemes.json');
const OUTPUT_FILE = path.join(__dirname, 'schemes_enhanced.json');

// ─── State Keyword Map (Enhanced) ─────────────────────────────────────────────
const STATE_MAP = {
    'karnataka': ['karnataka', 'bengaluru', 'bangalore', 'mysuru', 'hubli'],
    'maharashtra': ['maharashtra', 'mumbai', 'pune', 'nagpur'],
    'tamil nadu': ['tamil nadu', 'tamilnadu', 'chennai', 'coimbatore'],
    'delhi': ['delhi', 'new delhi', 'ncr'],
    'kerala': ['kerala', 'kochi', 'trivandrum'],
    'gujarat': ['gujarat', 'ahmedabad', 'surat'],
    'west bengal': ['west bengal', 'kolkata', 'wbidc', 'silpasathi'],
    'madhya pradesh': ['madhya pradesh', 'm.p.', 'bhopal', 'indore'],
    'puducherry': ['puducherry', 'pondicherry'],
    'rajasthan': ['rajasthan', 'jaipur', 'jodhpur'],
    'chhattisgarh': ['chhattisgarh', 'raipur'],
    'andhra pradesh': ['andhra pradesh', 'amaravati', 'visakhapatnam']
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cleanNumber(str) {
    if (!str) return null;
    return parseInt(str.replace(/,/g, ''), 10);
}

function extractAge(text) {
    const ageMeta = { min: null, max: null };
    
    // Pattern: 18-60 years
    const rangeMatch = text.match(/(\d+)\s*-\s*(\d+)\s*years/i);
    if (rangeMatch) {
        ageMeta.min = parseInt(rangeMatch[1], 10);
        ageMeta.max = parseInt(rangeMatch[2], 10);
    }

    // Pattern: above 18 years / 18 years or more / not less than 18
    const minPatterns = [
        /(?:above|more than|at least|minimum of|age of|not less than)\s*(\d+)\s*years/i,
        /(\d+)\s*years\s*(?:or more|and above)/i,
        /minimum\s*age\s*(?:of\s*)?(\d+)/i
    ];
    
    for (const p of minPatterns) {
        const m = text.match(p);
        if (m && !ageMeta.min) {
            ageMeta.min = parseInt(m[1], 10);
            break;
        }
    }

    // Pattern: below 60 years / up to 60 years
    const maxPatterns = [
        /(?:below|less than|maximum of|up to|not exceeding)\s*(\d+)\s*years/i,
        /maximum\s*age\s*(?:of\s*)?(\d+)/i,
        /age\s*limit\s*(?:of\s*)?(\d+)/i
    ];

    for (const p of maxPatterns) {
        const m = text.match(p);
        // Special check: ensure it's not part of "not less than"
        if (m && !text.includes(`not less than ${m[1]}`)) {
            if (!ageMeta.max) {
                ageMeta.max = parseInt(m[1], 10);
                break;
            }
        }
    }

    return ageMeta;
}

function extractIncome(text) {
    // Pattern: income less than Rs. 2,00,000
    const incomeMatch = text.match(/income\s*(?:less than|up to|below|not exceeding|not exceed|limit of)\s*(?:rs\.?|₹)?\s*([\d,]+)/i);
    if (incomeMatch) return cleanNumber(incomeMatch[1]);
    return null;
}

function detectStates(text) {
    const states = new Set();
    const lowerText = text.toLowerCase();
    for (const [state, keywords] of Object.entries(STATE_MAP)) {
        if (keywords.some(kw => lowerText.includes(kw))) {
            states.add(state);
        }
    }
    return [...states];
}

function extractKeywords(text) {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    // Filter common stopwords and short words
    const stopwords = new Set(['the', 'and', 'for', 'this', 'that', 'with', 'from', 'under', 'scheme', 'government', 'shall', 'been', 'have', 'eligible', 'application', 'provided', 'official']);
    const filtered = tokens.filter(t => t.length > 3 && !stopwords.has(t));
    
    // Frequency map
    const freq = {};
    filtered.forEach(t => freq[t] = (freq[t] || 0) + 1);
    
    // Sort and take top 10
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(e => e[0]);
}

// ─── Main Processing ──────────────────────────────────────────────────────────
console.log('Starting NLP Enrichment...');

try {
    const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
    const schemes = JSON.parse(rawData);
    console.log(`Processing ${schemes.length} schemes...`);

    const enhancedSchemes = schemes.map((s, index) => {
        if (index % 500 === 0) console.log(`Processed ${index} schemes...`);

        // Combine all descriptive text for analysis
        const eligText = typeof s.eligibility === 'object' ? JSON.stringify(s.eligibility) : (s.eligibility || '');
        const fullText = [
            s.scheme_name || '',
            s.details || '',
            s.benefits || '',
            eligText,
            s.tags || ''
        ].join(' ');

        const age = extractAge(fullText);
        const income = extractIncome(fullText);
        const states = detectStates(fullText);
        const keywords = extractKeywords(fullText);

        // Standardise category
        let category = s.schemeCategory || 'General';
        if (fullText.toLowerCase().includes('sc/st') || fullText.toLowerCase().includes('dalit')) category = 'SC/ST';
        else if (fullText.toLowerCase().includes('obc')) category = 'OBC';

        return {
            ...s,
            nlp: {
                min_age: age.min || s.minAge || null,
                max_age: age.max || s.maxAge || null,
                max_income: income || s.maxIncome || null,
                detected_states: states,
                keywords: keywords,
                sentiment_score: 0 // Placeholder for future use
            },
            // Ensure core fields are present for fast filtering
            standard_category: category,
            is_central: s.level?.toLowerCase() === 'central' || fullText.toLowerCase().includes('government of india')
        };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(enhancedSchemes, null, 2));
    console.log(`✅ Success! Enhanced data saved to ${OUTPUT_FILE}`);

} catch (err) {
    console.error('❌ Error during enrichment:', err.message);
}
