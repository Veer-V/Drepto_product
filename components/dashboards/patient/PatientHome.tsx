import React, { useState, useEffect } from 'react';
import { User } from '../../../types';
import CouponPopup from '../../common/CouponPopup';

// Icons
const ProductIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const SubscriptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  onClick?: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, color, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100 group relative overflow-hidden"
  >
    {/* Hover Background Effect */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${color}`}></div>

    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out"></div>

    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color} text-white shadow-lg shadow-${color.replace('bg-', '')}/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
      {icon}
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>

    <div className="mt-6 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
      <span>Access Service</span>
      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
    </div>
  </div>
);

interface PatientHomeProps {
  user: User;
  onNavigate: (page: string) => void;
}

const PatientHome: React.FC<PatientHomeProps> = ({ user, onNavigate }) => {
  const [showCoupon, setShowCoupon] = useState(false);

  useEffect(() => {
    // Show coupon on mount (simulating "on login" popup)
    const timer = setTimeout(() => setShowCoupon(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const modules = [
    { id: "products", title: "Drepto Store", description: "Healthcare devices & wellness products.", icon: <ProductIcon />, color: "bg-orange-500" },
    { id: "subscription", title: "Drepto Premium", description: "Exclusive discounts & priority care.", icon: <SubscriptionIcon />, color: "bg-pink-500" },
    { id: "profile", title: "My Profile", description: "Medical records, history & settings.", icon: <SettingsIcon />, color: "bg-gray-700" },
  ];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      <CouponPopup isOpen={showCoupon} onClose={() => setShowCoupon(false)} code="FIRSTFREE" />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 md:p-10 rounded-3xl shadow-2xl text-white overflow-hidden flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium text-blue-100 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            System Operational
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            {getTimeBasedGreeting()}, <span className="text-blue-200">{user.firstName}!</span>
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed opacity-90">
            Your health journey starts here. What would you like to do today?
          </p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl text-center min-w-[140px]">
          <p className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-1">Today</p>
          <p className="text-xl font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {[
          { label: 'Active', value: '0', sub: 'Orders', color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Balance', value: '₹0.00', sub: 'Wallet', color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              <div className={`w-2 h-2 rounded-full ${stat.color.replace('text', 'bg')}`}></div>
            </div>
            <div className="mt-4">
              <span className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</span>
              <span className="text-sm text-gray-400 block mt-1">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-primary rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800">Health Services</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group relative overflow-hidden flex flex-col justify-between h-full"
            >
              <div>
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-5 ${m.color} text-white shadow-lg shadow-blue-500/30`}>
                  {React.cloneElement(m.icon as React.ReactElement, { width: 24, height: 24 })}
                </div>
                <h3 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2 leading-tight">{m.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2 hidden md:block">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
