import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import GlassCard from "@/components/portfolio/GlassCard";
import { 
  Bot, Brain, Database, Code, Shield, Palette, 
  ShieldCheck, ArrowRight, Loader2 
} from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

const ICON_MAP = { 
  Bot, 
  Brain, 
  Database, 
  Code, 
  Shield, 
  Palette,
  ShieldCheck 
};

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

export default function LicenseSection() {
  const shouldReduceMotion = useReducedMotion();
  const { data, loading } = usePortfolio();

  const licenses = data?.licenses?.items || [];
  const licenseLink = data?.licenses?.link || "#";

  return (
    <section id="license" className="py-4 sm:py-12">
      <SectionHeader title="Professional Licenses and Certifications" />

      {/* Loading State */}
      {loading && licenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          <p className="text-white/50 font-inter text-sm">Loading certifications data...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && licenses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <ShieldCheck className="w-12 h-12 text-white/20" />
          <div>
            <p className="text-white/60 font-inter text-sm font-semibold">Data license is NULL</p>
            <p className="text-white/40 font-inter text-xs mt-1">Add "licenses" at Google Sheets</p>
          </div>
        </div>
      )}

      {/* Licenses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {licenses.map((item, i) => {
          // Normalisasi nama icon (trim spasi & capitalize huruf pertama)
          const iconRaw = item.icon?.trim() || '';
          const iconKey = iconRaw.charAt(0).toUpperCase() + iconRaw.slice(1).toLowerCase();
          
          // Cari icon di ICON_MAP. Jika tidak ada, fallback ke ShieldCheck
          const IconComponent = ICON_MAP[iconKey] || ShieldCheck;
          
          return (
            <GlassCard key={i} delay={i * 0.05}>
              <div className="flex items-center gap-4">
                {/* Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-[#39FF14]/10 flex items-center justify-center shrink-0 border border-[#39FF14]/15">
                  <IconComponent className="w-5 h-5 text-[#39FF14]" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-outfit font-bold text-white tracking-tight leading-tight truncate">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[12px] text-[#39FF14]/80 font-inter font-medium whitespace-nowrap">
                      {formatDate(item.date)}
                    </span>
                    <span className="text-white/20">·</span>
                    <span className="text-[12px] text-white/50 font-inter truncate">
                      {item.publisher}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* View More Button */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-10"
      >
        <a
          href={licenseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group px-6 py-3 rounded-[16px] bg-gradient-to-r from-[#11a900]/10 to-[#16d100]/10 border border-[#39FF14]/30 text-[#39FF14] text-[14px] font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(17,169,0,0.2)] transition-all font-inter"
        >
          View more Licenses
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
}