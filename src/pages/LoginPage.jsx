import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = login(username, password);
      if (!res.success) {
        setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
      }
    }, 600);
  };

  const handleQuickFill = (u, p) => {
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 overflow-hidden bg-[#0B0F19]">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-2xl shadow-indigo-600/40 mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            NEXUS<span className="text-indigo-400">GROUP</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">
            Enterprise Project Management Suite
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-700/60 shadow-2xl backdrop-blur-2xl animate-fade-in">
          
          <div className="mb-6 text-center">
            <h2 className="font-heading text-xl font-bold text-white">Welcome Back</h2>
            <p className="text-xs text-slate-400 mt-1">Sign in to your Group Workspace account</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Username or Corporate Email</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin / manager / developer"
                  className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full glass-input pl-10 pr-10 py-2.5 rounded-xl text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs py-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Remember this device</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact IT Helpdesk to reset corporate credentials."); }} className="text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Workspace</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Demo Accounts Selector Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Demo Roles</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('admin', 'Admin@123')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  username === 'admin' 
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-semibold' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <p className="font-bold">Super Admin</p>
                <p className="text-[9px] text-slate-400">admin</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('manager', 'Manager@123')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  username === 'manager' 
                    ? 'bg-violet-600/30 border-violet-500 text-violet-200 font-semibold' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <p className="font-bold">Manager</p>
                <p className="text-[9px] text-slate-400">manager</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('developer', 'Developer@123')}
                className={`p-2 rounded-xl border text-center transition-all ${
                  username === 'developer' 
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-semibold' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <p className="font-bold">Developer</p>
                <p className="text-[9px] text-slate-400">developer</p>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-500">
          <p>© 2026 Nexus Group of Companies • Protected by CyberGuard OAuth2</p>
        </div>

      </div>
    </div>
  );
};
