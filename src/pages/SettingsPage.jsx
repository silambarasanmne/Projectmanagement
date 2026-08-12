import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, ShieldCheck, Database, RefreshCw, Trash2, Sparkles } from 'lucide-react';

export const SettingsPage = () => {
  const { addToast, clearAllData, loadDemoData } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Administrative Control Panel</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">System Settings & Data Management</h1>
          <p className="text-xs text-slate-400 mt-1">Configure global application preferences, security policies, and reset or seed workspace tables.</p>
        </div>
      </div>

      {/* Clear / Reset Data Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <span>Workspace Data Reset & Seeding</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <p className="font-bold text-white text-sm">Clear Mock Data (Start Fresh)</p>
              <p className="text-xs text-slate-400 mt-1">Deletes sample projects, releases, apps, and issue tickets so you can create newly from scratch.</p>
            </div>
            <button
              onClick={clearAllData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-200 border border-rose-500/30 text-xs font-semibold transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Mock Data</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <p className="font-bold text-white text-sm">Load Demo Sample Data</p>
              <p className="text-xs text-slate-400 mt-1">Populates the application with sample projects, releases, and employees for testing.</p>
            </div>
            <button
              onClick={loadDemoData}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/30 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Sample Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Role Permission Matrix Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span>Role-Based Access Control (RBAC) Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Permission Scope</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
                <th className="py-3 px-4 text-center">Project Manager</th>
                <th className="py-3 px-4 text-center">Developer / Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {[
                { name: 'Manage System Users & Credentials', admin: true, manager: false, dev: false },
                { name: 'Create & Edit Projects', admin: true, manager: true, dev: false },
                { name: 'Upload APK Releases & Builds', admin: true, manager: true, dev: true },
                { name: 'Access Audit Logs & Reports', admin: true, manager: true, dev: false },
                { name: 'System Data Reset', admin: true, manager: false, dev: false }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 text-white font-semibold">{row.name}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400">{row.admin ? '✓ Allowed' : '—'}</td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-400">{row.manager ? '✓ Allowed' : '— Restricted'}</td>
                  <td className="py-3 px-4 text-center font-bold text-slate-400">{row.dev ? '✓ Allowed' : '— Restricted'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
