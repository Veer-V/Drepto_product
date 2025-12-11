import React from 'react';

const FeatureCard: React.FC<{ icon: React.ReactElement; title: string; description: string; delay: string }> = ({ icon, title, description, delay }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in-up" style={{ animationDelay: delay }}>
    <div className="bg-light-blue text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-dark-blue mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const VideoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>;
const PharmacyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 20.5 10 22l-4-2.5V9l4-2.5L10.5 8" /><path d="M13.5 3.5 14 2l4 2.5V15l-4 2.5-3.5-1.5" /><path d="m14 2-4 2.5V15l4 2.5V2" /><path d="M10 22v-6.5l-4-2.5" /><path d="M2 9.5 6 12" /><path d="M20 14.5 14 12" /><path d="M10 8l4-2.5" /><path d="M10 15.5l4-2.5" /></svg>;
const LabIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3v5h6V3" /><path d="M10 14.5a6 6 0 0 0-3.3 5H3" /><path d="M21 19.5a6 6 0 0 0-3.3-5" /><path d="M14 19.5a6 6 0 0 0-3.3-5" /><path d="M12 8v6" /><circle cx="12" cy="17" r="3" /></svg>;
const NurseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a4 4 0 0 0-4-4Z" /><path d="M8 22v-5h8v5" /><path d="M12 7v4" /><path d="M10 9h4" /></svg>;
const AmbulanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 10h4" /><path d="M12 8v4" /><rect width="16" height="12" x="4" y="5" rx="2" /><path d="M2 9h2" /><path d="M20 9h2" /><path d="M15 17v2" /><path d="M9 17v2" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;


const ProductSection: React.FC = () => {
  const features = [
    {
      icon: <VideoIcon />,
      title: 'Video Consultations',
      description: 'High-quality, secure video calls with doctors from the comfort of your home.',
      delay: '0.1s'
    },
    {
      icon: <PharmacyIcon />,
      title: 'Medicine Delivery',
      description: 'Order your prescribed medicines online and get them delivered to your doorstep.',
      delay: '0.2s'
    },
    {
      icon: <LabIcon />,
      title: 'Lab Tests',
      description: 'Book diagnostic tests and sample collections from certified labs near you.',
      delay: '0.3s'
    },
    {
      icon: <NurseIcon />,
      title: 'Home Nursing',
      description: 'Professional nursing care services available at your home for post-op recovery & elderly care.',
      delay: '0.4s'
    },
    {
      icon: <AmbulanceIcon />,
      title: 'Ambulance Service',
      description: 'Quick and reliable emergency ambulance services just a tap away.',
      delay: '0.5s'
    },
    {
      icon: <ShieldIcon />,
      title: 'Secure Health Records',
      description: 'Your medical history and records are encrypted and stored securely, accessible only to you.',
      delay: '0.6s'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-dark-blue mb-4 animate-fade-in-up">Comprehensive Care Services</h2>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We provide a complete ecosystem for all your healthcare needs.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;