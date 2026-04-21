import React from 'react';

const Features = () => {
  return (
    <section className="px-8 py-32 bg-black border-t border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-l-4 border-primary pl-6">
          <div>
            <span className="font-headline text-sm uppercase tracking-[0.3em] text-outline">Operational Pillars</span>
            <h2 className="text-5xl font-headline font-bold uppercase tracking-tighter text-white mt-2">CORE FEATURES</h2>
          </div>
          <div className="hidden md:block font-headline text-xs text-neutral-500 uppercase">
            ver 2.0.4 // status: optimal
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-outline-variant">
          {/* Feature 1 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="bolt">bolt</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Instant Answers</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              Ask anything — get clear, accurate answers in seconds. No searching, no scrolling.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="edit_note">edit_note</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Write Anything</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              Emails, essays, captions, code — your AI writes it for you in your tone.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="database">database</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Smart Research</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              Summarize articles, compare options, and get insights without opening 10 tabs.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="terminal">terminal</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Code Helper</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              Write, debug, and explain code in any language — even if you're not a developer.
            </p>
          </div>
          {/* Feature 5 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="schedule">schedule</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Always Available</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              No office hours. No waiting. Your assistant is ready 24/7.
            </p>
          </div>
          {/* Feature 6 */}
          <div className="p-10 border border-outline-variant hover:bg-primary group transition-all duration-75">
            <div className="mb-8">
              <span className="material-symbols-outlined text-5xl text-primary group-hover:text-black transition-colors" data-icon="memory">memory</span>
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase tracking-tighter text-white group-hover:text-black mb-4">Remembers Context</h3>
            <p className="font-body text-on-surface-variant group-hover:text-black/80 leading-relaxed">
              Have a real conversation — your AI understands follow-ups and stays on topic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
