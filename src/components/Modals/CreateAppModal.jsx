import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Layers, Sparkles, Globe, Code2 } from 'lucide-react';

export const CreateAppModal = ({ isOpen, onClose }) => {
  const { companies, users, addApplication } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Web Application',
    companyId: 'comp-1',
    version: 'v1.0.0',
    platform: 'React 19 & Tailwind CSS v4',
    technology: 'Node.js, PostgreSQL',
    developer: 'Lead Engineer',
    productionUrl: '',
    repository: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const companyObj = companies.find(c => c.id === formData.companyId);

    addApplication({
      name: formData.name.trim(),
      type: formData.type,
      companyId: formData.companyId,
      companyName: companyObj ? companyObj.name : 'Group Subsidiary',
      version: formData.version,
      platform: formData.platform,
      technology: formData.technology,
      developer: formData.developer,
      productionUrl: formData.productionUrl,
      repository: formData.repository,
      status: 'Active'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white leading-tight">Create Software Application Asset</h3>
              <p className="text-xs text-slate-400">Add web app, Android APK, iOS, or API to asset catalog</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Application Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Corporate HR Portal"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Application Category</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs"
              >
                <option value="Web Application">Web Application</option>
                <option value="Android APK">Android APK Build</option>
                <option value="iOS Bundle">iOS Bundle</option>
                <option value="REST API Microservice">REST API Microservice</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Company Assignment</label>
              <select
                value={formData.companyId}
                onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs"
              >
                {companies.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Lead Developer</label>
              <select
                value={formData.developer}
                onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.name}>{u.name} ({u.role})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Version</label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="v1.0.0"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white font-mono font-bold text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Platform</label>
              <input
                type="text"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="Web / Android 14 / iOS 17"
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Production URL</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="url"
                value={formData.productionUrl}
                onChange={(e) => setFormData({ ...formData, productionUrl: e.target.value })}
                placeholder="https://app.company.com"
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-indigo-300 text-xs"
              />
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Application Asset</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
