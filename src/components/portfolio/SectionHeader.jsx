import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SectionHeader({ label, title, description }) {
  const shouldReduceMotion = useReducedMotion();
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const sectionRef = useRef(null);

  // Fungsi untuk memulai typing ulang
  const startTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setDisplayedTitle("");
    setIsTyping(true);

    let i = 0;
    const typeNextChar = () => {
      if (i <= title.length) {
        setDisplayedTitle(title.slice(0, i));
        i++;
        typingTimeoutRef.current = setTimeout(typeNextChar, 80); // Kecepatan ketik
      } else {
        setIsTyping(false);
      }
    };

    typeNextChar();
  };

  // IntersectionObserver untuk detect saat section terlihat
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedTitle(title);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
          } else {
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
              typingTimeoutRef.current = null;
            }
            setIsTyping(false);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    // Observe parent section (cari section terdekat)
    const parentSection = sectionRef.current?.closest("section");
    if (parentSection) {
      observer.observe(parentSection);
    }

    return () => {
      observer.disconnect();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [shouldReduceMotion, title]);

  // Blinking cursor effect
  useEffect(() => {
    if (shouldReduceMotion) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [shouldReduceMotion]);

  return (
    <motion.div
      ref={sectionRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="text-center mb-6"
    >
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 text-[#39FF14] text-[12px] font-semibold tracking-wide uppercase mb-4 font-inter">
          {label}
        </span>
      )}

      {/* Title dengan Typing Effect */}
      <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-outfit font-black tracking-[-2px] leading-[1.1] text-white min-h-[60px]">
        {displayedTitle}
        {isTyping && (
          <span
            className={`inline-block w-[3px] h-[40px] bg-[#39FF14] ml-1 align-middle ${
              showCursor ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          />
        )}
      </h2>

      {description && (
        <p className="text-white/50 text-[16px] sm:text-[18px] mt-4 max-w-[600px] mx-auto leading-relaxed font-inter">
          {description}
        </p>
      )}
    </motion.div>
  );
}