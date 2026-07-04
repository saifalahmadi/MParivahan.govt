import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Calendar, MapPin, Briefcase, IndianRupee, Users, ArrowRight, Loader2, Sparkles, Fingerprint, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Form = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male', state: '', 
    income: '', occupation: '', category: 'General', specifics: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/results', { state: { userData: formData } })
    }, 3000)
  }

  const inputClasses = "w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:border-gov-blue focus:ring-1 focus:ring-gov-blue outline-none transition-all text-sm font-medium"

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 border-4 border-gray-100 border-t-gov-blue rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Fingerprint className="w-12 h-12 text-gov-blue opacity-50" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-extrabold text-gov-deep uppercase tracking-widest">Verifying Background Credentials</h2>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="w-2 h-2 bg-gov-blue rounded-full"
              />
            ))}
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Cross-Referencing Digital Databases</p>
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-8 mb-12">
        <div className={`flex flex-col items-center gap-2 ${currentStep >= 1 ? 'text-gov-blue' : 'text-gray-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${currentStep >= 1 ? 'border-gov-blue bg-blue-50' : 'border-gray-200'}`}>01</div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Personal</span>
        </div>
        <div className={`h-[2px] w-20 ${currentStep >= 2 ? 'bg-gov-blue' : 'bg-gray-200'}`} />
        <div className={`flex flex-col items-center gap-2 ${currentStep >= 2 ? 'text-gov-blue' : 'text-gray-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${currentStep >= 2 ? 'border-gov-blue bg-blue-50' : 'border-gray-300'}`}>02</div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Eligibility</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2rem] border border-gray-100 official-shadow overflow-hidden">
        {/* Left Side: Illustration & Tip */}
        <div className="lg:col-span-4 bg-gov-deep p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">{t('form.title')}</h3>
            <p className="text-blue-100/60 text-sm leading-relaxed mb-8">
              Please ensure your details match your official documents (Aadhar, PAN) for accurate scheme matching.
            </p>
            <ul className="space-y-4 text-xs font-semibold text-blue-100/80 uppercase tracking-widest">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-india-green" /> 100% Privacy</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-india-green" /> Secure Sync</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-4 h-4 text-india-green" /> Direct Benefits</li>
            </ul>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 mt-12">
            <p className="text-[10px] text-blue-200 uppercase font-bold tracking-[0.1em] mb-1">Current Portal Status</p>
            <p className="text-[10px] font-medium text-white/50 italic leading-relaxed">System operational. 500+ center and state portals are active for real-time verification.</p>
          </div>
        </div>

        {/* Right Side: Actuall Form */}
        <div className="lg:col-span-8 p-10 lg:p-14">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3 text-gov-accent" /> {t('form.name')}
                </label>
                <input required type="text" className={inputClasses} placeholder="As per official documents" 
                  onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-gov-accent" /> {t('form.age')}
                </label>
                <input required type="number" className={inputClasses} placeholder="In years" 
                  onChange={e => setFormData({...formData, age: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3 text-gov-accent" /> Gender
                </label>
                <select required className={inputClasses} value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-gov-accent" /> {t('form.state')}
                </label>
                <select className={inputClasses} onChange={e => setFormData({...formData, state: e.target.value})}>
                  <option value="">Select State</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <IndianRupee className="w-3 h-3 text-gov-accent" /> {t('form.income')}
                </label>
                <input required type="number" className={inputClasses} placeholder="Annual Household Income" 
                  onChange={e => setFormData({...formData, income: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-3 h-3 text-gov-accent" /> {t('form.occupation')}
                </label>
                <select className={inputClasses} onChange={e => setFormData({...formData, occupation: e.target.value})}>
                  <option value="">Select Occupation</option>
                  <option value="Farmer / Agriculture">Farmer / Agriculture</option>
                  <option value="Student / Research">Student / Research</option>
                  <option value="Entrepreneur / Startup">Entrepreneur / Startup</option>
                  <option value="Daily Wage Worker">Daily Wage Worker</option>
                  <option value="Other / Professional">Other / Professional</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Users className="w-3 h-3 text-gov-accent" /> {t('form.category')}
                </label>
                <select className={inputClasses} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>General</option>
                  <option>OBC</option>
                  <option>SC</option>
                  <option>ST</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-gov-accent" /> Specific Requirements (NLP Match)
                </label>
                <textarea className={inputClasses} placeholder="e.g. I am a student looking for higher education scholarships" 
                  rows="2"
                  onChange={e => setFormData({...formData, query: e.target.value})} />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified by National Service Engine</p>
              <button type="submit" className="w-full md:w-auto btn-primary flex items-center justify-center gap-3 text-sm px-12 py-4">
                {t('form.submit')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default Form
