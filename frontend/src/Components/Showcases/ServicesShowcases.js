'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, CheckCircle, ChevronUp, ChevronDown, Pause, Play,
  Brain, Globe, Smartphone, Gamepad2, 
  Palette, Sparkles, Video, PenTool, 
  TrendingUp, Shield, Code, GamepadIcon,
  Paintbrush, Wand2, Film, FileText,
  BarChart, Lock
} from 'lucide-react';

// Define iconMap BEFORE the component
const iconMap = {
  '🤖': Brain,
  '🌐': Globe,
  '📱': Smartphone,
  '🎮': Gamepad2,
  '🎨': Palette,
  '✨': Sparkles,
  '🎬': Video,
  '📝': PenTool,
  '📈': TrendingUp,
  '🛡️': Shield,
  '💻': Code,
  '🎯': GamepadIcon,
  '🖌️': Paintbrush,
  '🔮': Wand2,
  '📽️': Film,
  '📄': FileText,
  '📊': BarChart,
  '🔒': Lock
};

// Add a default fallback for any missing icons
const getIconComponent = (iconKey) => {
  return iconMap[iconKey] || Globe;
};

export default function ServiceShowcase({ services }) {
  const [activeService, setActiveService] = useState(services[0]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  
  const servicesListRef = useRef(null);
  const featuresRef = useRef(null);
  const componentRef = useRef(null);
  
  const scrollIntervalRef = useRef(null);
  const featuresScrollRef = useRef(null);

  // Get the icon component for the active service
  const ActiveIcon = getIconComponent(activeService.icon);

  // Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsComponentVisible(entry.isIntersecting);
        
        // If component becomes visible and auto-scroll is enabled, start scrolling
        if (entry.isIntersecting && isAutoScrolling) {
          startAutoScroll();
          startFeaturesAutoScroll();
        } else {
          // If component is not visible, stop all scrolling
          stopAutoScroll();
          stopFeaturesAutoScroll();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 30% of component needs to be visible
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
      observer.disconnect();
      stopAutoScroll();
      stopFeaturesAutoScroll();
    };
  }, []);

  // Auto-scroll through all services - ONLY when component is visible
  const startAutoScroll = () => {
    let currentIndex = services.findIndex(s => s.id === activeService.id);
    
    stopAutoScroll(); // Clear any existing interval
    
    scrollIntervalRef.current = setInterval(() => {
      if (isAutoScrolling && isComponentVisible) {
        currentIndex = (currentIndex + 1) % services.length;
        setActiveService(services[currentIndex]);
        
        // Scroll to active service in the list
        if (servicesListRef.current) {
          const activeElement = servicesListRef.current.children[currentIndex];
          if (activeElement) {
            activeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }
    }, 4000); // Change every 4 seconds
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // Auto-scroll features within the active service
  const startFeaturesAutoScroll = () => {
    if (!featuresRef.current || !isComponentVisible) {
      return;
    }

    const featuresContainer = featuresRef.current;
    const scrollHeight = featuresContainer.scrollHeight - featuresContainer.clientHeight;
    
    if (scrollHeight <= 0) return;

    stopFeaturesAutoScroll(); // Clear any existing interval
    
    featuresScrollRef.current = setInterval(() => {
      if (!featuresContainer || !isComponentVisible) {
        stopFeaturesAutoScroll();
        return;
      }
      
      if (featuresContainer.scrollTop >= scrollHeight - 10) {
        // Reset to top when at bottom
        featuresContainer.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Scroll down slowly
        featuresContainer.scrollBy({ top: 30, behavior: 'smooth' });
      }
    }, 100); // Scroll every 100ms
  };

  const stopFeaturesAutoScroll = () => {
    if (featuresScrollRef.current) {
      clearInterval(featuresScrollRef.current);
      featuresScrollRef.current = null;
    }
  };

  // Handle auto-scrolling state changes
  useEffect(() => {
    if (isAutoScrolling && isComponentVisible) {
      startAutoScroll();
      startFeaturesAutoScroll();
    } else {
      stopAutoScroll();
      stopFeaturesAutoScroll();
    }

    return () => {
      stopAutoScroll();
      stopFeaturesAutoScroll();
    };
  }, [isAutoScrolling, isComponentVisible, activeService.id]);

  // Handle manual service selection
  const handleServiceSelect = (service) => {
    setActiveService(service);
    // Restart auto-scroll after manual selection if it's enabled
    if (isAutoScrolling && isComponentVisible) {
      stopAutoScroll();
      setTimeout(() => startAutoScroll(), 100);
    }
  };

  // Toggle auto-scroll
  const toggleAutoScroll = () => {
    const newState = !isAutoScrolling;
    setIsAutoScrolling(newState);
    
    if (newState && isComponentVisible) {
      startAutoScroll();
      startFeaturesAutoScroll();
    } else {
      stopAutoScroll();
      stopFeaturesAutoScroll();
    }
  };

  // Scroll service list manually
  const scrollServices = (direction) => {
    if (servicesListRef.current) {
      const scrollAmount = 300;
      servicesListRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={componentRef} className="bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Our <span className="text-purple-400">Services</span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {services.length} specialized services available
          </p>
        </div>
        
        {/* Auto-scroll controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAutoScrolling && isComponentVisible ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
            <span className="text-xs text-gray-400">
              {isComponentVisible ? (isAutoScrolling ? 'Auto' : 'Paused') : 'Hidden'}
            </span>
          </div>
          <button
            onClick={toggleAutoScroll}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
          >
            {isAutoScrolling ? (
              <>
                <Pause size={14} />
                Pause
              </>
            ) : (
              <>
                <Play size={14} />
                Resume
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Scrollable Service List with Controls */}
        <div className="lg:w-2/5">
          <div className="relative">
            {/* Scroll up button */}
            <button
              onClick={() => scrollServices('up')}
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
              aria-label="Scroll up"
            >
              <ChevronUp size={16} className="text-gray-400" />
            </button>

            {/* Services List */}
            <div 
              ref={servicesListRef}
              className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
            >
              {services.map((service, index) => {
                const Icon = getIconComponent(service.icon);
                const isActive = activeService.id === service.id;
                
                return (
                  <motion.button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl transition-all group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/30 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                        : 'bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 hover:bg-gray-800/50'
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-full"></div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-lg transition-all ${isActive ? 'scale-110' : ''}`}>
                        <div className={`p-1.5 rounded-md ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                            : 'bg-gray-800 group-hover:bg-gray-700'
                        }`}>
                          <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'} />
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold truncate ${
                              isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                            }`}>
                              {service.title}
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                              {index + 1}
                            </span>
                          </div>
                          <ChevronRight 
                            size={16} 
                            className={`flex-shrink-0 transition-transform ${
                              isActive ? 'text-purple-400 rotate-90' : 'text-gray-600 group-hover:text-gray-400'
                            }`}
                          />
                        </div>
                        <p className={`text-sm mt-1 truncate ${
                          isActive ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'
                        }`}>
                          {service.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {service.metrics.projects}+ projects
                          </span>
                          <span className="text-xs text-green-500">
                            {service.metrics.satisfaction}% satisfaction
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Scroll down button */}
            <button
              onClick={() => scrollServices('down')}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10 p-2 bg-gray-900/80 backdrop-blur-sm rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
              aria-label="Scroll down"
            >
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
          
          {/* Enhanced scroll indicator */}
          <div className="mt-8 p-4 bg-gray-900/40 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">Navigation</span>
              <span className="text-xs text-gray-500">
                {services.findIndex(s => s.id === activeService.id) + 1} of {services.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-400">Click to select</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-gray-400">Auto-scroll: {isAutoScrolling ? 'ON' : 'OFF'}</span>
              </div>
              <div className="text-xs text-gray-500">
                Use ↑↓ arrows to scroll
              </div>
            </div>
          </div>
        </div>

        {/* Active Service Details */}
        <div className="lg:w-3/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6 md:p-8 h-full flex flex-col">
                {/* Header with animated gradient */}
                <div className="relative mb-8 overflow-hidden rounded-xl">
                  <div className={`absolute inset-0 bg-gradient-to-r ${activeService.gradient || 'from-purple-600 to-pink-600'} opacity-20`}></div>
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                          <ActiveIcon size={32} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">{activeService.title}</h3>
                          <p className="text-gray-300 mt-1">{activeService.description}</p>
                        </div>
                      </div>
                      
                      {/* Live metrics badge */}
                      <div className="hidden md:block">
                        <div className="text-center bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 border border-gray-700 min-w-[120px]">
                          <div className="text-3xl font-bold text-white">
                            {activeService.metrics.satisfaction}%
                          </div>
                          <div className="text-xs text-gray-300">Satisfaction Rate</div>
                          <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                              style={{ width: `${activeService.metrics.satisfaction}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auto-scrollable Features Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Key Features</h4>
                      <p className="text-sm text-gray-400">
                        {activeService.features.length} features • {isAutoScrolling ? 'Auto-scrolling' : 'Paused'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (featuresRef.current) {
                            featuresRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        aria-label="Scroll to top"
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    ref={featuresRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
                  >
                    {activeService.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="group flex items-start gap-3 p-4 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 hover:bg-gray-800/50 transition-all"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircle size={18} className="text-green-400 mt-0.5" />
                        </div>
                        <div className="flex-grow">
                          <span className="text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{ width: `${(index + 1) / activeService.features.length * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">{index + 1}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-white">{activeService.metrics.projects}+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                    <div className="text-xs text-green-500 mt-1">✓ Active</div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                    <div className="text-2xl font-bold text-green-400">{activeService.metrics.satisfaction}%</div>
                    <div className="text-xs text-gray-400">Satisfaction</div>
                    <div className="text-xs text-green-500 mt-1">↑ +2.5%</div>
                  </div>
                  
                  {activeService.metrics.deliveryTime && (
                    <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                      <div className="text-2xl font-bold text-blue-400">{activeService.metrics.deliveryTime}</div>
                      <div className="text-xs text-gray-400">Avg. Delivery</div>
                      <div className="text-xs text-blue-400 mt-1">⚡ Fast</div>
                    </div>
                  )}
                  
                  {activeService.metrics.accuracy && (
                    <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                      <div className="text-2xl font-bold text-yellow-400">{activeService.metrics.accuracy}</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                      <div className="text-xs text-yellow-400 mt-1">🎯 High</div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {activeService.technologies && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-white">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeService.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-purple-500/50 hover:bg-gray-700/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto pt-6 border-t border-gray-800">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a
                      href={`/services/${activeService.id}`}
                      className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <span>Explore {activeService.title}</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={toggleAutoScroll}
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      >
                        {isAutoScrolling ? (
                          <>
                            <Pause size={14} />
                            Pause Auto-scroll
                          </>
                        ) : (
                          <>
                            <Play size={14} />
                            Resume Auto-scroll
                          </>
                        )}
                      </button>
                      <span className="text-xs text-gray-600">|</span>
                      <button
                        onClick={() => {
                          const nextIndex = (services.findIndex(s => s.id === activeService.id) + 1) % services.length;
                          setActiveService(services[nextIndex]);
                        }}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        Next Service →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}