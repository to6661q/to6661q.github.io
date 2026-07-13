import React from "react";
import { Bot, Heart, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-4 mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <p className="text-[13px] text-white/40 font-inter flex items-center gap-1.5 flex-wrap justify-center">
          @2026 Directed by{" "}
          <a
            href="mailto:toriqnain@gmail.com"
            className="text-[#39FF14] hover:underline font-medium"
          >
            toriqnain@gmail.com
          </a>
          {" "}ft. aMEOWicano{" "}
          <Coffee className="w-3 h-3 text-white/50 inline" />
        </p>
      </div>
    </footer>
  );
}