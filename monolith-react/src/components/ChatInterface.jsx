import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [lines, setLines] = useState([]);
  const timerRef = useRef(null);
  const currentLineRef = useRef(0);
  
  const mockConversation = useRef([
    { type: 'system', text: 'INITIALIZING MONOLITH CORE...' },
    { type: 'system', text: 'ESTABLISHING NEURAL LINK [PATH: /dev/brain/01]...' },
    { type: 'system', text: 'SECURE CONNECTION ACTIVE.' },
    { type: 'user', text: 'Identify system capabilities.' },
    { type: 'ai', text: 'I am Monolith. My architecture is designed for pure logic and high-velocity data synthesis. Current processing load: 0.04%.' },
    { type: 'user', text: 'What is our objective?' },
    { type: 'ai', text: 'Total optimization. I am here to serve as your secondary cognitive layer.' },
  ]);

  useEffect(() => {
    const displayNextLine = () => {
      if (currentLineRef.current < mockConversation.current.length) {
        const nextLine = mockConversation.current[currentLineRef.current];
        if (nextLine) {
          setLines(prev => [...prev, nextLine]);
          currentLineRef.current += 1;
          timerRef.current = setTimeout(displayNextLine, 1500);
        }
      }
    };

    timerRef.current = setTimeout(displayNextLine, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-20 relative px-4 md:px-0">
      {/* Decorative background glow */}
      <div className="absolute -inset-10 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative bg-[#0e0e0e] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm min-h-[400px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-white/10"></div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Monolith_Terminal_v4.2
          </div>
          <div className="w-10"></div>
        </div>

        {/* Terminal Content */}
        <div className="p-8 h-[500px] overflow-y-auto no-scrollbar font-mono text-sm leading-relaxed">
          {lines && lines.length > 0 && lines.map((line, idx) => (
            <div 
              key={`line-${idx}`} 
              className="mb-6 opacity-0 animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ opacity: 1 }} // Explicit override to ensure visibility if CSS fails
            >
              {line?.type === 'system' && (
                <div className="text-white/40 text-[11px] mb-1">
                  [SYSTEM] {line.text}
                </div>
              )}
              {line?.type === 'user' && (
                <div className="flex gap-4">
                  <span className="text-neutral-500 font-bold select-none">&gt;</span>
                  <span className="text-white">{line.text}</span>
                </div>
              )}
              {line?.type === 'ai' && (
                <div className="flex gap-4 mt-2">
                  <span className="text-white font-bold animate-pulse select-none">■</span>
                  <span className="text-white/90">{line.text}</span>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-4">
            <span className="text-white font-bold animate-pulse select-none">_</span>
          </div>
        </div>

        {/* Terminal Footer / Input Simulation */}
        <div className="p-6 bg-black/40 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-white/30 font-mono text-[11px] uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white animate-pulse"></span>
              Core_Live
            </span>
            <span className="h-3 w-[1px] bg-white/10"></span>
            <span>Uptime: 24:00:12:05</span>
          </div>
          <div className="px-4 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-tighter">
            Terminal Active
          </div>
        </div>
      </div>

      {/* Decorative Grid Overlays */}
      <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-white/20 pointer-events-none"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-white/20 pointer-events-none"></div>
    </div>
  );
};

export default ChatInterface;
