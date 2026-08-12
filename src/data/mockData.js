// Initial Seed Dataset for Enterprise Group PM Suite
// Single Super Admin account, empty tables for clean user creation

export const DEMO_USERS = [
  {
    id: 'usr-1',
    username: 'admin',
    passwordHash: 'Admin@123',
    name: 'Super Admin',
    email: 'admin@apexgroup.com',
    role: 'Super Admin',
    roleKey: 'admin',
    companyId: 'comp-1',
    department: 'Executive Management',
    designation: 'VP of Technology & Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 0,
    pendingTasksCount: 0,
    completedTasksCount: 0,
    status: 'Active'
  }
];

export const DEMO_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Apex Tech Solutions',
    code: 'APEX',
    tagline: 'Enterprise Web Applications & Cloud Services',
    logo: '⚡',
    teamSize: 1,
    activeApps: 0,
    projectsCount: 0,
    departments: ['Executive Management', 'Software Engineering', 'DevOps & Cloud', 'QA Automation']
  },
  {
    id: 'comp-2',
    name: 'Nexus Digital Systems',
    code: 'NEXUS',
    tagline: 'Mobile Apps, Android APK Releases & iOS Platforms',
    logo: '🌐',
    teamSize: 0,
    activeApps: 0,
    projectsCount: 0,
    departments: ['Android Development', 'iOS Development', 'UI/UX Design']
  },
  {
    id: 'comp-3',
    name: 'CyberPulse Security',
    code: 'CYBER',
    tagline: 'Infrastructure Maintenance & Penetration Testing',
    logo: '🛡️',
    teamSize: 0,
    activeApps: 0,
    projectsCount: 0,
    departments: ['Cybersecurity', 'Infrastructure', 'Database Ops']
  }
];

export const DEMO_PROJECTS = [];
export const DEMO_TASKS = [];
export const DEMO_APPLICATIONS = [];
export const DEMO_RELEASES = [];
export const DEMO_ISSUES = [];

export const DEMO_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Super Admin',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    action: 'Initialized Enterprise Workspace Suite',
    module: 'System Administration',
    time: 'Just now',
    company: 'Apex Tech Solutions'
  }
];

export const DEMO_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'Workspace Initialized',
    message: 'System workspace ready for new project & employee registration.',
    time: 'Just now',
    read: false,
    type: 'system'
  }
];
