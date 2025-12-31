import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MobileHeader from '../../components/mobile/MobileHeader';

const TermsConditions: React.FC = () => {
  const dummyRefs = {
    home: { current: null },
    product: { current: null },
    about: { current: null },
    contact: { current: null },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="md:hidden">
        <MobileHeader title="Terms & Conditions" showBack={true} />
      </div>
      <div className="hidden md:block">
        <Navbar sectionRefs={dummyRefs as any} />
      </div>

      <main className="flex-grow container mx-auto px-6 py-8 md:py-24 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-2">
            Terms and Conditions
          </h1>
          <p className="text-gray-500 mb-8 italic">
            Last Updated: December 23, 2025
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Introduction
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Drepto Biodevices Pvt. Ltd. ("Company", "we", "our",
              "us"). These Terms and Conditions govern your use of our website{' '}
              <a
                href="http://www.dreptobiodevices.com"
                className="text-primary hover:underline"
              >
                www.dreptobiodevices.com
              </a>{' '}
              and the purchase of our products, including the Drepto Suraveda
              Relief, Drepto MenstroHerb Sheet, and Drepto Shanti Pain Patch. By
              accessing our website and purchasing our products, you agree to be
              bound by these terms.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Medical Disclaimer
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              While our products are developed based on research by IIT Bombay
              and are designed to provide relief from pain and inflammation, the
              content on our website is for informational purposes only.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Consultation:</strong> Our products, including the
                Drepto Suraveda Relief (containing Diclofenac
                Diethylamine/NSAID), are not a substitute for professional
                medical advice, diagnosis, or treatment. Always seek the advice
                of your physician regarding any medical condition.
              </li>
              <li>
                <strong>Usage:</strong> Products must be used strictly as
                directed for external use only via transdermal delivery. Do not
                apply to open wounds or damaged skin.
              </li>
              <li>
                <strong>Sensitivities:</strong> While products like MenstroHerb
                and Shanti Pain Patch are 100% natural and skin-friendly, users
                with specific allergies to herbal ingredients like Menthol,
                Camphor, Eucalyptus Oil, or Methyl Salicylate should exercise
                caution.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Product Information & Accuracy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We strive to ensure that product descriptions—such as the 24-hour
              efficacy of Suraveda and the 12-hour relief provided by
              MenstroHerb and Shanti patches—are accurate. However, we do not
              warrant that product descriptions or other content are error-free.
              The Franz diffusion cell method results provided are based on
              in-house specifications and research.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Intellectual Property
            </h3>
            <p className="text-gray-600 leading-relaxed">
              All content, trademarks, and data on this site, including the
              "Drepto" brand and references to our incubation/association with
              SINE, IIT Bombay, are the property of Drepto Biodevices Pvt. Ltd.
              Unauthorized use is strictly prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Governing Law
            </h3>
            <p className="text-gray-600 leading-relaxed">
              These terms shall be governed by the laws of India. Any disputes
              arising in connection with these terms shall be subject to the
              exclusive jurisdiction of the courts located in Mumbai,
              Maharashtra, consistent with our registered address at Powai,
              Mumbai.
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

export default TermsConditions;
