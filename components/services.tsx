'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Car, Bike, Wrench, Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export const services = [
  {
    id: 'car-wash-standard',
    name: 'Car deep Wash',
    category: 'car_wash',
    price: 499,
    duration: '45 mins',
    icon: <Car className="w-8 h-8" />,
    description: 'Exterior foam wash, interior vacuum, and ceramic coating.',
    features: ['Foam Wash', 'Interior Vacuum', 'Dashboard Polish', 'Tire Shine'],
    accent: 'blue'
  },
  {
    id: 'bike-wash-standard',
    name: 'Pro Bike Wash',
    category: 'bike_wash',
    price: 149,
    duration: '30 mins',
    icon: <Bike className="w-8 h-8" />,
    description: 'Meticulous cleaning of body, engine, and mirror polish.',
    features: ['Engine Cleaning', 'Body Wax', 'Chain Lubing', 'Wheel Deep Clean'],
    accent: 'cyan'
  },
  {
    id: 'bike-repair-general',
    name: 'General Service',
    category: 'bike_repair',
    price: 899,
    duration: '2-3 hours',
    icon: <Wrench className="w-8 h-8" />,
    description: 'Engine tuning, brake service, and filters cleaning.',
    features: ['Oil Change', 'Brake Adjustment', 'Filters Cleaning', 'Full Checkup'],
    accent: 'orange'
  }
];

const colorMap: Record<string, string> = {
  blue: 'hover:border-blue-500/50 text-blue-400 bg-blue-500/20 shadow-blue-500/20',
  cyan: 'hover:border-cyan-500/50 text-cyan-400 bg-cyan-500/20 shadow-cyan-500/20',
  orange: 'hover:border-orange-500/50 text-orange-400 bg-orange-500/20 shadow-orange-500/20',
};

export const ServicesList = ({ onSelect }: { onSelect: (service: any) => void }) => {
  return (
    <section id="services" className="py-24 bg-[#05070a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Select Premium Service</h2>
          <p className="text-slate-400 max-w-2xl mx-auto font-light">Choose from our expert range of car wash, bike wash or specialized repair services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group bg-[#0d1117] rounded-3xl p-8 border border-white/10 transition-all cursor-pointer overflow-hidden ${colorMap[service.accent].split(' ')[0]}`}
              onClick={() => onSelect(service)}
            >
              {/* Glow effect */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 opacity-0 group-hover:opacity-100 blur-[50px] transition-opacity ${service.accent === 'blue' ? 'bg-blue-500/20' : service.accent === 'cyan' ? 'bg-cyan-500/20' : 'bg-orange-500/20'}`} />

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 transition-all ${colorMap[service.accent].split(' ').slice(1, 4).join(' ')} group-hover:text-white group-hover:bg-opacity-100`}>
                {service.icon}
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
              </div>
              
              <p className="text-slate-400 mb-8 text-sm font-light leading-relaxed">{service.description}</p>
              
              <div className="space-y-4 mb-10">
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-green-500/50" />
                    <span className="font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-bold font-mono ${colorMap[service.accent].split(' ')[1]}`}>₹{service.price}</span>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{service.duration}</span>
                  </div>
                </div>
                <button className={`text-sm font-bold transition-transform inline-flex items-center gap-1 ${colorMap[service.accent].split(' ')[1]}`}>
                  Book
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
