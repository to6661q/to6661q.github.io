import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import GlassCard from "@/components/portfolio/GlassCard";
import { Trophy, Star, Award, Target, Medal, Brain, ArrowRight, Loader2 } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

// Mapping icon name ke component
const ICON_MAP = { Star, Trophy, Award, Target, Medal, Brain };

// Helper: Format ISO date ke format "Month Year"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  if (!dateStr.includes("T")) return dateStr;
  
  try {
    const date = new Date(dateStr);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

export default function AchieveSection() {
  const shouldReduceMotion = useReducedMotion();
  const { data, loading } = usePortfolio();

  const achievements = data?.achievements?.items || [];
  const achievementLink = data?.achievements?.link || "#";

  return (
    <section id="achieve" className="py-4 sm:py-12" >
      <SectionHeader
        title="Achievement Highlights"
      />

      {/* Loading State */}
      {loading && achievements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          <p className="text-white/50 font-inter text-sm">Loading achievements data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && achievements.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Trophy className="w-12 h-12 text-white/20" />
          <div>
            <p className="text-white/60 font-inter text-sm font-semibold">Achievement data belum tersedia</p>
            <p className="text-white/40 font-inter text-xs mt-1">Tambahkan tab "achievements" di Google Sheets</p>
          </div>
        </div>
      )}

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {achievements.map((item, i) => {
          const IconComponent = ICON_MAP[item.icon] || Star;
          return (
            <GlassCard key={i} delay={i * 0.08} className="h-full">
              <div className="flex items-start gap-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#11a900]/20 to-[#16d100]/10 flex items-center justify-center shrink-0 border border-[#39FF14]/20 mt-1">
                  <IconComponent className="w-6 h-6 text-[#39FF14]" />
                </div>
                
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <h3 className="text-[16px] font-outfit font-bold text-white tracking-tight leading-snug truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[12px] text-white/50 font-inter truncate">
                      {item.publisher}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-[12px] text-[#39FF14]/80 font-inter font-medium whitespace-nowrap">
                      {formatDate(item.date)}
                    </span>
                  </div>

                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <a
          href={achievementLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group px-6 py-3 rounded-[16px] bg-gradient-to-r from-[#11a900]/10 to-[#16d100]/10 border border-[#39FF14]/30 text-[#39FF14] text-[14px] font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(17,169,0,0.2)] transition-all font-inter"
        >
          All Achievements
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}