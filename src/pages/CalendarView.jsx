import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, ChevronLeft, ChevronRight, Package, FolderKanban } from 'lucide-react';

export const CalendarView = () => {
  const { projects, releases } = useApp();
  const [currentMonth] = useState('August 2026');

  // Convert actual releases and projects into calendar events
  const calendarEvents = [
    ...projects.map(p => ({
      id: p.id,
      title: `Project Milestone: ${p.name}`,
      date: p.dueDate || '2026-08-25',
      type: 'project',
      status: p.status
    })),
    ...releases.map(r => ({
      id: r.id,
      title: `APK Release: ${r.appName} (${r.version})`,
      date: r.releaseDate || '2026-08-28',
      type: 'release',
      status: r.status
    }))
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Schedule Governance</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Project & Release Calendar</h1>
          <p className="text-xs text-slate-400 mt-1">Track milestone target deadlines, APK release schedules, and deployment dates.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-xs">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>{currentMonth}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Events List */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-heading text-base font-bold text-white mb-2">Scheduled Events & Milestones</h3>

        {calendarEvents.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <Calendar className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-white">No Scheduled Calendar Events</p>
            <p className="text-xs text-slate-400">Events will appear automatically when projects or releases are created.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calendarEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    evt.type === 'release' 
                      ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' 
                      : 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {evt.type === 'release' ? <Package className="w-5 h-5" /> : <FolderKanban className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-xs">{evt.title}</h4>
                    <p className="text-[11px] text-slate-400">Date: {evt.date}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                  {evt.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
