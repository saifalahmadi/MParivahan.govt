import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Search, ShieldCheck, Zap, Lightbulb, Landmark, MapPin, Building2, Users, PieChart as ChartIcon, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Home = () => {
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-24 pb-20 overflow-hidden"
    >
      {/* Premium Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-5%] w-[30%] h-[30%] bg-india-saffron/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <motion.div 
                variants={itemVariants} 
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-100 text-gov-blue px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>{t('home.tagline')}</span>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants} 
                className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[0.95] tracking-tight"
              >
                {t('home.hero_title').split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-gov-blue to-blue-500" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants} 
                className="text-xl text-slate-500 mb-12 max-w-xl font-medium leading-relaxed"
              >
                {t('home.hero_subtitle')}
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
                <Link to="/form" className="group bg-gov-blue text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-blue-900/20 hover:bg-gov-deep transition-all flex items-center gap-3 active:scale-95">
                  Find My Schemes <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/impact" className="px-8 py-4 rounded-2xl bg-white border-2 border-slate-100 text-slate-700 font-bold text-base hover:border-gov-blue hover:text-gov-blue transition-all flex items-center gap-3">
                  <ChartIcon className="w-5 h-5" /> National Impact
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-12 flex items-center gap-8 grayscale opacity-50">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">3,423</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Schemes Indexed</span>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">24L+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Profile Matches</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="flex-1 relative"
            >
              <div className="relative z-10 bg-white p-2 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="bg-slate-50 rounded-[2.5rem] p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-black text-slate-900">Quick Access Portals</h3>
                    <Globe className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { title: "Karnataka State", icon: MapPin, color: "blue", count: "1,240 Schemes" },
                      { title: "Central Govt", icon: Landmark, color: "orange", count: "1,890 Schemes" },
                      { title: "Women Specific", icon: Building2, color: "purple", count: "293 Schemes" }
                    ].map((portal, i) => (
                      <Link 
                        key={i} 
                        to="/search" 
                        className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-${portal.color}-50 rounded-xl flex items-center justify-center`}>
                            <portal.icon className={`w-6 h-6 text-${portal.color}-600`} />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{portal.title}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{portal.count}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-3xl -rotate-12 -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-india-saffron/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="max-w-6xl mx-auto w-full px-4 mb-12">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Core AI Engine</h2>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">Built for Accuracy and Trust.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Search className="w-7 h-7 text-blue-600" />, 
              title: "Semantic Analysis", 
              desc: "Deep NLP analysis across thousands of center and state welfare programs to find your perfect fit." 
            },
            { 
              icon: <Bot className="w-7 h-7 text-orange-600" />, 
              title: "AI Assistant", 
              desc: "An interactive guide that helps you understand complex eligibility rules in your own language." 
            },
            { 
              icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />, 
              title: "Verified Gazette Data", 
              desc: "Every scheme is cross-referenced with official ministry notifications and budget documents." 
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 transition-all text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black mb-4 text-slate-900">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Usage & Benefits Section */}
      <section className="max-w-6xl mx-auto w-full px-4">
        <div className="bg-blue-50/50 rounded-[3rem] p-12 border border-blue-100/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{t('home.why_login')}</h2>
              <p className="text-slate-600 mb-10 font-medium leading-relaxed">
                {t('home.why_login_desc')}
              </p>
              <div className="space-y-6">
                {[
                  { title: "Save & Compare", desc: "Keep track of interesting schemes and compare them side-by-side.", icon: Search },
                  { title: "Smart Auto-Fill", desc: "Your profile data automatically fills official application forms, saving you hours of typing.", icon: Zap },
                  { title: "Application Tracker", desc: "Get real-time updates on your submitted applications and document verification status.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-50 flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-gov-blue" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{benefit.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-gov-blue" /> {t('home.how_to_use')}
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />
                {[
                  { step: "01", title: t('home.steps.s1'), desc: t('home.steps.d1') },
                  { step: "02", title: t('home.steps.s2'), desc: t('home.steps.d2') },
                  { step: "03", title: t('home.steps.s3'), desc: t('home.steps.d3') }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 relative z-10">
                    <div className="w-8 h-8 bg-gov-blue text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-900/20">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 bg-gov-blue text-white py-4 rounded-xl font-bold text-sm hover:bg-gov-deep transition-all shadow-lg">
                {t('home.cta')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Notification Bar */}
      <motion.div 
        variants={itemVariants}
        className="max-w-6xl mx-auto w-full px-4"
      >
        <div className="bg-slate-900 p-10 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10 text-white overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-20 -mt-20 blur-[100px]"></div>
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
              <Users className="w-8 h-8 text-india-saffron" />
            </div>
            <div>
              <div className="text-2xl font-black mb-2">Join the Community</div>
              <p className="text-slate-400 text-sm font-medium">New integration: All Karnataka student scholarships for 2026 now live.</p>
            </div>
          </div>
          <button className="relative z-10 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-india-saffron hover:text-white transition-all active:scale-95">
            Read Gazette
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Home
