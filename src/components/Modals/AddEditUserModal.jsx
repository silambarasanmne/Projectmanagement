import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, UserCheck, Sparkles } from 'lucide-react';

export const AddEditUserModal = ({ isOpen, onClose, userToEdit = null }) => {
  const { companies, addUser, updateUser } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    role: 'Developer',
    roleKey: 'developer',
    companyId: 'comp-1',
    department: 'Engineering',
    designation: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 3,
    status: 'Active'
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        username: userToEdit.username || '',
        role: userToEdit.role || 'Developer',
        roleKey: userToEdit.roleKey || 'developer',
        companyId: userToEdit.companyId || 'comp-1',
        department: userToEdit.department || 'Engineering',
        designation: userToEdit.designation || 'Software Engineer',
        avatar: userToEdit.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        activeProjectsCount: userToEdit.activeProjectsCount || 3,
        status: userToEdit.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        email: '',
        username: '',
        role: 'Developer',
        roleKey: 'developer',
        companyId: 'comp-1',
        department: 'Engineering',
        designation: 'Software Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        activeProjectsCount: 3,
        status: 'Active'
      });
    }
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    let roleKey = 'developer';
    if (formData.role === 'Super Admin') roleKey = 'admin';
    if (formData.role === 'Project Manager') roleKey = 'manager';

    if (userToEdit) {
      updateUser(userToEdit.id, {
        ...formData,
        roleKey
      });
    } else {
      addUser({
        ...formData,
        roleKey,
        username: formData.username || formData.email.split('@')[0] || 'user'
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              {userToEdit ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">
                {userToEdit ? 'Edit Team Member Profile' : 'Add New Team Member'}
              </h3>
              <p className="text-xs text-slate-400">Manage employee role, department, and company assignment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Corporate Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex.morgan@company.com"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Designation / Title</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Senior Android Engineer"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Engineering / QA / Product"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">System Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Project Manager">Project Manager</option>
                <option value="Developer">Developer</option>
                <option value="QA Lead">QA Lead</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Company Assignment</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Active Projects Count</label>
              <input
                type="number"
                min={0}
                value={formData.activeProjectsCount}
                onChange={(e) => setFormData({ ...formData, activeProjectsCount: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Account Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Profile Photo Avatar URL</label>
            <input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full glass-input px-3 py-2 rounded-xl"
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
              <Sparkles className="w-4 h-4" />
              <span>{userToEdit ? 'Save Changes' : 'Add Team Member'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
