import React from 'react';

const OperationalFlow = () => {
  return (
    <section className="relative px-8 py-24 bg-background border-t border-outline-variant overflow-hidden">
      <div className="section-animate technical-grid opacity-10"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <span className="font-headline text-sm uppercase tracking-[0.3em] text-outline">No Setup. No Training. No Manual.</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter text-white mt-2">Simple as 1, 2, 3</h2>
          <p className="text-on-surface-variant text-lg mt-4 max-w-2xl font-body">Just open it and start — your AI assistant is ready from second one.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Step 1 */}
          <div className="bg-white text-black p-12 border-2 border-white flex flex-col justify-between min-h-[300px] hover:bg-black hover:text-white transition-colors duration-200">
            <div className="text-4xl font-headline font-black">01</div>
            <div>
              <h3 className="text-2xl font-headline font-black uppercase tracking-tighter mb-2">Ask Anything</h3>
              <p className="text-sm font-body uppercase tracking-wider opacity-80">Type your question, task, or idea in plain English. No special commands, no learning curve — just talk like you would to a friend.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="bg-black text-white p-12 border-2 border-white flex flex-col justify-between min-h-[300px] hover:bg-white hover:text-black transition-colors duration-200">
            <div className="text-4xl font-headline font-black">02</div>
            <div>
              <h3 className="text-2xl font-headline font-black uppercase tracking-tighter mb-2">AI Gets to Work</h3>
              <p className="text-sm font-body uppercase tracking-wider opacity-80">Your assistant instantly understands what you need and generates accurate, relevant responses — whether it's an answer, a draft, or a solution.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="bg-white text-black p-12 border-2 border-white flex flex-col justify-between min-h-[300px] hover:bg-black hover:text-white transition-colors duration-200">
            <div className="text-4xl font-headline font-black">03</div>
            <div>
              <h3 className="text-2xl font-headline font-black uppercase tracking-tighter mb-2">Use & Refine</h3>
              <p className="text-sm font-body uppercase tracking-wider opacity-80">Copy, edit, or build on the output. Ask follow-ups, tweak the tone, or go deeper — your assistant adapts to exactly what you need.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalFlow;
