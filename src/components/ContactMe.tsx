'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight } from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactMe() {
  return (
    <section id="contact" className="bg-[#121212] text-white py-32 px-8 md:px-24 relative z-20 border-t border-white/5 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Collaborate?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16 max-w-2xl mx-auto">
            Whether you are looking to optimize complex operations, architect predictive models, or drive strategic, data-backed decisions—I am always open to discussing ambitious projects and new opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <a href="mailto:utsavkumarthakur.du.or.27@gmail.com" className="group">
              <div className="bg-white/5 border border-white/10 hover:border-blue-400/50 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-sm text-gray-400 text-center break-all">utsavkumarthakur.du.or.27@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/utsav-thakur-2b01871b7" target="_blank" rel="noopener noreferrer" className="group">
              <div className="bg-white/5 border border-white/10 hover:border-emerald-400/50 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)] hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
                <p className="text-sm text-gray-400 text-center">Connect with me</p>
              </div>
            </a>

            {/* Phone */}
            <a href="tel:+917827589474" className="group">
              <div className="bg-white/5 border border-white/10 hover:border-purple-400/50 rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2 h-full">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-sm text-gray-400 text-center">+91 78275 89474</p>
              </div>
            </a>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Utsav Kumar Thakur. All rights reserved.</p>
            <p className="mt-4 md:mt-0 flex items-center gap-2">
              Building the future <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
