import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DEMO_USERS, 
  DEMO_COMPANIES, 
  DEMO_PROJECTS, 
  DEMO_TASKS, 
  DEMO_APPLICATIONS, 
  DEMO_RELEASES, 
  DEMO_ISSUES, 
  DEMO_ACTIVITIES, 
  DEMO_NOTIFICATIONS 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('epm_user');
    return savedUser ? JSON.parse(savedUser) : DEMO_USERS[0]; // Default Super Admin for instant preview
  });

  // UI States
  const [activeCompanyId, setActiveCompanyId] = useState('all');
  const [theme, setTheme] = useState(() => localStorage.getItem('epm_theme') || 'dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Dynamic Content Data
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('epm_projects');
    return saved ? JSON.parse(saved) : DEMO_PROJECTS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('epm_tasks');
    return saved ? JSON.parse(saved) : DEMO_TASKS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('epm_apps');
    return saved ? JSON.parse(saved) : DEMO_APPLICATIONS;
  });

  const [releases, setReleases] = useState(() => {
    const saved = localStorage.getItem('epm_releases');
    return saved ? JSON.parse(saved) : DEMO_RELEASES;
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('epm_issues');
    return saved ? JSON.parse(saved) : DEMO_ISSUES;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('epm_users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });

  useEffect(() => {
    localStorage.setItem('epm_users', JSON.stringify(users));
  }, [users]);
  const [activities, setActivities] = useState(DEMO_ACTIVITIES);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);

  // Sync Theme to HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('epm_theme', theme);
  }, [theme]);

  // Persist core arrays
  useEffect(() => {
    localStorage.setItem('epm_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('epm_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('epm_releases', JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    localStorage.setItem('epm_issues', JSON.stringify(issues));
  }, [issues]);

  // Global Keyboard Shortcuts (Ctrl + K for search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toast System
  const addToast = (type, title, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Operations
  const login = (username, password) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.passwordHash === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('epm_user', JSON.stringify(foundUser));
      addToast('success', 'Welcome Back!', `Logged in as ${foundUser.name} (${foundUser.role})`);
      logActivity(foundUser.name, `User authenticated successfully (${foundUser.role})`, 'Security Audit');
      return { success: true, roleKey: foundUser.roleKey };
    } else {
      addToast('error', 'Authentication Failed', 'Invalid username or password credentials.');
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    if (currentUser) {
      logActivity(currentUser.name, 'User logged out of session', 'Security Audit');
    }
    setCurrentUser(null);
    localStorage.removeItem('epm_user');
    addToast('info', 'Logged Out', 'You have been safely signed out.');
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Activity Logger
  const logActivity = (user, action, module) => {
    const newAct = {
      id: `act-${Date.now()}`,
      user: user || currentUser?.name || 'System',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      action,
      module,
      time: 'Just now',
      company: DEMO_COMPANIES.find((c) => c.id === activeCompanyId)?.name || 'Group Workspace'
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Data Mutations
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      progress: parseInt(projectData.progress || 0),
      lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16),
      milestones: projectData.milestones || [],
      documents: projectData.documents || [],
      ...projectData
    };
    setProjects((prev) => [newProj, ...prev]);
    addToast('success', 'Project Created', `Project "${newProj.name}" has been registered.`);
    logActivity(currentUser?.name, `Created new project "${newProj.name}"`, 'Project Workspace');
  };

  const updateProjectStatus = (id, newStatus, newProgress) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, status: newStatus, lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) };
          if (newProgress !== undefined) updated.progress = newProgress;
          return updated;
        }
        return p;
      })
    );
    addToast('info', 'Project Updated', `Project status changed to ${newStatus}`);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: `tsk-${Date.now()}`,
      commentsCount: 0,
      actualHours: 0,
      ...taskData
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast('success', 'Task Created', `Task "${newTask.taskName}" assigned.`);
    logActivity(currentUser?.name, `Created task "${newTask.taskName}"`, 'Task Manager');
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
    addToast('success', 'Task Moved', `Task status updated to ${newStatus}`);
  };

  const addRelease = (releaseData) => {
    const newRel = {
      id: `rel-${Date.now()}`,
      releaseDate: new Date().toISOString().substring(0, 10),
      uploadedBy: currentUser?.name || 'Admin',
      status: 'Published',
      ...releaseData
    };
    setReleases((prev) => [newRel, ...prev]);
    addToast('success', 'Release Published', `Release ${newRel.version} (${newRel.appName}) is live!`);
    logActivity(currentUser?.name, `Published release ${newRel.version} for ${newRel.appName}`, 'Release Manager');

    // Add push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'New Release Published',
      message: `${currentUser?.name} uploaded release ${newRel.version} for ${newRel.appName}.`,
      timestamp: 'Just now',
      read: false,
      type: 'release',
      link: 'releases'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addIssue = (issueData) => {
    const newBug = {
      id: `BUG-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: new Date().toISOString().substring(0, 10),
      reportedBy: currentUser?.name || 'User',
      status: 'Open',
      commentsCount: 0,
      ...issueData
    };
    setIssues((prev) => [newBug, ...prev]);
    addToast('warning', 'Issue Logged', `Bug ticket ${newBug.id} registered.`);
    logActivity(currentUser?.name, `Logged issue ${newBug.id}: "${newBug.title}"`, 'Bug Tracker');
  };

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
    );
    addToast('info', 'Issue Ticket Updated', `Ticket ${issueId} marked as ${newStatus}`);
  };

  const addUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      activeProjectsCount: parseInt(userData.activeProjectsCount || 0),
      pendingTasksCount: 0,
      completedTasksCount: 0,
      status: 'Active',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      ...userData
    };
    setUsers((prev) => [newUser, ...prev]);
    addToast('success', 'Team Member Added', `${newUser.name} has been added to ${newUser.department}.`);
    logActivity(currentUser?.name, `Added team member "${newUser.name}" (${newUser.role})`, 'Team Directory');
  };

  const updateUser = (userId, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedData } : u))
    );
    addToast('info', 'Profile Updated', 'Team member details have been updated.');
    logActivity(currentUser?.name, `Updated team member profile`, 'Team Directory');
  };

  const deleteUser = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addToast('warning', 'Member Removed', `Employee "${targetUser?.name || 'User'}" has been deleted.`);
    logActivity(currentUser?.name, `Deleted team member "${targetUser?.name}"`, 'Team Directory');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('info', 'Notifications Updated', 'All notifications marked as read.');
  };

  // Navigation Helper
  const navigateTo = (tabKey, projId = null) => {
    setActiveTab(tabKey);
    if (projId) setSelectedProjectId(projId);
    setMobileMenuOpen(false);
  };

  // Filtered views by active company
  const filteredProjects = activeCompanyId === 'all' 
    ? projects 
    : projects.filter((p) => p.companyId === activeCompanyId);

  const filteredTasks = activeCompanyId === 'all'
    ? tasks
    : tasks.filter((t) => {
        const proj = projects.find((p) => p.id === t.projectId);
        return proj && proj.companyId === activeCompanyId;
      });

  const filteredApplications = activeCompanyId === 'all'
    ? applications
    : applications.filter((a) => a.companyId === activeCompanyId);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        login,
        logout,
        theme,
        toggleTheme,
        activeCompanyId,
        setActiveCompanyId,
        companies: DEMO_COMPANIES,
        projects: filteredProjects,
        allProjects: projects,
        tasks: filteredTasks,
        allTasks: tasks,
        applications: filteredApplications,
        allApplications: applications,
        releases,
        issues,
        users,
        activities,
        notifications,
        toasts,
        addToast,
        removeToast,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        activeTab,
        navigateTo,
        selectedProjectId,
        setSelectedProjectId,
        addProject,
        updateProjectStatus,
        addTask,
        updateTaskStatus,
        addRelease,
        addIssue,
        updateIssueStatus,
        addUser,
        updateUser,
        deleteUser,
        markAllNotificationsRead,
        logActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
