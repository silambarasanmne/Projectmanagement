import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layers, Globe, Smartphone, Code2, Plus, ExternalLink, CheckCircle2 } from 'lucide-react';


export const AppInventory = ({ onOpenModal }) => {
  const { applications } = useApp();
  const [filterType, setFilterType] = useState('All');

  const filteredApps = applications.filter(a => {
    if (filterType === 'All') return true;
    return a.type.includes(filterType);
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Software Assets Portfolio</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Application Catalog</h1>
          <p className="text-xs text-slate-400 mt-1">Web applications, Android APK builds, iOS packages, and microservice APIs.</p>
        </div>

        <button
          onClick={() => onOpenModal('release')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Application Build</span>
        </button>
      </div>

      {/* Type Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Web', 'Android', 'iOS', 'API'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              filterType === t
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'glass-panel text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            {t} Applications
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.map((app) => (
          <div key={app.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-violet-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-violet-400">{app.type}</span>
                <h3 className="font-heading text-xl font-bold text-white mt-0.5">{app.name}</h3>
                <p className="text-xs text-slate-400">{app.companyName} • Lead Dev: {app.developer}</p>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {app.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Current Build Version</span>
                <span className="font-mono font-bold text-indigo-400">{app.version}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Target Platform</span>
                <span className="font-semibold text-slate-200">{app.platform}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Tech Stack</span>
                <span className="font-semibold text-slate-200">{app.technology}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              {app.productionUrl && (
                <a
                  href={app.productionUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-indigo-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Production App</span>
                </a>
              )}

              {app.repository && (
                <a
                  href={app.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Code Repo</span>
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
