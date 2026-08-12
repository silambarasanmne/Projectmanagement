import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  User, 
  Clock, 
  Tag, 
  MoreVertical, 
  MessageSquare, 
  AlertCircle,
  MoveRight
} from 'lucide-react';

export const TaskManager = ({ onOpenModal }) => {
  const { tasks, updateTaskStatus, users } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All');

  // Kanban Columns
  const columns = [
    { id: 'TODO', title: 'TODO', color: 'border-slate-700 bg-slate-900/30' },
    { id: 'IN PROGRESS', title: 'IN PROGRESS', color: 'border-indigo-500/40 bg-indigo-950/20' },
    { id: 'REVIEW', title: 'REVIEW', color: 'border-violet-500/40 bg-violet-950/20' },
    { id: 'TESTING', title: 'TESTING / QA', color: 'border-amber-500/40 bg-amber-950/20' },
    { id: 'COMPLETED', title: 'COMPLETED', color: 'border-emerald-500/40 bg-emerald-950/20' }
  ];

  // Drag and Drop Event Handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      updateTaskStatus(taskId, targetStatus);
    }
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.taskName.toLowerCase().includes(searchQuery.toLowerCase()) || t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesUser = userFilter === 'All' || t.assignedToId === userFilter;
    return matchesSearch && matchesPriority && matchesUser;
  });

  const getPriorityBadge = (prio) => {
    switch (prio) {
      case 'Critical': return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'High': return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'Medium': return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Agile Sprint Delivery</span>
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Kanban Task Board</h1>
          <p className="text-xs text-slate-400 mt-1">Drag and drop task cards across status columns to update progress.</p>
        </div>

        <button
          onClick={() => onOpenModal('task')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-800 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter tasks by title or project..."
            className="w-full glass-input pl-9 pr-3 py-2 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium">Assignee:</span>
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="glass-input px-2.5 py-1.5 rounded-xl bg-slate-900 text-xs"
            >
              <option value="All">All Team Members</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="glass-input px-2.5 py-1.5 rounded-xl bg-slate-900 text-xs"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto min-h-[600px] pb-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter(t => t.status === col.id);

          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`rounded-3xl border p-4 flex flex-col justify-start space-y-3 min-w-[260px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xs font-bold text-white tracking-wider">{col.title}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 text-[10px] font-extrabold flex items-center justify-center">
                    {colTasks.length}
                  </span>
                </div>
                <button onClick={() => onOpenModal('task')} className="text-slate-400 hover:text-white p-1">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Task Cards Stack */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, t.id)}
                    className="glass-card p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all cursor-grab active:cursor-grabbing space-y-3 shadow-lg group"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-semibold uppercase text-indigo-400 truncate max-w-[130px]">
                        {t.projectName}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${getPriorityBadge(t.priority)}`}>
                        {t.priority}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {t.taskName}
                    </h4>

                    {t.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {t.description}
                      </p>
                    )}

                    {/* Tags */}
                    {t.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {t.tags.map((tag, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-900 text-slate-300 border border-slate-800">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={t.assignedToAvatar}
                          alt={t.assignedToName}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-indigo-500/40"
                          title={`Assigned to ${t.assignedToName}`}
                        />
                        <span className="truncate max-w-[80px]">{t.assignedToName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {t.dueDate}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center border-2 border-dashed border-slate-800/60 rounded-2xl text-[11px] text-slate-500">
                    No tasks in {col.title}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
