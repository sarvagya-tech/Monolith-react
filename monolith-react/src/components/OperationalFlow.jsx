import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Authenticate Link',
    subtitle: 'Zero friction setup',
    description:
      'Log in or register an operative identity. HttpOnly encrypted tokens establish an immediate, tamper-proof session without complex setup.',
    action: 'SESSION ESTABLISHED',
  },
  {
    num: '02',
    title: 'Dispatch Directives',
    subtitle: 'Natural language input',
    description:
      'Enter coding challenges, complex questions, or synthesis tasks into the Monolith Terminal. Groq LPUs execute responses at ~500 tokens per second.',
    action: 'LPU PROCESSING',
  },
  {
    num: '03',
    title: 'Iterate & Archive',
    subtitle: 'Persistent memory',
    description:
      'Explore follow-ups with full multi-turn context retention. Every conversation is automatically archived in MongoDB Atlas for persistent access.',
    action: 'CLOUD PERSISTED',
  },
];

const OperationalFlow = () => {
  return (
    <section id="flow" className="relative px-6 md:px-12 py-32 bg-background border-t border-white/10 overflow-hidden">
      <div className="section-animate technical-grid opacity-15"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 border-l-4 border-white pl-6">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            OPERATIONAL ARCHITECTURE // PROTOCOL
          </span>
          <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white mt-2">
            THREE PHASES OF EXECUTION
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mt-3 max-w-2xl font-body">
            From user prompt to deep LLM reasoning in fractions of a second. No latency, no clutter, pure output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-neutral-900/80 backdrop-blur-sm border-2 border-white/20 p-8 md:p-10 flex flex-col justify-between min-h-[340px] hover:border-white hover:bg-neutral-800/90 transition-all duration-200 group relative"
            >
              <div className="flex justify-between items-start">
                <span className="text-5xl font-headline font-black text-white/30 group-hover:text-white transition-colors">
                  {step.num}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1 bg-emerald-950/40 border border-emerald-500/30">
                  {step.action}
                </span>
              </div>

              <div className="mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                  {step.subtitle}
                </span>
                <h3 className="text-2xl font-headline font-black uppercase tracking-tighter text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                <span>PHASE {step.num} COMPLETE</span>
                <span className="w-1.5 h-1.5 bg-white group-hover:scale-150 transition-transform"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OperationalFlow;
