import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, X, TrendingUp, Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const CompareSchemes = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const selectedSchemes = useMemo(() => {
    return location.state?.selectedSchemes || []
  }, [location.state?.selectedSchemes])

  if (selectedSchemes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8 pb-20 max-w-6xl mx-auto"
      >
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gov-blue uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-3 h-3" /> Go Back
          </button>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
          <Info className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-yellow-900 mb-2">No Schemes Selected</h3>
          <p className="text-yellow-700 mb-6">Please select at least 2 schemes to compare.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gov-blue text-white rounded-lg font-bold hover:bg-gov-deep transition-all"
          >
            Select Schemes
          </button>
        </div>
      </motion.div>
    )
  }

  const attributes = [
    { key: 'scheme_name', label: 'Scheme Name', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'score', label: 'Match Score', type: 'score' },
    { key: 'min_age', label: 'Minimum Age', type: 'number' },
    { key: 'max_age', label: 'Maximum Age', type: 'number' },
    { key: 'min_income', label: 'Maximum Income', type: 'number' },
    { key: 'state', label: 'Applicable State', type: 'text' },
    { key: 'benefits', label: 'Key Benefits', type: 'array' },
    { key: 'summary', label: 'Summary', type: 'text' },
    { key: 'details', label: 'Details', type: 'text' }
  ]

  const renderValue = (scheme, attribute) => {
    const value = scheme[attribute.key]

    if (value === undefined || value === null || value === '') {
      return <span className="text-gray-300 text-sm">—</span>
    }

    switch (attribute.type) {
      case 'score':
        return (
          <span className="font-bold text-gov-blue">
            {value}%
          </span>
        )
      case 'number':
        return <span className="font-semibold text-gray-800">{value}</span>
      case 'array':
        return (
          <div className="space-y-1">
            {Array.isArray(value) ? value.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                <Check className="w-3 h-3 text-india-green flex-shrink-0" />
                {item}
              </div>
            )) : (
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Check className="w-3 h-3 text-india-green flex-shrink-0" />
                {value}
              </div>
            )}
          </div>
        )
      default:
        return <span className="text-gray-800 text-sm leading-relaxed">{String(value).substring(0, 100)}</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-20 max-w-7xl mx-auto"
    >
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gov-blue uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Results
        </button>
      </div>

      {/* Header */}
      <div className="border-b-2 border-gray-100 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-gov-accent" />
          <span className="text-xs font-bold text-gov-accent uppercase tracking-widest">Side-by-Side Comparison</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gov-deep tracking-tight">
          Compare {selectedSchemes.length} Schemes
        </h2>
        <p className="text-gray-500 font-medium mt-2">
          Review key attributes and benefits to find the best scheme for your needs.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full">
          <tbody>
            {attributes.map((attribute, idx) => (
              <tr
                key={attribute.key}
                className={`border-b border-gray-200 hover:bg-blue-50/30 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
              >
                <td className="px-6 py-4 font-bold text-gov-deep text-sm sticky left-0 bg-inherit min-w-48 z-10 border-r border-gray-200">
                  {attribute.label}
                </td>
                {selectedSchemes.map((scheme, schemeIdx) => (
                  <td
                    key={`${attribute.key}-${schemeIdx}`}
                    className="px-6 py-4 min-w-64 border-r border-gray-200 last:border-r-0"
                  >
                    {renderValue(scheme, attribute)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Decision Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedSchemes.map((scheme, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-2xl border border-gov-blue/20 bg-gradient-to-br from-gov-blue/5 to-transparent"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gov-blue text-white flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <h3 className="font-bold text-gov-deep flex-grow">{scheme.scheme_name}</h3>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                scheme.score > 90 ? 'bg-india-green/10 text-india-green' : 'bg-gov-blue/10 text-gov-blue'
              }`}>
                {scheme.score}%
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-600 leading-relaxed">
                {scheme.summary || scheme.details}
              </p>

              {scheme.benefits && (
                <div className="bg-white/50 rounded-lg p-3 border border-gray-100">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-2">Top Benefits</div>
                  <div className="space-y-1">
                    {(Array.isArray(scheme.benefits) ? scheme.benefits.slice(0, 3) : [scheme.benefits]).map(
                      (benefit, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-2 text-xs text-gray-700">
                          <Check className="w-3 h-3 text-india-green flex-shrink-0" />
                          {benefit}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <button className="w-full mt-4 px-4 py-2 bg-gov-blue text-white rounded-lg font-bold text-sm hover:bg-gov-deep transition-all">
                View Full Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gov-blue/10 to-gov-accent/10 rounded-2xl border border-gov-blue/20 p-8 text-center">
        <h3 className="text-xl font-bold text-gov-deep mb-2">Need Help Deciding?</h3>
        <p className="text-gray-600 mb-6">Contact our support team or use the AI chatbot for personalized guidance.</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-gov-blue text-white rounded-lg font-bold hover:bg-gov-deep transition-all">
            Chat with AI
          </button>
          <button className="px-6 py-3 border-2 border-gov-blue text-gov-blue rounded-lg font-bold hover:bg-blue-50 transition-all">
            Contact Support
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default CompareSchemes
