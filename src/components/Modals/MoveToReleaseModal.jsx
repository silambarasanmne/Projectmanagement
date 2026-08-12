import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Package, Globe, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MoveToReleaseModal = ({ isOpen, onClose, project }) => {
  const { updateProjectStatus, addRelease, addApplication, applications, companies, addToast, logActivity, currentUser } = useApp();
  const [releaseUrl, setReleaseUrl] = useState('');
  const [version, setVersion] = useState('v1.0.0');
  const [releaseNotes, setReleaseNotes] = useState('Production build deployment verified. All QA test cases passed successfully.');

  if (!isOpen || !project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlToSave = releaseUrl.trim() || `https://app.${project.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

    // 1. Update Project Status to Released and 100% progress
    updateProjectStatus(project.id, 'Released', {}, 100);

    // 2. Automatically log Release in APK Release Hub with Production URL!
    addRelease({
      appName: project.name,
      companyId: project.companyId,
      version: version,
      buildNumber: Math.floor(100 + Math.random() * 900),
      platform: project.platform || 'Web & APK Build',
      releaseNotes: `${releaseNotes}\n\nLive Release URL: ${urlToSave}`,
      productionUrl: urlToSave,
      status: 'Published'
    });

    // 3. Automatically add to Application Catalog
    const appExists = applications.some(a => a.name.toLowerCase() === project.name.toLowerCase());
    if (!appExists) {
      const compObj = companies.find(c => c.id === project.companyId);
      addApplication({
        name: project.name,
        type: project.type || 'Web Application',
        companyId: project.companyId,
        companyName: compObj?.name || project.companyName || 'Apex Tech Solutions',
        version: version,
        platform: project.platform || 'Web & Mobile',
        technology: project.techStack?.join(', ') || 'React, Node.js, Tailwind',
        productionUrl: urlToSave,
        developer: project.manager || currentUser?.name || 'Lead Dev',
        status: 'Active'
      });
    }

    // 3. Trigger Celebratory Confetti Animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    addToast(
      'success', 
      '🚀 Project Released Live!', 
      `Project "${project.name}" published to Release Hub! URL: ${urlToSave}`
    );

    logActivity(
      currentUser?.name, 
      `Moved project "${project.name}" to Release phase (Live URL: ${urlToSave})`, 
      'Release Manager'
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white leading-tight">Move Project to Release & Add URL</h3>
              <p className="text-xs text-slate-400">Publish build to Production & Release Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
            <p className="font-semibold text-emerald-300">Project: {project.name}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Testing complete. Please specify the Live Release URL for public access.</p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Production Release URL *</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="url"
                required
                value={releaseUrl}
                onChange={(e) => setReleaseUrl(e.target.value)}
                placeholder="https://app.apexgroup.com or https://play.google.com/..."
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-indigo-300 font-semibold text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Release Version Tag</label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="v1.0.0"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white font-mono font-bold text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Release Notes & Deployment Summary</label>
            <textarea
              rows={3}
              value={releaseNotes}
              onChange={(e) => setReleaseNotes(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
            />
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all text-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish & Move to Release</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
