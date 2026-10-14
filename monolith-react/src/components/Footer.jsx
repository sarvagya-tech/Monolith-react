import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/10 px-6 md:px-12 py-12 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 bg-white"></span>
            <span className="text-xl font-headline font-black uppercase tracking-tighter">
              MONOLITH
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
            (C) {new Date().getFullYear()} MONOLITH INTELLIGENCE. ALL SYSTEMS OPERATIONAL.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-headline text-xs uppercase tracking-wider font-bold">
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#home">
            HOME
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#flow">
            SYSTEMS
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#features">
            FEATURES
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/terminal">
            TERMINAL
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#status">
            METRICS
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400 border border-emerald-500/30 px-3 py-1 bg-emerald-950/20">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span>SYSTEM HEALTH: 100%</span>
          </div>

          <button
            onClick={scrollToTop}
            title="Scroll to top"
            className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
          >
            <span className="material-symbols-outlined text-lg">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
