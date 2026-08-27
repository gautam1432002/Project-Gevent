/**
 * ─────────────────────────────────────────────────────────────────────────────
 * API UTILITY TEMPLATES — Guru Events
 * ─────────────────────────────────────────────────────────────────────────────
 * These are ready-to-wire fetch wrappers.
 * Replace BASE_URL with your Django / Flask / Spring Boot server origin.
 * All functions return a Promise resolving to parsed JSON.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

/**
 * POST /api/inquiries
 * @param {{ name: string, email: string, phone: string, eventDate: string, eventType: string, message: string }} formData
 * @returns {Promise<{ id: string, status: string }>}
 */
export const submitInquiry = async (formData) => {
  const response = await fetch(`${BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
};

/**
 * GET /api/portfolio
 * @returns {Promise<PortfolioItem[]>}
 *
 * PortfolioItem shape:
 * {
 *   id:       string,
 *   src:      string,  // image URL
 *   alt:      string,
 *   category: string,  // 'wedding' | 'engagement' | 'corporate'
 *   date:     string,  // ISO date
 *   featured: boolean,
 * }
 */
export const fetchPortfolio = async () => {
  const response = await fetch(`${BASE_URL}/portfolio`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};

/**
 * GET /api/services
 * @returns {Promise<Service[]>}
 */
export const fetchServices = async () => {
  const response = await fetch(`${BASE_URL}/services`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
};
