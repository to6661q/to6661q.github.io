import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function FloatingBadge({ icon: Icon, title, subtitle, floatY = 8, floatX = 2, duration = 5, delay = 0.6, hoverRotate = 1, className = "", gradientFrom = "#11a900", gradientTo = "#0d8200" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 100, delay }}
      className={`absolute pointer-events-auto ${className}`}
    >
      <motion.div
        animate={shouldReduceMotion ? {} : {
          y: [-floatY, floatY, -floatY],
          x: [-floatX, floatX, -floatX],
        }}
        transition={shouldReduceMotion ? {} : {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: hoverRotate }}
        className="px-5 py-3 rounded-[20px] flex items-center gap-3 bg-gradient-to-br from-black/60 backdrop-blur-xl border border-white/[0.08] hover:border-[#39FF14]/30 hover:bg-black/70 transition-all duration-300 ring-1 ring-white/5 cursor-default"
        style={{
          boxShadow: "0 12px 32px -4px rgba(57,255,20,0.12), inset 0 2.5px 4px rgba(57,255,20,0.1)",
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 4px 12px rgba(57,255,20,0.3)`,
          }}
        >
          <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[13px] text-white tracking-tight font-inter font-black">{title}</span>
          <span className="text-[10px] text-neutral-400 mt-0.5 font-inter font-semibold">{subtitle}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}