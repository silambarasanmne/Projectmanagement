import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, FolderKanban, CheckSquare, Layers, Bug, Package, User, ArrowRight, X } from 'lucide-react';

export const CommandPalette = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    allProjects, 
    allTasks, 
    allApplications, 
    issues, 
    releases, 
    users, 
    navigateTo 
  } = useApp();
  
  const [query, setQuery] = useState('');

  if (!commandPaletteOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  // Search Results
  const filteredProjects = cleanQuery
    ? allProjects.filter(p => p.name.toLowerCase().includes(cleanQuery) || p.companyName.toLowerCase().includes(cleanQuery))
    : allProjects.slice(0, 3);

  const filteredTasks = cleanQuery
    ? allTasks.filter(t => t.taskName.toLowerCase().includes(cleanQuery) || t.projectName.toLowerCase().includes(cleanQuery))
    : allTasks.slice(0, 3);

  const filteredApps = cleanQuery
    ? allApplications.filter(a => a.name.toLowerCase().includes(cleanQuery) || a.platform.toLowerCase().includes(cleanQuery))
    : [];

  const filteredIssues = cleanQuery
    ? issues.filter(i => i.title.toLowerCase().includes(cleanQuery) || i.id.toLowerCase().includes(cleanQuery))
    : [];

  const filteredReleases = cleanQuery
    ? releases.filter(r => r.version.toLowerCase().includes(cleanQuery) || r.appName.toLowerCase().includes(cleanQuery))
    : [];

  const handleSelect = (tab, projId = null) => {
    setCommandPaletteOpen(false);
    setQuery('');
    navigateTo(tab, projId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900/90 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-900/95">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tasks, releases, apps, issues, or members... (Ctrl+K)"
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white text-xs">
              Clear
            </button>
          )}
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-3 space-y-4 text-sm divide-y divide-slate-800/60">
          {/* Quick Actions Shortcuts */}
          {!cleanQuery && (
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelect('projects')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all"
                >
                  <FolderKanban className="w-4 h-4 text-indigo-400" />
                  <span>Projects Workspace</span>
                </button>
                <button
                  onClick={() => handleSelect('releases')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all"
                >
                  <Package className="w-4 h-4 text-violet-400" />
                  <span>APK Release Hub</span>
                </button>
                <button
                  onClick={() => handleSelect('issues')}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all"
                >
                  <Bug className="w-4 h-4 text-rose-400" />
                  <span>Bug & Issue Tracker</span>
                </button>
              </div>
            </div>
          )}

          {/* Projects Results */}
          {filteredProjects.length > 0 && (
            <div className="pt-3 space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Projects</p>
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelect('project-detail', p.id)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800/80 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                      {p.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.companyName} • {p.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-indigo-400 font-semibold">{p.progress}%</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tasks Results */}
          {filteredTasks.length > 0 && (
            <div className="pt-3 space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tasks</p>
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleSelect('tasks')}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800/80 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-medium text-white group-hover:text-emerald-300 transition-colors">{t.taskName}</p>
                      <p className="text-xs text-slate-400">{t.projectName} • Assigned to {t.assignedToName}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Releases Results */}
          {filteredReleases.length > 0 && (
            <div className="pt-3 space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Releases</p>
              {filteredReleases.map((r) => (
                <div
                  key={r.id}
                  onClick={() => handleSelect('releases')}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800/80 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-violet-400 shrink-0" />
                    <div>
                      <p className="font-medium text-white">{r.appName} ({r.version})</p>
                      <p className="text-xs text-slate-400">Build {r.buildNumber} • {r.platform}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{r.releaseDate}</span>
                </div>
              ))}
            </div>
          )}

          {/* Issues Results */}
          {filteredIssues.length > 0 && (
            <div className="pt-3 space-y-1">
              <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Bug Tickets</p>
              {filteredIssues.map((i) => (
                <div
                  key={i.id}
                  onClick={() => handleSelect('issues')}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800/80 cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Bug className="w-4 h-4 text-rose-400 shrink-0" />
                    <div>
                      <p className="font-medium text-white">{i.id}: {i.title}</p>
                      <p className="text-xs text-slate-400">{i.projectName} • {i.severity} Severity</p>
                    </div>
                  </div>
                  <span className="text-xs text-rose-300 font-medium">{i.status}</span>
                </div>
              ))}
            </div>
          )}

          {cleanQuery && filteredProjects.length === 0 && filteredTasks.length === 0 && filteredApps.length === 0 && filteredIssues.length === 0 && (
            <div className="py-8 text-center text-slate-400">
              <p className="text-sm">No results found matching "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">Ctrl+K</kbd> anytime to open</span>
          <span>Enterprise Search Engine</span>
        </div>
      </div>
    </div>
  );
};
