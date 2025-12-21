'use client';

import React,{ useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Zap, Shield, Globe, Cpu } from 'lucide-react';

const iconMap = {
  '🌐': Globe,
  '📱': Zap,
  '🧠': Cpu,
  '📈': Shield,
};

export default function ServiceShowcase({ services }) {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <div className="bg-gray-900/30 backdrop-blur-sm rounded-3xl border border-gray-800 p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Our <span className="text-purple-400">Services</span>
      </h3>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Service List */}
        <div className="lg:w-2/5">
          <div className="space-y-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Globe;
              const isActive = activeService.id === service.id;
              
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/30 border border-purple-500/50'
                      : 'bg-gray-900/50 border border-gray-800 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-gray-800'
                    }`}>
                      <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${
                          isActive ? 'text-white' : 'text-gray-300'
                        }`}>
                          {service.title}
                        </h4>
                        <ChevronRight 
                          size={16} 
                          className={`transition-transform ${
                            isActive ? 'text-purple-400 rotate-90' : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <p className={`text-sm mt-1 ${
                        isActive ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
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
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6 md:p-8 h-full">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                        {iconMap[activeService.icon] ? 
                          React.createElement(iconMap[activeService.icon], { size: 24, className: "text-white" }) : 
                          <Globe size={24} className="text-white" />
                        }
                      </div>
                      <h3 className="text-2xl font-bold text-white">{activeService.title}</h3>
                    </div>
                    <p className="text-gray-300">{activeService.description}</p>
                  </div>
                  
                  {/* Metrics Badge */}
                  <div className="hidden md:block">
                    <div className="text-center bg-gray-900/50 rounded-xl p-3 border border-gray-800">
                      <div className="text-2xl font-bold text-white">
                        {activeService.metrics.satisfaction}%
                      </div>
                      <div className="text-xs text-gray-400">Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-white">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeService.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800"
                      >
                        <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <h4 className="text-lg font-semibold mb-4 text-white">Performance Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gray-900/30">
                      <div className="text-2xl font-bold text-white">
                        {activeService.metrics.projects}+
                      </div>
                      <div className="text-xs text-gray-400">Projects Completed</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gray-900/30">
                      <div className="text-2xl font-bold text-green-400">
                        {activeService.metrics.satisfaction}%
                      </div>
                      <div className="text-xs text-gray-400">Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <a
                    href={`/services/${activeService.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
                  >
                    Explore {activeService.title}
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}