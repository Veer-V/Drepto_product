
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LabTestsPage: React.FC = () => {
    const navigate = useNavigate();
    const dummyRefs = { home: { current: null }, product: { current: null }, about: { current: null }, contact: { current: null } };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar sectionRefs={dummyRefs as any} />
            <main className="flex-grow flex flex-col items-center justify-center p-8 text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Laboratory Services</h2>
                <p className="text-gray-600 mb-6">Laboratory services have been temporarily suspended. Please check back later or visit the Drepto Store for wellness products.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors"
                >
                    Go to Home
                </button>
            </main>
            <Footer />
        </div>
    );
};

export default LabTestsPage;
