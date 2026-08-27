import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Eyebrow badge */}
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm">
              <p className="text-brand-600 dark:text-brand-400 font-serif italic text-sm md:text-base tracking-wide">
                Indore's Premier Event Planners
              </p>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.05]"
          >
            We turn your venue{' '}
            <br className="hidden md:block" />
            <span className="text-metallic">into your dreamland.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-10 font-light leading-relaxed"
          >
            From intimate gatherings to grand celebrations, our 24/7 dedicated team
            ensures your special day is executed with flawless elegance.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a
              href="#contact"
              id="heroCta"
              className="group px-8 py-4 bg-slate-900 dark:bg-brand-500 text-white rounded-full font-medium tracking-wider hover:bg-brand-600 dark:hover:bg-brand-600 transition-colors duration-300 text-center shadow-2xl flex items-center justify-center"
            >
              Start Planning
              <svg
                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#gallery"
              id="heroPortfolio"
              className="px-8 py-4 glass-panel rounded-full font-medium tracking-wider hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 text-center text-slate-900 dark:text-white"
            >
              View Portfolio
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-700/30"
          >
            {[
              { num: '200+', label: 'Events crafted' },
              { num: '24/7', label: 'Team availability' },
              { num: '5★',   label: 'Client rating'   },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
                  {stat.num}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-0.5 h-10 bg-gradient-to-b from-brand-500 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
