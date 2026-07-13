import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Bot, Brain, Database, Code, Shield, Palette 
} from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

const ICON_MAP = { Bot, Brain, Database, Code, Shield, Palette };

export default function SkillsGrid() {
  const shouldReduceMotion = useReducedMotion();
  const { data } = usePortfolio();

  const skills = data?.skills || [];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="mt-10"
    >
      <h3 className="text-[20px] sm:text-[24px] font-outfit font-bold text-white tracking-tight mb-6 text-center">
        Tech Stack & Skills
      </h3>      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {skills.map((cat, i) => {
          const IconComponent = ICON_MAP[cat.icon] || Bot;
          return (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              className="rounded-[16px] p-4 transition-all duration-300"
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
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 text-[#39FF14]" />
                </div>
                <h4 className="text-[11px] sm:text-[12px] font-outfit font-bold text-[#39FF14] tracking-tight leading-tight flex-1">
                  {cat.title}
                </h4>
              </div>
              <ul className="flex flex-col gap-1.5">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-[11px] sm:text-[12px] text-white/60 font-inter leading-relaxed flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#39FF14]/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}