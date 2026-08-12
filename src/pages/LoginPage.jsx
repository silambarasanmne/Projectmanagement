import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, User, ArrowRight, Building, Eye, EyeOff, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    const userToLogin = (username || 'admin').trim();
    const passToLogin = (password || 'Admin@123').trim();

    setIsLoading(true);
    setTimeout(() => {
      const res = login(userToLogin, passToLogin);
      setIsLoading(false);
      if (res && res.error) {
        setErrorMessage(res.error);
      }
    }, 250);
  };

  const handleQuickDemoLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      const res = login(user, pass);
      setIsLoading(false);
      if (res && res.error) {
        setErrorMessage(res.error);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-slate-100 p-4 relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative z-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-600/30 text-white mb-2">
            <Building className="w-7 h-7" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white tracking-tight">Enterprise Group PM</h1>
          <p className="text-xs text-slate-400">Corporate Multi-Company Governance Portal</p>
        </div>

        {/* Visible Error Banner for Mobile Browser visibility */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5 shadow-lg animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Clean Mobile-Optimized Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Username or Email *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                name="username"
                id="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="admin"
                className="w-full glass-input pl-10 pr-4 py-3 rounded-xl text-white font-medium text-sm focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                name="password"
                id="password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="••••••••••••"
                className="w-full glass-input pl-10 pr-10 py-3 rounded-xl text-white text-sm focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors p-0.5"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all text-xs cursor-pointer active:scale-[0.98]"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Corporate Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Mobile 1-Tap Quick Login Box */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Mobile 1-Tap Instant Sign In</span>
            </span>
            <span className="text-slate-500 text-[10px]">Select Role</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin', 'Admin@123')}
              className="py-2.5 px-3 rounded-xl bg-indigo-600/25 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span>⚡ Super Admin</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('manager', 'Manager@123')}
              className="py-2.5 px-3 rounded-xl bg-violet-600/25 hover:bg-violet-600 text-violet-200 border border-violet-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span>💼 Project Manager</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('tester', 'Tester@123')}
              className="py-2.5 px-3 rounded-xl bg-amber-600/25 hover:bg-amber-600 text-amber-200 border border-amber-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span>🧪 QA Tester</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('developer', 'Developer@123')}
              className="py-2.5 px-3 rounded-xl bg-emerald-600/25 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
            >
              <span>💻 Developer</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

