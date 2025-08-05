import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { TransactionManager } from './components/TransactionManager';
import { SalaryCalculator } from './components/SalaryCalculator';
import { CommissionCalculator } from './components/CommissionCalculator';
import { Settings } from './components/Settings';
import { Navigation } from './components/Navigation';
import { MobileNavigation } from './components/MobileNavigation';
import { TransactionProvider } from './context/TransactionContext';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Auth } from './components/Auth';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showMobileNav, setShowMobileNav] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your budget manager...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionManager />;
      case 'salary':
        return <SalaryCalculator />;
      case 'commission':
        return <CommissionCalculator />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SettingsProvider>
      <TransactionProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-gray-900">Budget Manager</h1>
              <button
                onClick={() => setShowMobileNav(!showMobileNav)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          {showMobileNav && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileNav(false)}>
              <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Budget Manager</h1>
                    <button
                      onClick={() => setShowMobileNav(false)}
                      className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Professional Edition</p>
                </div>
                <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} onClose={() => setShowMobileNav(false)} />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <main className="lg:ml-64 p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </TransactionProvider>
    </SettingsProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;