import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary inline-block border-b-4 border-primary pb-2 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions about our innovative iontophoretic device? Reach out
            to us and let's start a conversation now!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column: Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="text-center py-10">
                <h3 className="text-2xl font-bold text-secondary mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your message has been sent successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white font-semibold py-2 px-6 rounded hover:bg-dark-blue transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Info & Hiring */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
            {/* Hiring Section */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-6">
                We're Growing Fast and Hiring!
              </h3>
              <p className="text-gray-600 mb-8">
                Join our team and help shape the future of technology.
              </p>
              <a
                href="https://forms.gle/Li6JY1YQW5fs8bUW8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 text-center no-underline bg-[#00857C] text-white font-semibold rounded-lg shadow-md hover:bg-[#006A63] transition-colors"
              >
                Submit Your Application
              </a>
            </div>

            {/* Why Join Us - Filler Content */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Why Join Drepto?
              </h4>
              <ul className="space-y-3 text-gray-600 px-4">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Work on ground-breaking medical technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Collaborative and innovative environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Opportunities for growth and research</span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200 my-8" />

            {/* Connect Section */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Connect With Us
              </h3>
              <div className="text-left space-y-3 inline-block">
                <p className="text-gray-700 flex items-center gap-2">
                  <span className="font-bold text-primary">✉ Email:</span>{' '}
                  office@dreptobiodevices.com
                </p>
                <p className="text-gray-700">
                  <span className="font-bold text-primary">Working Hours:</span>{' '}
                  Monday - Friday, 9am - 5pm IST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
