import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FolderPlus, Sparkles, UserCheck, Play, Package } from 'lucide-react';

export const CreateProjectModal = ({ isOpen, onClose }) => {
  const { companies, users, addProject, currentUser } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: 'Web Application',
    description: '',
    responsibleEmployeeId: users[0]?.id || '',
    assignedEmployees: [users[0]?.id || '', users[2]?.id || ''],
    startDate: new Date().toISOString().substring(0, 10),
    deadline: '2026-11-30',
    priority: 'High',
    status: 'In Process', // Default to 'In Process' as requested by user
    progress: 15,
    techStackInput: 'React, Node.js, Tailwind CSS',
    repositoryUrl: 'https://github.com/apex-group/new-service',
    liveUrl: 'https://app.apexgroup.io',
    serverInfo: 'AWS Cloud (us-east-1)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e, targetStatus) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) return;

    const selectedComp = companies.find(c => c.id === formData.companyId);
    const responsibleEmp = users.find(u => u.id === formData.responsibleEmployeeId);
    const techStackArray = formData.techStackInput.split(',').map(s => s.trim()).filter(Boolean);

    const finalStatus = targetStatus || formData.status;

    addProject({
      ...formData,
      status: finalStatus,
      manager: responsibleEmp?.name || currentUser?.name || 'Project Lead',
      managerId: responsibleEmp?.id || currentUser?.id,
      companyName: selectedComp?.name || 'Group Company',
      techStack: techStackArray
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Create New Group Project</h3>
              <p className="text-xs text-slate-400">Select company, assign responsible employees, and define initial process state</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e, formData.status)} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. OmniPay Suite v2"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Group Company *</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                {companies.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Employee Selection Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
            <div>
              <label className="block text-indigo-300 font-semibold mb-1 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>Assign Responsible Employee *</span>
              </label>
              <select
                value={formData.responsibleEmployeeId}
                onChange={(e) => setFormData({ ...formData, responsibleEmployeeId: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900 text-white font-medium"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {u.designation} ({u.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Project Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Web Application">🌐 Web Application</option>
                <option value="Mobile Application">📱 Mobile Application</option>
                <option value="Android APK">📦 Android APK</option>
                <option value="iOS Application">🍎 iOS Application</option>
                <option value="API">⚙️ API / Backend</option>
                <option value="Internal Tool">🛠️ Internal Tool</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Project Objectives & Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline project deliverables and responsible team requirements..."
              className="w-full glass-input px-3 py-2 rounded-xl resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Target Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Tech Stack (Comma separated)</label>
            <input
              type="text"
              value={formData.techStackInput}
              onChange={(e) => setFormData({ ...formData, techStackInput: e.target.value })}
              placeholder="React, Node.js, PostgreSQL, Docker"
              className="w-full glass-input px-3 py-2 rounded-xl"
            />
          </div>

          {/* Action Buttons for Lifecycle Transitions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-medium"
            >
              Cancel
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'In Process')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start in Process</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, 'Release')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                <Package className="w-4 h-4" />
                <span>Move to Release</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
