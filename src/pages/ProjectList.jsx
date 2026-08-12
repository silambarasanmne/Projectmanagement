import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FolderKanban, 
  Search, 
  Filter, 
  Grid, 
  List as ListIcon, 
  Plus, 
  ChevronRight, 
  Calendar, 
  User, 
  Play, 
  Package, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectList = ({ onOpenModal }) => {
  const { projects, navigateTo, updateProjectStatus, deleteProject, addToast, addRelease, currentUser } = useApp();
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // One-click Process Lifecycle Handlers
  const handleStartInProcess = (e, project) => {
    e.stopPropagation();
    updateProjectStatus(project.id, 'In Process', Math.max(project.progress, 50));
    addToast('success', 'Project In Process', `"${project.name}" has been marked as Start in Process.`);
  };

  const handleMoveToRelease = (e, project) => {
    e.stopPropagation();
    updateProjectStatus(project.id, 'Release', 100);

    // Trigger Confetti Celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    // Auto log release build
    addRelease({
      appName: project.name,
      version: 'v1.0.0',
      buildNumber: Math.floor(100 + Math.random() * 900).toString(),
      platform: project.type || 'Web / Mobile',
      releaseType: 'Production Release',
      releaseNotes: `Production release for ${project.name} managed by ${project.manager}.`,
      fileName: `${project.name.toLowerCase().replace(/\s+/g, '-')}-v1.0.0.zip`,
      fileSize: '42.5 MB'
    });

    addToast('success', 'Moved to Release! 🎉', `Project "${project.name}" is now officially Released.`);
  };

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Release':
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'In Process':
      case 'In Progress':
        return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <FolderKanban className="w-4 h-4" />
            <span>Group Lifecycle Management</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Project Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Assign responsible employees, track process flow, and transition projects from "In Process" to "Release".</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs transition-colors ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs transition-colors ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onOpenModal('project')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or employee managers..."
            className="w-full glass-input pl-9 pr-3 py-2 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-medium">Lifecycle Phase:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input px-3 py-1.5 rounded-xl bg-slate-900 text-xs font-semibold"
          >
            <option value="All">All Phases</option>
            <option value="Planning">Planning</option>
            <option value="In Process">In Process</option>
            <option value="Release">Release</option>
          </select>
        </div>
      </div>

      {/* Grid View Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigateTo('project-detail', p.id)}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Top Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                    {p.type}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(p.status)}`}>
                    {p.status}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 mb-4 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Responsible Manager & Company */}
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1 text-xs mb-4">
                  <p className="text-slate-400 font-medium">
                    Responsible: <span className="font-bold text-white">{p.manager}</span>
                  </p>
                  <p className="text-[11px] text-slate-400">{p.companyName}</p>
                </div>
              </div>

              {/* Progress & Transition Buttons */}
              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-400 text-[11px]">Progress</span>
                    <span className="text-indigo-400">{p.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons: Start in Process / Move to Release / Delete */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={(e) => handleStartInProcess(e, p)}
                    disabled={p.status === 'In Process'}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-bold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/30 transition-all disabled:opacity-40"
                  >
                    <Play className="w-3 h-3 fill-indigo-300" />
                    <span>In Process</span>
                  </button>

                  <button
                    onClick={(e) => handleMoveToRelease(e, p)}
                    disabled={p.status === 'Release'}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-bold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/30 transition-all disabled:opacity-40"
                  >
                    <Package className="w-3 h-3" />
                    <span>To Release</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete project "${p.name}"?`)) deleteProject(p.id);
                    }}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl text-[10px] font-bold bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/40 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Project Name</th>
                  <th className="px-4 py-4">Company</th>
                  <th className="px-4 py-4">Responsible Manager</th>
                  <th className="px-4 py-4">Phase Status</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4 text-right">Lifecycle Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProjects.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => navigateTo('project-detail', p.id)}
                    className="hover:bg-slate-900/60 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-white">
                      {p.name}
                      <p className="text-[10px] text-slate-400 font-normal truncate max-w-xs">{p.type}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{p.companyName}</td>
                    <td className="px-4 py-4 text-white font-semibold">{p.manager}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-bold text-indigo-400">
                      {p.progress}%
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => handleStartInProcess(e, p)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 text-[10px] font-bold hover:bg-indigo-600 hover:text-white"
                        >
                          Start Process
                        </button>
                        <button
                          onClick={(e) => handleMoveToRelease(e, p)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 text-[10px] font-bold hover:bg-emerald-600 hover:text-white"
                        >
                          Move to Release
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
