import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Landmark, Home, Search, Info, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  
  const isActive = (path) => location.pathname === path

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Official Top Strip */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6 py-1 flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-india-saffron"></span>
              Government of India
            </span>
            <span>Digital India Initiative</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => changeLanguage('en')} className={`${i18n.language === 'en' ? 'text-gov-blue underline' : ''}`}>English</button>
            <button onClick={() => changeLanguage('hi')} className={`${i18n.language === 'hi' ? 'text-gov-blue underline' : ''}`}>हिन्दी</button>
            <button onClick={() => changeLanguage('kn')} className={`${i18n.language === 'kn' ? 'text-gov-blue underline' : ''}`}>ಕನ್ನಡ</button>
          </div>
        </div>
      </div>

      <nav className="nav-glass">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-1.5 bg-gov-blue rounded shadow-sm">
              <Landmark className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-gov-blue tracking-tighter leading-none">GOV-MATCH</span>
              <span className="text-[10px] font-bold text-gov-accent tracking-widest uppercase">AI Service Portal</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-10">
            {[
              { path: '/', icon: <Home className="w-4 h-4" />, label: t('nav.home') },
              { path: '/form', icon: <Search className="w-4 h-4" />, label: t('nav.find_schemes') },
              { path: '/search', icon: <Search className="w-4 h-4" />, label: 'Search' },
              { path: '/impact', icon: <TrendingUp className="w-4 h-4" />, label: 'Impact' },
              { path: '/results', icon: <Info className="w-4 h-4" />, label: t('nav.my_matches') }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`flex items-center gap-1.5 text-sm font-bold transition-all relative py-1 ${
                  isActive(link.path) 
                  ? 'text-gov-blue border-b-2 border-gov-blue' 
                  : 'text-gray-500 hover:text-gov-blue'
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gov-blue text-sm font-bold hover:underline">
              {t('nav.login')}
            </button>
            <button className="bg-gov-blue text-white text-xs px-5 py-2.5 rounded shadow-lg font-bold hover:bg-gov-deep transition-all">
              Register
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
