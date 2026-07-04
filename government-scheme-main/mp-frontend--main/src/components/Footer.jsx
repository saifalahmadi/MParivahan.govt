import React from 'react'
import { Landmark, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gov-deep text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded shadow-sm">
                <Landmark className="text-gov-blue w-8 h-8" />
              </div>
              <div className="flex flex-col border-l-2 border-white/20 pl-3">
                <span className="font-extrabold text-xl tracking-tight">GOV-MATCH AI</span>
                <span className="text-[10px] font-bold text-blue-300 tracking-widest uppercase">National Service Integration Portal</span>
              </div>
            </div>
            <p className="text-sm text-blue-100/60 leading-relaxed max-w-md italic">
              Empowering citizens through intelligent automation. Our AI matching system is a Digital India initiative designed to ensure every eligible citizen accesses the benefits they deserve.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 p-2 rounded hover:bg-white/20 transition-all cursor-pointer"><ShieldCheck className="w-5 h-5" /></div>
              <div className="bg-white/10 p-2 rounded hover:bg-white/20 transition-all cursor-pointer"><ExternalLink className="w-5 h-5" /></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-india-saffron">Resource Center</h4>
            <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">State-wise Statistics</li>
              <li className="hover:text-white transition-colors cursor-pointer">Scheme Guidelines</li>
              <li className="hover:text-white transition-colors cursor-pointer">RTI Information</li>
              <li className="hover:text-white transition-colors cursor-pointer">Digital India Portal</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-india-saffron">Support & Help</h4>
            <ul className="space-y-3 text-sm text-blue-100/70 font-medium">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1800-XXX-XXXX</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@govmatch.nic.in</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> MeitY, New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-blue-100/40 uppercase tracking-widest">
          <span>© 2026 Ministry of Electronics & IT (MeitY). All Rights Reserved.</span>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
