import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from './ChatInterface';
import CanvasBackground from './CanvasBackground';

const Hero = () => {
  return (
    <section className="relative min-h-[1050px] flex flex-col items-center justify-center px-6 md:px-12 pt-12 pb-24 overflow-hidden bg-background">
      <div className="section-animate technical-grid opacity-20"></div>

      <CanvasBackground />

      <div className="z-20 text-center max-w-5xl mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-white/5 mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/80">
            GROQ LPU ACCELERATED // ULTRA-LOW LATENCY
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-headline font-black uppercase tracking-tighter text-white leading-[0.92] mb-8">
          YOUR SECOND BRAIN, ALWAYS ON.
        </h1>

        <p className="text-base sm:text-lg md:text-2xl font-body text-neutral-400 max-w-3xl mx-auto mb-10 tracking-tight leading-relaxed">
          Unleash high-velocity intelligence powered by advanced LLM inference.
          Multi-turn context memory, persistent operative archives, and instant code synthesis.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            to="/terminal"
            className="bg-white text-black px-10 py-4 font-headline font-black text-lg uppercase tracking-wider hover:bg-black hover:text-white border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all text-center flex items-center justify-center gap-2"
          >
            <span>LAUNCH TERMINAL</span>
            <span className="material-symbols-outlined text-xl">terminal</span>
          </Link>
          <a
            href="#flow"
            className="bg-transparent text-white px-10 py-4 font-headline font-bold text-lg uppercase tracking-wider border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors text-center"
          >
            EXPLORE SYSTEM
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 font-mono text-[11px] text-neutral-500 uppercase tracking-widest pt-4">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
            Groq LPU Inference (~500 tok/s)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
            Cloud Session Persistence
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
            Encrypted JWT Authentication
          </span>
        </div>
      </div>

      <ChatInterface />
    </section>
  );
};

export default Hero;
