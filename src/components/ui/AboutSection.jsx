import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import GlassPanel from '../shared/GlassPanel';

const fadeLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } } };
const fadeRight = { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: 'easeOut' } } };

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Image column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
          className="relative group"
        >
          {/* Decorative offset border */}
          <div className="absolute inset-0 border-2 border-brand-500/50 rounded-3xl translate-x-6 translate-y-6 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 duration-500 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop"
            alt="Elegant Event Setup by Guru Events"
            className="rounded-3xl relative z-10 w-full object-cover h-[500px] shadow-2xl contrast-110"
          />
          {/* Floating badge */}
          <div className="absolute bottom-8 -right-4 z-20">
            <GlassPanel className="px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-bold text-slate-900 dark:text-white text-sm">5-Star Rated</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">200+ Events Delivered</p>
              </div>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Text column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeRight}
        >
          <SectionHeading
            label="Our Story"
            title="Meet the creators of unforgettable moments."
            align="left"
          />

          <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg font-light leading-relaxed">
            Based in the heart of Kalani Nagar, Indore,{' '}
            <strong className="font-serif italic text-brand-600 dark:text-brand-400 text-xl">
              Guru Events
            </strong>{' '}
            was founded by <strong>Tushar</strong> and <strong>Adarsh Surve</strong> with a singular
            vision: to remove the stress from event planning and replace it with pure joy.
          </p>
          <p className="text-slate-600 dark:text-slate-300 mb-10 text-lg font-light leading-relaxed">
            Operating 24 hours a day, we pride ourselves on our relentless dedication. Whether
            it's a midnight venue adjustment or securing the perfect floral arrangement at dawn,
            our team is always on standby to ensure perfection.
          </p>

          {/* 24/7 card */}
          <GlassPanel className="p-6 flex items-center gap-5 max-w-sm">
            <div className="w-14 h-14 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white">Available 24/7</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-1">
                We work completely around your schedule.
              </p>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </section>
  );
}
