import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, Star, FileEdit, Check, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const SchemeCard = ({ scheme, index, onApplyDirectly, isSelected = false, onToggleSelect = null }) => {
  const { t } = useTranslation()

  const getLabel = (key, fallback) => {
    if (key && key.includes('.')) return t(key)
    return fallback || key
  }

  const name = getLabel(scheme.nameKey, scheme.name || scheme.scheme_name)
  const description = getLabel(scheme.descKey, scheme.summary || scheme.description || scheme.details)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass p-6 rounded-3xl flex flex-col h-full border shadow-sm transition-all hover:shadow-lg ${
        isSelected
          ? 'bg-blue-50/95 border-gov-blue/40 ring-2 ring-gov-blue/30'
          : 'bg-white/95 border-gray-100'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-widest ${
          scheme.score > 90 ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gov-blue/5 text-gov-blue border-gov-blue/10'
        }`}>
          {scheme.category || 'General'}
        </span>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 font-bold text-sm ${
            scheme.score > 90 ? 'text-india-green' : 'text-gov-accent'
          }`}>
            <Star className={`w-4 h-4 ${scheme.score > 90 ? 'fill-india-green' : 'fill-gov-accent'}`} />
            <span>{scheme.score}% Match</span>
          </div>
          {onToggleSelect && (
            <button
              onClick={() => onToggleSelect(scheme)}
              className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-gov-blue text-white'
                  : 'border-2 border-gray-300 hover:border-gov-blue'
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      <h3 className="text-lg font-extrabold text-gov-deep mb-3 leading-tight min-h-[3.5rem] line-clamp-2">{name}</h3>
      <p className="text-gray-500 text-[13px] mb-6 flex-grow leading-relaxed font-medium line-clamp-6 overflow-hidden">
        {description}
      </p>

      <div className="space-y-2 mb-6 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50">
        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Why Recommended?</div>
        <p className="text-[11px] font-semibold text-indigo-900 leading-relaxed italic">
          {scheme.reason || "Best demographic match based on criteria."}
        </p>
      </div>


      <div className="flex flex-col gap-2.5 mt-auto">
        <div className="grid grid-cols-2 gap-2">
          <Link 
            to="/explanation" 
            state={{ scheme }}
            className="text-center py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-[10px] flex items-center justify-center gap-1"
          >
            <Info className="w-3 h-3" /> Explain
          </Link>
          <button 
            onClick={() => onApplyDirectly && onApplyDirectly(scheme)}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gov-accent/20 bg-gov-accent/5 text-gov-accent font-bold hover:bg-gov-accent/10 transition-all text-[10px]"
          >
            <FileEdit className="w-3 h-3" /> Direct Form
          </button>
        </div>
        <button 
          onClick={() => onApplyDirectly && onApplyDirectly(scheme)}
          className="w-full bg-gov-blue text-white py-3 rounded-xl font-extrabold hover:bg-gov-deep transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 text-sm"
        >
          Apply Now <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default SchemeCard
