'use client';

import { motion } from 'framer-motion';

export default function ResumeSection() {
  return (
    <section id="resume" className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Education & Skills */}
        <div className="lg:col-span-1 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Education</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold">MSC in Operational Research</h4>
                <p className="text-gray-400 text-sm mb-1">Department of Operational Research | Pursuing</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold">BSc in Physical Science (CS)</h4>
                <p className="text-gray-400 text-sm mb-1">Dyal Singh College, University of Delhi | CGPA: 7.53</p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold">Class XII (PCM)</h4>
                <p className="text-gray-400 text-sm mb-1">Kendriya Vidyalaya, A.F.S Arjangarh | 89.6%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn', 'SQL', 'Power BI', 'MS Excel', 'VS Code'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Experience, Extras, Certs */}
        <div className="lg:col-span-2 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Positions of Responsibility</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-semibold">Senior Placement Coordinator</h4>
                <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">Sep '25 - Current</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Zenith, Placement Cell, Dept. of Operational Research, DU</p>
              <p className="text-gray-300 leading-relaxed">
                Supporting placement operations by managing data, maintaining records, and assisting in organizing placement drives and employer interactions.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Extra-Curricular Achievements</h3>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-xl font-semibold">Financial Strategy & Analytics</h4>
                <span className="text-sm text-emerald-400 font-semibold bg-emerald-400/10 px-3 py-1 rounded-full">Top 25%</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">Winter Consulting 2025 (IIT Guwahati)</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 leading-relaxed">
                <li>Solved complex business cases involving cost structures, financial trade-offs, and strategic decision-making using MECE frameworks and data analysis (SQL, Excel, Tableau).</li>
                <li>Delivered quantitative, insight-driven recommendations focused on financial efficiency, valuation, and cost optimization.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <h4 className="text-lg font-semibold mb-3">Oracle Cloud Infrastructure AI Foundations</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Introduces fundamental concepts of AI, Machine Learning, Deep Learning, and Generative AI with practical application within Oracle Cloud Infrastructure.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
                <h4 className="text-lg font-semibold mb-3">Japanese Language Certification</h4>
                <p className="text-gray-400 text-sm mb-3">St. Stephen's College, University of Delhi (2026)</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Enhancing cross-cultural communication, global opportunities, and strengthening professional skills in multilingual environments.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
