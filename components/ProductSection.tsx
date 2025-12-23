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

const BiotechIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="m5 12 7-7 7 7-7 7-7-7Z" /></svg>;
const PatchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>;
const DeliveryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18h14" /><path d="M5 6h14" /><path d="M5 12h14" /><path d="m14 6 4 4-4 4" /></svg>;

const ProductSection: React.FC = () => {
  const features = [
    {
      icon: <BiotechIcon />,
      title: 'Advanced Transdermal Tech',
      description: 'Sophisticated method of treating pain and inflammation using bio-tech patches.',
      delay: '0.1s'
    },
    {
      icon: <PatchIcon />,
      title: 'Herbal Pain Relief',
      description: '100% Herbal patches like MenstroHerb and Aryasoothe for instant relief.',
      delay: '0.2s'
    },
    {
      icon: <DeliveryIcon />,
      title: 'Direct to Doorstep',
      description: 'Fast and reliable delivery of Drepto healthcare products across India.',
      delay: '0.3s'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-dark-blue mb-4 animate-fade-in-up">Drepto Biotech Solutions</h2>
          <p className="text-gray-600 text-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Innovating healthcare with non-invasive, high-efficacy transdermal products.
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