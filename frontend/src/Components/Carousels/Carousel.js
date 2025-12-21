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
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop={carouselSlides.length >= 3}
        slidesPerView={1}
        className="h-full w-full"
      >
        {carouselSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full flex items-center px-4 md:px-12 text-white overflow-hidden">
              
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

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 z-10"></div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-xl z-20 ml-4 md:ml-12"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{slide.title}</h1>
                <p className="text-base md:text-lg mb-6 md:mb-8">{slide.description}</p>

                {slide.link && (
                  <Link
                    href={slide.link}
                    className="inline-block px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-200 transition dark:bg-purple-600 dark:text-white"
                  >
                    {slide.button}
                  </Link>
                )}
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}