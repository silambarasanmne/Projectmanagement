// Comprehensive Enterprise Mock Dataset for Group of Companies

export const DEMO_USERS = [
  {
    id: 'usr-1',
    username: 'admin',
    passwordHash: 'Admin@123',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@apexgroup.com',
    role: 'Super Admin',
    roleKey: 'admin',
    companyId: 'comp-1',
    department: 'Executive Management',
    designation: 'VP of Technology & Operations',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 18,
    pendingTasksCount: 4,
    completedTasksCount: 142,
    status: 'Active'
  },
  {
    id: 'usr-2',
    username: 'manager',
    passwordHash: 'Manager@123',
    name: 'Marcus Vance',
    email: 'marcus.vance@nexusdigital.com',
    role: 'Project Manager',
    roleKey: 'manager',
    companyId: 'comp-2',
    department: 'Product Delivery',
    designation: 'Senior Product Manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 8,
    pendingTasksCount: 12,
    completedTasksCount: 96,
    status: 'Active'
  },
  {
    id: 'usr-3',
    username: 'developer',
    passwordHash: 'Developer@123',
    name: 'David Chen',
    email: 'david.chen@cyberpulse.io',
    role: 'Developer',
    roleKey: 'developer',
    companyId: 'comp-3',
    department: 'Engineering & Mobile Tech',
    designation: 'Lead Android & Fullstack Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 5,
    pendingTasksCount: 9,
    completedTasksCount: 68,
    status: 'Active'
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@apexgroup.com',
    role: 'Designer',
    roleKey: 'developer',
    companyId: 'comp-1',
    department: 'UI/UX Design',
    designation: 'Principal Product Designer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 6,
    pendingTasksCount: 5,
    completedTasksCount: 84,
    status: 'Active'
  },
  {
    id: 'usr-5',
    name: 'Alex Rivera',
    email: 'alex.rivera@cyberpulse.io',
    role: 'DevOps & Security',
    roleKey: 'developer',
    companyId: 'comp-3',
    department: 'Infrastructure',
    designation: 'Lead DevOps Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    activeProjectsCount: 7,
    pendingTasksCount: 3,
    completedTasksCount: 110,
    status: 'Active'
  }
];

export const DEMO_COMPANIES = [
  {
    id: 'all',
    name: 'All Group Companies',
    code: 'ALL',
    logo: '🏢',
    projectsCount: 24,
    activeApps: 32,
    teamSize: 85
  },
  {
    id: 'comp-1',
    name: 'Apex Global Technologies',
    code: 'APEX',
    tagline: 'Enterprise SaaS & Cloud Platforms',
    logo: '⚡',
    departments: ['Engineering', 'Product', 'DevOps', 'Sales'],
    projectsCount: 10,
    activeApps: 14,
    teamSize: 38
  },
  {
    id: 'comp-2',
    name: 'Nexus Digital Media',
    code: 'NEXUS',
    tagline: 'Mobile Commerce & Customer Portals',
    logo: '🌐',
    departments: ['Mobile Engineering', 'UI/UX Design', 'QA Testing'],
    projectsCount: 8,
    activeApps: 10,
    teamSize: 26
  },
  {
    id: 'comp-3',
    name: 'CyberPulse Solutions',
    code: 'CYBER',
    tagline: 'Security & Microservices Infrastructure',
    logo: '🛡️',
    departments: ['Cybersecurity', 'API Services', 'System Maintenance'],
    projectsCount: 6,
    activeApps: 8,
    teamSize: 21
  }
];

export const DEMO_PROJECTS = [
  {
    id: 'proj-101',
    name: 'OmniPay Enterprise Suite',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: 'Web Application',
    manager: 'Marcus Vance',
    managerId: 'usr-2',
    startDate: '2026-01-10',
    deadline: '2026-09-30',
    progress: 82,
    priority: 'Critical',
    status: 'In Progress',
    description: 'Next-generation cloud payment processing, invoice management, and compliance reconciliation dashboard for enterprise transactions.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'Redis'],
    repositoryUrl: 'https://github.com/apex-group/omnipay-suite',
    liveUrl: 'https://omnipay.apexgroup.io',
    appStoreUrl: '',
    playStoreUrl: '',
    serverInfo: 'AWS us-east-1 (Kubernetes Cluster prod-01)',
    teamMembers: ['usr-1', 'usr-2', 'usr-3', 'usr-4'],
    lastUpdated: '2026-08-11 14:32',
    milestones: [
      { id: 'm1', name: 'Architecture & DB Schema', status: 'Completed', dueDate: '2026-02-15' },
      { id: 'm2', name: 'Core Payment Gateway APIs', status: 'Completed', dueDate: '2026-04-30' },
      { id: 'm3', name: 'Analytics & Multi-currency Dashboard', status: 'Completed', dueDate: '2026-06-20' },
      { id: 'm4', name: 'Security Audit & Compliance PCI-DSS', status: 'In Progress', dueDate: '2026-08-30' },
      { id: 'm5', name: 'Global Rollout v1.0', status: 'Pending', dueDate: '2026-09-30' }
    ],
    documents: [
      { id: 'doc-1', name: 'OmniPay_Architecture_Spec_v2.pdf', size: '4.8 MB', uploadedBy: 'Sarah Jenkins', date: '2026-02-01' },
      { id: 'doc-2', name: 'PCI_Compliance_Report_2026.pdf', size: '1.2 MB', uploadedBy: 'Alex Rivera', date: '2026-07-15' }
    ]
  },
  {
    id: 'proj-102',
    name: 'Apex Field Force Mobile App',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: 'Android APK',
    manager: 'Sarah Jenkins',
    managerId: 'usr-1',
    startDate: '2026-03-01',
    deadline: '2026-08-25',
    progress: 95,
    priority: 'High',
    status: 'Testing',
    description: 'Offline-first field operations, asset tracking, and job dispatch Android application with real-time GPS synchronization.',
    techStack: ['React Native', 'Kotlin', 'SQLite', 'Firebase', 'GraphQL'],
    repositoryUrl: 'https://github.com/apex-group/fieldforce-app',
    liveUrl: '',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.apex.fieldforce',
    appStoreUrl: 'https://apps.apple.com/app/apex-fieldforce/id987654321',
    serverInfo: 'Google Cloud Platform (Firebase Prod)',
    teamMembers: ['usr-1', 'usr-3', 'usr-5'],
    lastUpdated: '2026-08-12 09:15',
    milestones: [
      { id: 'm10', name: 'UX Prototyping & Flow', status: 'Completed', dueDate: '2026-03-25' },
      { id: 'm11', name: 'Offline Data Sync Layer', status: 'Completed', dueDate: '2026-05-15' },
      { id: 'm12', name: 'APK Alpha Build Build 240', status: 'Completed', dueDate: '2026-07-01' },
      { id: 'm13', name: 'Beta Testing & Release Prep v2.4.1', status: 'In Progress', dueDate: '2026-08-20' }
    ],
    documents: [
      { id: 'doc-3', name: 'FieldForce_v2.4.1_ReleaseNotes.txt', size: '45 KB', uploadedBy: 'David Chen', date: '2026-08-11' },
      { id: 'doc-4', name: 'fieldforce-v2.4.1-release.apk', size: '38.4 MB', uploadedBy: 'David Chen', date: '2026-08-11' }
    ]
  },
  {
    id: 'proj-103',
    name: 'Nexus Marketplace iOS & Web',
    companyId: 'comp-2',
    companyName: 'Nexus Digital Media',
    type: 'Mobile Application',
    manager: 'Marcus Vance',
    managerId: 'usr-2',
    startDate: '2026-02-15',
    deadline: '2026-10-15',
    progress: 61,
    priority: 'High',
    status: 'Development',
    description: 'B2B digital asset marketplace and licensing platform supporting live streaming previews and instant subscription billing.',
    techStack: ['Swift', 'Next.js', 'Tailwind CSS', 'Stripe', 'AWS S3'],
    repositoryUrl: 'https://github.com/nexus-media/marketplace',
    liveUrl: 'https://marketplace.nexusdigital.com',
    appStoreUrl: 'https://apps.apple.com/app/nexus-market/id123456789',
    playStoreUrl: '',
    serverInfo: 'Vercel Enterprise + AWS S3 CloudFront',
    teamMembers: ['usr-2', 'usr-4'],
    lastUpdated: '2026-08-10 18:20',
    milestones: [
      { id: 'm20', name: 'Design System & Component Kit', status: 'Completed', dueDate: '2026-03-30' },
      { id: 'm21', name: 'Media Upload Pipeline & CDN', status: 'Completed', dueDate: '2026-06-10' },
      { id: 'm22', name: 'iOS App Swift Build', status: 'In Progress', dueDate: '2026-09-01' }
    ],
    documents: [
      { id: 'doc-5', name: 'Nexus_UI_Guidelines_2026.pdf', size: '12.4 MB', uploadedBy: 'Elena Rostova', date: '2026-03-12' }
    ]
  },
  {
    id: 'proj-104',
    name: 'CyberGuard Microservice API',
    companyId: 'comp-3',
    companyName: 'CyberPulse Solutions',
    type: 'API',
    manager: 'David Chen',
    managerId: 'usr-3',
    startDate: '2026-04-01',
    deadline: '2026-07-31',
    progress: 98,
    priority: 'Critical',
    status: 'UAT',
    description: 'High-throughput OAuth2 authorization, JWT validation, and threat detection gateway protecting all Group internal services.',
    techStack: ['Go', 'gRPC', 'Redis', 'Kubernetes', 'Prometheus'],
    repositoryUrl: 'https://github.com/cyberpulse/cyberguard-api',
    liveUrl: 'https://api.cyberpulse.io/v1/health',
    appStoreUrl: '',
    playStoreUrl: '',
    serverInfo: 'DigitalOcean Kubernetes (fra1 region)',
    teamMembers: ['usr-3', 'usr-5'],
    lastUpdated: '2026-08-11 11:05',
    milestones: [
      { id: 'm30', name: 'Go Microservice Core Engine', status: 'Completed', dueDate: '2026-05-01' },
      { id: 'm31', name: 'Rate Limiting & Threat Shield', status: 'Completed', dueDate: '2026-06-15' },
      { id: 'm32', name: 'UAT Integration Tests', status: 'In Progress', dueDate: '2026-08-15' }
    ],
    documents: []
  },
  {
    id: 'proj-105',
    name: 'Group HR & Employee Self-Service',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: 'Internal Tool',
    manager: 'Sarah Jenkins',
    managerId: 'usr-1',
    startDate: '2025-11-01',
    deadline: '2026-05-01',
    progress: 100,
    priority: 'Medium',
    status: 'Completed',
    description: 'Internal payroll portal, leave approvals, performance reviews, and company directory.',
    techStack: ['Vue.js', 'Laravel', 'MySQL'],
    repositoryUrl: 'https://github.com/apex-group/hr-portal',
    liveUrl: 'https://hr.apexgroup.internal',
    appStoreUrl: '',
    playStoreUrl: '',
    serverInfo: 'Internal Dedicated On-Prem Server',
    teamMembers: ['usr-1', 'usr-2'],
    lastUpdated: '2026-05-02 10:00',
    milestones: [
      { id: 'm40', name: 'V1.0 Production Launch', status: 'Completed', dueDate: '2026-05-01' }
    ],
    documents: []
  }
];

export const DEMO_TASKS = [
  {
    id: 'tsk-201',
    taskName: 'Implement PCI-DSS Compliance Encryption for Cards',
    description: 'Encrypt payment payload using AES-256-GCM before database storage and log redacting.',
    projectId: 'proj-101',
    projectName: 'OmniPay Enterprise Suite',
    assignedToId: 'usr-3',
    assignedToName: 'David Chen',
    assignedToAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    priority: 'Critical',
    status: 'IN PROGRESS',
    startDate: '2026-08-05',
    dueDate: '2026-08-18',
    estimatedHours: 24,
    actualHours: 16,
    tags: ['Security', 'Backend', 'Crypto'],
    commentsCount: 4
  },
  {
    id: 'tsk-202',
    taskName: 'Redesign Analytics Dashboard Cards with Glassmorphism',
    description: 'Update statistics widgets with backdrop-filter blur, CSS variables, and modern sparkline previews.',
    projectId: 'proj-101',
    projectName: 'OmniPay Enterprise Suite',
    assignedToId: 'usr-4',
    assignedToName: 'Elena Rostova',
    assignedToAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    priority: 'High',
    status: 'COMPLETED',
    startDate: '2026-08-01',
    dueDate: '2026-08-10',
    estimatedHours: 16,
    actualHours: 14,
    tags: ['UI/UX', 'Tailwind', 'Frontend'],
    commentsCount: 2
  },
  {
    id: 'tsk-203',
    taskName: 'Build APK Release Build v2.4.1 & Test SQLite Offline Storage',
    description: 'Verify background sync worker when cellular coverage drops during field inspection.',
    projectId: 'proj-102',
    projectName: 'Apex Field Force Mobile App',
    assignedToId: 'usr-3',
    assignedToName: 'David Chen',
    assignedToAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    priority: 'High',
    status: 'TESTING',
    startDate: '2026-08-08',
    dueDate: '2026-08-15',
    estimatedHours: 18,
    actualHours: 12,
    tags: ['Android', 'APK', 'QA'],
    commentsCount: 6
  },
  {
    id: 'tsk-204',
    taskName: 'Configure Kubernetes Helm Charts & Auto-scaling Rules',
    description: 'Set Horizontal Pod Autoscaler (HPA) triggers at 75% CPU load for CyberGuard proxy nodes.',
    projectId: 'proj-104',
    projectName: 'CyberGuard Microservice API',
    assignedToId: 'usr-5',
    assignedToName: 'Alex Rivera',
    assignedToAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    priority: 'Medium',
    status: 'REVIEW',
    startDate: '2026-08-09',
    dueDate: '2026-08-16',
    estimatedHours: 12,
    actualHours: 10,
    tags: ['DevOps', 'K8s', 'Cloud'],
    commentsCount: 1
  },
  {
    id: 'tsk-205',
    taskName: 'Integrate Stripe Webhook Listeners for Subscriptions',
    description: 'Handle customer.subscription.updated and payment_intent.succeeded events.',
    projectId: 'proj-103',
    projectName: 'Nexus Marketplace iOS & Web',
    assignedToId: 'usr-2',
    assignedToName: 'Marcus Vance',
    assignedToAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    priority: 'Medium',
    status: 'TODO',
    startDate: '2026-08-15',
    dueDate: '2026-08-25',
    estimatedHours: 20,
    actualHours: 0,
    tags: ['Payments', 'Stripe', 'API'],
    commentsCount: 0
  },
  {
    id: 'tsk-206',
    taskName: 'Create User Management Modal with Role-Based Permission Checkboxes',
    description: 'Allow Super Admin to assign granular permissions (Manage Apps, Upload APKs, Delete Projects).',
    projectId: 'proj-105',
    projectName: 'Group HR & Employee Self-Service',
    assignedToId: 'usr-1',
    assignedToName: 'Sarah Jenkins',
    assignedToAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    priority: 'Low',
    status: 'COMPLETED',
    startDate: '2026-04-10',
    dueDate: '2026-04-20',
    estimatedHours: 10,
    actualHours: 9,
    tags: ['Admin', 'Security'],
    commentsCount: 3
  }
];

export const DEMO_APPLICATIONS = [
  {
    id: 'app-301',
    name: 'OmniPay Cloud Platform',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: '🌐 Web Application',
    platform: 'Web / SaaS',
    technology: 'React 18, Node.js, PostgreSQL',
    developer: 'Marcus Vance',
    version: 'v3.2.0',
    latestReleaseDate: '2026-07-28',
    status: 'Production',
    productionUrl: 'https://omnipay.apexgroup.io',
    repository: 'https://github.com/apex-group/omnipay-suite'
  },
  {
    id: 'app-302',
    name: 'Apex Field Force Android',
    companyId: 'comp-1',
    companyName: 'Apex Global Technologies',
    type: '📱 Android Application',
    platform: 'Android APK / Google Play',
    technology: 'React Native, Kotlin Native Modules',
    developer: 'David Chen',
    version: 'v2.4.1',
    latestReleaseDate: '2026-08-11',
    status: 'Testing',
    productionUrl: 'https://play.google.com/store/apps/details?id=com.apex.fieldforce',
    repository: 'https://github.com/apex-group/fieldforce-app'
  },
  {
    id: 'app-303',
    name: 'Nexus Marketplace iOS',
    companyId: 'comp-2',
    companyName: 'Nexus Digital Media',
    type: '🍎 iOS Application',
    platform: 'iOS / App Store',
    technology: 'Swift 5, SwiftUI, Combine',
    developer: 'Elena Rostova',
    version: 'v1.1.0',
    latestReleaseDate: '2026-06-15',
    status: 'Development',
    productionUrl: 'https://apps.apple.com/app/nexus-market/id123456789',
    repository: 'https://github.com/nexus-media/marketplace'
  },
  {
    id: 'app-304',
    name: 'CyberGuard OAuth Gateway',
    companyId: 'comp-3',
    companyName: 'CyberPulse Solutions',
    type: '⚙️ API / Backend',
    platform: 'Linux Docker Container',
    technology: 'Go 1.22, gRPC, Redis Engine',
    developer: 'Alex Rivera',
    version: 'v4.0.2',
    latestReleaseDate: '2026-08-02',
    status: 'UAT',
    productionUrl: 'https://api.cyberpulse.io/v1/health',
    repository: 'https://github.com/cyberpulse/cyberguard-api'
  }
];

export const DEMO_RELEASES = [
  {
    id: 'rel-501',
    appName: 'Apex Field Force App',
    version: 'v2.4.1',
    buildNumber: '241',
    platform: 'Android APK',
    releaseType: 'Production Candidate',
    releaseDate: '2026-08-11',
    status: 'Published',
    uploadedBy: 'David Chen',
    fileName: 'fieldforce-v2.4.1-build241.apk',
    fileSize: '38.4 MB',
    downloadUrl: '#',
    releaseNotes: '- Added offline caching support for SQLite DB.\n- Fixed crash during camera photo attachment.\n- Optimized GPS background tracking battery usage by 35%.\n- Upgraded Android SDK target to 34.'
  },
  {
    id: 'rel-502',
    appName: 'Apex Field Force App',
    version: 'v2.4.0',
    buildNumber: '240',
    platform: 'Android APK',
    releaseType: 'Beta Release',
    releaseDate: '2026-07-20',
    status: 'Archived',
    uploadedBy: 'David Chen',
    fileName: 'fieldforce-v2.4.0-build240.apk',
    fileSize: '37.1 MB',
    downloadUrl: '#',
    releaseNotes: '- Initial beta release for internal QA group testing.'
  },
  {
    id: 'rel-503',
    appName: 'OmniPay Cloud Platform',
    version: 'v3.2.0',
    buildNumber: '320',
    platform: 'Web / SaaS',
    releaseType: 'Major Feature Release',
    releaseDate: '2026-07-28',
    status: 'Published',
    uploadedBy: 'Marcus Vance',
    fileName: 'omnipay-web-v3.2.0.tar.gz',
    fileSize: '14.2 MB',
    downloadUrl: '#',
    releaseNotes: '- Multi-currency auto exchange rates API integration.\n- Dark mode glassmorphism UI update.\n- Performance improvements for PDF invoice rendering engine.'
  }
];

export const DEMO_ISSUES = [
  {
    id: 'BUG-101',
    title: 'Camera scanner fails on low-end Android devices (Android 10)',
    projectId: 'proj-102',
    projectName: 'Apex Field Force Mobile App',
    applicationName: 'Apex Field Force Android',
    reportedBy: 'QA Tester - Jordan Lee',
    assignedTo: 'David Chen',
    priority: 'Critical',
    severity: 'Critical',
    status: 'In Progress',
    createdDate: '2026-08-10',
    dueDate: '2026-08-14',
    description: 'When launching barcode camera scanner on devices with <= 3GB RAM, the app triggers OutOfMemory exception and terminates.',
    commentsCount: 3
  },
  {
    id: 'BUG-102',
    title: 'Session token expiration notification not showing toast alert',
    projectId: 'proj-101',
    projectName: 'OmniPay Enterprise Suite',
    applicationName: 'OmniPay Cloud Platform',
    reportedBy: 'Sarah Jenkins',
    assignedTo: 'Marcus Vance',
    priority: 'Medium',
    severity: 'Medium',
    status: 'Resolved',
    createdDate: '2026-08-08',
    dueDate: '2026-08-12',
    description: 'User gets redirected to login screen abruptly without countdown alert banner.',
    commentsCount: 2
  },
  {
    id: 'BUG-103',
    title: 'OAuth Refresh Token deadlock under high concurrent requests (>1000 rps)',
    projectId: 'proj-104',
    projectName: 'CyberGuard Microservice API',
    applicationName: 'CyberGuard OAuth Gateway',
    reportedBy: 'Alex Rivera',
    assignedTo: 'Alex Rivera',
    priority: 'High',
    severity: 'High',
    status: 'Open',
    createdDate: '2026-08-11',
    dueDate: '2026-08-17',
    description: 'Redis lock timeout needs adjustment in distributed token refresh routine.',
    commentsCount: 1
  }
];

export const DEMO_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'David Chen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'Uploaded APK Build v2.4.1 (fieldforce-v2.4.1.apk)',
    module: 'APK Release Manager',
    time: 'Today at 09:15 AM',
    company: 'Apex Global Technologies'
  },
  {
    id: 'act-2',
    user: 'Sarah Jenkins',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    action: 'Changed project status from "Development" to "Testing"',
    module: 'Project Workspace',
    time: 'Today at 08:30 AM',
    company: 'Apex Global Technologies'
  },
  {
    id: 'act-3',
    user: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    action: 'Assigned Task #tsk-201 (PCI-DSS Encryption) to David Chen',
    module: 'Task Board',
    time: 'Yesterday at 04:45 PM',
    company: 'Nexus Digital Media'
  },
  {
    id: 'act-4',
    user: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    action: 'Completed Task #tsk-202 (Redesign Analytics Dashboard)',
    module: 'Task Board',
    time: 'Yesterday at 02:10 PM',
    company: 'Apex Global Technologies'
  }
];

export const DEMO_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New APK Build Uploaded',
    message: 'David Chen uploaded APK release candidate v2.4.1 for Apex Field Force App.',
    timestamp: '10 min ago',
    read: false,
    type: 'release',
    link: 'releases'
  },
  {
    id: 'notif-2',
    title: 'Project Deadline Approaching',
    message: 'Apex Field Force App testing target deadline is in 13 days.',
    timestamp: '1 hour ago',
    read: false,
    type: 'warning',
    link: 'projects'
  },
  {
    id: 'notif-3',
    title: 'Critical Bug Assigned',
    message: 'BUG-101 (Camera scanner memory exception) assigned to you.',
    timestamp: '3 hours ago',
    read: true,
    type: 'issue',
    link: 'issues'
  }
];
