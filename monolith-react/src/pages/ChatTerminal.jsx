import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { sendMessage, getUserChats, getChatMessages } from "../service/axios";
import { useAuth } from "../hooks/useAuth";

const starterPrompts = [
  {
    title: "System Architecture",
    prompt: "Explain how Groq LPUs achieve ultra-low latency compared to traditional GPU clusters.",
    tag: "INFRASTRUCTURE"
  },
  {
    title: "Full-Stack Security",
    prompt: "Write a complete Express.js middleware using HttpOnly cookies, JWT verification, and CORS configuration.",
    tag: "CODE"
  },
  {
    title: "Database Optimization",
    prompt: "Explain MongoDB compound indexing strategies and how to avoid COLLSCAN bottlenecks.",
    tag: "DATABASE"
  },
  {
    title: "Technical Roadmapping",
    prompt: "Draft an executive summary comparing monolithic vs microservice architecture for high-velocity teams.",
    tag: "STRATEGY"
  }
];

const formatTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// Formats text content with markdown-like code block extraction and copy button
const FormattedMessage = ({ content, role }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Simple parser to separate code blocks from text
  const parts = [];
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: content.substring(lastIndex, match.index) });
    }
    parts.push({
      type: 'code',
      lang: match[1] || 'code',
      content: match[2].trimEnd()
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: 'text', content: content.substring(lastIndex) });
  }

  if (role === 'user') {
    return <div className="whitespace-pre-wrap font-body text-sm leading-relaxed">{content}</div>;
  }

  return (
    <div className="space-y-3 font-body text-sm leading-relaxed">
      {parts.map((part, idx) => {
        if (part.type === 'code') {
          return (
            <div key={idx} className="my-3 border border-white/20 bg-neutral-950 font-mono text-xs overflow-hidden">
              <div className="flex justify-between items-center px-4 py-1.5 bg-neutral-900 border-b border-white/10 text-neutral-400">
                <span className="uppercase text-[10px] tracking-widest text-emerald-400 font-bold">
                  {part.lang}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(part.content, idx)}
                  className="flex items-center gap-1 text-[10px] text-neutral-300 hover:text-white transition-colors uppercase font-mono px-2 py-0.5 border border-white/10 hover:border-white"
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {copiedIndex === idx ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedIndex === idx ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-neutral-200 leading-relaxed font-mono selection:bg-white selection:text-black">
                <code>{part.content}</code>
              </pre>
            </div>
          );
        }

        return (
          <div key={idx} className="whitespace-pre-wrap leading-relaxed text-neutral-200">
            {part.content}
          </div>
        );
      })}
    </div>
  );
};

const ChatTerminal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();

  const messageInputRef = useRef(null);
  const recentMessagesRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  // Fetch chat history on mount
  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  // Handle URL query parameters (?prompt=...)
  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (prompt && !messageInput.trim()) {
      setMessageInput(prompt);
      messageInputRef.current?.focus();
    }
  }, [searchParams]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const chats = await getUserChats();
      setAllChats(chats || []);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMessages([]);
    setChatId(null);
    setAllChats([]);
    setMessageInput("");
    setChatError("");
    navigate('/login');
  };

  const loadChat = async (id) => {
    setChatLoading(true);
    setChatError("");
    setSidebarOpen(false);
    try {
      const chat = await getChatMessages(id);
      setChatId(chat._id);
      setMessages(chat.messages || []);
      messageInputRef.current?.focus();
    } catch (error) {
      setChatError(error?.message || "Failed to load chat history.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleSend = async (overridePrompt) => {
    const messageToSend = typeof overridePrompt === 'string' ? overridePrompt : messageInput;
    const trimmedMessage = messageToSend.trim();
    if (!trimmedMessage || chatLoading) return;

    if (!user) {
      setChatError("Operative authentication required. Please initialize session via the login portal.");
      return;
    }

    setChatLoading(true);
    setChatError("");

    // Optimistically push user message
    const tempUserMsg = {
      role: 'user',
      content: trimmedMessage,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setMessageInput("");

    try {
      const payload = await sendMessage({
        message: trimmedMessage,
        chatId,
      });

      // If it was a new chat, refresh archive list
      if (!chatId) {
        fetchHistory();
      }

      setChatId(payload?.chatId || null);
      setMessages(payload?.messages || []);
      messageInputRef.current?.focus();
    } catch (error) {
      setChatError(
        error?.message || "Unable to dispatch message to Groq LPU core. Please try again."
      );
    } finally {
      setChatLoading(false);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatId(null);
    setChatError("");
    setMessageInput("");
    setSidebarOpen(false);
    messageInputRef.current?.focus();
  };

  const copyFullMessage = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(idx);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white font-mono text-xs uppercase tracking-widest">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping mr-3"></span>
        INITIALIZING SECURE OPERATIVE LINK...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden text-neutral-200 bg-black font-body">
      {/* Top Header */}
      <nav className="flex justify-between items-center w-full px-6 md:px-8 py-4 bg-neutral-950 border-b border-white/10 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-white p-1 hover:bg-white/10"
            aria-label="Toggle Sessions Sidebar"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>

          <Link to="/#home" className="flex items-center gap-2 text-xl font-black tracking-tighter text-white font-headline uppercase">
            <span className="w-2 h-2 bg-white"></span>
            <span>MONOLITH</span>
            <span className="text-[9px] font-mono border border-white/30 px-1.5 py-0.5 text-neutral-400 uppercase tracking-widest hidden sm:inline">
              TERMINAL
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-headline uppercase tracking-tighter font-bold text-xs">
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#home">
            HOME
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#flow">
            SYSTEMS
          </Link>
          <Link className="text-white border-b-2 border-white pb-0.5" to="/terminal">
            CORE TERMINAL
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#status">
            METRICS
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-neutral-400 hidden sm:inline">
                ID: <span className="text-white font-semibold">{user.fullname || user.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-1.5 font-headline uppercase tracking-wider font-bold text-xs hover:bg-neutral-200 transition-none"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-black px-5 py-1.5 font-headline uppercase tracking-wider font-bold text-xs hover:bg-neutral-200 transition-none"
            >
              AUTHENTICATE
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar for Sessions */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-40 w-72 md:w-80 bg-neutral-950 flex flex-col border-r border-white/10 transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-between bg-white text-black px-4 py-3 font-headline uppercase font-bold tracking-wider text-xs hover:bg-neutral-200 transition-none disabled:opacity-50 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
              disabled={!user}
            >
              <span>NEW THREAD</span>
              <span className="material-symbols-outlined text-sm font-bold">add</span>
            </button>
          </div>

          <div className="p-5 border-b border-white/10">
            {!user ? (
              <div className="p-4 bg-neutral-900 border border-white/15">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold mb-2">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Operative Required</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-400 leading-relaxed mb-4">
                  Multi-session archive and Groq LLM processing require operative credentials.
                </p>
                <Link
                  to="/login"
                  className="block w-full text-center bg-white text-black py-2.5 font-headline uppercase tracking-wider font-bold text-xs hover:bg-neutral-200"
                >
                  AUTHENTICATE
                </Link>
              </div>
            ) : (
              <div className="p-3.5 bg-neutral-900 border border-white/15">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    LINK ACTIVE
                  </span>
                  <span>GROQ LPU</span>
                </div>
                <div className="font-headline font-bold text-xs text-white mt-1.5 truncate">
                  {user.fullname || user.email}
                </div>
                <div className="text-[10px] font-mono text-neutral-500 truncate">
                  {user.email}
                </div>
              </div>
            )}
          </div>

          <div
            id="recent-messages"
            ref={recentMessagesRef}
            className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-1.5"
          >
            <div className="font-mono uppercase text-[10px] tracking-[0.2em] text-neutral-500 px-2 mb-3 flex items-center justify-between">
              <span>STORED THREADS</span>
              <span className="text-[9px] bg-white/10 px-1.5 py-0.5 text-neutral-400">
                {allChats.length}
              </span>
            </div>

            {historyLoading && (
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2 animate-pulse">
                Syncing vault...
              </div>
            )}

            {!historyLoading && allChats.length === 0 && user && (
              <div className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest px-2 italic">
                No archived threads found.
              </div>
            )}

            {!historyLoading && allChats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => loadChat(chat._id)}
                className={`w-full text-left p-3 border transition-colors ${
                  chatId === chat._id
                    ? "border-white bg-white/10 text-white"
                    : "border-white/10 bg-neutral-900/60 hover:border-white/30 text-neutral-400 hover:text-white"
                }`}
              >
                <div className="font-headline uppercase text-[11px] font-bold tracking-wider truncate mb-1">
                  {chat.title || "Untitled Session"}
                </div>
                <div className="text-[8px] font-mono text-neutral-500 flex justify-between">
                  <span>ID: {String(chat._id).slice(-6)}</span>
                  <span>{formatTime(chat.updatedAt)}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="md:hidden fixed inset-0 bg-black/70 z-30"
          ></div>
        )}

        {/* Main Conversation Stream */}
        <main className="flex-1 flex flex-col relative technical-grid dot-pattern bg-black">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 no-scrollbar">
            {/* Status Beacon Bar */}
            <div className="flex justify-center">
              <div className="px-4 py-1.5 bg-neutral-900 border border-white/15 font-mono text-[10px] text-neutral-400 tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span>
                  {user
                    ? `NEURAL LINK ESTABLISHED // E2EE ACTIVE // SESSION: ${chatId ? String(chatId).slice(-6) : 'READY'}`
                    : "OPERATIVE AUTHENTICATION REQUIRED // LOGIN TO ACCESS CORE"}
                </span>
              </div>
            </div>

            {/* Empty State / Suggested Prompt Cards */}
            {messages.length === 0 && !chatLoading && (
              <div className="max-w-3xl mx-auto my-8 space-y-6">
                <div className="p-6 border border-white/20 bg-neutral-900/80 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                    <span className="material-symbols-outlined text-sm">terminal</span>
                    <span>MONOLITH CORE READY</span>
                  </div>
                  <p className="font-body text-sm text-neutral-300 leading-relaxed">
                    Directives sent here are executed via high-throughput Groq LPU hardware with persistent context retention. Choose a sample prompt below or input your query.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starterPrompts.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(item.prompt)}
                      className="text-left p-4 bg-neutral-900/50 border border-white/10 hover:border-white hover:bg-white/5 transition-all group"
                    >
                      <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400 mb-2 uppercase tracking-widest">
                        <span>{item.tag}</span>
                        <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </div>
                      <div className="font-headline uppercase text-xs font-bold text-white mb-1">
                        {item.title}
                      </div>
                      <p className="font-body text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Feed */}
            {messages.map((item, index) => {
              const isUser = item.role === "user";
              return (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex flex-col ${
                    isUser ? "items-end max-w-2xl ml-auto" : "items-start max-w-4xl"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`font-mono text-[9px] uppercase tracking-widest ${
                        isUser ? "text-neutral-400" : "text-emerald-400 font-bold"
                      }`}
                    >
                      {isUser ? "OPERATIVE" : "MONOLITH_CORE"} [{formatTime(item.createdAt)}]
                    </span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => copyFullMessage(item.content, index)}
                        className="text-neutral-500 hover:text-white transition-colors"
                        title="Copy Response"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {copiedMessageId === index ? "check" : "content_copy"}
                        </span>
                      </button>
                    )}
                  </div>

                  <div
                    className={`p-5 border ${
                      isUser
                        ? "bg-white text-black border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] font-medium"
                        : "bg-neutral-900/90 text-white border-white/20 w-full"
                    }`}
                  >
                    <FormattedMessage content={item.content} role={item.role} />
                  </div>
                </div>
              );
            })}

            {/* Active AI Processing Indicator */}
            {chatLoading && (
              <div className="flex items-center gap-3 p-4 bg-neutral-900/80 border border-white/20 max-w-sm">
                <div className="w-2 h-2 bg-emerald-400 animate-ping"></div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-300">
                  LPU INFERENCE IN PROGRESS...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Directive Input Box */}
          <div className="p-4 md:p-6 bg-neutral-950 border-t border-white/10">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end bg-neutral-900 border-2 border-white/20 focus-within:border-white transition-colors">
                <textarea
                  ref={messageInputRef}
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={!user || chatLoading}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 py-3.5 px-4 font-mono text-sm tracking-wider placeholder:text-neutral-600 resize-none no-scrollbar text-white disabled:opacity-50"
                  placeholder={
                    user
                      ? "INPUT COMMAND OR QUERY DIRECTIVE... [ENTER TO DISPATCH]"
                      : "AUTHENTICATION REQUIRED TO DISPATCH COMMANDS_"
                  }
                  rows={2}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!user || !messageInput.trim() || chatLoading}
                  className="p-3.5 bg-white text-black hover:bg-neutral-200 transition-none disabled:opacity-40 m-1 flex items-center justify-center font-bold"
                  aria-label="Send Directive"
                >
                  <span className="material-symbols-outlined text-lg">
                    send
                  </span>
                </button>
              </div>

              {chatError && (
                <div className="mt-2.5 text-xs text-red-400 font-mono flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>{chatError}</span>
                </div>
              )}

              <div className="mt-2.5 flex flex-wrap justify-between items-center text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span>[ENTER] SEND DIRECTIVE</span>
                  <span>[SHIFT+ENTER] NEWLINE</span>
                </div>
                <div>
                  CORE: GROQ LPU // PERSISTED: ATLAS
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatTerminal;
