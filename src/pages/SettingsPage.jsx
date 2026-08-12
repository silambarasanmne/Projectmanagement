import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, ShieldCheck, Database, Sliders, Bell } from 'lucide-react';

export const SettingsPage = () => {
  const { addToast } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4" />
            <span>Administrative Control Panel</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">System Settings & Permissions Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">Configure global application preferences, security policies, and database backup schedules.</p>
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
                { name: 'Manage System Users & Roles', admin: true, manager: false, dev: false },
                { name: 'Create & Edit Projects', admin: true, manager: true, dev: false },
                { name: 'Upload APK Releases & Builds', admin: true, manager: true, dev: true },
                { name: 'Manage Kanban Tasks & Statuses', admin: true, manager: true, dev: true },
                { name: 'Access Audit Logs & Reports', admin: true, manager: true, dev: false },
                { name: 'System Backup & Restore', admin: true, manager: false, dev: false }
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

      {/* Backup Simulation Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-violet-400" />
          <div>
            <h4 className="font-heading text-base font-bold text-white">Database Backup & Recovery</h4>
            <p className="text-xs text-slate-400">Trigger an automated snapshot backup of PostgreSQL database.</p>
          </div>
        </div>

        <button
          onClick={() => addToast('success', 'Backup Triggered', 'Database snapshot backup archive created successfully.')}
          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
        >
          Backup Now
        </button>
      </div>

    </div>
  );
};
