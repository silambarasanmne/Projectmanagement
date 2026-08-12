import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Building, 
  FolderKanban, 
  CheckSquare, 
  Layers, 
  Package, 
  Bug, 
  Users, 
  Calendar as CalendarIcon, 
  BarChart3, 
  ShieldAlert, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    activeTab, 
    navigateTo, 
    isSidebarCollapsed, 
    setIsSidebarCollapsed, 
    mobileMenuOpen, 
    setMobileMenuOpen,
    currentUser,
    logout
  } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, role: 'all' },
    { id: 'companies', label: 'Group Companies', icon: Building, role: 'all' },
    { id: 'projects', label: 'Projects Workspace', icon: FolderKanban, role: 'all' },
    { id: 'applications', label: 'Applications', icon: Layers, role: 'all' },
    { id: 'releases', label: 'APK Release Hub', icon: Package, role: 'all', badge: 'v2.4.1' },
    { id: 'issues', label: 'Bug & Issue Tracker', icon: Bug, role: 'all' },
    { id: 'team', label: 'Team Directory', icon: Users, role: 'all' },
    { id: 'calendar', label: 'Schedule Calendar', icon: CalendarIcon, role: 'all' },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3, role: 'all' },
    { id: 'audit', label: 'Audit Trail', icon: ShieldAlert, role: 'admin' },
    { id: 'settings', label: 'Settings', icon: Settings, role: 'admin' }
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.role === 'admin' && currentUser?.roleKey !== 'admin') return false;
    return true;
  });

  const renderContent = () => (
    <div className="flex flex-col h-full justify-between p-3">
      {/* Upper Navigation Menu */}
      <div className="space-y-6">
        {/* Toggle Collapse Button on Desktop */}
        <div className="hidden lg:flex items-center justify-between px-2 py-1">
          {!isSidebarCollapsed && (
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigation</span>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'project-detail' && item.id === 'projects');

            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {!isSidebarCollapsed && item.badge && (
                  <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Lower User Card Footer */}
      {currentUser && (
        <div className="pt-4 border-t border-slate-800/80">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} p-2 rounded-xl bg-slate-900/60 border border-slate-800/60`}>
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-indigo-500/50"
              />
              {!isSidebarCollapsed && (
                <div className="text-left text-xs truncate max-w-[110px]">
                  <p className="font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{currentUser.role}</p>
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <button
                onClick={logout}
                className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Glass Sidebar */}
      <aside
        className={`hidden lg:block sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-800/80 bg-slate-950/60 backdrop-blur-xl transition-all duration-300 z-30 shrink-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {renderContent()}
      </aside>

      {/* Mobile Drawer Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-full bg-slate-950 border-r border-slate-800 h-full z-10 animate-fade-in">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};
