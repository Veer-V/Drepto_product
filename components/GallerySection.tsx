import React, { useState, useEffect, useRef } from 'react';
import { IKContext, IKImage } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/ke6x9gsjs';
const publicKey = 'public_Hauz4WSMbOr/vm58ZbnpsPR/h1o=';
// The user doesn't have a valid auth endpoint for listing files client-side,
// so we define the paths manually. Update this list with your actual file paths in the 'Drepto' folder.
const galleryImagePaths = [
  'Drepto/1',
  'Drepto/10.jpg',
  'Drepto/7.jpg',
  'Drepto/3.jpg',
  'Drepto/6.jpg',
  'Drepto/9.jpeg',
  'Drepto/2.jpg',
  'Drepto/8.jpeg',
  'Drepto/4.jpg',
  'Drepto/5.jpg',
  'Drepto/11.jpeg',
];

const GallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % galleryImagePaths.length,
      );
    }, 2000); // Scroll every 2 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const scrollToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImagePaths.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImagePaths.length - 1 : prev - 1,
    );
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      // authenticationEndpoint='http://www.yourserver.com/auth' // Commented out as it's invalid/placeholder
    >
      <section
        className="py-16 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-teal-50/50 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-primary tracking-tight">
              Gallery
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full opacity-80"></div>
          </div>

          <div className="relative max-w-7xl mx-auto flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-0 md:-left-16 z-20 p-3 text-secondary hover:text-primary transition-all duration-300 hover:scale-110 focus:outline-none backdrop-blur-sm bg-white/30 rounded-full shadow-lg"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="w-full overflow-hidden relative h-[600px] flex items-center justify-center rounded-3xl shadow-2xl bg-gray-50/20 backdrop-blur-md border border-white/50">
              <div
                className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) h-full items-center"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {galleryImagePaths.map((path, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 flex justify-center h-full p-2"
                  >
                    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                      <IKImage
                        path={path}
                        transformation={[
                          {
                            height: '1000',
                            width: '1600',
                            crop: 'at_max',
                          },
                        ]}
                        loading="lazy"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // console.error(`Failed to load image: ${path}`);
                          // Replace with a placeholder or hide
                          e.currentTarget.src = '/images/logo.png';
                          e.currentTarget.style.objectFit = 'contain';
                          e.currentTarget.style.padding = '40px';
                          e.currentTarget.style.backgroundColor = '#f0fdfa';
                        }}
                      />
                      {/* Gradient Overlay for text if needed later */}
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-0 md:-right-16 z-20 p-3 text-secondary hover:text-primary transition-all duration-300 hover:scale-110 focus:outline-none backdrop-blur-sm bg-white/30 rounded-full shadow-lg"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center mt-10 space-x-3">
            {galleryImagePaths.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-gray-300 w-2 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </IKContext>
  );
};

export default GallerySection;
