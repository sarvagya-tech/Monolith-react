import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 flex flex-col md:flex-row justify-between items-center w-full px-8 py-12">
      <div className="mb-8 md:mb-0">
        <div className="text-lg font-bold text-white font-['Space_Grotesk'] uppercase mb-2">
          MONOLITH
        </div>
        <p className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-neutral-600">
          (C) 2026 MONOLITHIC INTELLIGENCE. ALL RIGHTS RESERVED.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em]">
        <Link className="text-neutral-600 hover:text-white transition-none" to="/#flow">
          Protocol
        </Link>
        <Link className="text-neutral-600 hover:text-white transition-none" to="/terminal">
          Terminal
        </Link>
        <Link className="text-neutral-600 hover:text-white transition-none" to="/#status">
          Status
        </Link>
        <Link className="text-neutral-600 hover:text-white transition-none" to="/#privacy">
          Privacy
        </Link>
      </div>
      <div className="mt-8 md:mt-0 flex gap-4">
        <Link
          to="/terminal"
          className="w-8 h-8 border border-neutral-800 flex items-center justify-center hover:border-white transition-colors cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-sm text-neutral-500"
            data-icon="terminal"
          >
            terminal
          </span>
        </Link>
        <Link
          to="/#features"
          className="w-8 h-8 border border-neutral-800 flex items-center justify-center hover:border-white transition-colors cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-sm text-neutral-500"
            data-icon="code"
          >
            code
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
