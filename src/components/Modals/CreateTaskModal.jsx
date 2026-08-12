import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckSquare, Plus } from 'lucide-react';

export const CreateTaskModal = ({ isOpen, onClose }) => {
  const { allProjects, users, addTask } = useApp();

  const [formData, setFormData] = useState({
    taskName: '',
    projectId: allProjects[0]?.id || 'proj-101',
    assignedToId: users[2]?.id || 'usr-3',
    priority: 'High',
    status: 'TODO',
    startDate: new Date().toISOString().substring(0, 10),
    dueDate: '2026-08-25',
    estimatedHours: 16,
    tagsInput: 'Backend, API',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.taskName.trim()) return;

    const proj = allProjects.find(p => p.id === formData.projectId);
    const usr = users.find(u => u.id === formData.assignedToId);
    const tagsArray = formData.tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    addTask({
      ...formData,
      projectName: proj?.name || 'Enterprise Project',
      assignedToName: usr?.name || 'Developer',
      assignedToAvatar: usr?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      estimatedHours: parseInt(formData.estimatedHours || 0),
      tags: tagsArray
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Assign New Task</h3>
              <p className="text-xs text-slate-400">Add a task item to Kanban workspace</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={formData.taskName}
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              placeholder="e.g. Implement OAuth2 Refresh Token handler"
              className="w-full glass-input px-3 py-2 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Belongs to Project</label>
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
              <label className="block text-slate-300 font-medium mb-1">Assignee</label>
              <select
                value={formData.assignedToId}
                onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
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
              <label className="block text-slate-300 font-medium mb-1">Initial Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="TODO">TODO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="REVIEW">REVIEW</option>
                <option value="TESTING">TESTING</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Est. Hours</label>
              <input
                type="number"
                min={1}
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="block text-slate-300 font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Tags (Comma separated)</label>
            <input
              type="text"
              value={formData.tagsInput}
              onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
              placeholder="Security, API, Android"
              className="w-full glass-input px-3 py-2 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Task Instructions</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detail technical requirements..."
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
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
