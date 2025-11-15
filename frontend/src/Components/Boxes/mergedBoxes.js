'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function MergedBoxes({ sections }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 dark:bg-black">
      <div className="grid grid-cols-1 gap-12">
        {sections.map((section, index) => {
          const isFull = section.layout === "full";

          // --- Layout 1: Background ---
          if (section.type === "background") {
            return (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${isMobile && section.bgImageBoxMobile ? section.bgImageBoxMobile : section.bgImageBox})`,
                }}
                className={`relative bg-cover bg-center bg-no-repeat rounded-2xl shadow-lg overflow-hidden ${isFull ? "md:col-span-2 min-h-[400px]" : "min-h-[300px]"} ${section.className || ""}`}
              >
                <div className="bg-purple-600 dark:bg-purple-600 p-8 flex flex-col justify-center h-full text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            );
          }

          // --- Layout 2: Split (Image + Text) ---
          if (section.type === "split") {
            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${isFull ? "md:col-span-2" : ""}`}
              >
                {/* Image Side */}
                <div
                  className={`relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg order-1 ${
                    section.reverse ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <Image
                    src={isMobile && section.bgImageBoxMobile ? section.bgImageBoxMobile : section.bgImageBox}
                    alt={section.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Side */}
                <div
                  className={`flex flex-col justify-center order-2 ${
                    section.reverse ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <h2 className="dark:text-white text-2xl md:text-3xl font-bold mb-4">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {section.description}
                  </p>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}
