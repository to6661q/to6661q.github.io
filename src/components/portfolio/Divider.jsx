import React from "react";

export default function Divider() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 lg:px-20 my-16 sm:my-20">
      <div 
        className="h-[3px] w-full"
        style={{
  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.1) 80%, transparent)',
}}
      />
    </div>
  );
}