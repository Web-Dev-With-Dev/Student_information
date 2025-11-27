
import React from 'react';
import { Page } from '../types';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{
  label: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  // FIX: Changed JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
  icon: React.ReactNode;
}> = ({ label, currentPage, setCurrentPage, icon }) => (
  <button
    onClick={() => setCurrentPage(label)}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
      currentPage === label
        ? 'bg-primary text-white'
        : 'text-text-secondary hover:bg-surface hover:text-text-primary'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  // FIX: Changed JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
  const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <HomeIcon /> },
    { label: 'Departments', icon: <BuildingOfficeIcon /> },
    { label: 'Instructors', icon: <UserGroupIcon /> },
    { label: 'Students', icon: <AcademicCapIcon /> },
    { label: 'Courses', icon: <BookOpenIcon /> },
    { label: 'Enrollments', icon: <ClipboardDocumentListIcon /> },
    { label: 'Fees', icon: <CurrencyDollarIcon /> },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-surface p-4 border-r border-border hidden md:block">
      <div className="flex items-center mb-8">
        <div className="p-2 bg-primary rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.247-8.995l10.494 5.998-10.494-5.998zm0 0L17.247 12 6.753 9.253zM4.5 9l7.5 4.5L19.5 9" />
          </svg>
        </div>
        <h1 className="text-xl font-bold ml-3 text-text-primary">SIS Admin</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            label={item.label}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
};

// SVG Icon Components
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
);
const BuildingOfficeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2H5a1 1 0 110-2V4zm3 1a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
);
const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0115 15v3h1zM4.75 12.094A5.973 5.973 0 004 15v3H3v-3a3.005 3.005 0 011.25-2.406z" /></svg>
);
const AcademicCapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.998.998 0 011.07-1.07l2.857 1.428a1 1 0 001.146 0l2.857-1.428a1 1 0 011.07 1.07l1.644-1.137a1 1 0 000-1.84l-7-3zM10 18a6 6 0 004.85-2.15l-.85.38a1 1 0 00-1.146 0l-2.857-1.428a1 1 0 01-1.07-1.07L10 12.586 8.972 13.1a1 1 0 01-1.07 1.07l-2.857 1.428a1 1 0 00-1.146 0l-.85-.38A6 6 0 0010 18z" /></svg>
);
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0z" /><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
);
const ClipboardDocumentListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
);
const CurrencyDollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M8.433 7.418c.158-.103.346-.196.567-.267v1.698a2.5 2.5 0 00-1.134 0V7.418zM12.5 9.75a2.5 2.5 0 01-2.5 2.5H9.366a2.5 2.5 0 010-1.698h.767a2.5 2.5 0 001.134 0h1.233z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.5 4.5 0 00-1.858 3.408 1 1 0 101.858.5V10a2.5 2.5 0 012.5-2.5h1.134a1 1 0 100-2H11V5z" clipRule="evenodd" /></svg>
);

export default Sidebar;
