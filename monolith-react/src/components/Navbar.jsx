import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-neutral-950/95 backdrop-blur-md text-white fixed top-0 left-0 right-0 z-50 border-b border-white/10 px-6 md:px-12 py-5">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <Link
          to="/#home"
          className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white font-headline uppercase group"
        >
          <div className="w-2.5 h-2.5 bg-white group-hover:scale-125 transition-transform"></div>
          <span>MONOLITH</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 border border-white/30 text-white/70 tracking-widest hidden sm:inline-block">
            V4.2
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 font-headline uppercase tracking-tighter font-bold text-xs">
          <Link className="text-white hover:text-white transition-colors" to="/#home">
            HOME
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#flow">
            SYSTEMS
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#features">
            FEATURES
          </Link>
          <Link className="text-neutral-400 hover:text-white transition-colors" to="/#status">
            METRICS
          </Link>
          <Link
            className="text-white bg-white/10 border border-white/20 px-3 py-1 hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
            to="/terminal"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            TERMINAL
          </Link>
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="text-right font-mono text-[11px] leading-tight hidden lg:block">
                <span className="text-emerald-400 block text-[9px] uppercase tracking-widest font-bold">OPERATIVE ONLINE</span>
                <span className="text-neutral-300 font-semibold truncate max-w-[150px] inline-block">{user.fullname || user.email}</span>
              </div>
              <Link
                to="/terminal"
                className="bg-white text-black px-5 py-2 font-headline font-bold text-xs tracking-tighter hover:bg-neutral-200 transition-none uppercase"
              >
                ENTER TERMINAL
              </Link>
              <button
                onClick={handleLogout}
                className="border border-white/30 text-white px-4 py-2 font-headline font-bold text-xs tracking-tighter hover:bg-white/10 transition-colors uppercase"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="border border-white/40 bg-transparent text-white px-5 py-2 font-headline font-bold text-xs tracking-tighter hover:bg-white hover:text-black transition-colors uppercase"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="bg-white text-black px-5 py-2 font-headline font-bold text-xs tracking-tighter hover:bg-neutral-200 transition-none uppercase shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
              >
                REQUEST ACCESS
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden pt-6 pb-4 border-t border-white/10 mt-4 space-y-4 font-headline uppercase font-bold text-sm">
          <Link
            to="/#home"
            onClick={() => setMobileOpen(false)}
            className="block text-white hover:text-neutral-300"
          >
            HOME
          </Link>
          <Link
            to="/#flow"
            onClick={() => setMobileOpen(false)}
            className="block text-neutral-400 hover:text-white"
          >
            SYSTEMS
          </Link>
          <Link
            to="/#features"
            onClick={() => setMobileOpen(false)}
            className="block text-neutral-400 hover:text-white"
          >
            FEATURES
          </Link>
          <Link
            to="/#status"
            onClick={() => setMobileOpen(false)}
            className="block text-neutral-400 hover:text-white"
          >
            METRICS
          </Link>
          <Link
            to="/terminal"
            onClick={() => setMobileOpen(false)}
            className="block text-white bg-white/10 p-3 border border-white/20"
          >
            TERMINAL CORE
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {user ? (
              <>
                <div className="font-mono text-xs text-neutral-400">
                  Signed in as: <span className="text-white">{user.email}</span>
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center border border-white/40 py-2.5 text-xs tracking-widest uppercase hover:bg-white/10"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center border border-white/40 py-2.5 text-xs tracking-widest uppercase"
                >
                  LOGIN
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center bg-white text-black py-2.5 text-xs tracking-widest uppercase"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
