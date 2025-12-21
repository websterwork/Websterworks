'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Carousel({ slides, autoplayDelay = 5000 }) {
  // Ensure minimum slides for loop mode
  const carouselSlides = slides.length >= 3 ? slides : [...slides, ...slides, ...slides].slice(0, 3);

  return (
    <div className="relative h-[50vh] md:h-[60vh] lg:h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-2 h-2 md:w-3 md:h-3 mx-1 !bg-white/50 !opacity-50 hover:!opacity-100 transition-opacity"></span>`;
          }
        }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop={carouselSlides.length >= 3}
        slidesPerView={1}
        className="h-full w-full"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full flex items-center px-4 md:px-8 lg:px-12 text-white overflow-hidden">
              
              {/* Background Image - FIXED */}
              {slide.bgImage ? (
                <div className="absolute inset-0">
                  <Image
                    src={slide.bgImage}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              ) : (
                <div
                  className={`absolute inset-0 ${slide.overlay || 'bg-gradient-to-r from-gray-900 to-purple-900'}`}
                />
              )}

              {/* Dark overlay with responsive opacity */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/50 z-10"></div>

              {/* Content Container - Responsive positioning */}
              <div className="container mx-auto relative z-20 px-4 md:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-lg lg:max-w-xl xl:max-w-2xl"
                >
                  {/* Title - Responsive font sizes */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Description - Responsive font sizes and spacing */}
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 md:mb-6 lg:mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* Button - Responsive padding and font size */}
                  {slide.link && (
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={slide.link}
                        className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-white text-gray-900 font-semibold rounded-lg md:rounded-xl hover:bg-gray-200 transition dark:bg-purple-600 dark:text-white text-sm sm:text-base md:text-lg"
                      >
                        {slide.button}
                      </Link>
                      
                      {/* Optional secondary button for mobile/tablet */}
                      {slide.secondaryButton && (
                        <Link
                          href={slide.secondaryLink || slide.link}
                          className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg md:rounded-xl hover:bg-white/10 transition text-sm sm:text-base md:text-lg"
                        >
                          {slide.secondaryButton}
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Stats/Icon - Hide on mobile, show on tablet+ */}
              {(slide.icon || slide.stats) && (
                <div className="hidden md:flex absolute bottom-8 right-8 z-20 items-center gap-3">
                  {slide.icon && (
                    <div className="text-3xl lg:text-4xl">{slide.icon}</div>
                  )}
                  {slide.stats && (
                    <div className="text-sm lg:text-base font-semibold bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                      {slide.stats}
                    </div>
                  )}
                </div>
              )}

              {/* Mobile stats/icon (smaller version) */}
              {(slide.icon || slide.stats) && (
                <div className="md:hidden absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  {slide.icon && (
                    <div className="text-2xl">{slide.icon}</div>
                  )}
                  {slide.stats && (
                    <div className="text-xs font-semibold bg-white/10 backdrop-blur-sm px-2 py-1 rounded">
                      {slide.stats}
                    </div>
                  )}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination for better mobile visibility */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
        }
        @media (min-width: 768px) {
          .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            margin: 0 6px !important;
          }
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          opacity: 1 !important;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}