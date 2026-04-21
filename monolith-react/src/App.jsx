import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import ChatTerminal from './pages/ChatTerminal';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error Boundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col h-screen items-center justify-center bg-background text-primary p-8 text-center font-mono uppercase tracking-[0.2em] border-2 border-primary m-4">
          <h2 className="text-xl font-bold mb-4">CRITICAL SYSTEM FAILURE</h2>
          <p className="text-xs text-on-surface-variant mb-8 max-w-md">The neural link has been disrupted. Please attempt to re-initialize the connection.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-on-primary px-8 py-3 font-bold hover:invert transition-none"
          >
            RE-INITIALIZE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hash, pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Make sure body has the right classes set to dark layout mode
    document.documentElement.classList.add('dark');
    document.body.classList.add('antialiased');
    document.body.setAttribute('data-mode', 'connect');
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/terminal" element={<ChatTerminal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
