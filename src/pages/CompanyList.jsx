import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreateCompanyModal } from '../components/Modals/CreateCompanyModal';
import { Building, Layers, FolderKanban, Users, Plus, ChevronRight, Shield, ArrowRight, Trash2 } from 'lucide-react';

export const CompanyList = () => {
  const { companies, projects, applications, users, navigateTo, setActiveCompanyId, deleteCompany } = useApp();
  const [selectedCompId, setSelectedCompId] = useState('comp-1');
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  const filteredCompanies = companies.filter(c => c.id !== 'all');
  const activeCompanyObj = companies.find(c => c.id === selectedCompId) || filteredCompanies[0];

  const companyProjects = projects.filter(p => p.companyId === selectedCompId);
  const companyApps = applications.filter(a => a.companyId === selectedCompId);
  const companyUsers = users.filter(u => u.companyId === selectedCompId);

  const handleCompanySelect = (comp) => {
    setSelectedCompId(comp.id);
    setActiveCompanyId(comp.id);
  };

  const handleDeleteCompany = (e, comp) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete company "${comp.name}"?\n\nThis will delete all company projects, applications, releases, and issues. Employee accounts will be PRESERVED and kept intact.`)) {
      deleteCompany(comp.id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Building className="w-4 h-4" />
            <span>Corporate Governance</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Group of Companies Hierarchy</h1>
          <p className="text-xs text-slate-400 mt-1">Manage corporate entities, departments, and cross-company project allocations.</p>
        </div>

        <button
          onClick={() => setIsCompanyModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Subsidiary</span>
        </button>
      </div>

      {/* Group Company Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCompanies.map((comp) => {
          const isSelected = selectedCompId === comp.id;
          const compProjs = projects.filter(p => p.companyId === comp.id);
          const compApps = applications.filter(a => a.companyId === comp.id);
          const compTeam = users.filter(u => u.companyId === comp.id);

          return (
            <div
              key={comp.id}
              onClick={() => handleCompanySelect(comp)}
              className={`glass-panel p-6 rounded-3xl border transition-all cursor-pointer relative group/comp ${
                isSelected
                  ? 'border-indigo-500/80 bg-slate-900/90 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-900/50'
              }`}
            >
              {/* Delete Company Button */}
              <button
                onClick={(e) => handleDeleteCompany(e, comp)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-950/40 transition-all opacity-80 group-hover/comp:opacity-100"
                title="Delete Company (Deletes projects/apps, preserves employees)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl">
                  {comp.logo}
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-indigo-400 border border-slate-700 mr-8">
                  {comp.code}
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-white">{comp.name}</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">{comp.tagline}</p>

              {/* Clickable Stat Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-800/80 text-center">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCompanyId(comp.id);
                    navigateTo('projects');
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-indigo-950/50 border border-slate-800 hover:border-indigo-500/40 transition-all group/stat"
                  title="Click to view company projects"
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase group-hover/stat:text-indigo-300">Projects</p>
                  <p className="font-heading font-extrabold text-lg text-white group-hover/stat:text-indigo-400 mt-0.5">
                    {compProjs.length}
                  </p>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCompanyId(comp.id);
                    navigateTo('applications');
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-violet-950/50 border border-slate-800 hover:border-violet-500/40 transition-all group/stat"
                  title="Click to view company applications"
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase group-hover/stat:text-violet-300">Apps</p>
                  <p className="font-heading font-extrabold text-lg text-violet-400 mt-0.5">
                    {compApps.length}
                  </p>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCompanyId(comp.id);
                    navigateTo('team');
                  }}
                  className="p-2 rounded-xl bg-slate-900/80 hover:bg-emerald-950/50 border border-slate-800 hover:border-emerald-500/40 transition-all group/stat"
                  title="Click to view company team members"
                >
                  <p className="text-[10px] font-semibold text-slate-400 uppercase group-hover/stat:text-emerald-300">Team</p>
                  <p className="font-heading font-extrabold text-lg text-emerald-400 mt-0.5">
                    {compTeam.length || comp.teamSize}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Company Workspace View */}
      {activeCompanyObj && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activeCompanyObj.logo}</span>
              <div>
                <h2 className="font-heading text-xl font-bold text-white">{activeCompanyObj.name}</h2>
                <p className="text-xs text-slate-400">{activeCompanyObj.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setActiveCompanyId(activeCompanyObj.id);
                  navigateTo('projects');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/30 text-xs font-semibold transition-all"
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>View {companyProjects.length} Projects</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  setActiveCompanyId(activeCompanyObj.id);
                  navigateTo('applications');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-200 border border-violet-500/30 text-xs font-semibold transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>View {companyApps.length} Apps</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              <button
                onClick={() => {
                  setActiveCompanyId(activeCompanyObj.id);
                  navigateTo('team');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/30 text-xs font-semibold transition-all"
              >
                <Users className="w-3.5 h-3.5" />
                <span>View {companyUsers.length || activeCompanyObj.teamSize} Team Members</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Company Projects List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading text-sm font-bold text-white">Company Projects List</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => navigateTo('project-detail', proj.id)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white group-hover:text-indigo-300 transition-colors text-sm">{proj.name}</p>
                    <p className="text-xs text-slate-400">Responsible: <span className="text-white">{proj.manager}</span> • Phase: {proj.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400">{proj.progress}%</span>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Modal to Create Company Subsidiary */}
      <CreateCompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => setIsCompanyModalOpen(false)}
      />

    </div>
  );
};
