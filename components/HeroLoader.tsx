import React from "react";

export default function HeroLoader() {
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-5 text-sm uppercase tracking-widest text-blue-400">
        Loading characters
      </p>
    </div>
  );
}