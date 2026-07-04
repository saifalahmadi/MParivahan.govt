import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="w-12 h-12 text-gov-blue" />
      </motion.div>
      <p className="mt-4 text-gov-blue font-medium animate-pulse">{text}</p>
    </div>
  )
}

export default Loader
