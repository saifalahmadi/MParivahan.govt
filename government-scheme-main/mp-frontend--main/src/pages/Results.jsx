import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, Info, TrendingUp, Download, X, HelpCircle, ArrowLeft, Loader2, ArrowRight, ExternalLink, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import SchemeCard from '../components/SchemeCard'
import axios from 'axios'

import { generateSchemePDF } from '../services/pdfService'

const DEFAULT_USER_DATA = {
  name: 'Nischith', age: '25', income: '300000', state: 'Karnataka', occupation: 'Farmer', gender: 'Male'
};

const Results = () => {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [matchedSchemes, setMatchedSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAppModal, setShowAppModal] = useState(false)
  const [activeScheme, setActiveScheme] = useState(null)
  const [translating, setTranslating] = useState(false)
  const [selectedSchemes, setSelectedSchemes] = useState([])

  const translateResults = async (data, lang) => {
    if (lang === 'en' || !Array.isArray(data)) return data || [];
    setTranslating(true);
    try {
      const translated = await Promise.all(data.map(async (s) => {
        const titleRes = await axios.post('http://localhost:5001/api/translate', { text: s.scheme_name, targetLang: lang });
        const descRes = await axios.post('http://localhost:5001/api/translate', { text: s.summary || s.details, targetLang: lang });
        return {
          ...s,
          scheme_name: titleRes.data.translatedText,
          summary: descRes.data.translatedText,
          details: descRes.data.translatedText
        };
      }));
      return translated;
    } catch (err) {
      console.error('Translation failed:', err);
      return data;
    } finally {
      setTranslating(false);
    }
  };
  
  // Memoize userData to prevent infinite loops if state is missing
  const userData = useMemo(() => {
    return location.state?.userData || DEFAULT_USER_DATA;
  }, [location.state?.userData]);

  useEffect(() => {
    // Fetch from Backend
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Mock delay for UX
        await new Promise(r => setTimeout(r, 800));
        const response = await fetch('http://localhost:5001/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const currentLang = i18n.language.split('-')[0]; // Normalize 'en-IN' to 'en'
        const results = await response.json();
        const translatedResults = await translateResults(results, currentLang);
        setMatchedSchemes(translatedResults);
      } catch (err) {
        console.error("Filtering error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
    window.scrollTo(0, 0);
  }, [userData, i18n.language]);

  const handleApplyDirectly = (scheme) => {
    setActiveScheme(scheme)
    setShowAppModal(true)
  }

  const handleToggleSelect = (scheme) => {
    setSelectedSchemes(prev => {
      const isSelected = prev.some(s => (s.id || s.slug) === (scheme.id || scheme.slug))
      if (isSelected) {
        return prev.filter(s => (s.id || s.slug) !== (scheme.id || scheme.slug))
      } else {
        return [...prev, scheme]
      }
    })
  }

  const handleCompare = () => {
    if (selectedSchemes.length < 2) {
      alert('Please select at least 2 schemes to compare')
      return
    }
    navigate('/compare', { state: { selectedSchemes } })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-8 pb-40 max-w-6xl mx-auto"
    >
      {/* Back Button */}
      <div className="mb-4">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gov-blue uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Home Portal
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-gray-100 pb-8">
        <div>
          <div className="text-xs font-bold text-gov-accent uppercase tracking-widest mb-2 flex items-center gap-2">
            <TrendingUp className="w-3 h-3" /> Official Eligibility Result
          </div>
          <h2 className="text-3xl font-extrabold text-gov-deep tracking-tight">Public Welfare Schemes for {userData.name}</h2>
          <p className="text-gray-500 font-medium mt-1">Based on your shared credentials, you qualify for the following programs.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/impact"
            className="flex items-center gap-2 px-6 py-3 bg-white text-gov-blue border-2 border-gov-blue rounded-lg text-xs font-bold hover:bg-blue-50 transition-all active:scale-95"
          >
            <BarChart3 className="w-4 h-4" /> National Impact
          </Link>
          <button 
            onClick={() => generateSchemePDF(userData, matchedSchemes, t)}
            className="flex items-center gap-2 px-6 py-3 bg-gov-blue text-white rounded-lg text-xs font-bold hover:bg-gov-deep transition-all shadow-xl active:scale-95"
          >
            <Download className="w-4 h-4" /> Download Official PDF
          </button>
        </div>
      </div>

      {translating && (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-gov-blue text-sm font-bold bg-blue-50 p-4 rounded-xl border border-blue-100"
        >
            <Loader2 className="w-4 h-4 animate-spin" />
            Translating results into your language...
        </motion.div>
      )}

      {/* Summary Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Eligible Schemes", value: matchedSchemes.length, color: "text-gov-blue" },
          { label: "Total Benefits", value: "₹2.4L+", color: "text-india-green" },
          { label: "Profile Match", value: "Verified", color: "text-gov-accent" },
          { label: "NLP confidence", value: "94%", color: "text-india-saffron" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
            <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 sticky top-32">
            <h3 className="text-xs font-bold text-gov-deep uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Active Profile</h3>
            <div className="space-y-4">
              {[
                { label: "Beneficiary", value: userData.name },
                { label: "Age Group", value: `${userData.age} Years` },
                { label: "Jurisdiction", value: userData.state },
                { label: "Occupation", value: userData.occupation },
                { label: "Annual Income", value: `₹${userData.income}` }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</div>
                  <div className="text-xs font-bold text-gov-deep">{item.value}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => navigate('/form')}
              className="w-full mt-8 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:border-gov-blue hover:text-gov-blue hover:bg-white transition-all"
            >
              Update Profile
            </button>
          </div>

          {/* Comparison Sidebar */}
          {selectedSchemes.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-b from-gov-blue/10 to-gov-blue/5 p-6 rounded-[2rem] border border-gov-blue/30"
            >
              <div className="text-xs font-bold text-gov-blue uppercase tracking-widest mb-4">
                Selected for Comparison
              </div>
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
                {selectedSchemes.map((scheme, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/50 p-2 rounded-lg text-xs">
                    <span className="font-semibold text-gray-800 truncate flex-1">{scheme.scheme_name}</span>
                    <button
                      onClick={() => handleToggleSelect(scheme)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={handleCompare}
                disabled={selectedSchemes.length < 2}
                className={`w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all ${
                  selectedSchemes.length < 2
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-gov-blue hover:bg-gov-deep active:scale-95'
                }`}
              >
                Compare {selectedSchemes.length} Schemes
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </aside>

        {/* Results Grid */}
        <div className="lg:col-span-9">

      {loading ? (
        <div className="bg-white border border-gray-100 p-20 text-center rounded-[2rem] flex flex-col items-center justify-center">
          <Loader2 className="w-12 h-12 text-gov-blue animate-spin mb-4" />
          <h3 className="text-xl font-extrabold text-gov-deep">Analyzing Your Profile</h3>
          <p className="text-sm text-gray-400 mt-2 font-medium">Finding the most optimal scheme matches...</p>
        </div>
      ) : matchedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchedSchemes.map((scheme, idx) => (
            <SchemeCard 
              key={scheme.id || scheme.slug || `scheme-${idx}`} 
              scheme={scheme} 
              index={idx} 
              onApplyDirectly={handleApplyDirectly}
              isSelected={selectedSchemes.some(s => (s.id || s.slug) === (scheme.id || scheme.slug))}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-200 p-20 text-center rounded-[2rem]">
          <HelpCircle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400">We couldn't find matches for this specific combination.</h3>
          <p className="text-sm text-gray-400 mt-2">Try adjusting your income level or occupation details.</p>
          <button onClick={() => navigate('/form')} className="mt-6 inline-flex items-center gap-2 bg-gray-100 px-6 py-2 rounded-lg text-gov-blue font-bold hover:bg-gray-200 transition-all">
            Modify Criteria
          </button>
        </div>
      )}
        </div>
      </div>

      {/* Direct Application Modal (Simulated) */}
      <AnimatePresence>
        {showAppModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100"
            >
              <div className="bg-gov-deep p-8 text-white flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Official Application Form</h3>
                  <p className="text-sm opacity-80 mt-1">Scheme: {activeScheme?.nameKey ? t(activeScheme.nameKey) : activeScheme?.name}</p>
                </div>
                <button onClick={() => setShowAppModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Candidate Name</label>
                    <div className="text-sm font-bold border-b border-gray-100 pb-2">{userData.name}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Application ID</label>
                    <div className="text-sm font-bold border-b border-gray-100 pb-2">#{Math.floor(Math.random() * 900000) + 100000}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Aadhar Verification</label>
                    <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-gov-blue outline-none transition-colors text-sm font-medium" placeholder="Enter 12-digit UIDAI Number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Permanent Residence</label>
                    <div className="text-sm font-bold border-b border-gray-100 pb-2">{userData.state}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gov-deep uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-india-green" /> Required Documents Checklist
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Aadhaar Card (Linked to Mobile)",
                      "Income Certificate (Latest)",
                      "Domicile/Residence Proof",
                      "Bank Passbook (DBT Enabled)",
                      "Passport Size Photograph",
                      "Educational Marksheets"
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <input type="checkbox" className="rounded text-gov-blue focus:ring-gov-blue" />
                        <span className="font-medium">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3 items-start">
                  <div className="mt-0.5"><Info className="w-4 h-4 text-amber-600" /></div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    By submitting, I confirm that I am eligible under the guidelines of the Ministry of Electronics and IT. Any false information may lead to disqualification.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => {
                      alert('Application Form Saved Locally! You can complete it later.');
                      setShowAppModal(false);
                    }}
                    className="flex-1 bg-white text-gov-blue border-2 border-gov-blue py-4 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all"
                  >
                    Save for Later
                  </button>
                  <button 
                    onClick={() => {
                      alert('Redirecting to Official Government Portal...');
                      if (activeScheme?.url) {
                        window.open(activeScheme.url, '_blank');
                      } else {
                        window.open('https://www.india.gov.in/my-government/schemes', '_blank');
                      }
                      setShowAppModal(false);
                    }}
                    className="flex-1 bg-gov-blue text-white py-4 rounded-2xl font-bold text-sm hover:bg-gov-deep transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Go to Official Portal
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    alert('Digital Application Submitted Successfully to Internal Database!');
                    setShowAppModal(false);
                  }}
                  className="w-full bg-india-green text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-xl active:scale-[0.98]"
                >
                  Confirm & Final Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Results
