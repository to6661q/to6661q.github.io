import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/portfolio/SectionHeader";
import { 
  Mail, Linkedin, Instagram, Github, Youtube, Facebook,
  Twitter, Globe, MapPin, Loader2
} from "lucide-react";
import { usePortfolio } from "@/lib/PortfolioContext";

// Mapping icon name dari Google Sheets ke component
const ICON_MAP = {
  Mail, Linkedin, Instagram, Github, Youtube, Facebook,
  Twitter, Globe, MapPin
};

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const { data, loading } = usePortfolio();

  const socials = data?.contact?.socials || [];
  const mapSrc = data?.contact?.map?.src || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.29892722886!2d106.7588355!3d-6.2614927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ec2422b0b3%3A0x39a0d0fe47404d02!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";
  const mapTitle = data?.contact?.map?.title || "Location Map";

  return (
    <section id="contact" className="py-4 sm:py-12">
      
      {/*  DIUBAH: Judul dipisah menjadi title dan subtitle agar berada di baris berbeda */}
      <SectionHeader 
        title="Let's Connect!"  
      />
      <h3 className="text-[20px] sm:text-[24px] font-outfit font-bold text-white tracking-tight mb-6 text-center">
        Reach me on ....
      </h3>
      {/*  Loading State (Sama seperti Career & Project) */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-[#39FF14] animate-spin" />
          <p className="text-white/50 font-inter text-sm">Loading contact data...</p>
        </div>
      )}

      {/*  Empty/Error State (Jika data tidak ditemukan di Google Sheets) */}
      {!loading && socials.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <Mail className="w-12 h-12 text-white/20" />
          <div>
            <p className="text-white/60 font-inter text-sm font-semibold">Contact data is unavailable</p>
            <p className="text-white/40 font-inter text-xs mt-1">Please check your Google Sheets "contact" tab</p>
          </div>
        </div>
      )}

      {/*  Main Content (Hanya muncul jika data sudah berhasil dimuat) */}
      {!loading && socials.length > 0 && (
        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-4"
          >
            {socials.map((item, i) => {
              const IconComponent = ICON_MAP[item.icon] || Mail;
              return (
                <a
                  key={i}
                  href={item.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  title={item.label}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(17, 169, 0, 0.5)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(17, 169, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14]" />
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Map - STYLE SAMA DENGAN ICON */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl p-2 sm:p-3 h-[220px] sm:h-[250px] w-full max-w-md mx-auto transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(17, 169, 0, 0.5)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(17, 169, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <iframe
              title={mapTitle}
              src={mapSrc}
              width="100%"
              height="100%"
              className="rounded-xl"
              style={{ 
                border: 0, 
                filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" 
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}