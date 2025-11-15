'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Carousel({ slides, autoplayDelay = 5000 }) {
  return (
    <div className="relative h-screen w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: autoplayDelay }}
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full flex items-center px-6 md:px-12 text-white overflow-hidden">
              
              {/* 🔹 Background: Video / Desktop Image / Mobile Image / Gradient */}
              {slide.video ? (
                <>
                  <video
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 hidden md:block h-full w-full object-cover"
                  />
                  {/* mobile fallback image */}
                  {slide.bgImageMobile && (
                    <Image
                      src={slide.bgImageMobile}
                      alt={slide.title}
                      fill
                      className="object-cover md:hidden"
                      priority={index === 0}
                    />
                  )}
                </>
              ) : slide.bgImage ? (
                <>
                  {/* Desktop image */}
                  <Image
                    src={slide.bgImage}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover hidden md:block"
                  />
                  {/* Mobile image fallback */}
                  {slide.bgImageMobile && (
                    <Image
                      src={slide.bgImageMobile}
                      alt={slide.title}
                      fill
                      className="object-cover md:hidden"
                      priority={index === 0}
                    />
                  )}
                </>
              ) : (
                <div
                  className={`absolute inset-0 ${slide.className || 'bg-gradient-to-r from-gray-900 to-gray-800'}`}
                />
              )}

              {/* 🔹 Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* 🔹 Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-xl z-10"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{slide.title}</h1>
                <p className="text-base md:text-lg mb-8">{slide.description}</p>

                {slide.link && (
                  <Link
                    href={slide.link}
                    className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl shadow hover:bg-gray-200 transition dark:bg-gray-800 dark:text-white"
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
