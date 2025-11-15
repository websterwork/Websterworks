'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeatureCards({ cards }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); 
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${isMobile && card.bgImageCardMobile ? card.bgImageCardMobile : card.bgImageCard})`,
            }}
            className={`flex flex-col rounded-2xl shadow-lg overflow-hidden bg-cover bg-center bg-no-repeat min-h-[400px] ${card.className || ""}`}
          >
        
            <div className="flex flex-col flex-grow  text-black dark:text-white p-6">
              <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
              <p className="flex-grow">{card.description}</p>
              <Link
                href={card.link}
                className="mt-6 inline-block px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
              >
                {card.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
