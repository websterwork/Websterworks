'use client';

import Carousel from '@/Components/Carousels/carousel';
import FeatureCards from '@/Components/Cards/cards';
import MergedBoxes from '@/Components/Boxes/mergedBoxes';
const homeSlides = [
  {
    title: "WEBSTERWORK",
    description: "EVERYTHING YOU NEED TO ELEVATE YOUR DIGITAL PRESENCE IN ONE PLACE.",
    button: "Book a Free Consultation",
    link: "/contacts",
    className: "bg-gradient-to-r from-black to-purple-900"
  },
  {
    title: "Artificial Intelligence",
    description: "Leverage cutting-edge AI solutions to transform your business.",
    button: "Learn More",
    link: "/services/ai",
    bgImage: "/bgAi.jpg", // AI abstract
    bgImageMobile: "/bgAi.jpg"
  },
  {
    title: "Web Development",
    description: "Modern, scalable, responsive websites tailored for your needs.",
    button: "Explore Services",
    link: "/services/web",
    bgImage: "/web.jpg", // coding team
    bgImageMobile: "/web.jpg"
  },
  {
    title: "Mobile Apps",
    description: "Custom Android and iOS apps with seamless UX.",
    button: "Get Started",
    link: "/services/mobile",
    bgImage: "/app.jpg", // if you have one
    bgImageMobile: "/app.jpg" // fallback
  },
  {
    title: "SEO Optimisation",
    description: "Boost online visibility with proven strategies.",
    button: "Improve Ranking",
    link: "/services/seo",
    bgImage: "/aiseo.jpg", // SEO/analytics
    bgImageMobile: "/aiseo.jpg"
  },
  {
    title: "Cyber Security",
    description: "Protect your business with advanced cybersecurity.",
    button: "Secure Now",
    link: "/services/cyber",
    bgImage: "/cs.jpg",
    bgImageMobile: "/cs.jpg",
  }
];

const featureCards = [
  {
    title: "End-to-End Solutions",
    description: "We provide complete digital solutions from concept to deployment.",
    buttonText: "Discover More",
    link: "/solutions",
    bgImageCard: "/card1-desktop.jpg",
    bgImageCardMobile: "/card1-mobile.jpg",
    className: "border-4 border-purple-500 hover:scale-105 transition-transform"
  },
  {
    title: "Dedicated Support",
    description: "Our team ensures 24/7 support for seamless business operations.",
    buttonText: "Contact Us",
    link: "/contacts",
    bgImageCard: "/card2-desktop.jpg",
    bgImageCardMobile: "/card2-mobile.jpg",
    className: "border-4 border-purple-500 hover:scale-105 transition-transform"
  },
  {
    title: "End-to-End Solutions",
    description: "We provide complete digital solutions from concept to deployment.",
    buttonText: "Discover More",
    link: "/solutions",
    bgImageCard: "/card1-desktop.jpg",
    bgImageCardMobile: "/card1-mobile.jpg",
    className: "border-4 border-purple-500 hover:scale-105 transition-transform"
  },
  {
    title: "Dedicated Support",
    description: "Our team ensures 24/7 support for seamless business operations.",
    buttonText: "Contact Us",
    link: "/contacts",
    bgImageCard: "/card2-desktop.jpg",
    bgImageCardMobile: "/card2-mobile.jpg",
    className: "border-4 border-purple-500 hover:scale-105 transition-transform"
  }
];

const aboutSections = [
  {
    type: "background",
    layout: "full",
    title: "About WebsterWork",
    description:
      "We are a forward-thinking digital agency, delivering innovative solutions in web, mobile, AI, and cybersecurity.",
    bgImageBox: "/about-full.jpg",
    bgImageBoxMobile: "/about-full-mobile.jpg",
    className: "min-h-[400px]",
  },
  {
    type: "split",
    layout: "half",
    title: "Our Vision",
    description:
      "To empower businesses globally with digital transformation strategies, ensuring innovation, growth, and sustainability.",
    bgImageBox: "/vision.jpg",
    bgImageBoxMobile: "/vision-mobile.jpg",
    reverse: false, // image left, text right
  }
];

export default function Home() {
  return (
    <main>
      <Carousel slides={homeSlides} autoplayDelay={5000} />
      <MergedBoxes sections={aboutSections} />
      <FeatureCards cards={featureCards} />
    </main>
  );
}
