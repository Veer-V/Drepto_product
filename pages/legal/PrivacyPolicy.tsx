import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MobileHeader from '../../components/mobile/MobileHeader';

const PrivacyPolicy: React.FC = () => {
    // Dummy refs for Navbar
    const dummyRefs = {
        home: { current: null },
        product: { current: null },
        about: { current: null },
        contact: { current: null },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="md:hidden">
                <MobileHeader title="Privacy Policy" showBack={true} />
            </div>
            <div className="hidden md:block">
                <Navbar sectionRefs={dummyRefs as any} />
            </div>

            <main className="flex-grow container mx-auto px-6 py-8 md:py-24 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fade-in-up">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-2">Privacy Policy</h1>
                    <p className="text-gray-500 mb-8 italic">Effective Date: December 23, 2025</p>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Overview</h3>
                        <p className="text-gray-600 leading-relaxed">
                            At Drepto Biodevices Pvt. Ltd., located at SINE, Rahul Bajaj Building, IIT Bombay, Powai, Mumbai, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your information when you order products like the Drepto Shanti Pain Patch or Suraveda Relief.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Information We Collect</h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-600">
                            <li><strong>Personal Information:</strong> Name, shipping address, email address, and phone number required to process your orders.</li>
                            <li><strong>Health Information:</strong> We do strictly not store sensitive medical records. However, if you voluntarily provide feedback regarding your experience with our pain relief products (e.g., for back pain, menstrual cramps, or arthritis), this data may be anonymized and used for research purposes to improve our affordable healthcare technologies.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">How We Use Your Information</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>To fulfill orders and deliver products to your doorstep.</li>
                            <li>To send order confirmations and shipping updates.</li>
                            <li>To improve our website functionality and customer service.</li>
                            <li>To comply with legal obligations.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Data Security</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We implement industry-standard security measures to protect your personal data during transmission and storage. Payment processing is handled by secure third-party gateways; we do not store your credit/debit card details on our servers.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Third-Party Disclosure</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We do not sell, trade, or transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website and conducting our business (e.g., logistics partners), so long as those parties agree to keep this information confidential.
                        </p>
                    </section>
                </div>
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
};

export default PrivacyPolicy;
