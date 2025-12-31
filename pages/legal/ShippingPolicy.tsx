import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import MobileHeader from '../../components/mobile/MobileHeader';

const ShippingPolicy: React.FC = () => {
  const dummyRefs = {
    home: { current: null },
    product: { current: null },
    about: { current: null },
    contact: { current: null },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="md:hidden">
        <MobileHeader title="Shipping Policy" showBack={true} />
      </div>
      <div className="hidden md:block">
        <Navbar sectionRefs={dummyRefs as any} />
      </div>

      <main className="flex-grow container mx-auto px-6 py-8 md:py-24 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-blue mb-8">
            Shipping Policy
          </h1>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Shipping Destinations
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We currently ship to all major cities and pin codes across India.
              Orders are dispatched from our fulfillment centers or our
              headquarters in Mumbai.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Processing Time
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Orders are typically processed within 24-48 hours of payment
                confirmation.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                on the next business day.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Delivery Timelines
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 border-b font-display text-dark-blue">
                      Region
                    </th>
                    <th className="p-4 border-b font-display text-dark-blue">
                      Estimated Delivery
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border-b text-gray-600">
                      Mumbai / Maharashtra
                    </td>
                    <td className="p-4 border-b text-gray-600 font-semibold">
                      2-3 Business Days
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b text-gray-600">Metro Cities</td>
                    <td className="p-4 border-b text-gray-600 font-semibold">
                      3-5 Business Days
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 border-b text-gray-600">
                      Rest of India
                    </td>
                    <td className="p-4 border-b text-gray-600 font-semibold">
                      5-7 Business Days
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500 italic">
              Note: Delivery times are estimates and may vary due to external
              factors.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Shipping Charges
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Standard shipping charges apply based on the weight of the
              consignment and delivery location.
            </p>
            <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20 flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current"
                  strokeWidth="2"
                >
                  <path d="M20 12V8H6a2 2 0 01-2-2V5h16v1m0 6H4m16 0v10m0-10H4" />
                </svg>
              </div>
              <p className="text-dark-blue font-semibold">
                Free Shipping: We offer free shipping on orders above ₹499
                (including bulk orders of our 2-patch packs).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Tracking Your Order
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Once your order is dispatched, you will receive a tracking link
              via email/SMS. You can use this link to track the status of your
              Drepto pain relief patches until they arrive.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Damaged Packages
            </h3>
            <p className="text-gray-600 leading-relaxed">
              If the outer packaging appears tampered with or heavily damaged at
              the time of delivery, please do not accept the package. Refuse
              delivery and contact our support team immediately.
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

export default ShippingPolicy;
