'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Data-Driven Cost Optimization and Decision Analytics',
    category: 'Optimization & Analytics',
    description: 'Analysed 200+ scenarios and applied optimization techniques to improve resource allocation. Delivered a 20% performance improvement through data-driven models using Python.'
  },
  {
    title: 'Credit Risk Analysis & Financial Decision Support',
    category: 'Machine Learning',
    description: 'Developed and optimized machine learning models for risk patterns. Achieved ROC-AUC > 0.85 through advanced feature engineering and model tuning.'
  },
  {
    title: 'Predictive Analytics and Forecasting for Business',
    category: 'Predictive Modeling',
    description: 'Designed predictive models using macroeconomic indicators. Reduced forecasting error by 18%, enabling reliable planning and data-driven decisions.'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="bg-[#121212] text-white py-32 px-8 md:px-24 min-h-screen relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Selected Work</h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            A collection of recent projects pushing the boundaries of web experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-3xl p-8 overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-sm font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
