'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 md:gap-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`text-sm font-medium transition-colors duration-300 relative ${
              activeSection === item.href.substring(1) 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.name}
            {activeSection === item.href.substring(1) && (
              <motion.div 
                layoutId="activeTab"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full"
              />
            )}
          </a>
        ))}
      </nav>
    </motion.div>
  );
}
