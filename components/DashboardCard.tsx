
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'yellow' | 'red';
}

const colorClasses = {
  primary: 'bg-indigo-500',
  secondary: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-red-500',
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg flex items-center justify-between border border-border">
      <div>
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
      </div>
      <div className={`p-4 rounded-full ${colorClasses[color]}`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
