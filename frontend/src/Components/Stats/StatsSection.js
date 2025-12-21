'use client';

import { motion } from 'framer-motion';
import { Users, Code, Shield, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Happy Clients', color: 'from-blue-500 to-cyan-500' },
  { icon: Code, value: '200+', label: 'Projects', color: 'from-purple-500 to-pink-500' },
  { icon: Shield, value: '100%', label: 'Secure', color: 'from-green-500 to-emerald-500' },
  { icon: TrendingUp, value: '99.9%', label: 'Uptime', color: 'from-orange-500 to-red-500' },
];

export default function StatsSection() {
  return (
    <div className="bg-gray-900/90 backdrop-blur-lg border-t border-gray-800 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 text-center group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}