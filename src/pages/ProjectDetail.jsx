import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Milestone, 
  Activity, 
  FileText, 
  Globe, 
  Code2, 
  Server, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Download,
  Upload,
  Play,
  Package,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectDetail = () => {
  const { 
    selectedProjectId, 
    allProjects, 
    activities, 
    navigateTo, 
    updateProjectStatus, 
    addToast,
    addRelease,
    users 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');

  const project = allProjects.find(p => p.id === selectedProjectId) || allProjects[0];
  const responsibleEmp = users.find(u => u.name === project.manager || u.id === project.managerId) || users[0];

  if (!project) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>Project not found.</p>
        <button onClick={() => navigateTo('projects')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs">
          Back to Projects
        </button>
      </div>
    );
  }

  const handleStartInProcess = () => {
    updateProjectStatus(project.id, 'In Process', Math.max(project.progress, 50));
    addToast('success', 'Status Updated', `"${project.name}" marked as Start in Process.`);
  };

  const handleMoveToRelease = () => {
    updateProjectStatus(project.id, 'Release', 100);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    addRelease({
      appName: project.name,
      version: 'v1.0.0',
      buildNumber: Math.floor(100 + Math.random() * 900).toString(),
      platform: project.type || 'Web Application',
      releaseType: 'Production Release',
      releaseNotes: `Production release candidate for ${project.name}.`,
      fileName: `${project.name.toLowerCase().replace(/\s+/g, '-')}-v1.0.0.apk`,
      fileSize: '39.8 MB'
    });

    addToast('success', 'Moved to Release! 🎉', `"${project.name}" released to production.`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('projects')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Workspace</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              {project.type}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Phase: {project.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{project.companyName}</span>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{project.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">{project.description}</p>
          </div>

          {/* Quick Lifecycle Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleStartInProcess}
              disabled={project.status === 'In Process'}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-40"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start in Process</span>
            </button>

            <button
              onClick={handleMoveToRelease}
              disabled={project.status === 'Release'}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-40"
            >
              <Package className="w-4 h-4" />
              <span>Move to Release</span>
            </button>
          </div>
        </div>

        {/* Sub-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2">
          {[
            { id: 'overview', label: 'Overview & Responsible Employee', icon: FileText },
            { id: 'milestones', label: `Milestones (${project.milestones?.length || 0})`, icon: Milestone },
            { id: 'activity', label: 'Activity Trail', icon: Activity },
            { id: 'documents', label: `Documents (${project.documents?.length || 0})`, icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            
            {/* Assigned Responsible Employee Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                <span>Assigned Responsible Employee</span>
              </h3>

              {responsibleEmp && (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                  <img
                    src={responsibleEmp.avatar}
                    alt={responsibleEmp.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 shrink-0"
                  />
                  <div>
                    <h4 className="font-heading text-base font-bold text-white">{responsibleEmp.name}</h4>
                    <p className="text-xs text-indigo-400 font-semibold">{responsibleEmp.designation}</p>
                    <p className="text-xs text-slate-400 mt-1">{responsibleEmp.department} • {responsibleEmp.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-heading text-base font-bold text-white">Technology Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-indigo-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-heading text-base font-bold text-white">Lifecycle Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Current Phase</span>
                  <span className="font-bold text-indigo-400">{project.status}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Completion</span>
                  <span className="font-bold text-white">{project.progress}%</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Start Date</span>
                  <span className="font-semibold text-white">{project.startDate}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Target Deadline</span>
                  <span className="font-semibold text-white">{project.deadline}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-lg font-bold text-white">Milestone Progress</h3>
          <div className="space-y-3">
            {project.milestones?.map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-white">{m.name}</p>
                    <p className="text-slate-400 text-[11px]">Due Target: {m.dueDate}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-lg font-bold text-white">Audit Trail</h3>
          <div className="space-y-3 text-xs">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-white">{act.user}: </span>
                  <span className="text-slate-300">{act.action}</span>
                </div>
                <span className="text-[10px] text-slate-400">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-lg font-bold text-white">Project Files & Attachments</h3>
          <div className="space-y-3 text-xs">
            {project.documents?.map((doc) => (
              <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="font-semibold text-white">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">{doc.size} • Uploaded by {doc.uploadedBy}</p>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
