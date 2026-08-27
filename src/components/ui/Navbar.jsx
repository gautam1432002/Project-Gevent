import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

// Sun icon SVG
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// Moon icon SVG
const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const NAV_LINKS = [
  { href: '#about',    label: 'About'    },
  { href: '#services', label: 'Services' },
  { href: '#gallery',  label: 'Gallery'  },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${
        scrolled
          ? 'glass-panel shadow-sm'
          : 'bg-transparent border-b-0 shadow-none'
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex-shrink-0 flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-serif text-2xl font-bold tracking-widest text-slate-900 dark:text-white uppercase">
              Guru
              <span className="text-brand-500 font-light italic ml-1">Events</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-widest uppercase font-medium text-slate-600 dark:text-slate-300 hover:text-brand-500 dark:hover:text-brand-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Theme toggle */}
            <button
              id="themeToggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-600 dark:text-amber-400"
            >
              <motion.div
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </motion.div>
            </button>

            {/* CTA */}
            <a
              href="#contact"
              id="navCta"
              className="px-7 py-3 bg-slate-900 dark:bg-brand-500 text-white text-sm uppercase tracking-widest font-semibold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Inquire Now
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg glass-panel"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel mx-4 mb-4 rounded-2xl p-6 space-y-4"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-sm tracking-widest uppercase font-medium text-slate-700 dark:text-slate-300 hover:text-brand-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-amber-400">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2.5 bg-slate-900 dark:bg-brand-500 text-white text-sm uppercase tracking-widest rounded-full"
            >
              Inquire Now
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
