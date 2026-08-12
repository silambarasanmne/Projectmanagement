import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AddEditUserModal } from '../components/Modals/AddEditUserModal';
import { Users, Mail, Shield, Plus, Edit2, Trash2, UserCheck } from 'lucide-react';

export const TeamManager = () => {
  const { users, companies, deleteUser } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserToEdit, setSelectedUserToEdit] = useState(null);

  const handleOpenAdd = () => {
    setSelectedUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to remove employee "${user.name}" from Team Directory?`)) {
      deleteUser(user.id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Human Resource Capital</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Team Directory</h1>
          <p className="text-xs text-slate-400 mt-1">Manage corporate personnel with full Add, Edit, and Delete controls.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Directory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => {
          const userCompany = companies.find(c => c.id === u.companyId);

          return (
            <div key={u.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all relative group">
              
              {/* Action Buttons: Edit & Delete */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(u)}
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-950/40 transition-all"
                  title="Edit Team Member Details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(u)}
                  className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-950/40 transition-all"
                  title="Delete Team Member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 shrink-0"
                />
                <div className="pr-16">
                  <h3 className="font-heading text-base font-bold text-white">{u.name}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">{u.designation}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {u.role}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {u.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{u.department} • <span className="text-slate-400">{userCompany?.name || 'Apex Group'}</span></span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Active Projects</p>
                  <p className="font-heading font-extrabold text-base text-white">{u.activeProjectsCount || 3}</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Completed Tasks</p>
                  <p className="font-heading font-extrabold text-base text-emerald-400">{u.completedTasksCount || 42}</p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Team Member Dialog */}
      <AddEditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userToEdit={selectedUserToEdit}
      />

    </div>
  );
};
