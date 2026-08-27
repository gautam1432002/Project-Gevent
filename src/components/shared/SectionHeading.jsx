import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/**
 * SectionHeading — animated label + headline combo used across all sections.
 * @param {string} label    - Small uppercase eyebrow text (gold)
 * @param {string} title    - Main section heading
 * @param {string} align    - 'center' | 'left' (default: 'center')
 */
export default function SectionHeading({ label, title, align = 'center' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <motion.div
      className={`flex flex-col ${alignment} mb-16`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <motion.span
        variants={itemVariants}
        className="text-brand-500 font-medium tracking-widest uppercase text-sm mb-3"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={itemVariants}
        className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={itemVariants}
        className={`w-24 h-0.5 bg-gradient-to-r from-brand-500 to-transparent mt-6 ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </motion.div>
  );
}
