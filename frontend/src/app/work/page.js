"use client";
import FeatureCards from '@/Components/Cards/FeatureCards';


export default function ContactPage() {
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

  return (
    <div>
      <FeatureCards cards={featureCards} />
    </div>
  );
}
