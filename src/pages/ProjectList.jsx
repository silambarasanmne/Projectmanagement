import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MoveToTestingModal } from '../components/Modals/MoveToTestingModal';
import { MoveToReleaseModal } from '../components/Modals/MoveToReleaseModal';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Play, 
  Package, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TestTube
} from 'lucide-react';

export const ProjectList = ({ onOpenModal }) => {
  const { projects, navigateTo, updateProjectStatus, deleteProject, currentUser, addNotification, addToast, logActivity } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modals state
  const [testingModalProject, setTestingModalProject] = useState(null);
  const [releaseModalProject, setReleaseModalProject] = useState(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.assignedTesterName && p.assignedTesterName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Process':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Testing':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Testing Completed':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'Release':
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <FolderKanban className="w-4 h-4" />
            <span>Lifecycle Governance</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Project Governance Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Track projects through In Process ➔ Testing (Assign QA) ➔ Release (Production URL).</p>
        </div>

        <button
          onClick={() => onOpenModal('project')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name or responsible manager..."
            className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
          <span className="text-slate-400 font-semibold shrink-0">Filter Status:</span>
          {['All', 'In Process', 'Testing', 'Testing Completed', 'Release'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const isAssignedTester = Boolean(
            currentUser && (
              currentUser.id === p.assignedTesterId ||
              currentUser.name?.toLowerCase() === p.assignedTesterName?.toLowerCase()
            )
          );

          return (
            <div
              key={p.id}
              onClick={() => navigateTo('project-detail', p.id)}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer relative group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(p.status)}`}>
                    {p.status}
                  </span>

                  <span className="text-xs text-slate-500 font-mono">Due: {p.dueDate || '2026-08-30'}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white mt-2 group-hover:text-indigo-300 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>

                <div className="mt-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Responsible Employee</span>
                    <span className="font-semibold text-white">{p.manager}</span>
                  </div>

                  {p.assignedTesterName && (
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">QA Tester</span>
                      <span className="font-semibold text-amber-300">{p.assignedTesterName}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Target Platform</span>
                    <span className="font-semibold text-slate-200">{p.platform || 'Web Application'}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-bold text-indigo-400">{p.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons — Sequential Lifecycle */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                
                {/* New / Pending → Start In Process */}
                {p.status !== 'In Process' && p.status !== 'Testing' && p.status !== 'Testing Completed' && p.status !== 'Release' && p.status !== 'Completed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateProjectStatus(p.id, 'In Process');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/30 transition-all cursor-pointer"
                    title="Start In Process"
                  >
                    <Play className="w-3 h-3 fill-indigo-300" />
                    <span>Start In Process</span>
                  </button>
                )}

                {/* In Process → Move to Testing */}
                {p.status === 'In Process' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTestingModalProject(p);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-amber-600/20 hover:bg-amber-600 text-amber-200 border border-amber-500/30 transition-all cursor-pointer"
                    title="Move to Testing & Assign QA Employee"
                  >
                    <TestTube className="w-3 h-3" />
                    <span>Move to Testing</span>
                  </button>
                )}

                {/* Testing Phase */}
                {p.status === 'Testing' && (
                  <>
                    {(isAssignedTester || currentUser?.roleKey === 'admin' || currentUser?.name === p.assignedTesterName) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProjectStatus(p.id, 'Testing Completed', {
                            testedBy: currentUser?.name || 'Tester',
                            completedTestingAt: new Date().toISOString()
                          }, 85);
                          addNotification({
                            targetUserId: p.developerId || 'admin',
                            targetUserName: p.developerName || 'Developer',
                            fromUser: currentUser?.name || 'Tester',
                            title: 'Testing Completed',
                            message: `Testing completed for "${p.name}" — Application is ready for release.`,
                            type: 'testing_completed',
                            projectId: p.id
                          });
                          addToast('success', 'Testing Completed!', `Testing for "${p.name}" completed.`);
                          logActivity(currentUser?.name, `Marked testing completed for "${p.name}"`, 'Projects');
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-teal-600/20 hover:bg-teal-600 text-teal-200 border border-teal-500/30 transition-all cursor-pointer"
                        title="Mark Testing Completed"
                      >
                        <CheckCircle2 className="w-3 h-3 text-teal-300" />
                        <span>Testing Completed</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        <TestTube className="w-3 h-3 animate-pulse" />
                        <span>Testing ({p.assignedTesterName || 'QA'})</span>
                      </span>
                    )}
                  </>
                )}

                {/* Testing Completed → Move to Release */}
                {p.status === 'Testing Completed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setReleaseModalProject(p);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/30 transition-all cursor-pointer"
                    title="Move to Release & Specify Production URL"
                  >
                    <Package className="w-3 h-3" />
                    <span>Move to Release</span>
                  </button>
                )}

                {/* Released — Completed badge */}
                {(p.status === 'Release' || p.status === 'Completed') && (
                  <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-emerald-600/15 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Released</span>
                  </span>
                )}

              {/* Delete is always available */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete project "${p.name}"?`)) deleteProject(p.id);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-all ml-auto cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        );
      })}
      </div>

      {/* Modals for Testing Assignment & Release URL Input */}
      <MoveToTestingModal
        isOpen={Boolean(testingModalProject)}
        onClose={() => setTestingModalProject(null)}
        project={testingModalProject}
      />

      <MoveToReleaseModal
        isOpen={Boolean(releaseModalProject)}
        onClose={() => setReleaseModalProject(null)}
        project={releaseModalProject}
      />

    </div>
  );
};
