import React from 'react';
import { LayoutDashboard, Receipt, Calculator, Percent, Settings } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'salary', label: 'Salary Calculator', icon: Calculator },
    { id: 'commission', label: 'Commission', icon: Percent },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-xl font-bold">Budget Manager</h1>
        <p className="text-sm text-blue-100 mt-1">Professional Edition</p>
      </div>
      
      <div className="px-3 mb-4">
        <UserProfile />
      </div>
      
      <div className="px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-xl text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-700 hover:bg-gray-50 hover:scale-102'
              }`}
            >
              <Icon size={22} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};