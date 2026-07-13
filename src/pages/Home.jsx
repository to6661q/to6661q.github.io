import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import HeroLeft from "@/components/portfolio/HeroLeft";
import HeroRight from "@/components/portfolio/HeroRight";
import AboutSection from "@/components/portfolio/AboutSection";
import CareerSection from "@/components/portfolio/CareerSection";
import AchieveSection from "@/components/portfolio/AchieveSection";
import LicenseSection from "@/components/portfolio/LicenseSection";
import ProjectSection from "@/components/portfolio/ProjectSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";
import Divider from "@/components/portfolio/Divider";
import VideoBackground from "@/components/portfolio/VideoBackground";

export default function Home() {
  return (
    <>
      {/* VIDEO BACKGROUND - Dinamis dari Google Sheets */}
      <VideoBackground />

      {/* KONTEN UTAMA */}
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />

        <main className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 pt-[120px] md:pt-[120px]">
          {/* Hero Section */}
<section 
  id="home" 
  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 min-h-[calc(100vh-120px)] items-center pb-16"
>
  <div className="lg:col-span-6">
    <HeroRight />
  </div>
  <div className="lg:col-span-6">
    <HeroLeft />
  </div>
</section>
          <Divider />
          <AboutSection />
          <Divider />
          <CareerSection />
          <Divider />
          <AchieveSection />
          <Divider />
          <LicenseSection />
          <Divider />
          <ProjectSection />
          <Divider />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}