import React from 'react';
import { LayoutDashboard, Receipt, Calculator, Percent, Settings } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab, onClose }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'salary', label: 'Salary Calculator', icon: Calculator },
    { id: 'commission', label: 'Commission', icon: Percent },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (itemId: string) => {
    setActiveTab(itemId);
    onClose();
  };

  return (
    <div className="px-3 py-4">
      <div className="mb-4">
        <UserProfile />
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
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
  );
};