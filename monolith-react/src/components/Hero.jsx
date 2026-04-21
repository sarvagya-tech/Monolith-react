import React from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from './ChatInterface';
import CanvasBackground from './CanvasBackground';

const Hero = () => {
  return (
    <section className="relative min-h-[1100px] flex flex-col items-center justify-center px-8 overflow-hidden bg-background">
      <div className="section-animate technical-grid opacity-20"></div>

      <CanvasBackground />

      <div className="z-20 text-center max-w-5xl">
        <h1 className="text-6xl md:text-9xl font-headline font-black uppercase tracking-tighter text-primary leading-[0.9] mb-8">
          Your second brain, always on.
        </h1>
        <p className="text-lg md:text-2xl font-body text-on-surface-variant max-w-2xl mx-auto mb-12 tracking-tight">
          Unleash the power of pure logic with Monolith's advanced LLM core. Precision. Speed. Intelligence.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <Link to="/terminal" className="bg-primary text-on-primary px-12 py-5 font-headline font-bold text-xl uppercase tracking-tighter hover:bg-black hover:text-white border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-75 active:translate-y-0 active:translate-x-0 active:shadow-none text-center">
            GET STARTED
          </Link>
          <Link to="/#features" className="bg-transparent text-primary px-12 py-5 font-headline font-bold text-xl uppercase tracking-tighter border-2 border-primary hover:bg-primary hover:text-black transition-none text-center">
            LEARN MORE
          </Link>
        </div>
      </div>

      <ChatInterface />
    </section>
  );
};

export default Hero;
