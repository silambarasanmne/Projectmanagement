import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, TestTube, Sparkles, UserCheck } from 'lucide-react';

export const MoveToTestingModal = ({ isOpen, onClose, project }) => {
  const { users, updateProjectStatus, addNotification, addToast, logActivity, currentUser } = useApp();
  const [assignedTester, setAssignedTester] = useState('');
  const [testingNotes, setTestingNotes] = useState('Development process completed. Ready for QA testing & security verification.');

  if (!isOpen || !project) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedUserObj = users.find(u => u.id === assignedTester || u.name === assignedTester);
    const testerName = selectedUserObj?.name || assignedTester || 'QA Lead';
    const testerId = selectedUserObj?.id || '';

    updateProjectStatus(project.id, 'Testing Assigned', {
      assignedTesterId: testerId,
      assignedTesterName: testerName,
      testingNotes: testingNotes,
      developerId: currentUser?.id,
      developerName: currentUser?.name || 'Developer'
    });

    addNotification({
      targetUserId: testerId,
      targetUserName: testerName,
      fromUser: currentUser?.name || 'Developer',
      title: 'Testing Assigned',
      message: `You have been assigned to test "${project.name}". Please conduct QA and mark Testing Completed.`,
      type: 'testing_assigned',
      projectId: project.id
    });

    addToast(
      'info', 
      'Moved to Testing', 
      `Project "${project.name}" transferred to Testing phase. Assigned Tester: ${testerName}.`
    );
    logActivity(
      currentUser?.name, 
      `Transferred project "${project.name}" to Testing phase (Assigned Tester: ${testerName})`, 
      'Projects'
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <TestTube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white leading-tight">Move Project to Testing Phase</h3>
              <p className="text-xs text-slate-400">Assign QA/Testing personnel for verification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs">
            <p className="font-semibold text-amber-300">Project: {project.name}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Development completed. Assigning tester for quality assurance.</p>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Assign Testing Employee (QA Engineer) *</label>
            <div className="relative">
              <UserCheck className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <select
                required
                value={assignedTester}
                onChange={(e) => setAssignedTester(e.target.value)}
                className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-xs"
              >
                <option value="">Select Employee to Test Project...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} — {u.designation} ({u.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Testing Instructions / Scope</label>
            <textarea
              rows={3}
              value={testingNotes}
              onChange={(e) => setTestingNotes(e.target.value)}
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
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold shadow-lg shadow-amber-600/30 hover:from-amber-500 hover:to-orange-500 transition-all text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Confirm & Start Testing</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
