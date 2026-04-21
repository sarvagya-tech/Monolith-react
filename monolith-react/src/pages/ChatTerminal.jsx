import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { sendMessage, getUserChats, getChatMessages } from "../service/axios";
import { useAuth } from "../hooks/useAuth";

const getErrorMessage = (error, fallbackMessage) =>
  error?.response?.data?.message || error?.message || fallbackMessage;

const formatTime = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatTerminal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth();

  const messageInputRef = useRef(null);
  const recentMessagesRef = useRef(null);

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);

  // Fetch chat history on mount
  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (prompt && !messageInput.trim()) {
      setMessageInput(prompt);
    }
  }, [searchParams, messageInput]);

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
    try {
      const chat = await getChatMessages(id);
      setChatId(chat._id);
      setMessages(chat.messages || []);
      messageInputRef.current?.focus();
    } catch (error) {
      setChatError(getErrorMessage(error, "Failed to load chat history."));
    } finally {
      setChatLoading(false);
    }
  };

  const handleSend = async () => {
    const trimmedMessage = messageInput.trim();
    if (!trimmedMessage || chatLoading) return;

    if (!user) {
      setChatError("Identity verification failed. Please authenticate via the main portal.");
      return;
    }

    setChatLoading(true);
    setChatError("");

    try {
      const payload = await sendMessage({
        message: trimmedMessage,
        chatId,
      });

      // If it was a new chat, refresh history
      if (!chatId) {
        fetchHistory();
      }

      setChatId(payload?.chatId || null);
      setMessages(payload?.messages || []);
      setMessageInput("");
      messageInputRef.current?.focus();
    } catch (error) {
      setChatError(
        getErrorMessage(error, "Unable to send message. Please try again.")
      );
    } finally {
      setChatLoading(false);
    }
  };

  const handleInputKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const openArchive = () => {
    recentMessagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startNewChat = () => {
    setMessages([]);
    setChatId(null);
    setChatError("");
    setMessageInput("");
    messageInputRef.current?.focus();
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-primary font-mono text-xs uppercase tracking-widest">
        Initializing Secure Connection...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden text-on-surface bg-background font-body">
      <nav className="flex justify-between items-center w-full px-8 py-6 max-w-full bg-neutral-950 z-50">
        <Link to="/#home" className="text-2xl font-black tracking-tighter text-white font-headline uppercase">
          MONOLITH
        </Link>
        <div className="hidden md:flex gap-10">
          <Link className="font-headline uppercase tracking-tighter font-bold text-neutral-500 hover:text-white transition-colors" to="/#flow">
            SYSTEMS
          </Link>
          <Link className="font-headline uppercase tracking-tighter font-bold text-white border-b-2 border-white pb-1" to="/terminal">
            CORE
          </Link>
          <Link className="font-headline uppercase tracking-tighter font-bold text-neutral-500 hover:text-white transition-colors" to="/#status">
            NETWORK
          </Link>
          <button
            onClick={openArchive}
            className="font-headline uppercase tracking-tighter font-bold text-neutral-500 hover:text-white transition-colors"
          >
            ARCHIVE
          </button>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-white text-black px-6 py-2 font-headline uppercase tracking-tighter font-bold hover:bg-neutral-200 transition-none"
          >
            LOGOUT
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-black px-6 py-2 font-headline uppercase tracking-tighter font-bold hover:bg-neutral-200 transition-none"
          >
            LOGIN
          </Link>
        )}
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-surface-container-lowest flex flex-col border-r border-outline-variant/30">
          <div className="p-6">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-between bg-primary text-on-primary px-4 py-4 font-label uppercase font-bold tracking-widest text-sm hover:invert transition-none disabled:opacity-60"
              disabled={!user}
            >
              <span>New Chat</span>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>

          <div className="px-6 pb-6">
            {!user ? (
              <div className="p-6 bg-surface-container-high border border-outline-variant/40 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-primary font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[14px] animate-pulse">lock</span>
                  Identity Required
                </h3>
                <p className="text-[10px] uppercase font-mono text-outline leading-relaxed mb-6">
                  Terminal access is restricted to authenticated operatives. Please establish a secure link via the main portal.
                </p>
                <Link
                  to="/login"
                  className="w-full bg-white text-black py-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">key</span>
                  Authenticate
                </Link>
              </div>
            ) : (
              <div className="p-4 bg-surface-container-high border border-outline-variant/40">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  Session Active
                </p>
                <p className="text-sm text-white mt-2 font-semibold">
                  {user.fullname || user.email || "User"}
                </p>
                <p className="text-[10px] text-outline mt-1 font-mono uppercase truncate">{user.email}</p>
              </div>
            )}
          </div>

          <div
            id="recent-messages"
            ref={recentMessagesRef}
            className="flex-1 overflow-y-auto no-scrollbar px-6 space-y-2 pb-6"
          >
            <div className="label-md font-label uppercase text-[10px] tracking-[0.2em] text-outline mb-4">
              Stored Conversations
            </div>
            {historyLoading && (
              <div className="text-[10px] font-mono text-outline uppercase tracking-widest animate-pulse">
                Syncing history...
              </div>
            )}
            
            {!historyLoading && allChats.length === 0 && user && (
              <div className="text-[10px] font-mono text-outline/50 uppercase tracking-widest italic">
                No archived sessions found.
              </div>
            )}

            {!historyLoading && allChats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => loadChat(chat._id)}
                className={`w-full text-left p-4 bg-surface-container-high border-l-4 transition-all duration-200 ${
                  chatId === chat._id ? "border-primary bg-surface-container-highest" : "border-outline-variant/30 hover:border-primary/50"
                }`}
              >
                <div className="font-label uppercase text-[10px] font-bold tracking-widest text-primary mb-1 truncate">
                  {chat.title || "Untitled Session"}
                </div>
                <div className="text-[8px] text-outline font-mono uppercase">
                  ID: {chat?._id ? String(chat._id).slice(-8) : "N/A"}
                </div>
              </button>
            ))}
          </div>

          <div className="p-6 bg-surface-container-low border-t border-outline-variant/20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => messageInputRef.current?.focus()}
                className="w-10 h-10 bg-primary flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-on-primary">
                  terminal
                </span>
              </button>
              <div className="flex-1">
                <div className="font-label text-xs font-bold uppercase tracking-tighter">
                  {user?.fullname || "Guest"}
                </div>
                <div className="text-[10px] text-outline uppercase tracking-widest">
                  {user ? "Protocol Active" : "Awaiting login"}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative dot-pattern">
          <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
            <div className="flex justify-center">
              <div className="px-4 py-1 bg-surface-container-highest font-mono text-[10px] text-outline tracking-widest uppercase">
                {user
                  ? "Secure Neural Link Established // E2EE Active"
                  : "Authentication Required // Login to Continue"}
              </div>
            </div>

            {messages.length === 0 && !chatLoading && (
              <div className="max-w-2xl mx-auto p-6 border border-outline-variant/30 bg-surface-container-high">
                <p className="font-mono text-xs text-primary mb-3">
                  {user
                    ? "> Protocol ready. All queries are being archived to your secure ID."
                    : "> Identity verification required. Please authenticate via the landing portal."}
                </p>
                <p className="text-sm text-outline">
                  Select a previous session from the archive or initialize a new command sequence to begin data processing.
                </p>
              </div>
            )}

            {messages.map((item, index) => {
              const isUser = item.role === "user";
              return (
                <div
                  key={`${item.role}-${index}`}
                  className={`flex flex-col ${
                    isUser ? "items-end max-w-2xl ml-auto" : "items-start max-w-4xl"
                  }`}
                >
                  <div
                    className={`font-label text-[10px] uppercase tracking-widest mb-2 ${
                      isUser ? "text-outline" : "text-primary"
                    }`}
                  >
                    {isUser ? "USER" : "MONOLITH_CORE"} [{formatTime(item.createdAt)}]
                  </div>
                  <div
                    className={`p-5 border ${
                      isUser
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-high text-on-surface border-outline-variant/30 w-full"
                    }`}
                  >
                    <div className="font-body text-sm leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {chatLoading && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary animate-pulse"></div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  Processing your request...
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-surface-container-lowest border-t border-outline-variant/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end bg-surface-container-high border-2 border-outline-variant focus-within:border-primary transition-none">
                <textarea
                  ref={messageInputRef}
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  disabled={!user || chatLoading}
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 py-4 px-4 font-mono text-sm tracking-wider placeholder:text-outline-variant/50 resize-none no-scrollbar text-white disabled:opacity-50"
                  placeholder={
                    user
                      ? "INPUT COMMAND OR QUERY_"
                      : "AUTHENTICATION REQUIRED_"
                  }
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!user || !messageInput.trim() || chatLoading}
                  className="p-4 bg-primary text-on-primary hover:invert transition-none disabled:opacity-50"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    send
                  </span>
                </button>
              </div>

              {chatError && (
                <p className="mt-3 text-xs text-red-400 font-mono">{chatError}</p>
              )}

              <div className="mt-3 flex justify-between">
                <div className="flex gap-4">
                  <span className="font-mono text-[9px] text-outline uppercase tracking-widest">
                    [CTRL+ENTER] TO SEND
                  </span>
                  <span className="font-mono text-[9px] text-outline uppercase tracking-widest">
                    MONOLITH OS V4.2.0
                  </span>
                </div>
                <div className="font-mono text-[9px] text-primary uppercase tracking-widest">
                  SESSION_ID: {chatId ? String(chatId).slice(-8) : "INITIALIZING..."}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-4 bg-neutral-950 border-t border-outline-variant/10 z-50">
        <Link to="/#home" className="text-lg font-bold text-white font-headline uppercase">
          MONOLITH
        </Link>
        <div className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-600">
          (C) 2026 MONOLITHIC INTELLIGENCE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          <Link
            className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-none"
            to="/#flow"
          >
            PROTOCOL
          </Link>
          <Link
            className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-none"
            to="/terminal"
          >
            TERMINAL
          </Link>
          <Link
            className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-none"
            to="/#status"
          >
            STATUS
          </Link>
          <Link
            className="font-label text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-none"
            to="/#privacy"
          >
            PRIVACY
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ChatTerminal;
