'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ["Data Scientist", "Optimizer", "ML Engineer"];

function TypingText() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        setTypingSpeed(75);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setTypingSpeed(500);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-mono font-semibold">
      {currentText}
      <span className="text-emerald-400 animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function AboutMe() {
  const [avatarUrl, setAvatarUrl] = useState('https://github.com/Utsav-Thakur.png');
  const [bio, setBio] = useState(
    'MSc Operational Research student at the University of Delhi. Specializing in translating mathematical optimization, machine learning models, and complex analytics into actionable systems. Pioneering route and allocation algorithms with metaheuristics.'
  );

  useEffect(() => {
    fetch('https://api.github.com/users/Utsav-Thakur')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
        if (data.bio) setBio(data.bio);
      })
      .catch((err) => console.warn('Could not load dynamic GitHub profile info:', err));
  }, []);

  return (
    <section id="about" className="bg-[#121212] text-white py-32 px-6 md:px-24 relative z-20 overflow-hidden">
      {/* Decorative background grid effect to match premium developer aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-stretch">
          
          {/* Left Column - Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[45%] flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.08)] mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Open to Opportunities
            </div>

            {/* Glowing Avatar */}
            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-indigo-500 to-emerald-500 shadow-[0_0_30px_rgba(99,102,241,0.2)] group mb-6">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#121212] bg-[#1a1a1a]">
                <img
                  src={avatarUrl}
                  alt="Utsav Kumar Thakur"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to local profile image redirect
                    e.currentTarget.src = 'https://github.com/Utsav-Thakur.png';
                  }}
                />
              </div>
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Utsav Kumar Thakur
            </h1>

            {/* Typing Subtitle */}
            <div className="text-lg md:text-xl mt-2 min-h-[30px]">
              <TypingText />
            </div>

            {/* GitHub Bio */}
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mt-4 max-w-md">
              {bio}
            </p>

            {/* Social Pills */}
            <div className="flex flex-wrap gap-3 mt-8 w-full">
              <a
                href="https://github.com/Utsav-Thakur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current mr-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 fill-current mr-0.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:utsavkthakur.du@gmail.com"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 stroke-current fill-none mr-0.5" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email
              </a>
            </div>
          </motion.div>

          {/* Right Column - Detailed Biography */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/20 transition-all duration-500 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header window manager decoration */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-gray-500">about_me.md</span>
            </div>

            <div className="space-y-6 text-gray-300 font-light leading-relaxed text-base md:text-lg">
              <p>
                I am a <strong className="text-white font-semibold">Master of Operational Research</strong> candidate at the University of Delhi, dedicated to bridging the gap between advanced mathematical modeling and high-stakes business strategy.
              </p>
              <p>
                My work revolves around solving complex inefficiencies across <strong className="text-white font-semibold">Supply Chain, Finance, and Enterprise Operations</strong>. By engineering sophisticated Machine Learning models and applying metaheuristic optimizations like Genetic Algorithms, I transform raw, multi-dimensional data into quantitative, actionable insights.
              </p>
              <p>
                Whether I am minimizing logistical routing costs, assessing credit risk through predictive analytics, or optimizing capital allocation using MECE frameworks, my goal remains consistent: <strong className="text-white font-semibold">to drive performance, reduce operational error, and empower robust, data-driven decision-making</strong> at every level.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
