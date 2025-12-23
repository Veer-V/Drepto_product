import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileHeader from '../components/mobile/MobileHeader';

const PoliciesPage: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('terms');

    useEffect(() => {
        if (location.state && (location.state as any).tab) {
            setActiveTab((location.state as any).tab);
        }
    }, [location.state]);

    // dummy refs for Navbar since we aren't on the landing page
    const dummyRefs = {
        home: { current: null },
        product: { current: null },
        about: { current: null },
        contact: { current: null },
    };

    const tabs = [
        { id: 'terms', label: 'Terms & Conditions' },
        { id: 'privacy', label: 'Privacy Policy' },
        { id: 'refund', label: 'Refund & Return' },
        { id: 'shipping', label: 'Shipping Policy' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'terms':
                return (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-display font-bold text-dark-blue mb-6">Terms and Conditions</h2>
                        <p className="text-gray-500 mb-4 italic">Last Updated: December 23, 2025</p>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Introduction</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Welcome to Drepto Biodevices Pvt. Ltd. ("Company", "we", "our", "us"). These Terms and Conditions govern your use of our website <a href="http://www.dreptobiodevices.com" className="text-primary hover:underline">www.dreptobiodevices.com</a> and the purchase of our products, including the Drepto Suraveda Relief, Drepto MenstroHerb Sheet, and Drepto Shanti Pain Patch. By accessing our website and purchasing our products, you agree to be bound by these terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Medical Disclaimer</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                While our products are developed based on research by IIT Bombay and are designed to provide relief from pain and inflammation, the content on our website is for informational purposes only.
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-gray-600">
                                <li><strong>Consultation:</strong> Our products, including the Drepto Suraveda Relief (containing Diclofenac Diethylamine/NSAID), are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician regarding any medical condition.</li>
                                <li><strong>Usage:</strong> Products must be used strictly as directed for external use only via transdermal delivery. Do not apply to open wounds or damaged skin.</li>
                                <li><strong>Sensitivities:</strong> While products like MenstroHerb and Shanti Pain Patch are 100% natural and skin-friendly, users with specific allergies to herbal ingredients like Menthol, Camphor, Eucalyptus Oil, or Methyl Salicylate should exercise caution.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Product Information & Accuracy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We strive to ensure that product descriptions—such as the 24-hour efficacy of Suraveda and the 12-hour relief provided by MenstroHerb and Shanti patches—are accurate. However, we do not warrant that product descriptions or other content are error-free. The Franz diffusion cell method results provided are based on in-house specifications and research.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Intellectual Property</h3>
                            <p className="text-gray-600 leading-relaxed">
                                All content, trademarks, and data on this site, including the "Drepto" brand and references to our incubation/association with SINE, IIT Bombay, are the property of Drepto Biodevices Pvt. Ltd. Unauthorized use is strictly prohibited.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Governing Law</h3>
                            <p className="text-gray-600 leading-relaxed">
                                These terms shall be governed by the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra, consistent with our registered address at Powai, Mumbai.
                            </p>
                        </section>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-display font-bold text-dark-blue mb-6">Privacy Policy</h2>
                        <p className="text-gray-500 mb-4 italic">Effective Date: December 23, 2025</p>

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
                );
            case 'refund':
                return (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-display font-bold text-dark-blue mb-6">Refund and Return Policy</h2>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Overview</h3>
                            <p className="text-gray-600 leading-relaxed">
                                At Drepto Biodevices, we take pride in our rigorous quality standards and research-backed formulations. Due to the nature of our products—hygienic, transdermal patches for external use—our return policy is structured to ensure the safety of all customers.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-red-600">Non-Returnable Items</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                Due to health and hygiene regulations, we cannot accept returns on opened or used products. This applies to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Opened pouches of Drepto Suraveda Relief, MenstroHerb Sheet, or Shanti Pain Patch.</li>
                                <li>Patches where the liners have been peeled off.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Eligibility for Refunds/Replacements</h3>
                            <p className="text-gray-600 leading-relaxed mb-3">
                                You are eligible for a full refund or free replacement strictly under the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li><strong>Defective Product:</strong> The product received is damaged or the packaging is compromised upon arrival.</li>
                                <li><strong>Wrong Item:</strong> You received a product different from what you ordered (e.g., received MenstroHerb instead of Suraveda).</li>
                                <li><strong>Expiry:</strong> The product delivered is past its expiration date.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">How to Initiate a Return</h3>
                            <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                                <ol className="list-decimal pl-6 space-y-4 text-gray-700">
                                    <li><strong>Notification:</strong> You must notify us within 48 hours of delivery by emailing <span className="font-semibold text-primary">support@dreptobiodevices.com</span> with your Order ID and clear photographs of the damaged/wrong product.</li>
                                    <li><strong>Verification:</strong> Our team will review the claim. Once approved, we will initiate a reverse pickup or ask you to dispose of the item safely.</li>
                                    <li><strong>Refund Processing:</strong> Refunds will be processed to the original payment method within 7-10 business days after claim approval.</li>
                                </ol>
                            </div>
                        </section>
                    </div>
                );
            case 'shipping':
                return (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-display font-bold text-dark-blue mb-6">Shipping Policy</h2>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Shipping Destinations</h3>
                            <p className="text-gray-600 leading-relaxed">
                                We currently ship to all major cities and pin codes across India. Orders are dispatched from our fulfillment centers or our headquarters in Mumbai.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Processing Time</h3>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                <li>Orders are typically processed within 24-48 hours of payment confirmation.</li>
                                <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Delivery Timelines</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="p-4 border-b font-display text-dark-blue">Region</th>
                                            <th className="p-4 border-b font-display text-dark-blue">Estimated Delivery</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-4 border-b text-gray-600">Mumbai / Maharashtra</td>
                                            <td className="p-4 border-b text-gray-600 font-semibold">2-3 Business Days</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b text-gray-600">Metro Cities</td>
                                            <td className="p-4 border-b text-gray-600 font-semibold">3-5 Business Days</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 border-b text-gray-600">Rest of India</td>
                                            <td className="p-4 border-b text-gray-600 font-semibold">5-7 Business Days</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-sm text-gray-500 italic">Note: Delivery times are estimates and may vary due to external factors.</p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Shipping Charges</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Standard shipping charges apply based on the weight of the consignment and delivery location.
                            </p>
                            <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20 flex items-center gap-4">
                                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current" strokeWidth="2"><path d="M20 12V8H6a2 2 0 01-2-2V5h16v1m0 6H4m16 0v10m0-10H4" /></svg>
                                </div>
                                <p className="text-dark-blue font-semibold">
                                    Free Shipping: We offer free shipping on orders above ₹499 (including bulk orders of our 2-patch packs).
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Tracking Your Order</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Once your order is dispatched, you will receive a tracking link via email/SMS. You can use this link to track the status of your Drepto pain relief patches until they arrive.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Damaged Packages</h3>
                            <p className="text-gray-600 leading-relaxed">
                                If the outer packaging appears tampered with or heavily damaged at the time of delivery, please do not accept the package. Refuse delivery and contact our support team immediately.
                            </p>
                        </section>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
            {/* Mobile Header */}
            <div className="md:hidden">
                <MobileHeader title="Policies" showBack={true} />
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:block">
                <Navbar sectionRefs={dummyRefs as any} />
            </div>

            <main className="flex-grow">
                {/* Hero Section for Policies */}
                <div className="bg-dark-blue pt-32 pb-20 px-6">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 animate-fade-in-down">
                            Our Policies
                        </h1>
                        <p className="text-teal-100 max-w-2xl mx-auto opacity-90">
                            Transparent guidelines to ensure the best experience with Drepto Biodevices.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-6 -mt-10 mb-20">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar / Tabs Navigation */}
                        <div className="lg:w-1/4">
                            <div className="bg-white rounded-3xl shadow-xl p-4 sticky top-24 border border-teal-100/50">
                                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 no-scrollbar">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex-shrink-0 text-left px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${activeTab === tab.id
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                                : 'text-gray-500 hover:bg-teal-50 hover:text-primary'
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="lg:w-3/4">
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-teal-100/50 min-h-[600px]">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PoliciesPage;
