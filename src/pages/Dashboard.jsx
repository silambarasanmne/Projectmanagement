import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { ProjectStatusChart } from '../components/Charts/ProjectStatusChart';
import { 
  Building, 
  FolderKanban, 
  Layers, 
  Users, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Package,
  Activity,
  TestTube,
  Globe,
  ExternalLink
} from 'lucide-react';

export const Dashboard = ({ onOpenModal }) => {
  const { 
    currentUser, 
    companies,
    allProjects, 
    allApplications, 
    users, 
    releases, 
    activities, 
    navigateTo
  } = useApp();

  const activeCompanies = companies.filter(c => c.id !== 'all');
  const totalProjects = allProjects.length;
  const inProcessProjects = allProjects.filter(p => p.status === 'In Process' || p.status === 'Development').length;
  const testingProjects = allProjects.filter(p => p.status === 'Testing' || p.status === 'Testing Assigned' || p.status === 'Testing In Progress').length;
  const releasePendingProjects = allProjects.filter(p => p.status === 'Release Pending' || p.status === 'Testing Passed' || p.status === 'Testing Completed').length;
  const releasedProjects = allProjects.filter(p => p.status === 'Released' || p.status === 'Production' || p.status === 'Release' || p.status === 'Completed').length;

  const releasedList = allProjects.filter(p => p.status === 'Released' || p.status === 'Production' || p.status === 'Release' || p.status === 'Completed');

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-slate-950">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Group Governance Workspace</span>
            </div>
            
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="gradient-text">{currentUser?.name || 'Administrator'}</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Real-time portfolio metrics across {activeCompanies.length} subsidiary companies, software development progress, and live production releases.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenModal('project')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>

            <button
              onClick={() => onOpenModal('release')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-xs transition-all cursor-pointer"
            >
              <Package className="w-4 h-4 text-violet-400" />
              <span>Upload Release</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic KPI Metrics Cards with Direct Redirection */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Group Companies - Redirects to Group Companies */}
        <div onClick={() => navigateTo('companies')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Group Companies"
            value={activeCompanies.length}
            icon={Building}
            subtitle={`${activeCompanies.length} Subsidiaries`}
            trend="Click to View Companies"
            color="indigo"
          />
        </div>

        {/* Managed Personnel / Employees - Redirects to Team Directory */}
        <div onClick={() => navigateTo('team')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Registered Team"
            value={users.length}
            icon={Users}
            subtitle={`${users.length} Personnel Accounts`}
            trend="Click to View Team"
            color="emerald"
          />
        </div>

        {/* Total Projects - Redirects to Projects Workspace */}
        <div onClick={() => navigateTo('projects')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Managed Projects"
            value={totalProjects}
            icon={FolderKanban}
            subtitle={`${inProcessProjects} Process • ${testingProjects} Testing • ${releasedProjects} Released`}
            trend="Click to View Projects"
            color="violet"
          />
        </div>

        {/* Active Software Apps - Redirects to Application Catalog */}
        <div onClick={() => navigateTo('applications')} className="cursor-pointer transition-transform hover:scale-[1.02]">
          <StatCard
            title="Application Assets"
            value={allApplications.length}
            icon={Layers}
            subtitle={`${releases.length} Release Packages`}
            trend="Click to View Portfolio"
            color="amber"
          />
        </div>

      </div>

      {/* Status Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* In Process Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">In Process</h3>
                <p className="text-xs text-slate-400">Active development</p>
              </div>
            </div>
            <span className="font-heading font-extrabold text-2xl text-indigo-400">{inProcessProjects}</span>
          </div>

          <button
            onClick={() => navigateTo('projects')}
            className="w-full py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600 text-indigo-200 border border-indigo-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Browse In Process Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Testing Phase Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <TestTube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">In Testing</h3>
                <p className="text-xs text-slate-400">QA testing & verification</p>
              </div>
            </div>
            <span className="font-heading font-extrabold text-2xl text-amber-400">{testingProjects}</span>
          </div>

          <button
            onClick={() => navigateTo('projects')}
            className="w-full py-2.5 rounded-xl bg-amber-600/15 hover:bg-amber-600 text-amber-200 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Browse Testing Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Released Card */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base">Released</h3>
                <p className="text-xs text-slate-400">Production deployed</p>
              </div>
            </div>
            <span className="font-heading font-extrabold text-2xl text-emerald-400">{releasedProjects}</span>
          </div>

          <button
            onClick={() => navigateTo('projects')}
            className="w-full py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 text-emerald-200 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Browse Released Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Live Released Projects & Production Deployments Feed */}
      {releasedList.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base leading-tight">🚀 Live Production Releases</h3>
                <p className="text-xs text-slate-400">Recently deployed applications ready for access</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('releases')}
              className="text-xs text-emerald-400 hover:underline font-semibold cursor-pointer flex items-center gap-1"
            >
              <span>View Release Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {releasedList.map((relProj) => {
              const liveUrl = relProj.releaseUrl || relProj.productionUrl || relProj.testingUrl || `https://app.${relProj.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
              return (
                <div
                  key={relProj.id}
                  onClick={() => navigateTo('project-detail', relProj.id)}
                  className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Released</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{relProj.version || 'v1.0.0'}</span>
                    </div>

                    <h4 className="font-heading text-sm font-bold text-white mt-2 hover:text-emerald-300 transition-colors">
                      {relProj.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{relProj.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1 truncate font-mono">
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{liveUrl}</span>
                    </span>

                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600/25 hover:bg-emerald-600 text-emerald-200 hover:text-white border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer shadow-sm"
                      title="Launch Production App"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Launch App</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analytics & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Status Breakdown Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-white text-base">Project Status Distribution</h3>
            <span className="text-xs text-slate-400 font-medium">Real-time status tracking</span>
          </div>

          <ProjectStatusChart projects={allProjects} />
        </div>

        {/* Recent Audit Activity Log */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Audit Trail Log</span>
            </div>
            <button
              onClick={() => navigateTo('audit')}
              className="text-[11px] text-indigo-400 hover:underline font-semibold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-white">{act.user}</span>
                  <span className="text-slate-500 text-[10px]">{act.time}</span>
                </div>
                <p className="text-xs text-slate-300 font-medium">{act.action}</p>
                <span className="text-[10px] text-indigo-400 font-semibold">{act.module}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

