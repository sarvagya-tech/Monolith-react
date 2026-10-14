import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import CanvasBackground from '../components/CanvasBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If user is already logged in, redirect them immediately
  useEffect(() => {
    if (user) {
      navigate('/terminal');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setLoading(true);

    try {
      const data = await login({ email, password });
      if (data && (data.accessToken || data.user)) {
        navigate('/terminal');
      } else {
        setError('Authentication completed but no active token received.');
      }
    } catch (err) {
      setError(
        err?.message ||
        err?.response?.data?.message ||
        'Authentication failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLostAccess = (e) => {
    e.preventDefault();
    setInfoMessage(
      'Notice: To reset credentials or recover access, please register a new operative account or contact your system administrator.'
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131313] text-white relative">
      <CanvasBackground />
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-28 pb-16 technical-grid dot-pattern relative z-10 px-4">
        <div className="w-full max-w-md bg-[#131313]/90 backdrop-blur-md border border-white/20 p-8 md:p-10 shadow-[0_0_60px_rgba(255,255,255,0.06)] relative z-10">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white"></div>
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white"></div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <h1 className="text-3xl font-black font-headline tracking-tighter uppercase leading-none">
                System Login
              </h1>
            </div>
            <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.25em]">
              Operative authentication // secure terminal gateway
            </p>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-500/50 text-red-400 font-mono text-xs p-3.5 mb-6 uppercase tracking-wider flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">error</span>
              <span>&gt; ERROR: {error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="bg-blue-950/40 border border-blue-500/50 text-blue-300 font-mono text-xs p-3.5 mb-6 leading-relaxed">
              &gt; {infoMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 flex flex-col font-mono uppercase tracking-wider text-sm">
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-neutral-300 tracking-widest flex justify-between">
                <span>Operative Identifier (Email)</span>
                <span className="text-[10px] text-neutral-500 lowercase font-normal">required</span>
              </label>
              <input
                type="email"
                placeholder="OPERATIVE@MONOLITH.CORE"
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 font-mono text-xs"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs text-neutral-300 tracking-widest flex justify-between">
                <span>Passcode (Password)</span>
                <span className="text-[10px] text-neutral-500 lowercase font-normal">required</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-neutral-900 border border-white/20 px-4 py-3 pr-10 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 font-mono text-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-neutral-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <span className="material-symbols-outlined text-sm">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="bg-neutral-900 border-white/30 text-white rounded-none cursor-pointer focus:ring-0"
                />
                <span>Persist Session</span>
              </label>
              <button
                type="button"
                onClick={handleLostAccess}
                className="text-neutral-400 hover:text-white transition-colors underline cursor-pointer"
              >
                Lost access?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full ${
                loading ? 'bg-neutral-600' : 'bg-white hover:bg-neutral-200'
              } text-black py-4 font-headline uppercase tracking-widest font-black text-xs transition-colors flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}
            >
              <span>{loading ? 'Authenticating Operative...' : 'Initialize Session'}</span>
              {!loading && <span className="material-symbols-outlined text-[18px]">login</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center font-mono text-xs uppercase text-neutral-400">
            <span>Need an operative link? </span>
            <Link to="/register" className="text-white hover:underline ml-1 font-bold">
              Request Access
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
