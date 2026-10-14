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

    if (password !== confirmPassword) {
      setError('Passcodes do not match.');
      return;
    }

    setLoading(true);

    try {
      await signUp({ fullname, email, password });
      // signUp automatically logs in and user state update will trigger redirection via useEffect
    } catch (err) {
      setError(err?.message || err?.response?.data?.message || 'Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#131313] text-white relative">
      <CanvasBackground />
      <Navbar />
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 technical-grid dot-pattern relative z-10">
        <div className="w-full max-w-md bg-[#131313]/80 backdrop-blur-md border border-white/20 p-8 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative z-10">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white"></div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
              <h1 className="text-3xl font-black font-['Space_Grotesk'] tracking-tighter uppercase leading-none">Request Access</h1>
            </div>
            <p className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.3em] pl-4">
              Register new neural link link // reg_id: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-500 font-mono text-xs p-3 mb-6 uppercase tracking-widest">
              &gt; ERROR: {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5 flex flex-col font-mono uppercase tracking-wider text-sm">
            <div className="flex flex-col space-y-2 relative">
              <label className="text-xs text-neutral-300">Designation</label>
              <input 
                type="text" 
                placeholder="OPERATIVE NAME" 
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 no-scrollbar"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label className="text-xs text-neutral-300">Identifier</label>
              <input 
                type="email" 
                placeholder="NEW_USER@MONOLITH.CORE" 
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 no-scrollbar"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col space-y-2 relative">
              <label className="text-xs text-neutral-300">Passcode</label>
              <input 
                type="password" 
                placeholder="********" 
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 no-scrollbar"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-2 relative">
              <label className="text-xs text-neutral-300">Confirm Passcode</label>
              <input 
                type="password" 
                placeholder="********" 
                className="bg-neutral-900 border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-neutral-600 no-scrollbar"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`mt-6 w-full ${loading ? 'bg-neutral-500' : 'bg-white hover:bg-neutral-200'} text-black py-4 font-['Space_Grotesk'] uppercase tracking-widest font-bold transition-colors flex items-center justify-center space-x-2`}
            >
              <span>{loading ? 'Establishing Link...' : 'Establish Link'}</span>
              {!loading && <span className="material-symbols-outlined text-[18px]">how_to_reg</span>}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center font-mono text-xs uppercase text-neutral-500">
            <span>Existing user? </span>
            <Link to="/login" className="text-white hover:underline ml-1">Initialize Session</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
