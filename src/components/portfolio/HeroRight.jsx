import React, { useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Bot, Rocket, Zap } from "lucide-react";
import FloatingBadge from "@/components/portfolio/FloatingBadge";

const CAT_GIF = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3I2cTJzaTlwajdhZjRiMTdienE4bjRoYzhoMDlvdW1pcGthNHNmYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aGi9s6PaU2ChOnhBFs/giphy.gif";

export default function HeroRight() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Cursor-following rotation for the GIF
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 100, damping: 20 });
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });

  // Parallax for badges
  const badgeX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
  const badgeY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });
  const badgeX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
  const badgeY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="relative w-full flex items-center justify-center lg:justify-start py-10"
    >
      {/* Ambient Aura - Responsive */}
      <div className="absolute top-[20%] left-[15%] w-[200px] h-[200px] lg:w-[420px] lg:h-[420px] bg-[#39FF14]/15 rounded-full blur-[110px] -z-10 animate-pulse" style={{ animationDuration: "7s" }} />

      {/* Orbital Rings - Responsive */}
      <div className="absolute w-[300px] h-[300px] lg:w-[620px] lg:h-[620px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] -z-10 opacity-35 pointer-events-none">
        <svg viewBox="0 0 620 620" className="w-full h-full">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39FF14" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#29B800" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx="310" cy="310" r="200" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" strokeDasharray="8 12" />
          <circle cx="310" cy="310" r="270" fill="none" stroke="url(#orbitGrad)" strokeWidth="0.5" strokeDasharray="4 16" />
        </svg>
      </div>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 800 }}
        className="relative w-[250px] h-[250px] lg:w-[500px] lg:h-[500px] flex-shrink-0"
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            x: shouldReduceMotion ? 0 : translateX,
            y: shouldReduceMotion ? 0 : translateY,
          }}
          className="w-full h-full rounded-[16px] lg:rounded-[24px] border-2 border-[#39FF14] overflow-hidden shadow-[0_0_30px_rgba(57,255,20,0.3)]"
        >
          <img
            src={CAT_GIF}
            alt="Binary code cat animation"
            className="w-full h-full object-cover select-none block"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}