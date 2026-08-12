import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bug, UserCheck } from 'lucide-react';

export const ReportIssueModal = ({ isOpen, onClose }) => {
  const { allProjects, allApplications, users, addIssue } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    projectId: allProjects[0]?.id || 'proj-101',
    applicationName: allApplications[0]?.name || 'OmniPay Cloud Platform',
    assignedToId: users[2]?.id || users[0]?.id || '',
    assignedTo: users[2]?.name || users[0]?.name || 'David Chen',
    severity: 'High',
    priority: 'High',
    dueDate: '2026-08-20',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const proj = allProjects.find(p => p.id === formData.projectId);
    const assignedUser = users.find(u => u.id === formData.assignedToId) || users[0];

    addIssue({
      ...formData,
      assignedTo: assignedUser ? `${assignedUser.name} (${assignedUser.designation})` : formData.assignedTo,
      projectName: proj?.name || 'Enterprise Project'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Bug className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Report Bug Issue</h3>
              <p className="text-xs text-slate-400">Assign defect ticket to registered team member</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Issue Headline *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Memory leak during video render export"
              className="w-full glass-input px-3 py-2 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Affected Project</label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                {allProjects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Application Name</label>
              <select
                value={formData.applicationName}
                onChange={(e) => setFormData({ ...formData, applicationName: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                {allApplications.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assigned Employee Selection Dropdown */}
          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
            <label className="block text-rose-300 font-semibold mb-1 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-rose-400" />
              <span>Assign Responsible Employee *</span>
            </label>
            <select
              value={formData.assignedToId}
              onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
              className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900 text-white font-medium"
            >
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} — {u.designation} ({u.department})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Severity Level</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Resolution Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Reproduction Steps & Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe steps to reproduce the defect..."
              className="w-full glass-input px-3 py-2 rounded-xl resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-pink-500 transition-all"
            >
              <Bug className="w-4 h-4" />
              <span>Log Issue Ticket</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
