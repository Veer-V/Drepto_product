import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MobileHeader from '../../components/mobile/MobileHeader';

const RefundPolicy: React.FC = () => {
    const dummyRefs = {
        home: { current: null },
        product: { current: null },
        about: { current: null },
        contact: { current: null },
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="md:hidden">
                <MobileHeader title="Refund & Return" showBack={true} />
            </div>
            <div className="hidden md:block">
                <Navbar sectionRefs={dummyRefs as any} />
            </div>

            <main className="flex-grow container mx-auto px-6 py-8 md:py-24 max-w-4xl">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fade-in-up">
                    <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-2">Refund and Return Policy</h1>

                    <section className="mb-8 mt-8">
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
            </main>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    );
};

export default RefundPolicy;
