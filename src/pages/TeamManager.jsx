import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AddEditUserModal } from '../components/Modals/AddEditUserModal';
import { 
  Users, 
  UserPlus, 
  Search, 
  Building, 
  Pencil, 
  Trash2, 
  ShieldCheck, 
  Key,
  Briefcase
} from 'lucide-react';

export const TeamManager = () => {
  const { users, companies, deleteUser, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [selectedUserToEdit, setSelectedUserToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setSelectedUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete employee "${user.name}"?`)) {
      deleteUser(user.id);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.designation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany = companyFilter === 'all' || u.companyId === companyFilter;
    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Human Resource Capital</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Team Directory & Personnel Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage employee accounts, custom login passwords, roles, and company allocations.</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add Team Member</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employee by name, username, email, designation..."
            className="w-full glass-input pl-10 pr-4 py-2 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Building className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400">Filter Company:</span>
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="glass-input px-3 py-1.5 rounded-xl bg-slate-900 font-medium"
          >
            <option value="all">All Group Companies</option>
            {companies.filter(c => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          // Dynamic Company Name Lookup
          const companyObj = companies.find(c => c.id === user.companyId);
          const companyDisplayName = companyObj ? companyObj.name : 'Group Corporate Entity';

          return (
            <div
              key={user.id}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition-all relative group flex flex-col justify-between"
            >
              <div>
                {/* Employee Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-white text-base leading-tight">{user.name}</h3>
                      <p className="text-xs text-slate-400">{user.designation}</p>
                    </div>
                  </div>

                  {/* Add / Edit / Delete Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(user)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-all"
                      title="Edit Employee Account"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-all"
                      title="Delete Employee Account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Company & Role Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <Building className="w-3 h-3 text-indigo-400" />
                    <span>{companyDisplayName}</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>{user.role}</span>
                  </span>
                </div>

                {/* Employee Details Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2 mt-4 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Username</span>
                    <span className="font-semibold text-white">{user.username || user.email.split('@')[0]}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Corporate Email</span>
                    <span className="font-mono text-[11px] text-slate-300">{user.email}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Department</span>
                    <span className="font-medium text-slate-200">{user.department}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Password Credentials</span>
                    <span className="font-mono font-bold text-indigo-300">
                      {user.passwordHash || user.password || 'Emp@123'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Account Status</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {user.status || 'Active'}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Employee Add/Edit Modal */}
      <AddEditUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userToEdit={selectedUserToEdit}
      />

    </div>
  );
};
