import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MEDICINES as DEFAULT_MEDICINES,
  LAB_TESTS_DATA,
} from '../../constants';

const MobileCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}> = ({ title, icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} p-3 rounded-xl shadow-md active:scale-95 transition-transform duration-200 flex flex-col items-center justify-center h-28 text-center relative overflow-hidden`}
  >
    <div className="text-white mb-2 opacity-90">{icon}</div>
    <h3 className="font-bold text-white text-xs leading-tight">{title}</h3>
  </button>
);

const MobileHome: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Patient Login',
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
      ),
      action: () => navigate('/auth'),
    },
    {
      title: 'Doctor Login',
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      action: () => navigate('/auth'),
    },
    {
      title: 'Find Doctors',
      color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      ),
      action: () => navigate('/mobile/doctors'),
    },
    {
      title: 'Pharmacy',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          ></path>
        </svg>
      ),
      action: () => navigate('/medicines'),
    },
    {
      title: 'Lab Tests',
      color: 'bg-gradient-to-br from-purple-400 to-purple-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
      ),
      action: () => navigate('/lab-tests'),
    },
    {
      title: 'Nurses',
      color: 'bg-gradient-to-br from-pink-400 to-pink-600',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      ),
      action: () => navigate('/mobile/nurses'),
    },
  ];

  const medicines = DEFAULT_MEDICINES.slice(0, 10);
  const tests = LAB_TESTS_DATA.slice(0, 10);

  const upcomingAppointment = null; // Set to null for empty state, or mock object to test

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header + Search */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-500 text-xs font-medium">Hello, User</p>
            <h1 className="text-xl font-bold text-dark-blue">Welcome Back</h1>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors, medicines..."
            className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary/50 transition-shadow shadow-inner"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Upcoming Appointment Widget */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-gray-800">
            Upcoming Consultation
          </h2>
          <button
            onClick={() => navigate('/mobile/appointments')}
            className="text-xs text-primary font-semibold"
          >
            See all
          </button>
        </div>
        {upcomingAppointment ? (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
              Dr
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">Dr. Example</h3>
              <p className="text-xs text-gray-500">
                General Physician • Today, 4:00 PM
              </p>
            </div>
            <button className="ml-auto bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-lg">
              Join
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-start">
              <h3 className="font-bold text-lg mb-1">Schedule a Checkup</h3>
              <p className="text-teal-100 text-xs mb-3 max-w-[70%]">
                Connect with top doctors for a healthy life.
              </p>
              <button
                onClick={() => navigate('/mobile/doctors')}
                className="bg-white text-teal-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
              >
                Find a Doctor
              </button>
            </div>
            <svg
              className="absolute -bottom-4 -right-4 w-24 h-24 text-white/20 opacity-50 rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        )}
      </div>

      {/* Main Actions Grid */}
      <div className="px-4 mb-8">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/medicines')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-sm">
              Order Medicine
            </span>
          </button>
          <button
            onClick={() => navigate('/lab-tests')}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-sm">
              Book Lab Test
            </span>
          </button>
        </div>
      </div>

      {/* Featured Lab Tests */}
      <section className="mb-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">
            Popular Lab Tests
          </h2>
          <button
            onClick={() => navigate('/lab-tests')}
            className="text-xs text-primary font-semibold"
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {tests.map((t) => (
            <div
              key={t.id}
              className="min-w-[200px] snap-start bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col justify-between h-32"
            >
              <div>
                <p className="text-sm font-bold text-gray-900 line-clamp-1">
                  {t.name}
                </p>
                <p className="text-[10px] text-gray-500 mb-3">{t.alias}</p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-bold text-gray-900">
                  ₹{t.price}
                </span>
                <button
                  onClick={() => navigate('/lab-tests')}
                  className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="mb-8 px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-800">Essentials</h2>
          <button
            onClick={() => navigate('/medicines')}
            className="text-xs text-primary font-semibold"
          >
            See all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
          {DEFAULT_MEDICINES.slice(0, 5).map((m) => (
            <div
              key={m.id}
              className="min-w-[150px] snap-start bg-white rounded-2xl border border-gray-100 p-3 shadow-sm"
            >
              <div className="h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                {m.imageUrl ? (
                  <img
                    src={m.imageUrl}
                    alt={m.name}
                    className="h-24 w-auto object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                )}
                <div className="absolute top-2 right-2 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  10% OFF
                </div>
              </div>
              <p className="text-xs font-bold text-gray-900 line-clamp-1 mb-1">
                {m.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900">
                  ₹{m.price.toFixed(0)}
                </span>
                <button
                  onClick={() => navigate('/medicines')}
                  className="p-1.5 bg-primary/10 text-primary rounded-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
