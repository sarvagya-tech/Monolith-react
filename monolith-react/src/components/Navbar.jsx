import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-neutral-950 text-white fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-8 py-6 max-w-full">
      <Link
        to="/#home"
        className="text-2xl font-black tracking-tighter text-white font-['Space_Grotesk'] uppercase"
      >
        MONOLITH
      </Link>
      <div className="hidden md:flex gap-12 font-['Space_Grotesk'] uppercase tracking-tighter font-bold">
        <Link className="text-white border-b-2 border-white pb-1" to="/#home">
          Home
        </Link>
        <Link className="text-neutral-500 hover:text-white transition-colors" to="/#flow">
          Systems
        </Link>
        <Link className="text-neutral-500 hover:text-white transition-colors" to="/#features">
          Core
        </Link>
        <Link className="text-neutral-500 hover:text-white transition-colors" to="/#status">
          Network
        </Link>
      </div>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="border-2 border-white bg-transparent text-white px-6 py-2 font-['Space_Grotesk'] font-bold tracking-tighter hover:bg-white hover:text-black transition-colors uppercase"
        >
          LOGIN
        </Link>
        <Link
          to="/register"
          className="bg-white text-black px-6 py-2 font-['Space_Grotesk'] font-bold tracking-tighter hover:bg-neutral-200 transition-none uppercase"
        >
          REGISTER
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
