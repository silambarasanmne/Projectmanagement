import React from 'react';
import { useApp } from '../context/AppContext';
import { Calendar as CalendarIcon, Clock, Package, Flag } from 'lucide-react';

export const CalendarView = () => {
  const { projects, tasks, releases } = useApp();

  const events = [
    { title: 'OmniPay PCI Audit Deadline', date: '2026-08-15', type: 'project', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
    { title: 'APK v2.4.1 Release Testing', date: '2026-08-18', type: 'release', color: 'bg-violet-500/20 text-violet-300 border-violet-500/40' },
    { title: 'Apex Field Force Milestone 4', date: '2026-08-20', type: 'milestone', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
    { title: 'CyberGuard OAuth Integration', date: '2026-08-25', type: 'task', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
    { title: 'Nexus Marketplace iOS Beta', date: '2026-09-01', type: 'project', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Timeline Planning</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Schedule & Release Calendar</h1>
          <p className="text-xs text-slate-400 mt-1">Calendar view of project deadlines, task due dates, APK releases, and milestone targets.</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-heading text-lg font-bold text-white">Upcoming Target Schedule (August - September 2026)</h3>

        <div className="space-y-3 text-xs">
          {events.map((ev, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between ${ev.color}`}>
              <div className="flex items-center gap-3">
                {ev.type === 'release' ? <Package className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                <div>
                  <p className="font-bold text-white text-sm">{ev.title}</p>
                  <p className="text-[11px] opacity-80 uppercase tracking-wider font-semibold">{ev.type} target</p>
                </div>
              </div>
              <span className="font-mono font-bold text-sm">{ev.date}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
