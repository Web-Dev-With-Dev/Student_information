import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import InstructorsPage from './pages/InstructorsPage';
import DepartmentsPage from './pages/DepartmentsPage';
import CoursesPage from './pages/CoursesPage';
import FeesPage from './pages/FeesPage';
import EnrollmentsPage from './pages/EnrollmentsPage';
import { Page } from './types';
import { api } from './services/api';

const ConnectionStatusBanner: React.FC<{ isConnected: boolean }> = ({ isConnected }) => {
  if (isConnected) return null;

  return (
    <div className="bg-red-600 text-white text-center p-2 fixed top-0 left-0 right-0 z-50 animate-pulse">
      <div className="container mx-auto flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span>Connection Error: Could not connect to the backend server. Please ensure it is running.</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.ping();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
        console.error("Backend connection check failed:", error);
      }
    };
    // Check immediately and then every 5 seconds
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Students':
        return <StudentsPage />;
      case 'Instructors':
        return <InstructorsPage />;
      case 'Departments':
        return <DepartmentsPage />;
      case 'Courses':
        return <CoursesPage />;
      case 'Enrollments':
        return <EnrollmentsPage />;
      case 'Fees':
        return <FeesPage />;
      default:
        return <DashboardPage />;
    }
  }, [currentPage]);

  return (
    <>
      <ConnectionStatusBanner isConnected={isConnected} />
      <div className={`flex h-screen bg-background text-text-primary transition-all duration-300 ${!isConnected ? 'pt-9' : ''}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </>
  );
};

export default App;
