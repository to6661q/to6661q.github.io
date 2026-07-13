import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText } from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";
import { convertToDriveViewerUrl, isGoogleDriveUrl } from "@/utils/googleDrive";

const LINE_1 = "Bye bye MEOWnual";
const LINE_2 = "Hello MEOWtomation";

export default function HeroLeft() {
  const { data } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const startTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setDisplayedLine1("");
    setDisplayedLine2("");
    setIsTyping(true);

    let i = 0;
    let currentLine = 1;

    const typeNextChar = () => {
      if (currentLine === 1) {
        if (i <= LINE_1.length) {
          setDisplayedLine1(LINE_1.slice(0, i));
          i++;
          typingTimeoutRef.current = setTimeout(typeNextChar, 100);
        } else {
          currentLine = 2;
          i = 0;
          typingTimeoutRef.current = setTimeout(typeNextChar, 300);
        }
      } else {
        if (i <= LINE_2.length) {
          setDisplayedLine2(LINE_2.slice(0, i));
          i++;
          typingTimeoutRef.current = setTimeout(typeNextChar, 100);
        } else {
          setIsTyping(false);
        }
      }
    };

    typeNextChar();
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayedLine1(LINE_1);
      setDisplayedLine2(LINE_2);
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
      { threshold: 0.3 }
    );

    const homeSection = document.getElementById("home");
    if (homeSection) {
      observer.observe(homeSection);
    }

    return () => {
      observer.disconnect();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [shouldReduceMotion]);

  const fadeUp = shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } };

  const renderTextWithHighlight = (text) => {
    const parts = text.split(/(MEOW)/g);
    return parts.map((part, index) =>
      part === "MEOW" ? (
        <span key={index} className="text-[#39FF14]">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const showCursorLine1 = isTyping && displayedLine1.length < LINE_1.length;
  const showCursorLine2 = 
    isTyping && 
    displayedLine1.length === LINE_1.length && 
    displayedLine2.length < LINE_2.length;

  const buttons = data?.hero?.buttons || [
    { text: "resume.pdf", url: "#" },
    { text: "portfolio.pdf", url: "#" }
  ];

  const handleButtonClick = (e, url) => {
    if (isGoogleDriveUrl(url)) {
      e.preventDefault();
      const viewerUrl = convertToDriveViewerUrl(url);
      const width = 900;
      const height = 700;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      window.open(
        viewerUrl,
        'DriveViewer',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      );
    }
  };

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right max-w-full lg:max-w-[1000px] lg:pl-9"
    >
      {/*  Main Heading - UKURAN SAMA DENGAN "Little bit about me" */}
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] tracking-[-1px] lg:tracking-[-2px] mt-6 lg:mt-9 select-none text-white font-outfit font-black">
        <span className="block mb-2 lg:mb-2 lg:whitespace-nowrap">
          {renderTextWithHighlight(displayedLine1)}
          {showCursorLine1 && (
            <span
              className={`inline-block w-[3px] lg:w-[4px] h-[28px] lg:h-[40px] bg-[#39FF14] ml-1 lg:ml-2 ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            />
          )}
        </span>
        <span className="block lg:whitespace-nowrap">
          {renderTextWithHighlight(displayedLine2)}
          {showCursorLine2 && (
            <span
              className={`inline-block w-[3px] lg:w-[4px] h-[28px] lg:h-[40px] bg-[#39FF14] ml-1 lg:ml-2 ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            />
          )}
        </span>
      </h1>

      {/*  Buttons - LEBIH KECIL (padding & font size diperkecil) */}
      <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-3 lg:gap-5 justify-center lg:justify-end">
        {buttons.map((btn, i) => {
          const finalUrl = isGoogleDriveUrl(btn.url) 
            ? convertToDriveViewerUrl(btn.url) 
            : btn.url || "#";
          
          return (
            <motion.a
              key={i}
              href={finalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleButtonClick(e, btn.url)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className={
                i === 0
                  ? "group pl-4 pr-5 py-2 lg:pl-6 lg:pr-6 lg:py-2.5 rounded-[12px] lg:rounded-[14px] bg-[#39FF14] hover:bg-[#29B800] text-black flex items-center gap-2 lg:gap-3 text-[13px] lg:text-[16px] font-bold transition-all font-inter"
                  : "px-4 py-2 lg:px-6 lg:py-2.5 rounded-[12px] lg:rounded-[14px] bg-white/5 hover:bg-white/10 border border-[#39FF14]/50 text-[#39FF14] flex items-center gap-2 lg:gap-3 text-[13px] lg:text-[16px] font-bold transition-all font-inter"
              }
              style={
                i === 0
                  ? {
                      boxShadow: "inset 0px 3px 3px 0px rgba(0,0,0,0.35), 0 8px 20px -5px rgba(57, 255, 20, 0.25)",
                    }
                  : {}
              }
              title={isGoogleDriveUrl(btn.url) ? "View in Google Drive Viewer" : ""}
            >
              <FileText className={`w-4 h-4 lg:w-5 lg:h-5 ${i === 0 ? 'text-black/60' : ''}`} />
              <span className={i === 0 ? 'text-black/70' : ''}>
                {btn.text}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}