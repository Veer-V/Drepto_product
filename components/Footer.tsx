
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-blue text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start text-center md:text-left gap-8">

          <div className="mb-8 md:mb-0 max-w-sm">
            <div>

              <div className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="Drepto Biodevices Pvt. Ltd. Logo"
                  className="h-10 w-auto"
                />
              </div>
            </div>
            <p className="text-teal-100 opacity-80">SINE, Rahul Bajaj BLDG IIT Bombay, Powai Mumbai 400076</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm w-full md:w-auto">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-white mb-1">Services</h4>
              <Link to="/medicines" className="text-teal-100 hover:text-white hover:underline">Pharmacy</Link>
              <Link to="/lab-tests" className="text-teal-100 hover:text-white hover:underline">Lab Tests</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-white mb-1">Company</h4>
              <Link to="/about-us" className="text-teal-100 hover:text-white hover:underline">About Us</Link>
              <a href="#" className="text-teal-100 hover:text-white hover:underline">Contact</a>
              <a href="#" className="text-teal-100 hover:text-white hover:underline">Careers</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-white mb-1">Legal</h4>
              <Link to="/policies" state={{ tab: 'privacy' }} className="text-teal-100 hover:text-white hover:underline">Privacy Policy</Link>
              <Link to="/policies" state={{ tab: 'terms' }} className="text-teal-100 hover:text-white hover:underline">Terms of Use</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-teal-700/50 mt-10 pt-6 text-center text-teal-200 text-xs">
          &copy; {new Date().getFullYear()} Drepto Biodevices Pvt.Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
