import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Building, 
  FolderKanban, 
  Layers, 
  Package, 
  Bug, 
  Users 
} from 'lucide-react';

export const MobileBottomNav = () => {
  const { activeTab, navigateTo } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'companies', label: 'Companies', icon: Building },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'applications', label: 'Apps', icon: Layers },
    { id: 'releases', label: 'Releases', icon: Package },
    { id: 'team', label: 'Team', icon: Users }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-slate-400">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id || (activeTab === 'project-detail' && item.id === 'projects');

        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isActive
                ? 'text-indigo-400 font-bold bg-indigo-600/15'
                : 'hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'scale-110 text-indigo-400' : ''}`} />
            <span className="truncate max-w-[50px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
