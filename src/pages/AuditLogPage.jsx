import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Activity, User, Clock } from 'lucide-react';

export const AuditLogPage = () => {
  const { activities } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Super Admin Security Trail</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">System Audit Log</h1>
          <p className="text-xs text-slate-400 mt-1">Immutable security log of user actions, project state modifications, and release uploads.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
        {activities.map((act) => (
          <div key={act.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={act.userAvatar}
                alt={act.user}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-indigo-500/40"
              />
              <div>
                <p className="font-semibold text-white">
                  {act.user} <span className="font-normal text-slate-300">({act.action})</span>
                </p>
                <p className="text-[10px] text-indigo-400 font-medium">Module: {act.module} • {act.company}</p>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-mono">{act.time}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
