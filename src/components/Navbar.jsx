import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Plus, 
  User, 
  LogOut, 
  CheckCircle2, 
  Package, 
  Bug, 
  FolderPlus, 
  CheckSquare, 
  Menu, 
  X,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

export const Navbar = ({ onOpenModal }) => {
  const { 
    currentUser, 
    logout, 
    theme, 
    toggleTheme, 
    activeCompanyId, 
    setActiveCompanyId, 
    companies, 
    notifications, 
    markAllNotificationsRead, 
    setCommandPaletteOpen,
    navigateTo,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const quickRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (quickRef.current && !quickRef.current.contains(e.target)) setQuickCreateOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userNotifications = notifications.filter(n => 
    !n.targetUserId || 
    n.targetUserId === currentUser?.id || 
    n.targetUserName?.toLowerCase() === currentUser?.name?.toLowerCase() ||
    currentUser?.roleKey === 'admin'
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;
  const currentCompany = companies.find(c => c.id === activeCompanyId) || companies[0];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu & Company Switcher */}
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Group Logo */}
          <div 
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-extrabold text-lg text-white tracking-tight leading-none block">
                NEXUS<span className="text-indigo-400">GROUP</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block">
                Enterprise PM Suite
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block mx-1" />

          {/* Company Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200 hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all"
            >
              <span className="text-base">{currentCompany.logo}</span>
              <span className="max-w-[130px] sm:max-w-[180px] truncate">{currentCompany.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {companyDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 glass-panel bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-fade-in">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Group Company
                </div>
                {companies.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setActiveCompanyId(comp.id);
                      setCompanyDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium transition-colors ${
                      activeCompanyId === comp.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border-l-2 border-indigo-500'
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{comp.logo}</span>
                      <div>
                        <p>{comp.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{comp.code}</p>
                      </div>
                    </div>
                    {comp.projectsCount && (
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                        {comp.projectsCount} Projs
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Command Palette Trigger Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:border-slate-700 hover:bg-slate-900/90 transition-all text-xs"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search projects, tasks, apps, bugs...</span>
            </div>
            <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Section: Actions, Notifications, Theme & Profile */}
        <div className="flex items-center gap-2.5">

          {/* Quick Action Button */}
          {currentUser && currentUser.roleKey !== 'developer' && (
            <div className="relative" ref={quickRef}>
              <button
                onClick={() => setQuickCreateOpen(!quickCreateOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Quick Create</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {quickCreateOpen && (
                <div className="absolute right-0 mt-2 w-48 glass-panel bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
                  <button
                    onClick={() => { setQuickCreateOpen(false); onOpenModal('project'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-indigo-600/20 hover:text-white"
                  >
                    <FolderPlus className="w-4 h-4 text-indigo-400" />
                    <span>New Project</span>
                  </button>
                  <button
                    onClick={() => { setQuickCreateOpen(false); onOpenModal('release'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-violet-600/20 hover:text-white"
                  >
                    <Package className="w-4 h-4 text-violet-400" />
                    <span>Upload APK Release</span>
                  </button>
                  <button
                    onClick={() => { setQuickCreateOpen(false); onOpenModal('issue'); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-rose-600/20 hover:text-white"
                  >
                    <Bug className="w-4 h-4 text-rose-400" />
                    <span>Report Bug Issue</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-panel bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white text-sm">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-indigo-400 hover:underline"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {userNotifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No notifications</p>
                  ) : (
                    userNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setNotificationsOpen(false);
                          if (n.projectId) {
                            navigateTo('project-detail', n.projectId);
                          } else if (n.link) {
                            navigateTo(n.link);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          n.read
                            ? 'bg-slate-900/40 border-slate-800/60 text-slate-400'
                            : 'bg-indigo-950/20 border-indigo-500/20 text-slate-200 font-medium'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time || n.timestamp || 'Just now'}</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
                        {n.fromUser && (
                          <p className="text-[10px] text-indigo-400 mt-1 font-semibold">From: {n.fromUser}</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-800 mx-1" />

          {/* User Profile Avatar Dropdown */}
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/60 transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/40"
                />
                <div className="hidden xl:block text-left text-xs">
                  <p className="font-semibold text-white leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-indigo-400 font-medium">{currentUser.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-panel bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-800 mb-1">
                    <p className="font-semibold text-white text-xs">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                    <div className="mt-1.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">{currentUser.role}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setProfileOpen(false); navigateTo('profile'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-white"
                  >
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>My Profile</span>
                  </button>

                  {currentUser.roleKey === 'admin' && (
                    <button
                      onClick={() => { setProfileOpen(false); navigateTo('settings'); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-200 hover:bg-slate-800/80 hover:text-white"
                    >
                      <Building2 className="w-4 h-4 text-violet-400" />
                      <span>Admin Settings</span>
                    </button>
                  )}

                  <div className="border-t border-slate-800 my-1" />

                  <button
                    onClick={() => { setProfileOpen(false); logout(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigateTo('login')}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500"
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
