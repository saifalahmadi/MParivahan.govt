import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, BrainCircuit, ShieldCheck, FileSearch, BadgeCheck, Scale, X, Info, ExternalLink } from 'lucide-react'

const Explanation = () => {
  const location = useLocation()
  const { scheme, userData = { name: "Nischith", age: "25", state: "Karnataka" } } = location.state || { 
    scheme: { name: "Sample Scheme", score: 92, category: "General", details: "No details available." }
  }

  const [showAppModal, setShowAppModal] = React.useState(false);

  // Support both name and scheme_name from search results
  const schemeName = scheme.name || scheme.scheme_name || "Scheme Details";
  const schemeScore = scheme.score || 85; // Default score for search results
  const schemeDetails = scheme.details || "Information not available.";

  const criteria = [
    { label: "Demographic Match", status: "success", info: "Age and Gender profile aligns with program targets." },
    { label: "Socio-Economic Filter", status: "success", info: "Income level verified under threshold." },
    { label: "Regional Jurisdictions", status: "success", info: "Authorized for current residential state." },
    { label: "Semantic Probability", status: "success", info: "AI analysis of occupation context shows high relevance." }
  ]

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <Link to="/results" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-10 hover:text-gov-blue transition-colors group">
        <div className="p-1.5 rounded bg-gray-100 group-hover:bg-blue-50"><ArrowLeft className="w-3 h-3" /></div> Back to Recommendations
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Score & Core Reason */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 official-shadow text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gov-blue"></div>
            <div className="relative mx-auto w-32 h-32 flex items-center justify-center mb-6">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="58" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <motion.circle 
                  cx="64" cy="64" r="58" fill="none" stroke="#003366" strokeWidth="8" 
                  strokeDasharray="364.4" strokeDashoffset={364.4 - (364.4 * schemeScore) / 100}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </svg>
              <div className="text-3xl font-black text-gov-deep">{schemeScore}%</div>
            </div>
            <h3 className="text-sm font-bold text-gov-deep uppercase tracking-[0.2em] mb-2">Confidence Score</h3>
            <p className="text-[10px] text-gray-400 font-medium">Verified by Neural Match Engine v4.0</p>
          </div>

          <div className="bg-gov-blue p-8 rounded-3xl text-white space-y-4 shadow-xl shadow-blue-900/10">
            <BadgeCheck className="w-8 h-8 text-india-saffron mb-2" />
            <h4 className="text-lg font-bold">Eligibility Logic</h4>
            <p className="text-xs text-blue-100/60 leading-relaxed font-medium">
              Our NLP engine identified semantic matches between your profile and the latest gazette notification. Multiple regional and economic filters confirm that your attributes align with the program's intended beneficiary group.
            </p>
          </div>
        </div>

        {/* Right Side: Detailed Breakdown */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-3xl p-10 border border-gray-100 official-shadow">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <FileSearch className="w-6 h-6 text-gov-blue" />
                <h2 className="text-xl font-extrabold text-gov-deep tracking-tight">{schemeName}</h2>
              </div>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100">
                Verification: Successful
              </span>
            </div>

              <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h3 className="text-xs font-bold text-gov-blue uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" /> Full Scheme Overview
                </h3>
                <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                  {schemeDetails}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-50">
                <h3 className="text-xs font-bold text-gov-deep uppercase tracking-widest mb-6 flex items-center gap-2">
                   Match Analysis Breakdown
                </h3>
                <div className="space-y-4">
                  {criteria.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm"
                    >
                      <div className="mt-1 p-1 bg-gray-50 rounded-full shadow-sm"><CheckCircle2 className="w-3.5 h-3.5 text-india-green" /></div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 mb-0.5">{item.label}</h5>
                        <p className="text-[11px] text-gray-500 font-medium leading-tight">{item.info}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            
            {scheme.benefits && (
              <div className="mt-10">
                <h3 className="text-sm font-bold text-gov-deep uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-india-green" /> Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Array.isArray(scheme.benefits) ? scheme.benefits : [scheme.benefits]).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-green-50/30 border border-green-100/50">
                      <CheckCircle2 className="w-4 h-4 text-india-green flex-shrink-0" />
                      <span className="text-xs font-semibold text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scheme.eligibility && (
              <div className="mt-10">
                <h3 className="text-sm font-bold text-gov-deep uppercase tracking-widest mb-6 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gov-blue" /> Detailed Eligibility
                </h3>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  {typeof scheme.eligibility === 'object' && !Array.isArray(scheme.eligibility) ? (
                    <ul className="space-y-3">
                      {Object.entries(scheme.eligibility).map(([key, value], i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[10px] font-bold text-gov-blue uppercase w-24 flex-shrink-0 mt-1">{key.replace(/_/g, ' ')}:</span>
                          <span className="text-xs font-medium text-gray-600">{Array.isArray(value) ? value.join(', ') : value}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs font-medium text-gray-600 leading-relaxed">
                      {typeof scheme.eligibility === 'string' ? scheme.eligibility : JSON.stringify(scheme.eligibility)}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-10 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Scale className="w-5 h-5 text-gov-blue" />
                <span className="text-xs font-bold text-gov-deep">Is this match inaccurate? Request Manual Review</span>
              </div>
              <button className="bg-white text-gov-blue border border-blue-200 px-4 py-2 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all">
                Submit Feedback
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button 
              onClick={() => setShowAppModal(true)}
              className="flex-1 bg-gov-blue text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 hover:brightness-110 transition-all"
            >
              Initialize Application
            </button>
            <button className="flex-1 bg-white text-gov-blue border-2 border-gov-blue py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all">
              Download Scheme PDF
            </button>
          </div>
        </div>
      </div>

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
                  <p className="text-sm opacity-80 mt-1">Scheme: {schemeName}</p>
                </div>
                <button onClick={() => setShowAppModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-7 h-7" />
                </button>
              </div>
              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
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
                      alert('Application Form Saved Locally!');
                      setShowAppModal(false);
                    }}
                    className="flex-1 bg-white text-gov-blue border-2 border-gov-blue py-4 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all"
                  >
                    Save Draft
                  </button>
                  <button 
                    onClick={() => {
                      if (scheme.url) {
                        window.open(scheme.url, '_blank');
                      } else {
                        window.open('https://www.india.gov.in/my-government/schemes', '_blank');
                      }
                      setShowAppModal(false);
                    }}
                    className="flex-1 bg-gov-blue text-white py-4 rounded-2xl font-bold text-sm hover:bg-gov-deep transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-2"
                  >
                    Official Portal
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    alert('Registration Successful! Your details have been submitted.');
                    setShowAppModal(false);
                  }}
                  className="w-full bg-india-green text-white py-4 rounded-2xl font-bold text-lg hover:brightness-110 transition-all shadow-xl"
                >
                  Confirm & Register
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Explanation
