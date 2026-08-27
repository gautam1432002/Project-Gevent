import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassPanel from '../shared/GlassPanel';
import { submitInquiry } from '../../utils/apiTemplates';

const EVENT_TYPES = [
  'Wedding',
  'Engagement Ceremony',
  'Sangeet / Mehendi',
  'Reception',
  'Corporate Event',
  'Other',
];

const INITIAL_FORM = {
  name:      '',
  email:     '',
  phone:     '',
  eventDate: '',
  eventType: '',
  message:   '',
};

const formVariants = {
  hidden:  { opacity: 0, x: 50  },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: 'easeOut' } },
};

const contactVariants = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.9, ease: 'easeOut' } },
};

export default function ContactSection() {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [status, setStatus]   = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  // ── Pre-fill from URL params (e.g., from a campaign link) ─────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setForm(prev => ({
      ...prev,
      name:      params.get('name')      || prev.name,
      email:     params.get('email')     || prev.email,
      eventType: params.get('eventType') || prev.eventType,
      eventDate: params.get('eventDate') || prev.eventDate,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      // Calls POST /api/inquiries — wire to your backend
      await submitInquiry(form);
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      // Reset after 4 s so user can retry
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass =
    'w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 backdrop-blur-sm text-sm';

  return (
    <section id="contact" className="pt-24 pb-12 border-t border-brand-500/20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[100px] -z-10 translate-x-1/4 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-start">

          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={contactVariants}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-slate-900 dark:text-white leading-tight">
              Let's start <br />planning.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 text-xl font-light">
              Reach out to Tushar &amp; Adarsh Surve. Your dreamland is just a conversation away.
            </p>

            <div className="space-y-8">
              {/* Phone */}
              <a href="tel:07000701232" className="flex items-center group" id="contactPhone">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center mr-6 group-hover:bg-brand-500 group-hover:scale-110 transition-all duration-300 shrink-0">
                  <svg className="w-6 h-6 text-brand-600 dark:text-brand-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm tracking-widest text-slate-500 uppercase mb-1">Direct Line</p>
                  <span className="font-serif font-bold text-xl text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                    070007 01232&nbsp;
                    <span className="text-slate-300 dark:text-slate-700 font-sans font-light">/</span>
                    &nbsp;070008 72379
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start" id="contactLocation">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center mr-6 shrink-0">
                  <svg className="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="mt-1">
                  <p className="text-sm tracking-widest text-slate-500 uppercase mb-1">Location</p>
                  <span className="text-slate-700 dark:text-slate-300 text-lg font-light leading-relaxed">
                    Bholenath Colony, 109, Airport Rd,<br />
                    near Dargah, Kalani Nagar, Indore
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
          >
            <GlassPanel className="p-8 md:p-10 relative overflow-hidden">
              <h3 className="font-serif text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                Send an Inquiry
              </h3>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      Inquiry Received!
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 font-light">
                      Tushar or Adarsh will be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-8 px-6 py-3 glass-panel rounded-full text-sm text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
                    >
                      Send another →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    id="inquiryForm"
                  >
                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass}
                      id="fieldName"
                    />

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className={inputClass}
                        id="fieldEmail"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className={inputClass}
                        id="fieldPhone"
                      />
                    </div>

                    {/* Event date */}
                    <input
                      type="date"
                      name="eventDate"
                      required
                      value={form.eventDate}
                      onChange={handleChange}
                      className={inputClass}
                      id="fieldDate"
                    />

                    {/* Event type */}
                    <select
                      name="eventType"
                      required
                      value={form.eventType}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      id="fieldEventType"
                    >
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    {/* Message */}
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your dream event…"
                      className={`${inputClass} resize-none`}
                      id="fieldMessage"
                    />

                    {/* Error */}
                    {status === 'error' && (
                      <p className="text-sm text-red-500 font-light">{errorMsg}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      id="submitInquiry"
                      className="w-full py-5 bg-slate-900 dark:bg-brand-500 text-white rounded-2xl font-medium tracking-wide hover:bg-brand-600 dark:hover:bg-brand-600 transition-colors shadow-xl text-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        'Request Consultation'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </GlassPanel>
          </motion.div>

        </div>

        {/* Footer bar */}
        <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 font-light gap-4">
          <p>© 2026 Guru Events. All rights reserved.</p>
          <div className="flex space-x-8">
            <a href="https://instagram.com/tushar.surve5" target="_blank" rel="noopener noreferrer"
              className="hover:text-brand-500 transition-colors">@tushar.surve5</a>
            <a href="https://instagram.com/adarsh.surve" target="_blank" rel="noopener noreferrer"
              className="hover:text-brand-500 transition-colors">@adarsh.surve</a>
          </div>
        </div>
      </div>
    </section>
  );
}
