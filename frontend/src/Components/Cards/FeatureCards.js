'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, BarChart3, Globe, Cpu, Lock, Target, Users, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

// Updated icon map
const iconMap = {
  '🚀': Zap,
  '🛡️': Shield,
  '📊': BarChart3,
  '🌐': Globe,
  '🔐': Lock,
  '🎯': Target,
  '👥': Users,
  '⏱️': Clock,
  '🧠': Cpu,
};

// Default cards data
const defaultCards = [
  {
    title: "End-to-End Solutions",
    description: "Complete digital transformation from concept to deployment and beyond.",
    icon: "🚀",
    gradient: "from-purple-600 to-pink-600",
    link: "/solutions",
    stats: "200+ Projects"
  },
  {
    title: "24/7 Dedicated Support",
    description: "Round-the-clock technical support with guaranteed response times.",
    icon: "🛡️",
    gradient: "from-blue-600 to-cyan-600",
    link: "/support",
    stats: "99.9% Uptime"
  },
  {
    title: "AI-Powered Analytics",
    description: "Data-driven insights and predictive analytics for business growth.",
    icon: "📊",
    gradient: "from-green-600 to-emerald-600",
    link: "/analytics",
    stats: "50% Growth"
  },
  {
    title: "Enterprise Security",
    description: "Military-grade security protocols and continuous threat monitoring.",
    icon: "🔐",
    gradient: "from-red-600 to-orange-600",
    link: "/security",
    stats: "Zero Breaches"
  }
];

export default function FeatureCards({ cards = defaultCards }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Add CSS animation for floating particles (client-side only)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Safety check - ensure cards is always an array
  const cardsToRender = Array.isArray(cards) ? cards : defaultCards;

  // Responsive grid columns
  const gridCols = isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-4";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`grid ${gridCols} gap-4 sm:gap-6`}
    >
      {cardsToRender.map((card, index) => {
        const IconComponent = iconMap[card.icon] || Zap;
        
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: isMobile ? -4 : -8, 
              scale: isMobile ? 1.01 : 1.02,
              transition: { duration: 0.2 } 
            }}
            className="group relative"
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl" />
            <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`} />
            <div className={`absolute -inset-1 bg-gradient-to-r ${card.gradient} rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
            
            {/* Main card */}
            <div className="relative p-4 sm:p-5 md:p-6 h-full flex flex-col rounded-2xl sm:rounded-3xl border border-gray-800 dark:border-gray-700 bg-gradient-to-b from-gray-900/50 to-gray-950/50 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm overflow-hidden">
              
              {/* Icon with enhanced styling */}
              <div className="relative z-10 mb-4 sm:mb-5 md:mb-6">
                <div className={`inline-flex p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r ${card.gradient} shadow-lg shadow-purple-500/20 dark:shadow-purple-500/10 group-hover:shadow-purple-500/40 dark:group-hover:shadow-purple-500/20 transition-shadow duration-500`}>
                  <IconComponent size={isMobile ? 20 : isTablet ? 24 : 28} className="text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex-grow">
                {/* Title - Responsive font sizes */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white dark:text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {card.title}
                </h3>
                
                {/* Description - Responsive font sizes */}
                <p className="text-sm sm:text-base text-gray-300 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
                
                <div className="mt-auto">
                  {/* Stats with animation */}
                  <motion.div 
                    className="flex items-center justify-between mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-900/30 dark:bg-gray-800/30 border border-gray-800 dark:border-gray-700"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">Performance</span>
                    <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {card.stats}
                    </span>
                  </motion.div>
                  
                  {/* CTA Link */}
                  <Link
                    href={card.link}
                    className="inline-flex items-center justify-between w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl bg-gray-900/50 dark:bg-gray-800/50 border border-gray-800 dark:border-gray-700 text-white font-medium hover:bg-gray-800/50 dark:hover:bg-gray-700/50 hover:border-purple-500/30 transition-all group/link text-sm sm:text-base"
                  >
                    <span>Learn more</span>
                    <ArrowRight size={isMobile ? 16 : 18} className="group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* Corner accent - Hide on mobile */}
              {!isMobile && (
                <div className={`absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-bl ${card.gradient} rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              )}
              
              {/* Floating particles - Only show on tablet+ */}
              {!isMobile && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${card.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      style={{
                        top: `${20 + i * 30}%`,
                        left: `${10 + i * 20}%`,
                        animation: `float 3s ease-in-out ${i * 0.5}s infinite`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}