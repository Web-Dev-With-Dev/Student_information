
import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { generateReport } from '../services/geminiService';
import { api } from '../services/api';
import { DashboardStats } from '../types';
import ReactMarkdown from 'react-markdown';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reportQuery, setReportQuery] = useState('');
  const [reportResult, setReportResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleGenerateReport = async () => {
    if (!reportQuery.trim()) {
      setReportResult("Please enter a query to generate a report.");
      return;
    }
    setIsGenerating(true);
    setReportResult('');
    try {
      const allData = await api.getAllDataForReport();
      const result = await generateReport(reportQuery, allData);
      setReportResult(result);
    } catch (error) {
      console.error(error);
      setReportResult('An error occurred while generating the report.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-primary">Dashboard</h1>
      
      {isLoading ? (
        <div className="text-center text-text-secondary">Loading stats...</div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard title="Total Students" value={stats.students} color="primary" icon={<AcademicCapIcon />} />
          <DashboardCard title="Total Instructors" value={stats.instructors} color="secondary" icon={<UserGroupIcon />} />
          <DashboardCard title="Active Courses" value={stats.courses} color="yellow" icon={<BookOpenIcon />} />
          <DashboardCard title="Departments" value={stats.departments} color="red" icon={<BuildingOfficeIcon />} />
        </div>
      ) : (
        <div className="text-center text-red-400">Failed to load stats.</div>
      )}

      <div className="bg-surface p-6 rounded-xl shadow-lg border border-border">
        <h2 className="text-xl font-bold mb-4 text-text-primary">AI-Powered Report Generator</h2>
        <p className="text-text-secondary mb-4">Ask a question about the student data in natural language, and Gemini will generate a report for you. For example: "Who are the top 5 students by department?" or "List all courses in the Computer Science department."</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={reportQuery}
            onChange={(e) => setReportQuery(e.target.value)}
            placeholder="e.g., How many students are in each department?"
            className="flex-grow bg-background border border-border rounded-lg px-4 py-2 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-900 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <SpinnerIcon />
                Generating...
              </>
            ) : (
              'Generate Report'
            )}
          </button>
        </div>

        {reportResult && (
          <div className="mt-6 p-4 bg-background rounded-lg border border-border">
            <h3 className="text-lg font-semibold mb-2 text-text-primary">Generated Report</h3>
            <div className="prose prose-invert max-w-none text-text-secondary">
               <ReactMarkdown>{reportResult}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// SVG Icons
const AcademicCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>;
const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 0a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.247-8.995l10.494 5.998-10.494-5.998zm0 0L17.247 12 6.753 9.253zM4.5 9l7.5 4.5L19.5 9" /></svg>;
const BuildingOfficeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const SpinnerIcon = () => <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;


export default DashboardPage;
