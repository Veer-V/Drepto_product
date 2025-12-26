

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';
import { CITIES, LAB_TESTS_DATA, LAB_PACKAGES_DATA, LAB_REVIEWS } from '../constants';
import { LabTestDetail, LabPackageDetail } from '../types';
import { loadLabTests } from '../components/admin/LabTestData';
import MobileHeader from '../components/mobile/MobileHeader';

// --- Sub-Components to maintain cleaner code within the file ---

const LabTestsPage: React.FC = () => {
    // Dummy Refs for Navbar
    const dummyRefs = { home: { current: null }, product: { current: null }, about: { current: null }, contact: { current: null } };

    return (
        <div className="flex flex-col min-h-screen bg-[#F1F5F9]">
            <div className="hidden md:block">
                <Navbar sectionRefs={dummyRefs as any} />
            </div>
            <div className="md:hidden">
                <MobileHeader title="Lab Tests" showBack={true} onBack={() => window.history.back()} />
            </div>

            <main className="flex-grow flex flex-col items-center justify-start pt-32 p-6 text-center">
                <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full transform hover:scale-105 transition-transform duration-300">
                    <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Coming Soon</h1>
                    <p className="text-gray-500 mb-6">We are working hard to bring you the best lab test booking experience. Stay tuned!</p>
                    <button onClick={() => window.history.back()} className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200">
                        Go Back
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LabTestsPage;
