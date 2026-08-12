import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, ShieldCheck, Key, Lock, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, addToast } = useApp();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPassword) return;
    addToast('success', 'Password Updated', 'Your security credentials have been updated.');
    setOldPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl mx-auto">
      
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/40 shadow-2xl"
          />
          <div className="text-center sm:text-left">
            <h1 className="font-heading text-2xl font-extrabold text-white">{currentUser?.name}</h1>
            <p className="text-xs text-indigo-400 font-semibold mt-0.5">{currentUser?.designation}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Role: {currentUser?.role}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                {currentUser?.department}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            <span>Change Security Password</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Current Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full glass-input px-3 py-2 rounded-xl"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all"
          >
            Update Credentials
          </button>
        </form>

      </div>

    </div>
  );
};
