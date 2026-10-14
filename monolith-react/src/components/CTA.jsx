import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-40 px-8 text-center bg-background relative overflow-hidden">
      <div className="section-animate technical-grid opacity-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-full opacity-5 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(90deg,#fff,#fff_1px,transparent_1px,transparent_100px)]"></div>
      </div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter mb-8 leading-none">
          The Void Awaits Your Commands.
        </h2>
        <p className="text-on-surface-variant text-lg md:text-xl mb-12 font-body">
          Step into the next evolution of cognitive partnership. No friction. No limits. Just pure execution.
        </p>
        <div className="inline-block relative group">
          <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
          <Link to="/register" className="relative bg-black text-white px-16 py-6 font-headline font-black text-2xl uppercase tracking-widest border-2 border-primary transition-colors hover:bg-primary hover:text-black inline-block">
            INITIALIZE NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
