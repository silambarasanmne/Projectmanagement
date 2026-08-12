// Initial Seed Dataset for Enterprise Group PM Suite
// Single Super Admin account, empty tables for clean user creation

export const DEMO_USERS = [
  {
    id: 'usr-1',
    username: 'admin',
    passwordHash: 'Admin@123',
    password: 'Admin@123',
    name: 'Super Admin',
    email: 'admin@apexgroup.com',
    role: 'Super Admin',
    roleKey: 'admin',
    companyId: 'comp-1',
    department: 'Executive Management',
    designation: 'VP of Technology & Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 3,
    pendingTasksCount: 0,
    completedTasksCount: 5,
    status: 'Active'
  },
  {
    id: 'usr-2',
    username: 'manager',
    passwordHash: 'Manager@123',
    password: 'Manager@123',
    name: 'Sarah Jenkins',
    email: 'manager@apexgroup.com',
    role: 'Project Manager',
    roleKey: 'manager',
    companyId: 'comp-1',
    department: 'Software Engineering',
    designation: 'Senior Project Manager',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 2,
    pendingTasksCount: 1,
    completedTasksCount: 8,
    status: 'Active'
  },
  {
    id: 'usr-3',
    username: 'tester',
    passwordHash: 'Tester@123',
    password: 'Tester@123',
    name: 'Alex Rivera',
    email: 'tester@apexgroup.com',
    role: 'QA Engineer',
    roleKey: 'qa',
    companyId: 'comp-2',
    department: 'QA Automation',
    designation: 'Lead QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 2,
    pendingTasksCount: 3,
    completedTasksCount: 12,
    status: 'Active'
  },
  {
    id: 'usr-4',
    username: 'developer',
    passwordHash: 'Developer@123',
    password: 'Developer@123',
    name: 'David Chen',
    email: 'dev@apexgroup.com',
    role: 'Developer',
    roleKey: 'developer',
    companyId: 'comp-3',
    department: 'Software Engineering',
    designation: 'Full Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 1,
    pendingTasksCount: 2,
    completedTasksCount: 15,
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

export const DEMO_PROJECTS = [
  {
    id: 'proj-101',
    name: 'Enterprise ERP Suite v2.4',
    companyId: 'comp-1',
    companyName: 'Apex Tech Solutions',
    description: 'Core financial governance and resource planning module with real-time analytics.',
    status: 'Testing In Progress',
    progress: 65,
    manager: 'Super Admin',
    assignedTesterId: 'usr-1',
    assignedTesterName: 'Super Admin',
    platform: 'Web Application',
    testingUrl: 'https://staging.erp.apexgroup.com',
    dueDate: '2026-09-15',
    lastUpdated: '2026-08-12 14:00'
  },
  {
    id: 'proj-102',
    name: 'Mobile Banking Portal (APK & iOS)',
    companyId: 'comp-2',
    companyName: 'Nexus Digital Systems',
    description: 'Secure native mobile banking application supporting biometrics and transaction alerts.',
    status: 'Release Pending',
    progress: 85,
    manager: 'Super Admin',
    assignedTesterId: 'usr-1',
    assignedTesterName: 'Super Admin',
    platform: 'Android & iOS',
    testingUrl: 'https://staging-banking.nexusdigital.com',
    dueDate: '2026-08-30',
    lastUpdated: '2026-08-12 11:30'
  },
  {
    id: 'proj-103',
    name: 'Zero-Trust Shield Gateway',
    companyId: 'comp-3',
    companyName: 'CyberPulse Security',
    description: 'Intrusion detection system and automated pentesting protocol analyzer.',
    status: 'Development',
    progress: 30,
    manager: 'Super Admin',
    assignedTesterId: '',
    assignedTesterName: '',
    platform: 'Cloud Infrastructure',
    testingUrl: 'https://staging.cyberpulse.io',
    dueDate: '2026-10-01',
    lastUpdated: '2026-08-11 16:45'
  }
];
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
