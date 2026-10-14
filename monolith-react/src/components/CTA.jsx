import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CTA = () => {
  const { user } = useAuth();

  return (
    <section id="initialize" className="py-36 px-6 md:px-12 text-center bg-black relative border-t border-white/10 overflow-hidden">
      <div className="section-animate technical-grid opacity-15"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/20 mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-300">
            READY FOR DIRECT DEPLOYMENT
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-headline font-black uppercase tracking-tighter text-white mb-6 leading-tight">
          INITIALIZE YOUR COGNITIVE PARTNERSHIP.
        </h2>

        <p className="text-neutral-400 text-base md:text-xl mb-12 font-body max-w-2xl mx-auto leading-relaxed">
          Zero cold starts. Persistent multi-session history. Tap into sub-second AI inference built for engineers, researchers, and creators.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to={user ? "/terminal" : "/register"}
            className="w-full sm:w-auto bg-white text-black px-12 py-5 font-headline font-black text-xl uppercase tracking-wider hover:bg-neutral-200 transition-all border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.4)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-3"
          >
            <span>{user ? "ENTER TERMINAL" : "REQUEST OPERATIVE ACCESS"}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>

          {!user && (
            <Link
              to="/login"
              className="w-full sm:w-auto bg-transparent text-white px-8 py-5 font-headline font-bold text-lg uppercase tracking-wider border-2 border-white/30 hover:border-white hover:bg-white/10 transition-colors"
            >
              INITIALIZE SESSION
            </Link>
          )}
        </div>

        <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest mt-8">
          NO CREDIT CARD REQUIRED // IMMEDIATE ACTIVATION
        </p>
      </div>
    </section>
  );
};

export default CTA;
