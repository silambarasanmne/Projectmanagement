import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MoveToTestingModal } from '../components/Modals/MoveToTestingModal';
import { MoveToReleaseModal } from '../components/Modals/MoveToReleaseModal';
import { 
  ArrowLeft, 
  User, 
  Milestone, 
  Activity, 
  FileText, 
  Globe, 
  CheckCircle2, 
  Clock, 
  Download,
  Play,
  Package,
  UserCheck,
  TestTube,
  Building,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const ProjectDetail = () => {
  const { 
    selectedProjectId, 
    allProjects, 
    companies,
    activities, 
    navigateTo, 
    updateProjectStatus, 
    addNotification,
    addToast,
    logActivity,
    currentUser,
    users 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview');
  const [testingModalOpen, setTestingModalOpen] = useState(false);
  const [releaseModalOpen, setReleaseModalOpen] = useState(false);

  const project = allProjects.find(p => p.id === selectedProjectId);

  if (!project) {
    return (
      <div className="text-center py-12 text-slate-400">
        <p>Project not found.</p>
        <button onClick={() => navigateTo('projects')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs cursor-pointer">
          Back to Projects
        </button>
      </div>
    );
  }

  // Dynamic lookups
  const companyObj = companies.find(c => c.id === project.companyId);
  const companyName = companyObj ? companyObj.name : project.companyName || 'Group Subsidiary';
  const responsibleEmp = users.find(u => u.name === project.manager || u.id === project.managerId);

  // Check if current user is the assigned tester for this project
  const isAssignedTester = Boolean(
    currentUser && (
      currentUser.id === project.assignedTesterId ||
      currentUser.name?.toLowerCase() === project.assignedTesterName?.toLowerCase()
    )
  );

  // Phase-aware status colors
  const getPhaseStyle = (phase) => {
    switch (phase) {
      case 'Development':
      case 'In Process': return { bg: 'bg-indigo-500/15', text: 'text-indigo-400', border: 'border-indigo-500/30', icon: Clock };
      case 'Testing Assigned': return { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: UserCheck };
      case 'Testing In Progress':
      case 'Testing': return { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-500/30', icon: TestTube };
      case 'Release Pending':
      case 'Testing Passed':
      case 'Testing Completed': return { bg: 'bg-teal-500/15', text: 'text-teal-300', border: 'border-teal-500/30', icon: CheckCircle2 };
      case 'Released':
      case 'Production':
      case 'Release': 
      case 'Completed': return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: CheckCircle2 };
      default: return { bg: 'bg-slate-800', text: 'text-slate-300', border: 'border-slate-700', icon: Clock };
    }
  };

  const phaseStyle = getPhaseStyle(project.status);
  const PhaseIcon = phaseStyle.icon;

  // Lifecycle Pipeline Steps
  const pipelineSteps = [
    { key: 'Development', label: 'Development', icon: Play, color: 'indigo' },
    { key: 'Testing Assigned', label: 'Testing Assigned', icon: UserCheck, color: 'amber' },
    { key: 'Testing In Progress', label: 'Testing In Progress', icon: TestTube, color: 'amber' },
    { key: 'Release Pending', label: 'Release Pending', icon: CheckCircle2, color: 'teal' },
    { key: 'Released', label: 'Released', icon: Package, color: 'emerald' }
  ];

  // Helper to map aliases to standard pipeline index
  const getStepIndex = (status) => {
    if (status === 'In Process' || status === 'Development') return 0;
    if (status === 'Testing Assigned') return 1;
    if (status === 'Testing In Progress' || status === 'Testing') return 2;
    if (status === 'Release Pending' || status === 'Testing Passed' || status === 'Testing Completed') return 3;
    if (status === 'Released' || status === 'Production' || status === 'Release' || status === 'Completed') return 4;
    return 0;
  };
  const currentStepIndex = getStepIndex(project.status);

  // Tester Handlers
  const handleTestingPassed = () => {
    updateProjectStatus(project.id, 'Release Pending', {
      testedBy: currentUser?.name || 'Assigned Tester',
      testResult: 'Passed',
      completedTestingAt: new Date().toISOString()
    }, 85);

    addNotification({
      targetUserId: project.developerId || 'admin',
      targetUserName: project.developerName || project.manager || 'Developer',
      fromUser: currentUser?.name || 'Assigned Tester',
      title: 'Testing Passed',
      message: `Testing passed for "${project.name}" by ${currentUser?.name}. Application moved to Release Pending.`,
      type: 'testing_completed',
      projectId: project.id
    });

    addToast('success', 'Testing Passed! 🎉', `Project "${project.name}" passed QA testing. Ready for release review.`);
    logActivity(currentUser?.name, `Passed testing for project "${project.name}" (Status: Release Pending)`, 'Projects');
  };

  const handleTestingFailed = () => {
    const reason = window.prompt("Specify Testing Failure Notes / Rework Requirements:", "UI alignment issues & API error handling failed during QA.");
    if (reason === null) return;

    updateProjectStatus(project.id, 'Development', {
      testResult: 'Failed',
      failedReason: reason,
      lastFailedAt: new Date().toISOString()
    }, 30);

    addNotification({
      targetUserId: project.developerId || 'admin',
      targetUserName: project.developerName || project.manager || 'Developer',
      fromUser: currentUser?.name || 'Assigned Tester',
      title: 'Testing Failed (Rework)',
      message: `Testing failed for "${project.name}". Notes: ${reason}. Moved back to Development for rework.`,
      type: 'testing_failed',
      projectId: project.id
    });

    addToast('warning', 'Testing Failed — Returned for Rework', `Project "${project.name}" returned to Development phase.`);
    logActivity(currentUser?.name, `Failed testing for project "${project.name}" (Notes: ${reason})`, 'Projects');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <button
            onClick={() => navigateTo('projects')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Workspace</span>
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
              {project.type || 'Web Application'}
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${phaseStyle.bg} ${phaseStyle.text} border ${phaseStyle.border} flex items-center gap-1.5`}>
              <PhaseIcon className="w-3 h-3" />
              <span>Phase: {project.status}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">{companyName}</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-0.5">{project.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">{project.description}</p>
            {project.assignedTesterName && (
              <div className="mt-2 text-xs text-amber-300 font-medium flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Assigned QA Tester: <strong className="text-white">{project.assignedTesterName}</strong></span>
              </div>
            )}
            {project.testingUrl && (
              <div className="mt-3 p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between gap-3 text-xs flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-2 text-amber-200 min-w-0 truncate">
                  <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Staging Testing URL: <strong className="text-white font-mono">{project.testingUrl}</strong></span>
                </div>
                <a
                  href={project.testingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-md shadow-amber-600/30 transition-all shrink-0 cursor-pointer ml-auto"
                  title="Open App for Testing"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open App for Testing</span>
                </a>
              </div>
            )}
            {project.testResult === 'Failed' && project.failedReason && (
              <div className="mt-2 p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300">
                <strong>❌ Previous Testing Failed:</strong> {project.failedReason}
              </div>
            )}
          </div>

          {/* Phase-Aware Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            
            {/* 1. Development Phase */}
            {(project.status === 'Development' || project.status === 'In Process' || !project.status) && (
              <button
                onClick={() => setTestingModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md shadow-amber-600/30 transition-all cursor-pointer"
              >
                <TestTube className="w-3.5 h-3.5" />
                <span>Submit for Testing & Assign Tester</span>
              </button>
            )}

            {/* 2. Testing Assigned / Testing In Progress Phase */}
            {(project.status === 'Testing Assigned' || project.status === 'Testing In Progress' || project.status === 'Testing') && (
              <div className="flex items-center gap-2 flex-wrap">
                {project.status === 'Testing Assigned' && (
                  <button
                    onClick={() => updateProjectStatus(project.id, 'Testing In Progress', {}, 65)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/30 transition-all cursor-pointer"
                  >
                    <TestTube className="w-3.5 h-3.5" />
                    <span>Testing In Progress</span>
                  </button>
                )}

                <button
                  onClick={handleTestingPassed}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✅ Testing Passed (Release Pending)</span>
                </button>

                <button
                  onClick={handleTestingFailed}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all cursor-pointer"
                >
                  <span>❌ Testing Failed (Rework)</span>
                </button>
              </div>
            )}

            {/* 3. Release Pending Phase */}
            {(project.status === 'Release Pending' || project.status === 'Testing Passed' || project.status === 'Testing Completed') && (
              <button
                onClick={() => setReleaseModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Package className="w-3.5 h-3.5" />
                <span>Review & Move to Release</span>
              </button>
            )}

            {/* 4. Released / Production Phase */}
            {(project.status === 'Released' || project.status === 'Production' || project.status === 'Release' || project.status === 'Completed') && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>✅ Released to Production</span>
              </span>
            )}

          </div>
        </div>

        {/* Visual Pipeline Progress Bar */}
        <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-1">
          {pipelineSteps.map((step, idx) => {
            const StepIcon = step.icon;
            const isPast = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isFuture = idx > currentStepIndex;

            return (
              <React.Fragment key={step.key}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isCurrent
                    ? `bg-${step.color}-600 text-white shadow-lg`
                    : isPast
                    ? `bg-${step.color}-600/20 text-${step.color}-300 border border-${step.color}-500/30`
                    : 'bg-slate-900 text-slate-500 border border-slate-800'
                }`}>
                  <StepIcon className="w-3.5 h-3.5" />
                  <span>{step.label}</span>
                  {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                {idx < pipelineSteps.length - 1 && (
                  <ArrowRight className={`w-4 h-4 shrink-0 ${isPast || isCurrent ? 'text-indigo-400' : 'text-slate-700'}`} />
                )}
              </React.Fragment>
            );
          })}
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
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
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

              {responsibleEmp ? (
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
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">Username: {responsibleEmp.username}</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
                  <User className="w-6 h-6 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">Responsible employee: <span className="font-semibold text-white">{project.manager}</span></p>
                  <p className="text-[11px] text-slate-500">Employee profile not found in Team Directory. Register them under Human Resource Capital.</p>
                </div>
              )}
            </div>

            {/* Group Company Info */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-indigo-400" />
                <span>Group Company Assignment</span>
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shrink-0">
                  {companyObj?.logo || '🏢'}
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-white">{companyName}</h4>
                  <p className="text-xs text-slate-400">{companyObj?.tagline || 'Corporate subsidiary entity'}</p>
                  <p className="text-[11px] text-indigo-400 font-semibold mt-0.5">{companyObj?.code || 'GROUP'}</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-heading text-base font-bold text-white">Technology Architecture</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar - Lifecycle Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <h3 className="font-heading text-base font-bold text-white">Lifecycle Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Current Phase</span>
                  <span className={`font-bold ${phaseStyle.text} flex items-center gap-1.5`}>
                    <PhaseIcon className="w-3.5 h-3.5" />
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Completion</span>
                  <span className="font-bold text-white">{project.progress}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Responsible</span>
                  <span className="font-semibold text-white">{project.manager}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Company</span>
                  <span className="font-semibold text-indigo-400">{companyName}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Start Date</span>
                  <span className="font-semibold text-white">{project.startDate || project.lastUpdated || '—'}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                  <span className="text-slate-400">Target Deadline</span>
                  <span className="font-semibold text-white">{project.deadline || project.dueDate || '—'}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="font-semibold text-slate-300">{project.lastUpdated || '—'}</span>
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
          {(!project.milestones || project.milestones.length === 0) ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <Milestone className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Milestones Created Yet</p>
              <p className="text-xs text-slate-400">Milestones will appear here when added to the project.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {project.milestones.map((m) => (
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
          )}
        </div>
      )}

      {/* Activity Tab */}
      {activeTab === 'activity' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-lg font-bold text-white">Audit Trail</h3>
          <div className="space-y-3 text-xs">
            {activities.slice(0, 8).map((act) => (
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
          {(!project.documents || project.documents.length === 0) ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <FileText className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-white">No Documents Uploaded Yet</p>
              <p className="text-xs text-slate-400">Project attachments and files will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              {project.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <div>
                      <p className="font-semibold text-white">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.size} • Uploaded by {doc.uploadedBy}</p>
                    </div>
                  </div>
                  <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Phase Transition Modals */}
      <MoveToTestingModal
        isOpen={testingModalOpen}
        onClose={() => setTestingModalOpen(false)}
        project={project}
      />

      <MoveToReleaseModal
        isOpen={releaseModalOpen}
        onClose={() => setReleaseModalOpen(false)}
        project={project}
      />

    </div>
  );
};
