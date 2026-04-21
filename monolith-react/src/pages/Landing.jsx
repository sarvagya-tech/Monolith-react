import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OperationalFlow from '../components/OperationalFlow';
import Features from '../components/Features';
import Stats from '../components/Stats';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div id="home" className="scroll-mt-28">
          <Hero />
        </div>
        <div id="flow" className="scroll-mt-28">
          <OperationalFlow />
        </div>
        <div id="features" className="scroll-mt-28">
          <Features />
        </div>
        <div id="status" className="scroll-mt-28">
          <Stats />
        </div>
        <div id="initialize" className="scroll-mt-28">
          <CTA />
        </div>
      </main>
      <div id="privacy" className="scroll-mt-28">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
