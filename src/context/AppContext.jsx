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
  // Default Authentication State: null so Login Page is default landing page
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('epm_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);

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

  // Persist arrays
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
    const cleanUsername = username.trim().toLowerCase();
    const foundUser = users.find(
      (u) => u.username?.toLowerCase() === cleanUsername || u.email?.toLowerCase() === cleanUsername
    );

    if (foundUser && (foundUser.passwordHash === password || foundUser.password === password)) {
      setCurrentUser(foundUser);
      localStorage.setItem('epm_user', JSON.stringify(foundUser));
      addToast('success', 'Welcome Back!', `Signed in as ${foundUser.name} (${foundUser.role})`);
      logActivity(foundUser.name, `User signed in (${foundUser.role})`, 'Security Audit');
      return { success: true, roleKey: foundUser.roleKey };
    } else {
      addToast('error', 'Authentication Failed', 'Invalid username or password credentials.');
      return { success: false, error: 'Invalid username or password' };
    }
  };

  const logout = () => {
    if (currentUser) {
      logActivity(currentUser.name, 'User signed out', 'Security Audit');
    }
    setCurrentUser(null);
    localStorage.removeItem('epm_user');
    addToast('info', 'Signed Out', 'You have been signed out.');
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

  // Data Mutations (Create, Update, Delete)

  // 0. Companies
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

  // 1. Projects
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
    addToast('info', 'Status Changed', `Project updated to ${newStatus}`);
  };

  const deleteProject = (projectId) => {
    const targetProj = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    // Remove related issues
    setIssues(prev => prev.filter(i => i.projectId !== projectId));
    addToast('warning', 'Project Deleted', `Project "${targetProj?.name || 'Item'}" removed.`);
    logActivity(currentUser?.name, `Deleted project "${targetProj?.name}"`, 'Projects');
  };

  // 2. Applications
  const deleteApplication = (appId) => {
    const targetApp = applications.find(a => a.id === appId);
    setApplications(prev => prev.filter(a => a.id !== appId));
    addToast('warning', 'Application Removed', `Application "${targetApp?.name || 'Item'}" deleted.`);
    logActivity(currentUser?.name, `Deleted application "${targetApp?.name}"`, 'Applications');
  };

  // 3. Releases
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

  // 4. Bug & Issues
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

  // 5. Employees
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

  // 6. Companies & Cascading Deletion Rule (Deletes Projects, Apps, Releases, Issues — EXCEPT Employees)
  const deleteCompany = (companyId) => {
    const targetComp = companies.find(c => c.id === companyId);
    if (!targetComp) return;

    // Identify project IDs belonging to this company
    const compProjectIds = projects.filter(p => p.companyId === companyId).map(p => p.id);
    const compAppNames = applications.filter(a => a.companyId === companyId).map(a => a.name);

    // 1. Delete Company
    setCompanies(prev => prev.filter(c => c.id !== companyId));

    // 2. Delete Projects belonging to company
    setProjects(prev => prev.filter(p => p.companyId !== companyId));

    // 3. Delete Applications belonging to company
    setApplications(prev => prev.filter(a => a.companyId !== companyId));

    // 4. Delete Releases belonging to company's apps
    setReleases(prev => prev.filter(r => !compAppNames.includes(r.appName)));

    // 5. Delete Issues belonging to company's projects
    setIssues(prev => prev.filter(i => !compProjectIds.includes(i.projectId)));

    // 6. PRESERVE EMPLOYEES: Set employee company to default/unassigned without deleting employee accounts!
    setUsers(prev => prev.map(u => {
      if (u.companyId === companyId) {
        return { ...u, companyId: 'comp-1' };
      }
      return u;
    }));

    if (activeCompanyId === companyId) setActiveCompanyId('all');

    addToast('warning', 'Company Removed', `Company "${targetComp.name}" deleted. All associated projects, apps, releases, and issues deleted. Employee accounts preserved.`);
    logActivity(currentUser?.name, `Deleted company "${targetComp.name}" and cascading records (Employees preserved)`, 'Group Companies');
  };

  // Reset / Clear Data Function
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
        deleteProject,
        addCompany,
        deleteCompany,
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
