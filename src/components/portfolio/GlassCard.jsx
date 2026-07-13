import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function GlassCard({ children, delay = 0, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={shouldReduceMotion ? {} : { y: -2 }}
      className={`rounded-[20px] p-6 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // ← 90% transparant (10% black)
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.15)', // ← Border sedikit lebih terang agar terlihat
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // ← Hover: 80% transparant
        e.currentTarget.style.borderColor = 'rgba(17, 169, 0, 0.5)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(17, 169, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // ← back to 90% transparan
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </motion.div>
  );
}