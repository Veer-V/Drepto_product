import React from 'react';

const GetAppBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl mx-4 lg:mx-8 mb-16 relative shadow-2xl">
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-center md:text-left flex-1">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Healthcare in your pocket
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            Get the Drepto app for the best experience. Book appointments, order
            medicines, and track your health records - all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-900 transition-all hover:scale-105 shadow-lg">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.498 14.382c-.886-1.556-1.464-3.565.417-6.287-.938-1.373-2.39-1.573-2.903-1.59-1.226-.13-2.42.74-3.04.74-.633 0-1.587-.723-2.61-.707-1.33.02-2.58.8-3.267 2.03-1.42 2.503-.36 6.19 1.003 8.203.684.996 1.48 2.096 2.54 2.06 1.015-.034 1.41-.66 2.643-.66 1.22 0 1.57.66 2.646.645 1.085-.015 1.77-1.01 2.433-2.022.756-1.11 1.07-2.19 1.08-2.25-.02-.01-2.09-.81-2.115-3.328l-.004-.333h-.006zM13.62 5.06c.55-.68 2.922-3.868.01-4.06-.312 2.515 2.13 3.518 2.517 3.518-.01.07-.38.487-2.527.54z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none mb-0.5">
                  Download on the
                </div>
                <div className="text-lg font-bold leading-none">App Store</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:bg-gray-900 transition-all hover:scale-105 shadow-lg">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm11.536 11.54l5.3 5.275a1 1 0 0 0 1.342-.258l1.795-3.049-8.437-4.839-2.871 2.871zM15.145 10.65l6.096-3.483-1.802-3.049a1 1 0 0 0-1.342-.262l-5.327 5.297 2.375 1.498zM2.435 12l9.049 5.176L3.189 2.951A.996.996 0 0 0 2 3.664v16.671a.99.99 0 0 0 .435-.335z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold tracking-wider leading-none mb-0.5">
                  Get it on
                </div>
                <div className="text-lg font-bold leading-none">
                  Google Play
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Visual Decorative Element representing mobile connectivity */}
        <div className="hidden lg:block relative w-96 h-96">
          <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center p-8 rotate-12 shadow-2xl">
            <div className="w-full h-full border-4 border-white/30 rounded-2xl flex flex-col p-4">
              <div className="w-12 h-1.5 bg-white/40 rounded-full mx-auto mb-4"></div>
              <div className="flex-1 bg-white/10 rounded-xl mb-4 animate-pulse"></div>
              <div className="h-12 bg-blue-500 rounded-xl shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
    </div>
  );
};

export default GetAppBanner;
