import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { servicesList } from '../../utils/portfolioData';

// Icon components
const icons = {
  rings: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  people: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  calendar: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading label="Our Expertise" title="Crafted to Perfection" />

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:auto-rows-[300px]">

        {/* ── Featured card (2×2) ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="md:col-span-2 md:row-span-2 rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/20 dark:border-white/5"
          id="service-featured"
          style={{ minHeight: '300px' }}
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop"
            alt="Complete Wedding Planning"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 contrast-110"
          />
          <div className="absolute inset-0 img-overlay" />
          <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white">
            <span className="text-brand-400 font-medium tracking-widest uppercase text-sm mb-3">
              Full Service
            </span>
            <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 drop-shadow-xl leading-tight">
              Complete <br />Wedding Planning
            </h3>
            <p className="text-slate-200 font-light max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-lg">
              From concept to send-off — we handle every intricate detail with flawless precision.
            </p>
          </div>
        </motion.div>

        {/* ── Wide card (2×1) ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ ...cardVariants, visible: { ...cardVariants.visible, transition: { duration: 0.7, ease: 'easeOut', delay: 0.1 } } }}
          className="md:col-span-2 rounded-[2rem] overflow-hidden relative group cursor-pointer shadow-xl glass-panel p-8 md:p-10 flex items-center"
          id="service-venue"
        >
          <div className="relative w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                Venue Styling
              </h3>
              <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:rotate-45 transition-transform duration-500 shrink-0">
                {icons.sparkles}
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-light text-lg">
              Bespoke floral arrangements, luxury lighting, and thematic designs that transform any space.
            </p>
          </div>
        </motion.div>

        {/* ── Small card 1 (1×1) ──────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ ...cardVariants, visible: { ...cardVariants.visible, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } } }}
          className="rounded-[2rem] glass-panel p-8 flex flex-col justify-center items-center text-center shadow-xl group cursor-pointer"
          id="service-vendor"
        >
          <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white mx-auto flex items-center justify-center mb-5 group-hover:bg-brand-500 dark:group-hover:bg-brand-500 transition-colors duration-500 shadow-lg text-white dark:text-slate-900 group-hover:text-white">
            {icons.people}
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white font-serif">
            Vendor Curation
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
            Access our elite network of caterers and artists.
          </p>
        </motion.div>

        {/* ── Small card 2 (1×1) ──────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ ...cardVariants, visible: { ...cardVariants.visible, transition: { duration: 0.7, ease: 'easeOut', delay: 0.3 } } }}
          className="rounded-[2rem] glass-panel p-8 flex flex-col justify-center items-center text-center shadow-xl group cursor-pointer"
          id="service-logistics"
        >
          <div className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white mx-auto flex items-center justify-center mb-5 group-hover:bg-brand-500 dark:group-hover:bg-brand-500 transition-colors duration-500 shadow-lg text-white dark:text-slate-900 group-hover:text-white">
            {icons.calendar}
          </div>
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white font-serif">
            Event Logistics
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
            Seamless timeline management and coordination.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
