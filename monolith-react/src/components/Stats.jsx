import React from 'react';

const Stats = () => {
  return (
    <section className="border-y border-outline-variant bg-surface py-12 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex items-center gap-6">
          <span className="text-6xl font-headline font-black text-outline-variant">01</span>
          <div>
            <p className="font-headline font-bold uppercase tracking-tighter text-white">Logic Processing</p>
            <p className="text-xs font-label uppercase text-neutral-500 tracking-widest">4.8 Petahash/s</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-6xl font-headline font-black text-outline-variant">02</span>
          <div>
            <p className="font-headline font-bold uppercase tracking-tighter text-white">Global Nodes</p>
            <p className="text-xs font-label uppercase text-neutral-500 tracking-widest">14,802 Active</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-6xl font-headline font-black text-outline-variant">03</span>
          <div>
            <p className="font-headline font-bold uppercase tracking-tighter text-white">Uptime</p>
            <p className="text-xs font-label uppercase text-neutral-500 tracking-widest">99.999% Absolute</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
