
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-light-blue pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-dark-blue leading-tight">
              <span className="text-primary">Drepto Biodevices</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Innovative transdermal healthcare solutions. From herbal pain relief to medical-grade biodevices, we bring advanced recovery to your doorstep.
            </p>

            {/* Dynamic Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-50">
                <h3 className="text-2xl font-bold text-primary">100%</h3>
                <p className="text-xs text-gray-500 font-medium">Herbal</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-green-50">
                <h3 className="text-2xl font-bold text-green-600">12h+</h3>
                <p className="text-xs text-gray-500 font-medium">Active Relief</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-50">
                <h3 className="text-2xl font-bold text-purple-600">Fast</h3>
                <p className="text-xs text-gray-500 font-medium">Acting</p>
              </div>
            </div>

            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => navigate('/auth', { state: { view: 'register' } })}
                className="bg-primary text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 relative flex justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* CORRECTED: Use a path relative to the public folder root */}
          <video
            src="/images/vid.mp4"
            alt="Telemedicine Dashboard"
            className="rounded-2xl shadow-2xl max-w-4xl w-full object-cover h-64 md:h-auto"
            autoPlay // Consider adding this if you want it to play automatically
            loop     // Consider adding this if you want it to loop
            muted    // Muted is often required for autoPlay to work
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
