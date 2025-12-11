import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-dark-blue mb-4">Our Purpose</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="group bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-teal-50">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-dark-blue mb-4 group-hover:text-primary transition-colors">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to revolutionize the treatment of rheumatoid arthritis by providing an innovative, non-invasive, and patient-friendly transdermal methotrexate delivery solution. We aim to improve patient outcomes, safety, and compliance by reducing dosage requirements and side effects.
            </p>
          </div>

          {/* Vision Card */}
          <div className="group bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:to-blue-50">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </div>
            <h2 className="text-3xl font-bold text-dark-blue mb-4 group-hover:text-blue-600 transition-colors">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our vision is to revolutionize the treatment of rheumatoid arthritis, transforming lives with our innovative drug delivery systems. We dream of a world where patients experience relief without the burden of invasive procedures or harsh side effects. Driven by compassion and a commitment to excellence, we aim to set new standards in healthcare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;