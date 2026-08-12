import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Package, Upload, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UploadReleaseModal = ({ isOpen, onClose }) => {
  const { allApplications, addRelease } = useApp();

  const [formData, setFormData] = useState({
    appName: allApplications[0]?.name || 'Apex Field Force App',
    version: 'v2.4.2',
    buildNumber: '242',
    platform: 'Android APK',
    releaseType: 'Production Candidate',
    releaseNotes: '- Addressed background GPS battery optimization.\n- Upgraded Android SDK build target to 34.\n- Fixed SQLite thread lock exception.',
    fileName: 'fieldforce-v2.4.2-build242.apk'
  });

  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);

      // Trigger Confetti Celebration for APK Upload
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback ignore if canvas fails
      }

      addRelease({
        ...formData,
        fileSize: `${(35 + Math.random() * 10).toFixed(1)} MB`,
        downloadUrl: '#'
      });

      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Upload New APK / App Release</h3>
              <p className="text-xs text-slate-400">Publish a new build version into the enterprise release hub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Application</label>
            <select
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
            >
              {allApplications.map((a) => (
                <option key={a.id} value={a.name}>{a.name} ({a.platform})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Version String *</label>
              <input
                type="text"
                required
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="v2.4.2"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Build Number *</label>
              <input
                type="text"
                required
                value={formData.buildNumber}
                onChange={(e) => setFormData({ ...formData, buildNumber: e.target.value })}
                placeholder="242"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Platform Target</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Android APK">📱 Android APK</option>
                <option value="Android AAB">📦 Android Bundle (AAB)</option>
                <option value="iOS App Store Build">🍎 iOS App Store</option>
                <option value="Web / SaaS Deployment">🌐 Web Application</option>
                <option value="Docker API Service">⚙️ Backend Docker</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Release Type</label>
              <select
                value={formData.releaseType}
                onChange={(e) => setFormData({ ...formData, releaseType: e.target.value })}
                className="w-full glass-input px-3 py-2 rounded-xl bg-slate-900"
              >
                <option value="Production Candidate">Production Release</option>
                <option value="Staging Beta">Staging / Beta</option>
                <option value="Internal QA Alpha">Internal Alpha</option>
                <option value="Hotfix Patch">Hotfix Patch</option>
              </select>
            </div>
          </div>

          {/* File Upload Simulator Box */}
          <div className="p-4 border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/40 text-center space-y-2">
            <Upload className="w-6 h-6 text-violet-400 mx-auto" />
            <p className="font-semibold text-white">Choose APK or AAB file to upload</p>
            <p className="text-[11px] text-slate-400">Selected file: <span className="text-violet-300 font-mono">{formData.fileName}</span></p>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Release Notes & Changelog</label>
            <textarea
              rows={4}
              value={formData.releaseNotes}
              onChange={(e) => setFormData({ ...formData, releaseNotes: e.target.value })}
              className="w-full glass-input px-3 py-2 rounded-xl resize-none font-mono text-[11px]"
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
              disabled={isUploading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-600/30 hover:from-violet-500 hover:to-indigo-500 transition-all disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading APK Build...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Release</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
