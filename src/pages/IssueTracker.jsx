import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bug, Plus, Filter, Trash2 } from 'lucide-react';

export const IssueTracker = ({ onOpenModal }) => {
  const { issues, updateIssueStatus, deleteIssue } = useApp();
  const [severityFilter, setSeverityFilter] = useState('All');

  const filteredIssues = issues.filter((i) => {
    if (severityFilter === 'All') return true;
    return i.severity === severityFilter;
  });

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'Critical': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'High': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default: return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Bug className="w-4 h-4" />
            <span>Defect & Vulnerability Management</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Bug & Issue Tracker</h1>
          <p className="text-xs text-slate-400 mt-1">Track critical bugs, software defects, severity escalations, and resolutions.</p>
        </div>

        <button
          onClick={() => onOpenModal('issue')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-pink-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Report Bug Issue</span>
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Filter Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="glass-input px-3 py-1.5 rounded-xl bg-slate-900"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Ticket ID & Title</th>
                <th className="px-4 py-4">Project / App</th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">Assigned Engineer</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredIssues.map((issue) => (
                <tr key={issue.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-rose-400 font-mono font-bold">{issue.id}</span>
                    <p className="font-bold text-white text-sm mt-0.5">{issue.title}</p>
                    <p className="text-[11px] text-slate-400 font-normal line-clamp-1">{issue.description}</p>
                  </td>
                  <td className="px-4 py-4 text-slate-300">
                    <p className="font-semibold text-white">{issue.projectName}</p>
                    <p className="text-[10px] text-slate-400">{issue.applicationName}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300 font-semibold">{issue.assignedTo}</td>
                  <td className="px-4 py-4 font-semibold text-indigo-400">{issue.status}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={issue.status}
                        onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                        className="glass-input px-2 py-1 rounded-lg bg-slate-900 text-xs font-medium"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete bug ticket ${issue.id}?`)) deleteIssue(issue.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-950/40 transition-all"
                        title="Delete Bug Ticket"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
