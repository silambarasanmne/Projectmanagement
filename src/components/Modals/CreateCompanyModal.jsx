import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building, Sparkles } from 'lucide-react';

export const CreateCompanyModal = ({ isOpen, onClose }) => {
  const { addCompany } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    tagline: 'Software & Technology Solutions',
    logo: '⚡',
    deptInput: 'Engineering, Product, Operations, QA'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) return;

    const depts = formData.deptInput.split(',').map(d => d.trim()).filter(Boolean);

    addCompany({
      name: formData.name.trim(),
      code: formData.code.trim().toUpperCase(),
      tagline: formData.tagline,
      logo: formData.logo,
      departments: depts
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white leading-tight">Create New Group Company</h3>
              <p className="text-xs text-slate-400">Register a new subsidiary in corporate governance hierarchy</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Quantum Tech Solutions"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Code *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="QUANTUM"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-indigo-300 font-mono font-bold text-sm uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Company Tagline / Description</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Enterprise Cloud & AI Solutions"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Icon / Emoji Logo</label>
              <select
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-medium"
              >
                <option value="⚡">⚡ Lightning Pulse</option>
                <option value="🌐">🌐 Global Network</option>
                <option value="🛡️">🛡️ Cyber Shield</option>
                <option value="💎">💎 Diamond Tech</option>
                <option value="🚀">🚀 Rocket Cloud</option>
                <option value="🏢">🏢 Corporate Tower</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Departments (Comma separated)</label>
              <input
                type="text"
                value={formData.deptInput}
                onChange={(e) => setFormData({ ...formData, deptInput: e.target.value })}
                placeholder="Engineering, QA, Product"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Subsidiary</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
