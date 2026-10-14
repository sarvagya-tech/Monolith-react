import React from 'react';

const featureList = [
  {
    icon: 'bolt',
    title: 'Sub-Second Inference',
    description: 'Powered by Groq LPU acceleration. Receive complex answers, deep reasoning, and high-density outputs in milliseconds without cold starts.',
    tag: 'HARDWARE ACCELERATED'
  },
  {
    icon: 'memory',
    title: 'Multi-Turn Context',
    description: 'Monolith retains the full conversational timeline within each session, maintaining context through iterative prompts and continuous follow-ups.',
    tag: 'NEURAL CONTEXT'
  },
  {
    icon: 'database',
    title: 'Persistent Cloud Vault',
    description: 'All conversations and queries are indexed to your operative identity in MongoDB Atlas. Revisit and build upon past sessions anytime.',
    tag: 'ENCRYPTED STORAGE'
  },
  {
    icon: 'terminal',
    title: 'Code Engineering Core',
    description: 'Write, inspect, optimize, and debug code in JavaScript, Python, Go, Rust, and SQL with precise formatting and syntax clarity.',
    tag: 'SYNTAX PROCESSING'
  },
  {
    icon: 'shield_lock',
    title: 'HttpOnly JWT Security',
    description: 'Zero localStorage vulnerabilities. State-of-the-art authentication with secure, tamper-proof HttpOnly session cookies.',
    tag: 'E2EE CREDENTIALS'
  },
  {
    icon: 'splitscreen',
    title: 'Multi-Session Threads',
    description: 'Spawn new topic threads on demand, archive existing sessions, and organize diverse workflows without context bleed.',
    tag: 'THREAD MANAGEMENT'
  }
];

const Features = () => {
  return (
    <section className="px-6 md:px-12 py-32 bg-black border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-l-4 border-white pl-6 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
              OPERATIONAL PILLARS // CAPABILITIES
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white mt-2">
              CORE SYSTEM CAPABILITIES
            </h2>
          </div>
          <div className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            ALL PROTOCOLS OPERATIONAL
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/15">
          {featureList.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 border border-white/10 hover:bg-white hover:text-black group transition-all duration-150 flex flex-col justify-between min-h-[300px]"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span
                    className="material-symbols-outlined text-4xl text-white group-hover:text-black transition-colors"
                  >
                    {feature.icon}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border border-white/20 group-hover:border-black/30 group-hover:bg-black/5 text-neutral-400 group-hover:text-black transition-colors">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-headline font-black uppercase tracking-tighter text-white group-hover:text-black mb-3">
                  {feature.title}
                </h3>

                <p className="font-body text-sm text-neutral-400 group-hover:text-neutral-800 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 group-hover:border-black/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-black">
                <span>INDEX 0{idx + 1}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
