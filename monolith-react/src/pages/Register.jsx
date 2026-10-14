import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../hooks/useAuth';
import CanvasBackground from '../components/CanvasBackground';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signUp } = useAuth();

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      navigate('/terminal');
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Passcode must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passcodes do not match. Please verify both fields.');
      return;
    }

    setLoading(true);

    try {
      await signUp({ fullname, email, password });
      navigate('/terminal');
    } catch (err) {
      setError(
        err?.message ||
        err?.response?.data?.message ||
        'Registration failed. Please try again with a valid email.'
      );
    } finally {
      setLoading(false);
    }
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
                Request Access
              </h1>
            </div>
            <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.25em]">
              Establish operative link // cloud session registration
            </p>
          </div>

          {error && (
            <div className="bg-red-950/40 border border-red-500/50 text-red-400 font-mono text-xs p-3.5 mb-6 uppercase tracking-wider flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">error</span>
              <span>&gt; ERROR: {error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 flex flex-col font-mono uppercase tracking-wider text-sm">
            <div className="flex flex-col space-y-1.5">
              <label className="text-xs text-neutral-300 tracking-widest flex justify-between">
                <span>Operative Name (Fullname)</span>
                <span className="text-[10px] text-neutral-500 lowercase font-normal">required</span>
              </label>
              <input
                type="text"
                placeholder="OPERATIVE NAME"
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 font-mono text-xs"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-1.5">
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

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs text-neutral-300 tracking-widest flex justify-between">
                <span>Passcode (Min. 6 Characters)</span>
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

            <div className="flex flex-col space-y-1.5">
              <label className="text-xs text-neutral-300 tracking-widest flex justify-between">
                <span>Confirm Passcode</span>
                <span className="text-[10px] text-neutral-500 lowercase font-normal">required</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 font-mono text-xs"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full ${
                loading ? 'bg-neutral-600' : 'bg-white hover:bg-neutral-200'
              } text-black py-4 font-headline uppercase tracking-widest font-black text-xs transition-colors flex items-center justify-center space-x-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}
            >
              <span>{loading ? 'Establishing Link...' : 'Establish Operative Link'}</span>
              {!loading && <span className="material-symbols-outlined text-[18px]">how_to_reg</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center font-mono text-xs uppercase text-neutral-400">
            <span>Already an operative? </span>
            <Link to="/login" className="text-white hover:underline ml-1 font-bold">
              Initialize Session
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
