'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function InteractiveGraph() {
  const [hoverData, setHoverData] = useState<{ x: number; y: number; iteration: number; cost: number } | null>(null);
  const [autoplayIteration, setAutoplayIteration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Autoplay simulation loop when not hovering
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setAutoplayIteration((prev) => {
        if (prev >= 1000) {
          return 0; // wrap around
        }
        return prev + 5;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isHovering]);

  // Handle mouse moves on SVG plot
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!svgRef.current) return;
    setIsHovering(true);
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const viewboxX = (clientX / rect.width) * 350;

    let x = Math.max(40, Math.min(310, viewboxX));
    let y = 152;
    let t = 0;

    if (x <= 140) {
      t = (-80 + Math.sqrt(3200 + 80 * x)) / 40;
      y = (1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 130 + t * t * 145;
    } else {
      t = (-120 + Math.sqrt(-13600 + 200 * x)) / 100;
      y = (1 - t) * (1 - t) * 145 + 2 * (1 - t) * t * 160 + t * t * 152;
    }

    const iteration = Math.round(((x - 40) / 270) * 1000);
    const cost = Math.round(12500 - ((y - 30) / 122) * (12500 - 4120));

    setHoverData({ x, y, iteration, cost });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverData(null);
    setAutoplayIteration(0);
  };

  // Determine active plotting values (either hovered or autoplaying)
  const activeIteration = hoverData ? hoverData.iteration : autoplayIteration;

  // Calculate coordinates for the active iteration marker
  const plotX = 40 + (activeIteration / 1000) * 270;
  let plotY = 152;
  let t = 0;

  if (plotX <= 140) {
    t = (-80 + Math.sqrt(3200 + 80 * plotX)) / 40;
    plotY = (1 - t) * (1 - t) * 30 + 2 * (1 - t) * t * 130 + t * t * 145;
  } else {
    t = (-120 + Math.sqrt(-13600 + 200 * plotX)) / 100;
    plotY = (1 - t) * (1 - t) * 145 + 2 * (1 - t) * t * 160 + t * t * 152;
  }

  const activeCost = Math.round(12500 - ((plotY - 30) / 122) * (12500 - 4120));

  return (
    <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative group/graph">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-400">Solver Convergence Trace</span>
        <span className="text-[10px] text-teal-400 bg-teal-400/10 px-2 py-0.5 rounded-full border border-teal-500/20">
          {hoverData ? 'Interactive mode' : 'Simulating convergence...'}
        </span>
      </div>
      
      <svg
        ref={svgRef}
        className="w-full h-auto max-h-[160px] cursor-crosshair"
        viewBox="0 0 350 200"
        xmlns="http://www.w3.org/2000/svg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Graph Axis lines */}
        <line x1="40" y1="20" x2="40" y2="160" stroke="#64748b" strokeWidth="1" strokeOpacity="0.3"></line>
        <line x1="40" y1="160" x2="310" y2="160" stroke="#64748b" strokeWidth="1" strokeOpacity="0.3"></line>
        
        {/* Convergence Curve path */}
        <path 
          d="M 40,30 Q 80,130 140,145 T 310,152" 
          fill="none" 
          stroke="#64ffda" 
          strokeWidth="2" 
        />
        
        {/* Static Key Highlights (Local traps, global converged target) */}
        <circle cx="80" cy="130" r="3.5" fill="#fbbf24" opacity={isHovering ? 0.3 : 1}>
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="145" r="3.5" fill="#fbbf24" opacity={isHovering ? 0.3 : 1}>
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="310" cy="152" r="4.5" fill="#00ff88" opacity={isHovering ? 0.3 : 1}>
          <animate attributeName="r" values="3.5;6;3.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Hover / Active Simulation crosshairs and indicators */}
        <line
          x1={plotX}
          y1="20"
          x2={plotX}
          y2="160"
          stroke="rgba(100, 255, 218, 0.3)"
          strokeWidth="1"
          strokeDasharray="2,2"
        />
        <circle
          cx={plotX}
          cy={plotY}
          r="5.5"
          fill={isHovering ? "#00e5ff" : "rgba(100, 255, 218, 0.8)"}
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* Dynamic Context Labels inside SVG */}
        {!isHovering && (
          <>
            <text x="300" y="142" fill="#00ff88" fontFamily="sans-serif" fontSize="8" textAnchor="end" fontWeight="600">Global Optimum Reached</text>
            <text x="85" y="122" fill="#fbbf24" fontFamily="sans-serif" fontSize="7" fontWeight="500">Local Optima Escaped</text>
          </>
        )}

        {isHovering && activeIteration >= 130 && activeIteration <= 170 && (
          <text x="85" y="122" fill="#fbbf24" fontFamily="sans-serif" fontSize="7" fontWeight="600">Local Optima Escaped!</text>
        )}
        {isHovering && activeIteration >= 950 && (
          <text x="300" y="142" fill="#00ff88" fontFamily="sans-serif" fontSize="8" textAnchor="end" fontWeight="600">Global Optimum Reached!</text>
        )}
        
        <text x="35" y="15" fill="#94a3b8" fontFamily="sans-serif" fontSize="7" textAnchor="start">Objective Value (Cost)</text>
        <text x="310" y="172" fill="#94a3b8" fontFamily="sans-serif" fontSize="7" textAnchor="end">Iterations</text>
      </svg>

      {/* Hover Info Tooltip Box */}
      <div
        className="absolute pointer-events-none bg-slate-950/95 border border-teal-500/30 rounded-xl p-2 text-[9px] font-mono text-slate-200 shadow-xl backdrop-blur-sm z-30 transition-all duration-75"
        style={{
          left: `${Math.max(4, Math.min(68, (plotX / 350) * 100))}%`,
          top: '8px',
          opacity: isHovering || activeIteration > 0 ? 1 : 0,
        }}
      >
        <div className="text-teal-400 font-bold border-b border-white/10 pb-1 mb-1">QIGWO Solver State</div>
        <div>Iteration: <span className="text-white font-semibold">{activeIteration}</span></div>
        <div>Current Cost: <span className="text-white font-semibold">{activeCost.toLocaleString()}</span></div>
        {activeIteration >= 130 && activeIteration <= 170 && (
          <div className="text-amber-400 text-[8px] mt-0.5">✓ Escaped local trap</div>
        )}
        {activeIteration >= 950 && (
          <div className="text-emerald-400 text-[8px] mt-0.5">★ Convergence reached</div>
        )}
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'Data-Driven Cost Optimization and Decision Analytics',
    category: 'Optimization & Analytics',
    description: 'Analysed 200+ scenarios and applied optimization techniques to improve resource allocation. Delivered a 20% performance improvement through data-driven models using Python.',
    demoLink: '/tsp/index.html',
    codeLink: 'https://github.com/Utsav-Thakur/TSP',
    showGraph: true
  },
  {
    title: 'Credit Risk Analysis & Financial Decision Support',
    category: 'Machine Learning',
    description: 'Developed and optimized machine learning models for risk patterns. Achieved ROC-AUC > 0.85 through advanced feature engineering and model tuning.',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Predictive Analytics and Forecasting for Business',
    category: 'Predictive Modeling',
    description: 'Designed predictive models using macroeconomic indicators. Reduced forecasting error by 18%, enabling reliable planning and data-driven decisions.',
    demoLink: '#',
    codeLink: '#'
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
              className="group relative block rounded-3xl p-8 overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 h-full flex flex-col justify-between min-h-[300px]">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-sm font-mono text-gray-400 border border-white/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  
                  {project.demoLink && project.demoLink !== '#' ? (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black text-white transition-colors duration-300"
                    >
                      <ArrowUpRight className="w-6 h-6" />
                    </a>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-emerald-400 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Render Visual Graph if showGraph is true */}
                  {project.showGraph && <InteractiveGraph />}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6 relative z-20">
                    {project.demoLink && project.demoLink !== '#' && (
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md"
                      >
                        Live Demo
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.codeLink && project.codeLink !== '#' && (
                      <a 
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full text-sm font-semibold transition-all hover:scale-105"
                      >
                        View Code
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
