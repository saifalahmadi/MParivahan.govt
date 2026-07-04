import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, ArrowRight, ArrowLeft, Sparkles, TrendingUp,
  Calendar, MapPin, Briefcase, IndianRupee, Users, AlertCircle, Loader2
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SchemeCard from '../components/SchemeCard'

const EligibilityQuestionnaire = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [matchingSchemes, setMatchingSchemes] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    state: '',
    income: '',
    occupation: '',
    category: 'General',
    specificNeeds: []
  })

  // Question structure for guided questionnaire
  const questions = [
    {
      id: 0,
      title: 'What is your name?',
      subtitle: 'We need your full name as per official documents',
      field: 'name',
      type: 'text',
      placeholder: 'As per Aadhar/PAN',
      icon: Users
    },
    {
      id: 1,
      title: 'How old are you?',
      subtitle: 'Age is a key eligibility criterion for many schemes',
      field: 'age',
      type: 'number',
      placeholder: 'In years',
      icon: Calendar,
      hint: 'Age helps identify schemes designed for specific age groups'
    },
    {
      id: 2,
      title: 'What is your gender?',
      subtitle: 'Some schemes are specifically for women empowerment',
      field: 'gender',
      type: 'select',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
        { value: 'Prefer not to say', label: 'Prefer not to say' }
      ],
      icon: Users
    },
    {
      id: 3,
      title: 'Where do you live?',
      subtitle: 'Different states have different schemes and programs',
      field: 'state',
      type: 'select',
      options: [
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' }
      ],
      icon: MapPin
    },
    {
      id: 4,
      title: 'What is your annual income?',
      subtitle: 'Income limits determine eligibility for many schemes',
      field: 'income',
      type: 'number',
      placeholder: 'In rupees',
      icon: IndianRupee,
      hint: 'Include all sources of income from family members'
    },
    {
      id: 5,
      title: 'What is your occupation?',
      subtitle: 'Many schemes target specific professions',
      field: 'occupation',
      type: 'select',
      options: [
        { value: 'Farmer', label: 'Farmer' },
        { value: 'Laborers', label: 'Laborers' },
        { value: 'Student', label: 'Student' },
        { value: 'Unemployed', label: 'Unemployed' },
        { value: 'Self-employed', label: 'Self-employed' },
        { value: 'Government Employee', label: 'Government Employee' },
        { value: 'Private Employee', label: 'Private Employee' },
        { value: 'Businessman', label: 'Businessman' },
        { value: 'Homemaker', label: 'Homemaker' },
        { value: 'Others', label: 'Others' }
      ],
      icon: Briefcase
    },
    {
      id: 6,
      title: 'What is your social category?',
      subtitle: 'Some schemes have reservations for specific categories',
      field: 'category',
      type: 'select',
      options: [
        { value: 'General', label: 'General' },
        { value: 'SC', label: 'SC (Scheduled Caste)' },
        { value: 'ST', label: 'ST (Scheduled Tribe)' },
        { value: 'OBC', label: 'OBC (Other Backward Classes)' }
      ],
      icon: Users
    },
    {
      id: 7,
      title: 'What are your specific needs?',
      subtitle: 'Select all that apply to you',
      field: 'specificNeeds',
      type: 'checkbox',
      options: [
        { value: 'subsidies', label: 'Looking for subsidies' },
        { value: 'grants', label: 'Looking for grants' },
        { value: 'loans', label: 'Looking for loans' },
        { value: 'training', label: 'Training programs' },
        { value: 'employment', label: 'Employment opportunities' },
        { value: 'healthcare', label: 'Healthcare benefits' }
      ],
      icon: TrendingUp
    }
  ]

  // Filter schemes based on current answers
  useEffect(() => {
    const filterSchemes = async () => {
      if (formData.age || formData.state || formData.income || formData.occupation) {
        setLoading(true)
        try {
          // Simulate API call with current form data
          await new Promise(r => setTimeout(r, 800))
          
          const response = await fetch('http://localhost:5001/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name || 'User',
              age: formData.age || '25',
              income: formData.income || '300000',
              state: formData.state || 'Karnataka',
              occupation: formData.occupation || 'Others',
              gender: formData.gender || 'Male'
            })
          })
          
          if (response.ok) {
            const schemes = await response.json()
            setMatchingSchemes(schemes.slice(0, 6)) // Show top 6 matching schemes
          }
        } catch (err) {
          console.error('Error fetching schemes:', err)
        } finally {
          setLoading(false)
        }
      }
    }

    filterSchemes()
  }, [formData.age, formData.state, formData.income, formData.occupation])

  const question = questions[currentStep]
  const isAnswered = formData[question.field] !== '' && formData[question.field] !== undefined && (Array.isArray(formData[question.field]) ? formData[question.field].length > 0 : true)
  const canProceed = isAnswered || currentStep === questions.length - 1

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    navigate('/results', { state: { userData: formData } })
  }

  const handleInputChange = (value) => {
    if (question.type === 'checkbox') {
      setFormData({
        ...formData,
        [question.field]: formData[question.field].includes(value)
          ? formData[question.field].filter(item => item !== value)
          : [...(formData[question.field] || []), value]
      })
    } else {
      setFormData({ ...formData, [question.field]: value })
    }
  }

  const Icon = question?.icon || CheckCircle2

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto py-8"
    >
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-gov-deep">Eligibility Assistant</h1>
          <div className="text-sm font-bold text-gray-500">
            Question <span className="text-gov-blue">{currentStep + 1}</span> of {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-gov-blue to-gov-accent"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Question Panel */}
        <div className="lg:col-span-2">
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-gray-100 p-12 shadow-lg"
          >
            {/* Question Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gov-blue/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-8 h-8 text-gov-blue" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gov-deep mb-2">
                  {question?.title}
                </h2>
                <p className="text-gray-500 font-medium">{question?.subtitle}</p>
              </div>
            </div>

            {/* Input Field */}
            <div className="mb-8 space-y-6">
              {question?.type === 'text' && (
                <input
                  type="text"
                  value={formData[question.field] || ''}
                  onChange={e => handleInputChange(e.target.value)}
                  placeholder={question?.placeholder}
                  className="w-full px-6 py-4 text-lg font-medium border-2 border-gray-200 rounded-2xl focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/20 outline-none transition-all"
                />
              )}

              {question?.type === 'number' && (
                <input
                  type="number"
                  value={formData[question.field] || ''}
                  onChange={e => handleInputChange(e.target.value)}
                  placeholder={question?.placeholder}
                  className="w-full px-6 py-4 text-lg font-medium border-2 border-gray-200 rounded-2xl focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/20 outline-none transition-all"
                />
              )}

              {question?.type === 'select' && (
                <select
                  value={formData[question.field] || ''}
                  onChange={e => handleInputChange(e.target.value)}
                  className="w-full px-6 py-4 text-lg font-medium border-2 border-gray-200 rounded-2xl focus:border-gov-blue focus:ring-2 focus:ring-gov-blue/20 outline-none transition-all"
                >
                  <option value="">Select an option...</option>
                  {question?.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {question?.type === 'checkbox' && (
                <div className="space-y-3">
                  {question?.options?.map(opt => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 cursor-pointer hover:border-gov-blue hover:bg-blue-50/50 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={(formData[question.field] || []).includes(opt.value)}
                        onChange={() => handleInputChange(opt.value)}
                        className="w-6 h-6 accent-gov-blue cursor-pointer"
                      />
                      <span className="font-medium text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}

              {question?.hint && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 font-medium">{question.hint}</p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-8 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-gov-blue hover:text-gov-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>

              {currentStep < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-8 py-3 bg-gov-blue text-white rounded-xl font-bold hover:bg-gov-deep disabled:opacity-50 disabled:cursor-not-allowed transition-all ml-auto"
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 bg-india-green text-white rounded-xl font-bold hover:brightness-110 transition-all ml-auto"
                >
                  View Matching Schemes <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Real-time Matching Schemes Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 space-y-4">
            <div className="bg-gradient-to-br from-gov-blue/10 to-gov-accent/10 rounded-2xl p-6 border border-gov-blue/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-gov-blue" />
                <h3 className="font-bold text-gov-deep">Live Matching</h3>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                {formData.age || formData.state || formData.income ? (
                  <>Based on your answers, <span className="font-bold text-gov-blue">{matchingSchemes.length}</span> schemes match so far.</>
                ) : (
                  'Answer questions to see matching schemes'
                )}
              </p>

              {loading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-gov-blue animate-spin" />
                </div>
              )}

              {!loading && matchingSchemes.length > 0 && (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {matchingSchemes.map((scheme, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg p-3 border border-gray-100 hover:border-gov-blue hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-india-green flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-gov-deep truncate group-hover:text-gov-blue">
                            {scheme.scheme_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{scheme.score}% Match</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && matchingSchemes.length === 0 && (formData.age || formData.state || formData.income) && (
                <div className="text-xs text-gray-500 text-center py-6">
                  No schemes match yet. Continue answering...
                </div>
              )}
            </div>

            {/* Quick Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
              <h4 className="font-bold text-sm text-gov-deep mb-4">Your Answers</h4>
              <div className="space-y-2 text-xs">
                {formData.name && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Name:</span>
                    <span className="font-semibold text-gov-deep">{formData.name}</span>
                  </div>
                )}
                {formData.age && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Age:</span>
                    <span className="font-semibold text-gov-deep">{formData.age} years</span>
                  </div>
                )}
                {formData.state && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">State:</span>
                    <span className="font-semibold text-gov-deep">{formData.state}</span>
                  </div>
                )}
                {formData.income && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Income:</span>
                    <span className="font-semibold text-gov-deep">₹{formData.income}</span>
                  </div>
                )}
                {formData.occupation && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Occupation:</span>
                    <span className="font-semibold text-gov-deep text-right">{formData.occupation}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EligibilityQuestionnaire
