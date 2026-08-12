import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { CompanyList } from './pages/CompanyList';
import { ProjectList } from './pages/ProjectList';
import { ProjectDetail } from './pages/ProjectDetail';
import { AppInventory } from './pages/AppInventory';
import { ReleaseManager } from './pages/ReleaseManager';
import { IssueTracker } from './pages/IssueTracker';
import { TeamManager } from './pages/TeamManager';
import { CalendarView } from './pages/CalendarView';
import { ReportsPage } from './pages/ReportsPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

// Modals
import { CreateProjectModal } from './components/Modals/CreateProjectModal';
import { UploadReleaseModal } from './components/Modals/UploadReleaseModal';
import { ReportIssueModal } from './components/Modals/ReportIssueModal';

const AppContent = () => {
  const { currentUser, activeTab } = useApp();

  // Active Modals
  const [modalType, setModalType] = useState(null); // 'project' | 'release' | 'issue' | null

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onOpenModal={setModalType} />;
      case 'companies':
        return <CompanyList />;
      case 'projects':
        return <ProjectList onOpenModal={setModalType} />;
      case 'project-detail':
        return <ProjectDetail />;
      case 'applications':
        return <AppInventory onOpenModal={setModalType} />;
      case 'releases':
        return <ReleaseManager onOpenModal={setModalType} />;
      case 'issues':
        return <IssueTracker onOpenModal={setModalType} />;
      case 'team':
        return <TeamManager />;
      case 'calendar':
        return <CalendarView />;
      case 'reports':
        return <ReportsPage />;
      case 'audit':
        return <AuditLogPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onOpenModal={setModalType} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-indigo-600 selection:text-white">
      {/* Global Top Navbar */}
      <Navbar onOpenModal={setModalType} />

      <div className="flex flex-1 relative">
        {/* Left Sidebar (Desktop & Mobile Drawer) */}
        <Sidebar />

        {/* Main Work Area with mobile bottom padding for MobileBottomNav */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 pb-20 lg:pb-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {renderActivePage()}
        </main>
      </div>

      {/* Smartphone Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals */}
      <CreateProjectModal
        isOpen={modalType === 'project'}
        onClose={() => setModalType(null)}
      />
      <UploadReleaseModal
        isOpen={modalType === 'release'}
        onClose={() => setModalType(null)}
      />
      <ReportIssueModal
        isOpen={modalType === 'issue'}
        onClose={() => setModalType(null)}
      />

      {/* Command Palette Overlay (Ctrl + K) */}
      <CommandPalette />

      {/* Floating Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
