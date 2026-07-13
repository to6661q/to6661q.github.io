import React, { useState, useEffect } from "react";
import { usePortfolio } from "@/lib/PortfolioContext";

export default function VideoBackground() {
  //  AMBIL STATE 'loading' DARI CONTEXT
  const { data, loading } = usePortfolio();
  const [isBlurred, setIsBlurred] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Ambil dari Sheets (kosongkan fallback video, kita pakai UI loading)
  const desktopVideo = data?.config?.bg_desktop_link || "";
  const mobileVideo = data?.config?.bg_mobile_link || "";

  //  DETEKSI DEVICE: KOMBINASI WIDTH + ORIENTASI
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      
      // Logic for Mobile view: Portrait mode ATAU width < 1080px
      const mobile = isPortrait || width < 1080;
      
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Blur effect saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeVideo = isMobile ? mobileVideo : desktopVideo;
  if (loading) {
    return (
      <div className="fixed inset-0 z-[-10] flex flex-col items-center justify-center bg-[#050505]">
        {/* Animasi Circle Loading */}
        <div className="w-12 h-12 border-4 border-[#39FF14]/30 border-t-[#11a900] rounded-full animate-spin mb-4"></div>
        {/* Teks Loading */}
        <p className="text-white/50 font-inter text-sm tracking-wide animate-pulse">
          Loading background data...
        </p>
      </div>
    );
  }
  if (!activeVideo) {
    return (
      <div className="fixed inset-0 z-[-10] bg-[#050505]" />
    );
  }

  return (
    <>
      {/* Background hitam dasar */}
      <div className="fixed inset-0 z-[-10] bg-[#050505]" />

      {/* Video Container */}
      <div
        className="fixed inset-0 z-[-10] overflow-hidden transition-all duration-500"
        style={{
          filter: isBlurred ? 'blur(15px) brightness(0.4)' : 'blur(0px) brightness(0.7)',
        }}
      >
        <video
          key={activeVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          onLoadedData={() => console.log(` ${isMobile ? 'Mobile' : 'Desktop'} Bakcgorund loaded.`)}
          onError={(e) => console.error(`❌ ${isMobile ? 'Mobile' : 'Desktop'} Error loaded background mobile`, e)}
        >
          <source src={activeVideo} type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.5) 50%, rgba(5,5,5,0.8) 100%)',
          }}
        />
      </div>
    </>
  );
}