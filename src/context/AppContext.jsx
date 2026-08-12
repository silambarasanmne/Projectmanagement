import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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

// Inactivity Auto-Logout Timeout: 15 Minutes (in milliseconds)
const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export const AppProvider = ({ children }) => {
  // Always start on Login Screen on page reload/launch
  const [currentUser, setCurrentUser] = useState(null);

  // UI States
  const [activeCompanyId, setActiveCompanyId] = useState('all');
  const [theme, setTheme] = useState(() => localStorage.getItem('epm_theme') || 'dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Dynamic Content Data (with persistence)
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('epm_companies');
    return saved ? JSON.parse(saved) : DEMO_COMPANIES;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('epm_users');
    return saved ? JSON.parse(saved) : DEMO_USERS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('epm_projects');
    return saved ? JSON.parse(saved) : [];
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('epm_apps');
    return saved ? JSON.parse(saved) : [];
  });

  const [releases, setReleases] = useState(() => {
    const saved = localStorage.getItem('epm_releases');
    return saved ? JSON.parse(saved) : [];
  });

  const [issues, setIssues] = useState(() => {
    const saved = localStorage.getItem('epm_issues');
    return saved ? JSON.parse(saved) : [];
  });

  const [activities, setActivities] = useState(DEMO_ACTIVITIES);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('epm_notifications');
    return saved ? JSON.parse(saved) : DEMO_NOTIFICATIONS;
  });
  const [toasts, setToasts] = useState([]);

  // Inactivity Auto-Logout Timer Ref
  const idleTimerRef = useRef(null);

  // Theme sync
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

  // Persist data arrays
  useEffect(() => {
    localStorage.setItem('epm_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('epm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('epm_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('epm_releases', JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    localStorage.setItem('epm_issues', JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    localStorage.setItem('epm_apps', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('epm_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Global Keyboard Shortcuts (Ctrl + K)
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
    const cleanUsername = (username || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();
    
    const activeUsers = (users && users.length > 0) ? users : DEMO_USERS;

    const foundUser = activeUsers.find(
      (u) => u.username?.toLowerCase() === cleanUsername || u.email?.toLowerCase() === cleanUsername
    );

    if (foundUser && (foundUser.passwordHash === cleanPassword || foundUser.password === cleanPassword)) {
      setCurrentUser(foundUser);
      addToast('success', 'Welcome Back!', `Signed in as ${foundUser.name} (${foundUser.role})`);
      logActivity(foundUser.name, `User signed in (${foundUser.role})`, 'Security Audit');
      return { success: true, roleKey: foundUser.roleKey };
    } else {
      addToast('error', 'Authentication Failed', 'Invalid username or password. Try Admin: "admin" / "Admin@123".');
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = (reason = 'user') => {
    if (currentUser) {
      logActivity(currentUser.name, reason === 'inactivity' ? 'Auto-logged out due to inactivity' : 'User signed out', 'Security Audit');
    }
    setCurrentUser(null);
    if (reason === 'inactivity') {
      addToast('warning', 'Session Expired', 'You have been automatically logged out due to inactivity.');
    } else {
      addToast('info', 'Signed Out', 'You have been signed out.');
    }
  };

  // Inactivity Auto-Logout Mechanism
  useEffect(() => {
    if (!currentUser) {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      return;
    }

    const resetIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        logout('inactivity');
      }, INACTIVITY_TIMEOUT);
    };

    // User activity event listeners
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Start timer on login
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [currentUser]);

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
  const addCompany = (companyData) => {
    const newComp = {
      id: `comp-${Date.now()}`,
      logo: companyData.logo || '🏢',
      departments: companyData.departments || ['Engineering', 'Operations'],
      projectsCount: 0,
      activeApps: 0,
      teamSize: 1,
      ...companyData
    };
    setCompanies((prev) => [...prev, newComp]);
    addToast('success', 'Company Registered', `Subsidiary "${newComp.name}" (${newComp.code}) added to Group of Companies.`);
    logActivity(currentUser?.name, `Created subsidiary company "${newComp.name}"`, 'Group Companies');
  };

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
    addToast('success', 'Project Created', `Project "${newProj.name}" created.`);
    logActivity(currentUser?.name, `Created project "${newProj.name}"`, 'Projects');
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      ...notif
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const updateProjectStatus = (id, newStatus, extraData = {}, newProgress) => {
    // Auto-calculate progress based on phase if not explicitly provided
    const autoProgress = newProgress !== undefined ? newProgress : (
      newStatus === 'Development' || newStatus === 'In Process' ? 30 :
      newStatus === 'Testing Assigned' ? 50 :
      newStatus === 'Testing In Progress' || newStatus === 'Testing' ? 65 :
      newStatus === 'Release Pending' || newStatus === 'Testing Passed' || newStatus === 'Testing Completed' ? 85 :
      newStatus === 'Released' || newStatus === 'Production' || newStatus === 'Release' || newStatus === 'Completed' ? 100 : 0
    );

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...extraData,
            status: newStatus,
            progress: autoProgress,
            lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16)
          };
        }
        return p;
      })
    );
    addToast('info', 'Status Changed', `Project updated to ${newStatus}`);
  };

  const deleteProject = (projectId) => {
    const targetProj = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setIssues(prev => prev.filter(i => i.projectId !== projectId));
    addToast('warning', 'Project Deleted', `Project "${targetProj?.name || 'Item'}" removed.`);
    logActivity(currentUser?.name, `Deleted project "${targetProj?.name}"`, 'Projects');
  };

  const addApplication = (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      status: 'Active',
      ...appData
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast('success', 'Application Created', `Application "${newApp.name}" added to catalog.`);
    logActivity(currentUser?.name, `Created application "${newApp.name}" (${newApp.type})`, 'Applications');
  };

  const deleteApplication = (appId) => {
    const targetApp = applications.find(a => a.id === appId);
    setApplications(prev => prev.filter(a => a.id !== appId));
    addToast('warning', 'Application Removed', `Application "${targetApp?.name || 'Item'}" deleted.`);
    logActivity(currentUser?.name, `Deleted application "${targetApp?.name}"`, 'Applications');
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
    addToast('success', 'Release Published', `Release ${newRel.version} live!`);
    logActivity(currentUser?.name, `Published release ${newRel.version} for ${newRel.appName}`, 'Release Manager');
  };

  const deleteRelease = (releaseId) => {
    const targetRel = releases.find(r => r.id === releaseId);
    setReleases(prev => prev.filter(r => r.id !== releaseId));
    addToast('warning', 'Release Deleted', `Release ${targetRel?.version || 'Item'} removed.`);
    logActivity(currentUser?.name, `Deleted release ${targetRel?.version}`, 'Release Manager');
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
    addToast('info', 'Issue Updated', `Ticket ${issueId} marked as ${newStatus}`);
  };

  const deleteIssue = (issueId) => {
    setIssues(prev => prev.filter(i => i.id !== issueId));
    addToast('warning', 'Issue Deleted', `Ticket ${issueId} deleted.`);
    logActivity(currentUser?.name, `Deleted issue ticket ${issueId}`, 'Bug Tracker');
  };

  const addUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      username: userData.username || userData.email.split('@')[0],
      passwordHash: userData.password || userData.passwordHash || 'Emp@123',
      activeProjectsCount: parseInt(userData.activeProjectsCount || 0),
      pendingTasksCount: 0,
      completedTasksCount: 0,
      status: 'Active',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      ...userData
    };
    setUsers((prev) => [newUser, ...prev]);
    addToast('success', 'Employee Created', `${newUser.name} created! Username: "${newUser.username}", Password: "${newUser.passwordHash}".`);
    logActivity(currentUser?.name, `Created employee account "${newUser.name}" (${newUser.username})`, 'Team Directory');
  };

  const updateUser = (userId, updatedData) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...updatedData } : u))
    );
    addToast('info', 'Profile Updated', 'Employee details updated.');
    logActivity(currentUser?.name, `Updated employee profile`, 'Team Directory');
  };

  const deleteUser = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addToast('warning', 'Employee Removed', `Employee "${targetUser?.name || 'User'}" deleted.`);
    logActivity(currentUser?.name, `Deleted employee "${targetUser?.name}"`, 'Team Directory');
  };

  const deleteCompany = (companyId) => {
    const targetComp = companies.find(c => c.id === companyId);
    if (!targetComp) return;

    const compProjectIds = projects.filter(p => p.companyId === companyId).map(p => p.id);
    const compAppNames = applications.filter(a => a.companyId === companyId).map(a => a.name);

    setCompanies(prev => prev.filter(c => c.id !== companyId));
    setProjects(prev => prev.filter(p => p.companyId !== companyId));
    setApplications(prev => prev.filter(a => a.companyId !== companyId));
    setReleases(prev => prev.filter(r => !compAppNames.includes(r.appName)));
    setIssues(prev => prev.filter(i => !compProjectIds.includes(i.projectId)));

    setUsers(prev => prev.map(u => {
      if (u.companyId === companyId) {
        return { ...u, companyId: 'comp-1' };
      }
      return u;
    }));

    if (activeCompanyId === companyId) setActiveCompanyId('all');

    addToast('warning', 'Company Removed', `Company "${targetComp.name}" deleted. Associated projects, apps, releases, and issues deleted. Employee accounts preserved.`);
    logActivity(currentUser?.name, `Deleted company "${targetComp.name}" (Employees preserved)`, 'Group Companies');
  };

  const clearAllData = () => {
    setProjects([]);
    setReleases([]);
    setIssues([]);
    setApplications([]);
    localStorage.removeItem('epm_projects');
    localStorage.removeItem('epm_releases');
    localStorage.removeItem('epm_issues');
    localStorage.removeItem('epm_apps');
    addToast('info', 'Data Reset', 'All workspace tables cleared for clean setup.');
  };

  const loadDemoData = () => {
    setCompanies(DEMO_COMPANIES);
    setProjects(DEMO_PROJECTS);
    setReleases(DEMO_RELEASES);
    setIssues(DEMO_ISSUES);
    setApplications(DEMO_APPLICATIONS);
    setUsers(DEMO_USERS);
    addToast('success', 'Demo Data Loaded', 'Sample projects, apps, and releases loaded.');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const navigateTo = (tabKey, projId = null) => {
    setActiveTab(tabKey);
    if (projId) setSelectedProjectId(projId);
    setMobileMenuOpen(false);
  };

  const filteredProjects = activeCompanyId === 'all' 
    ? projects 
    : projects.filter((p) => p.companyId === activeCompanyId);

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
        companies,
        projects: filteredProjects,
        allProjects: projects,
        applications: filteredApplications,
        allApplications: applications,
        releases,
        issues,
        users,
        activities,
        notifications,
        addNotification,
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
        addCompany,
        addProject,
        updateProjectStatus,
        deleteProject,
        addApplication,
        deleteApplication,
        addRelease,
        deleteRelease,
        addIssue,
        updateIssueStatus,
        deleteIssue,
        addUser,
        updateUser,
        deleteUser,
        deleteCompany,
        clearAllData,
        loadDemoData,
        markAllNotificationsRead,
        logActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
