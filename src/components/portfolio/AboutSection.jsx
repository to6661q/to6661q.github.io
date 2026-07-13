import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import SkillsGrid from "@/components/portfolio/SkillsGrid";
import { Loader2 } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const { data, loading } = usePortfolio();

  const about = data?.about;
  const stats = data?.about?.stats || [];

  return (
    <section id="about" className="py-4 sm:py-12">
      <SectionHeader title="Little bit about me" />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          <p className="text-white/50 font-inter text-sm">Loading about data...</p>
        </div>
      )}

      {/* Empty State (Jika data tidak ditemukan setelah loading selesai) */}
      {!loading && !about && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <p className="text-white/60 font-inter text-sm font-semibold">About data is unavailable</p>
          <p className="text-white/40 font-inter text-xs mt-1">Please check your Google Sheets "about" tab</p>
        </div>
      )}

      {/*  Main Content (Hanya muncul jika sudah selesai loading dan data ada) */}
      {!loading && about && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Description Card - 90% TRANSPARAN */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="rounded-[20px] p-8 flex flex-col justify-center transition-all duration-300"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(17, 169, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              <p className="text-justify text-white/70 text-[15px] sm:text-[16px] leading-relaxed font-inter">
                {about.description}
                <span className="text-white font-semibold">{about.highlightName}</span>
                {about.descriptionAfter}
              </p>
            </motion.div>

            {/* Stats 2x2 Grid - 90% TRANSPARAN */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  className="rounded-[20px] p-6 flex flex-col items-center justify-center text-center transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(17, 169, 0, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  }}
                >
                  <span className="text-[24px] sm:text-[32px] lg:text-[40px] font-outfit font-black text-[#39FF14] tracking-tight leading-none">
                    {String(stat.value)}
                  </span>
                  <span className="text-[13px] sm:text-[14px] text-white/50 font-inter mt-2">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <SkillsGrid />
        </>
      )}
    </section>
  );
}