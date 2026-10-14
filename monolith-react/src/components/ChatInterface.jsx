import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const samplePrompts = [
  "Write an Express rate-limiter middleware",
  "Explain Groq LPU vs GPU inference speed",
  "Debug a MongoDB indexing bottleneck"
];

const ChatInterface = () => {
  const [lines, setLines] = useState([]);
  const [interactiveInput, setInteractiveInput] = useState('');
  const timerRef = useRef(null);
  const currentLineRef = useRef(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const mockConversation = useRef([
    { type: 'system', text: 'INITIALIZING MONOLITH CORE ARCHITECTURE...' },
    { type: 'system', text: 'CONNECTING TO GROQ LPU INFERENCE ENGINE [ONLINE]...' },
    { type: 'system', text: 'SECURE E2EE MONGODB SESSION ARCHIVE ACTIVE.' },
    { type: 'user', text: 'Summarize system capabilities and throughput.' },
    { type: 'ai', text: 'Monolith Core: Groq-accelerated multi-turn LLM inference (~500 tok/sec). Features persistent operative sessions, code engineering, and real-time reasoning.' },
    { type: 'user', text: 'Initialize prompt ready state.' },
    { type: 'ai', text: 'Core ready. All queries are indexed to your operative identity. Input directives below to launch the terminal.' },
  ]);

  useEffect(() => {
    const displayNextLine = () => {
      if (currentLineRef.current < mockConversation.current.length) {
        const nextLine = mockConversation.current[currentLineRef.current];
        if (nextLine) {
          setLines(prev => [...prev, nextLine]);
          currentLineRef.current += 1;
          timerRef.current = setTimeout(displayNextLine, 1200);
        }
      }
    };

    timerRef.current = setTimeout(displayNextLine, 400);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleLaunchWithPrompt = (promptText) => {
    const target = promptText || interactiveInput;
    if (!target?.trim()) {
      navigate('/terminal');
      return;
    }
    navigate(`/terminal?prompt=${encodeURIComponent(target.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLaunchWithPrompt();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 relative px-4 md:px-0">
      {/* Decorative background glow */}
      <div className="absolute -inset-10 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative bg-[#0d0d0d] border border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-neutral-900 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400 ml-3">
              MONOLITH_CORE_V4.2 // LPU_ACTIVE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">
              OPERATIONAL
            </span>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollContainerRef}
          className="p-6 md:p-8 h-[380px] overflow-y-auto no-scrollbar font-mono text-xs md:text-sm leading-relaxed space-y-4"
        >
          {lines.map((line, idx) => (
            <div 
              key={`line-${idx}`} 
              className="animate-in fade-in slide-in-from-left-4 duration-300"
            >
              {line?.type === 'system' && (
                <div className="text-neutral-500 text-[11px] font-mono">
                  <span className="text-neutral-600">[SYS_INIT]</span> {line.text}
                </div>
              )}
              {line?.type === 'user' && (
                <div className="flex gap-3 text-white">
                  <span className="text-neutral-500 font-bold select-none">&gt;</span>
                  <span>{line.text}</span>
                </div>
              )}
              {line?.type === 'ai' && (
                <div className="flex gap-3 text-neutral-200 bg-white/5 p-3.5 border-l-2 border-white">
                  <span className="text-white font-bold select-none">■</span>
                  <span className="leading-relaxed">{line.text}</span>
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2 pt-2 text-neutral-400">
            <span className="text-emerald-400 font-bold animate-pulse">&gt;</span>
            <span className="text-[11px] font-mono tracking-widest uppercase">AWAITING OPERATIVE INPUT...</span>
            <span className="w-2 h-4 bg-white animate-pulse"></span>
          </div>
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-6 py-2.5 bg-neutral-900/60 border-t border-white/5 flex flex-wrap gap-2 items-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mr-1 hidden sm:inline">
            SUGGESTIONS:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleLaunchWithPrompt(p)}
              className="text-[10px] font-mono uppercase tracking-wider bg-white/5 hover:bg-white hover:text-black border border-white/10 px-2.5 py-1 transition-all truncate max-w-[240px]"
            >
              &gt; {p}
            </button>
          ))}
        </div>

        {/* Terminal Interactive Input Form */}
        <div className="p-4 bg-neutral-950 border-t border-white/10 flex items-center gap-3">
          <div className="flex-1 flex items-center bg-neutral-900 border border-white/20 focus-within:border-white transition-colors px-3">
            <span className="text-neutral-500 font-mono text-xs select-none pr-2">&gt;</span>
            <input
              type="text"
              value={interactiveInput}
              onChange={(e) => setInteractiveInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="TYPE A QUERY TO TEST MONOLITH DIRECTLY..."
              className="w-full bg-transparent border-none outline-none py-3 font-mono text-xs text-white placeholder:text-neutral-600 tracking-wider"
            />
          </div>
          <button
            onClick={() => handleLaunchWithPrompt()}
            className="bg-white text-black px-6 py-3 font-headline font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-none flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>DISPATCH</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Decorative Grid Overlays */}
      <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-white/30 pointer-events-none"></div>
      <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-white/30 pointer-events-none"></div>
    </div>
  );
};

export default ChatInterface;
