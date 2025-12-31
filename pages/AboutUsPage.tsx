import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import GallerySection from '../components/GallerySection';
import MobileHeader from '../components/mobile/MobileHeader';

const AboutUsPage: React.FC = () => {
  // dummy refs for Navbar since we aren't on the landing page
  const dummyRefs = {
    home: { current: null },
    product: { current: null },
    about: { current: null },
    contact: { current: null },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader title="About Us" showBack={true} />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar sectionRefs={dummyRefs as any} />
      </div>

      <main className="flex-grow">
        {/* Add padding top for desktop only since Navbar is fixed. MobileHeader is sticky. */}
        <div className="md:pt-20">
          <GallerySection />
          <AboutSection />
          <TeamSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
