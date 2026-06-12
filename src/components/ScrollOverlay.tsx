'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

export default function ScrollOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Section 1: 0% to 10% (fades out completely by 20%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: fades in at 25%, full at 35%, out at 55%
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.25, 0.55], [-50, 0]); // Parallax slide in

  // Section 3: fades in at 60%, full at 70%, out at 90%
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.7, 0.8, 0.9], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);

  return (
    <div key="overlay-v2" className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center text-white px-8 md:px-24">
      {/* Section 1 */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 drop-shadow-lg">
          Utsav Kumar Thakur
        </h1>
        <p className="text-xl md:text-3xl font-light tracking-wide text-gray-300 drop-shadow-md">
          Data Analytics & Machine Learning.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ opacity: opacity2, x: x2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold max-w-2xl drop-shadow-lg leading-tight">
          I build data-driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">solutions</span>.
        </h2>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ opacity: opacity3, x: x3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold max-w-2xl drop-shadow-lg leading-tight">
          Bridging analytics and <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">strategy</span>.
        </h2>
      </motion.div>
    </div>
  );
}
