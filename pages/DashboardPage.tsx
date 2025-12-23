import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { UserRole } from '../types';
import PatientDashboard from '../components/dashboards/PatientDashboard';
import AIAssistant from '../components/AIAssistant';
import BackButton from '../components/BackButton';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const isAdminAuthed = typeof window !== 'undefined' && localStorage.getItem('adminAuth') === 'true';

  if (!user) {
    // If no user in context, send to auth login
    return <Navigate to="/auth" />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case UserRole.PATIENT:
      case UserRole.DOCTOR:
      case UserRole.NURSE:
        return <PatientDashboard user={user} />;
      default:
        // Unknown role: if admin session exists, send to admin, else home
        return isAdminAuthed ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton />
            <img src="/icon.png" alt="Drepto Logo" className="h-16 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" />
            <h1 className="text-2xl font-bold text-gray-900">
              <span className="text-primary">Drepto</span> Dashboard
            </h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {renderDashboard()}
      </main>
      <AIAssistant />
    </div>
  );
};

export default DashboardPage;