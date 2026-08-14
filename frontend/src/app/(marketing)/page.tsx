// src/app/page.tsx
import { HeroSection } from "@/components/sections/HomePageSections/HeroSection";
import { TechnologiesSection } from "@/components/sections/HomePageSections/TechnologiesSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
     <HeroSection/>
      <TechnologiesSection/>
      {/* Features Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
            Why Choose Websterwork?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Solutions",
                desc: "Cutting-edge AI and machine learning solutions",
              },
              {
                title: "Web Development",
                desc: "Modern, scalable web applications",
              },
              {
                title: "Digital Strategy",
                desc: "Data-driven digital transformation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-black py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
            About Websterwork
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            We help businesses weave their digital presence through innovative
            technology and strategic thinking.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Projects", "Clients", "Awards", "Team"].map((item, i) => (
              <div
                key={i}
                className="p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm"
              >
                <div className="text-2xl font-bold text-primary">0+</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Let's talk about your next project.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition text-lg font-medium"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
