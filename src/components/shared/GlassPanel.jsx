import React from 'react';

/**
 * GlassPanel — reusable glassmorphism card wrapper.
 * Inherits .glass-panel from index.css (dark mode aware).
 */
export default function GlassPanel({ children, className = '', style = {} }) {
  return (
    <div className={`glass-panel rounded-3xl ${className}`} style={style}>
      {children}
    </div>
  );
}
