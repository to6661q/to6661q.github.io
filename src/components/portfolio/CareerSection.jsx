import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { Briefcase, Loader2 } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function CareerSection() {
  const shouldReduceMotion = useReducedMotion();
  const { data, loading } = usePortfolio();

  const careerData = data?.career || [];

  return (
    // ✅ Disamakan dengan section lain: py-16 sm:py-24 + scroll-mt-[100px]
    <section id="career" className="py-4 sm:py-12" >
      <SectionHeader
        title="Milestone Careers"
      />

      <div className="relative max-w-[900px] mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-[22px] sm:left-[28px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#11a900] via-[#11a900]/40 to-transparent" />

        {/* Loading State */}
        {loading && careerData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
            <p className="text-white/50 font-inter text-sm">Loading career data...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && careerData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <Briefcase className="w-12 h-12 text-white/20" />
            <div>
              <p className="text-white/60 font-inter text-sm font-semibold">Career data belum tersedia</p>
              <p className="text-white/40 font-inter text-xs mt-1">Tambahkan tab "career" di Google Sheets</p>
            </div>
          </div>
        )}

        {/* Career Items */}
        <div className="flex flex-col gap-8">
          {careerData.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 0 } : { x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pl-16 sm:pl-20"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[14px] sm:left-[20px] top-6 w-[18px] h-[18px] rounded-full bg-[#0A0A0A] border-2 border-[#39FF14] flex items-center justify-center z-10">
                <div className="w-[6px] h-[6px] rounded-full bg-[#39FF14]" />
              </div>

              {/* Career Card - 90% TRANSPARAN (Glassmorphism) */}
              <div
                className="rounded-[20px] overflow-hidden group transition-all duration-300"
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
                <div className="flex flex-col sm:flex-row gap-0">
                  <div className="flex-1 p-6">
                    <span className="text-[12px] text-[#39FF14] font-inter font-semibold tracking-wide">
                      {item.period}
                    </span>
                    <h3 className="text-[20px] font-outfit font-bold text-white mt-2 tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-3.5 h-3.5 text-white/40" />
                      <span className="text-[14px] text-white/50 font-inter">
                        {item.company}
                      </span>
                    </div>
                    <p className="text-justify text-[14px] text-white/60 leading-relaxed mt-3 font-inter">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Image */}
                  {item.image && (
                    <div className="sm:w-[200px] h-[140px] sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={`${item.company} workspace`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}