import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ title, value, icon: Icon, color = 'indigo', change, changeType = 'up', subtitle }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          glow: 'group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10'
        };
      case 'amber':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
          glow: 'group-hover:border-amber-500/40 group-hover:shadow-amber-500/10'
        };
      case 'rose':
        return {
          bg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
          glow: 'group-hover:border-rose-500/40 group-hover:shadow-rose-500/10'
        };
      case 'violet':
        return {
          bg: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
          glow: 'group-hover:border-violet-500/40 group-hover:shadow-violet-500/10'
        };
      case 'cyan':
        return {
          bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
          glow: 'group-hover:border-cyan-500/40 group-hover:shadow-cyan-500/10'
        };
      default:
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
          glow: 'group-hover:border-indigo-500/40 group-hover:shadow-indigo-500/10'
        };
    }
  };

  const themeClasses = getColorClasses();

  return (
    <div className={`glass-panel p-5 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${themeClasses.glow}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${themeClasses.bg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="font-heading text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        
        {change && (
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            changeType === 'up' 
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
          }`}>
            {changeType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-2 text-xs text-slate-400 font-medium truncate">{subtitle}</p>
      )}
    </div>
  );
};
