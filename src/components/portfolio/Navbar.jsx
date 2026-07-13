import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Bot, ArrowRight, Menu, X } from "lucide-react";

const NAV_LINKS = ["Home", "About", "Career", "Achieve", "License", "Project"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const shouldReduceMotion = useReducedMotion();

  // Scroll effect untuk navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver untuk detect section aktif
  useEffect(() => {
    const observers = [];

    NAV_LINKS.forEach((link) => {
      const sectionId = link.toLowerCase();
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(link);
            }
          });
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    
    if (id === "Home") {
      // Scroll ke paling atas (seperti refresh)
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll ke section tertentu
      const el = document.getElementById(id.toLowerCase());
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={shouldReduceMotion ? {} : { y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          activeSection === "Home" && !scrolled
            ? "bg-black/20 backdrop-blur-sm"
            : "backdrop-blur-xl bg-black/60 border-b border-white/10"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-8">
            {/* Brand */}
            <button 
              onClick={() => scrollTo("Home")} 
              className="text-[22px] sm:text-[24px] tracking-tight text-white flex items-center gap-2 font-fustat font-extrabold shrink-0"
            >
              <Bot className="w-8 h-8 text-[#39FF14]" />
              to.riq
            </button>
            
            {/* Desktop Links - TEKS PUTIH PENUH */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`text-[14px] font-medium transition-colors font-inter ${
                    activeSection === link
                      ? "text-[#39FF14]"
                      : "text-white hover:text-[#39FF14]"
                  }`}
                >
                  {link}
                </button>
              ))}
            </div>

            {/* CTA - Let's Connect! */}
            <button
              onClick={() => scrollTo("Contact")}
              className="hidden sm:flex group h-9 px-5 rounded-[12px] bg-[#39FF14]/10 hover:bg-[#39FF14]/20 border border-[#39FF14]/30 text-[14px] font-semibold items-center gap-2 text-[#39FF14] transition-all hover:shadow-[0_0_20px_rgba(17,169,0,0.3)]"
            >
              Let's Connect!
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle - BONUS: IKON HAMBURGER LEBIH JELAS */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white hover:text-[#39FF14] transition-all rounded-lg hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay - TRANSPARAN 40% */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            
            {/* Drawer Container - TRANSPARAN 50% */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-black/50 backdrop-blur-xl border-l border-white/15 z-50 flex flex-col pt-24 px-4 gap-2 md:hidden"
            >
              {/* Menu Links - TEKS PUTIH PENUH & CENTER */}
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={shouldReduceMotion ? {} : { x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link)}
                  className={`w-full text-[16px] font-medium transition-all py-4 border-b border-white/5 min-h-[52px] flex items-center justify-center rounded-lg ${
                    activeSection === link
                      ? "text-[#39FF14] bg-[#39FF14]/10"
                      : "text-white hover:text-[#39FF14] hover:bg-white/5"
                  }`}
                >
                  {link}
                </motion.button>
              ))}
              
              {/* Mobile CTA Button */}
              <button
                onClick={() => scrollTo("Contact")}
                className="mt-6 h-12 px-5 rounded-[12px] bg-[#39FF14]/10 border border-[#39FF14]/30 text-[14px] font-semibold flex items-center justify-center gap-2 text-[#39FF14] hover:bg-[#39FF14]/20 hover:shadow-[0_0_20px_rgba(17,169,0,0.3)] transition-all"
              >
                Let's Connect!
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}