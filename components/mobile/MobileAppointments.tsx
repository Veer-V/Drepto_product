import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import { useNavigate } from 'react-router-dom';

const MobileAppointments: React.FC = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

    // Placeholder data - will be real in Phase 2
    const appointments: any[] = [];

    return (
        <div className="min-h-screen bg-gray-50 pb-[80px]"> {/* Padding for bottom nav */}
            <MobileHeader title="My Appointments" showBack={false} />

            {/* Tabs */}
            <div className="bg-white px-4 py-3 shadow-sm sticky top-[60px] z-10 flex border-b border-gray-100">
                <button
                    onClick={() => setFilter('upcoming')}
                    className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'upcoming' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setFilter('past')}
                    className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-colors ${filter === 'past' ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                >
                    History
                </button>
            </div>

            <div className="p-4">
                {appointments.length > 0 ? (
                    <div className="space-y-4">
                        {/* Map appointments here later */}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-20 text-center animate-fade-in-up">
                        <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">No Appointments</h3>
                        <p className="text-gray-500 text-sm max-w-[250px] mb-8">
                            You haven't booked any consultations yet. Schedule one today!
                        </p>
                        <button
                            onClick={() => navigate('/mobile/doctors')}
                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-teal-700 transition active:scale-95"
                        >
                            Find a Doctor
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileAppointments;
