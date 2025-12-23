import React, { useState } from 'react';
import { User } from '../../types';
import PatientHome from './patient/PatientHome';
import DreptoProducts from './patient/DreptoProducts';
import Profile from './patient/Profile';
import SubscriptionPlans from './patient/SubscriptionPlans';

interface PatientDashboardProps {
  user: User;
}

// --- Icons for Navigation ---
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-primary" : "text-gray-500"}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ProductIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-primary" : "text-gray-500"}>
    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

const SubscriptionIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-primary" : "text-gray-500"}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-primary" : "text-gray-500"}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const PatientDashboard: React.FC<PatientDashboardProps> = ({ user }) => {
  const [currentView, setCurrentView] = useState<string>('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'products', label: 'Drepto Store', icon: ProductIcon },
    { id: 'subscription', label: 'Premium Plans', icon: SubscriptionIcon },
    { id: 'profile', label: 'Profile', icon: SettingsIcon },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <DreptoProducts onBack={() => setCurrentView('home')} />;
      case 'subscription':
        return <SubscriptionPlans onBack={() => setCurrentView('home')} />;
      case 'profile':
        return <Profile user={user} onBack={() => setCurrentView('home')} />;
      default:
        return <PatientHome user={user} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:min-h-[calc(100vh-6rem)] bg-gray-50 md:rounded-xl md:overflow-hidden md:border border-gray-200 shadow-sm mt-0 md:mt-4 mb-4">
      {/* --- Desktop Sidebar --- */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${currentView === item.id
                  ? 'bg-primary text-white shadow-md shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
              >
                <item.icon active={currentView === item.id} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setCurrentView('profile')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Mobile Bottom Navigation --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center p-2 overflow-x-auto gap-2 no-scrollbar px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-w-[70px] shrink-0 ${currentView === item.id
                ? 'text-primary bg-blue-50'
                : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              <item.icon active={currentView === item.id} />
              <span className={`text-[10px] font-medium mt-1 truncate w-full text-center ${currentView === item.id ? 'font-bold' : ''}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-4 md:p-8 md:overflow-y-auto md:h-[calc(100vh-6rem)] pb-28 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
