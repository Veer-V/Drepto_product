

import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.state && (location.state as any).view === 'register') {
      setIsLoginView(false);
    } else if (location.state && (location.state as any).view === 'login') {
      setIsLoginView(true);
    }
  }, [location.state]);

  const toggleView = () => setIsLoginView(!isLoginView);

  return (
    <div className="min-h-screen bg-light-blue flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>


      <div className="w-full max-w-md relative z-10">
        <div className="mb-4">
          <BackButton className="text-white hover:text-white/80" />
        </div>
        <div className="text-center mb-8 animate-fade-in-up flex flex-col items-center">
          <div className="flex items-center justify-center mb-6">
            <img src="/images/logo.png" alt="Drepto Logo" className="h-20 object-contain" />
          </div>
          <p className="text-gray-500 mt-2 font-medium">Quality Healthcare, Anytime, Anywhere.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 p-8 transition-all duration-500 border border-gray-100">
          {isLoginView ? (
            <Login onToggleView={toggleView} />
          ) : (
            <Register onToggleView={toggleView} />
          )}
        </div>

        {/* Admin Login Shortcut */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-sm text-primary font-semibold hover:underline"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
