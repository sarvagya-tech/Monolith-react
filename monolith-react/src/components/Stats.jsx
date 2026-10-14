import React from 'react';

const statsData = [
  {
    num: '01',
    metric: '~500 TOK/S',
    label: 'GROQ LPU INFERENCE',
    description: 'Sub-second real-time streaming throughput',
  },
  {
    num: '02',
    metric: '128K',
    label: 'CONTEXT WINDOW',
    description: 'Deep multi-turn timeline retention',
  },
  {
    num: '03',
    metric: '99.99%',
    label: 'SYSTEM AVAILABILITY',
    description: 'Zero cold-starts, continuous cloud uptime',
  },
  {
    num: '04',
    metric: 'E2EE',
    label: 'SECURE ARCHITECTURE',
    description: 'MongoDB Atlas + HttpOnly JWT vault',
  },
];

const Stats = () => {
  return (
    <section id="status" className="border-y border-white/10 bg-neutral-950 py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span>SYSTEM BENCHMARKS // TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 bg-neutral-900/40 border border-white/10 hover:border-white/30 transition-colors relative"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-headline font-black text-white/20">
                  {stat.num}
                </span>
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest px-2 py-0.5 bg-emerald-950/30 border border-emerald-500/20">
                  LIVE
                </span>
              </div>

              <div className="text-3xl md:text-4xl font-headline font-black text-white tracking-tighter mb-1">
                {stat.metric}
              </div>

              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 mb-1">
                {stat.label}
              </div>

              <p className="text-[11px] font-body text-neutral-500 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
