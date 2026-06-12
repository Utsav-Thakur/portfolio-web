'use client';

import { motion } from 'framer-motion';

export default function AboutMe() {
  return (
    <section id="about" className="bg-[#121212] text-white py-32 px-8 md:px-24 relative z-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-12 items-start"
        >
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
              About Me
            </h2>
            <div className="w-20 h-1 bg-white/20 rounded-full mb-8"></div>
          </div>
          
          <div className="md:w-2/3 space-y-8 text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            <p>
              I am a <strong className="text-white font-medium">Master of Operational Research</strong> candidate at the University of Delhi, dedicated to bridging the gap between advanced mathematical modeling and high-stakes business strategy.
            </p>
            <p>
              My work revolves around solving complex inefficiencies across <strong className="text-white font-medium">Supply Chain, Finance, and Enterprise Operations</strong>. By engineering sophisticated Machine Learning models and applying metaheuristic optimizations like Genetic Algorithms, I transform raw, multi-dimensional data into quantitative, actionable insights.
            </p>
            <p>
              Whether I am minimizing logistical routing costs, assessing credit risk through predictive analytics, or optimizing capital allocation using MECE frameworks, my goal remains consistent: <strong className="text-white font-medium">to drive performance, reduce operational error, and empower robust, data-driven decision-making</strong> at every level.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
