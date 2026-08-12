import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard } from '../components/StatCard';
import { ProjectStatusChart } from '../components/Charts/ProjectStatusChart';
import { MonthlyActivityChart } from '../components/Charts/MonthlyActivityChart';
import { 
  Building, 
  FolderKanban, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  Users, 
  Sparkles, 
  Plus, 
  Package, 
  Bug, 
  ArrowRight,
  TrendingUp,
  Play
} from 'lucide-react';

export const Dashboard = ({ onOpenModal }) => {
  const { 
    currentUser, 
    projects, 
    applications, 
    issues, 
    activities, 
    users,
    navigateTo 
  } = useApp();

  const totalCompaniesCount = 12;
  const inProcessProjects = projects.filter(p => p.status === 'In Process' || p.status === 'In Progress').length;
  const releasedProjects = projects.filter(p => p.status === 'Release' || p.status === 'Completed').length;
  const totalEmployeesCount = users.length;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner Greeting */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/60 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-violet-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Group Simplified Operational Hub</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, {currentUser?.name || 'Executive'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Simplified project workflow for your Group of Companies: Create Project ➔ Assign Responsible Employee ➔ Start in Process ➔ Move to Release.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenModal('project')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-violet-500 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
          <button
            onClick={() => onOpenModal('release')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs hover:bg-slate-800 transition-all"
          >
            <Package className="w-4 h-4 text-violet-400" />
            <span>Upload Release</span>
          </button>
        </div>
      </div>

      {/* Simplified Streamlined KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Group Companies"
          value={totalCompaniesCount}
          icon={Building}
          color="indigo"
          change="3 Active Entities"
          changeType="up"
          subtitle="Multi-company portfolio"
        />
        <StatCard
          title="In Process Projects"
          value={inProcessProjects}
          icon={Play}
          color="cyan"
          change="Active Phase"
          changeType="up"
          subtitle="Currently under development"
        />
        <StatCard
          title="Released Projects"
          value={releasedProjects}
          icon={CheckCircle2}
          color="emerald"
          change="Production Live"
          changeType="up"
          subtitle="Passed final release audit"
        />
        <StatCard
          title="Managed Employees"
          value={totalEmployeesCount}
          icon={Users}
          color="violet"
          change="Assigned workload"
          changeType="up"
          subtitle="Tracked in Employee Directory"
        />
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Active Projects & Progress */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Group Projects Lifecycle</h3>
                <p className="text-xs text-slate-400">Track process phase and assigned responsible employees</p>
              </div>
              <button
                onClick={() => navigateTo('projects')}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:underline font-semibold"
              >
                <span>View All Projects ({projects.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigateTo('project-detail', p.id)}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors text-sm">
                          {p.name}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Responsible: <span className="text-white font-medium">{p.manager}</span> • {p.companyName}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-heading font-bold text-lg text-white">{p.progress}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="font-heading text-lg font-bold text-white mb-2">Monthly Activity Trend</h3>
            <MonthlyActivityChart />
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="font-heading text-lg font-bold text-white mb-3">Phase Breakdown</h3>
            <ProjectStatusChart projects={projects} />
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-slate-800">
            <h3 className="font-heading text-sm font-bold text-white mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={act.userAvatar}
                    alt={act.user}
                    className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-slate-200">
                      <span className="font-semibold text-white">{act.user}</span> {act.action}
                    </p>
                    <span className="text-[10px] text-slate-400">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
