import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, Download, Plus, FileCode, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReleaseManager = ({ onOpenModal }) => {
  const { releases } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>DevOps Deployment Hub</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">APK & App Release Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Manage Android APK builds, iOS bundles, release notes, and version archives.</p>
        </div>

        <button
          onClick={() => onOpenModal('release')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Release Build</span>
        </button>
      </div>

      {/* Release Items List */}
      <div className="space-y-6">
        {releases.map((rel) => (
          <div key={rel.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-white">{rel.appName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {rel.version}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
                      Build #{rel.buildNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">Platform: {rel.platform} • Published on {rel.releaseDate} by {rel.uploadedBy}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  rel.status === 'Published' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {rel.status}
                </span>

                <button
                  onClick={() => alert(`Downloading binary package: ${rel.fileName || 'app-release.apk'}`)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Package ({rel.fileSize || '38 MB'})</span>
                </button>
              </div>
            </div>

            {/* Release Notes */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs font-mono">
              <p className="text-slate-400 font-sans font-semibold mb-1 uppercase tracking-wider text-[10px]">Release Notes & Changelog</p>
              <pre className="text-slate-200 whitespace-pre-wrap leading-relaxed font-mono text-[11px]">
                {rel.releaseNotes}
              </pre>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
