import React, { useEffect, useRef } from 'react';
import { useScrollProgress, usePointerNormalized } from './hooks/useScrollProgress';
import { useTheme } from './context/ThemeContext';

// Canvas
import Scene from './components/canvas/Scene';

// UI Sections
import Navbar         from './components/ui/Navbar';
import HeroSection    from './components/ui/HeroSection';
import AboutSection   from './components/ui/AboutSection';
import ServicesSection from './components/ui/ServicesSection';
import GallerySection from './components/ui/GallerySection';
import ContactSection from './components/ui/ContactSection';

export default function App() {
  const scrollProgress = useScrollProgress();
  const pointer        = usePointerNormalized();
  const { isDark }     = useTheme();

  return (
    <div
      className={`relative min-h-screen antialiased overflow-x-hidden
        ${isDark
          ? 'bg-[#0b0f19] text-slate-200'
          : 'bg-[#fcfaf5] text-slate-800'
        }`}
    >
      {/* ── Noise overlay ─────────────────────────────────────── */}
      <div className="noise-bg" aria-hidden="true" />

      {/* ── Ambient glow blobs ─────────────────────────────────── */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-float
          ${isDark ? 'bg-brand-900/10' : 'bg-brand-100/60'}`}
        />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-float-delayed
          ${isDark ? 'bg-rose-900/10' : 'bg-rose-100/40'}`}
        />
      </div>

      {/* ── 3D Canvas — fixed, full viewport, behind HTML ──────── */}
      <div
        className="fixed inset-0 z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        <Scene scrollProgress={scrollProgress} pointer={pointer} />
      </div>

      {/* ── HTML UI — scrollable overlay ────────────────────────── */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <GallerySection />
          <ContactSection />
        </main>
      </div>
    </div>
  );
}
