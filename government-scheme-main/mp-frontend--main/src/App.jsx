import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Form from './pages/Form'
import Results from './pages/Results'
import Explanation from './pages/Explanation'
import SchemeSearch from './pages/SchemeSearch'
import CompareSchemes from './pages/CompareSchemes'
import EligibilityQuestionnaire from './pages/EligibilityQuestionnaire'
import ImpactShowcase from './pages/ImpactShowcase'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gov-light selection:bg-gov-blue selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16 overflow-visible">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/questionnaire" element={<EligibilityQuestionnaire />} />
            <Route path="/results" element={<Results />} />
            <Route path="/compare" element={<CompareSchemes />} />
            <Route path="/explanation" element={<Explanation />} />
            <Route path="/search" element={<SchemeSearch />} />
            <Route path="/impact" element={<ImpactShowcase />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
