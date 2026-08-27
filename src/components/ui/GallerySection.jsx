import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { portfolioData } from '../../utils/portfolioData';
// import { fetchPortfolio } from '../../utils/apiTemplates'; // ← Uncomment when backend is ready

const imageVariants = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function GallerySection() {
  // State ready to be populated from API
  const [portfolio, setPortfolio] = useState(portfolioData);
  const [loading, setLoading]     = useState(false);

  // ── API hook — wire up when backend is ready ─────────────────────
  useEffect(() => {
    // Uncomment the block below to fetch from your backend:
    //
    // const load = async () => {
    //   setLoading(true);
    //   try {
    //     const data = await fetchPortfolio();
    //     setPortfolio(data);
    //   } catch (err) {
    //     console.error('Portfolio fetch failed, using fallback data:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // load();
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 bg-[#0a0a0a] text-white relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
              Recent Realities
            </h2>
            <p className="text-slate-400 mt-4 font-light text-lg">
              A glimpse into the dreamlands we've created.
            </p>
          </motion.div>

          <motion.a
            href="https://instagram.com/tushar.surve5"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 text-sm tracking-widest uppercase hover:text-brand-500 transition-colors group"
          >
            Follow on Instagram
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.a>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {/* Tall card — first item */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
            className="col-span-2 md:col-span-1 row-span-2 rounded-[2rem] overflow-hidden group relative h-[400px] md:h-[610px] shadow-2xl"
            id="gallery-item-0"
          >
            <img
              src={portfolio[0]?.src}
              alt={portfolio[0]?.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 contrast-110"
            />
            <div className="absolute inset-0 img-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <p className="text-white font-serif text-lg">{portfolio[0]?.alt}</p>
            </div>
          </motion.div>

          {/* Normal cards — items 1–3 */}
          {portfolio.slice(1, 4).map((item, i) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ ...imageVariants, visible: { ...imageVariants.visible, transition: { duration: 0.7, delay: (i + 1) * 0.1 } } }}
              className={`rounded-[2rem] overflow-hidden group relative shadow-2xl ${
                item.span === 'wide' ? 'col-span-2' : ''
              } h-[200px] md:h-[290px]`}
              id={`gallery-item-${i + 1}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 contrast-110"
              />
              <div className="absolute inset-0 img-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-serif text-sm">{item.alt}</p>
              </div>
            </motion.div>
          ))}

          {/* Wide card — item 4 */}
          {portfolio[4] && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ ...imageVariants, visible: { ...imageVariants.visible, transition: { duration: 0.7, delay: 0.4 } } }}
              className="col-span-2 rounded-[2rem] overflow-hidden group relative h-[250px] md:h-[290px] shadow-2xl"
              id="gallery-item-4"
            >
              <img
                src={portfolio[4].src}
                alt={portfolio[4].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 contrast-110"
              />
              <div className="absolute inset-0 img-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white font-serif text-lg">{portfolio[4].alt}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
