'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#05070a]">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[100px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.2em] px-2">Premium Engine Care</span>
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-light text-white tracking-tight mb-8 leading-[1]">
            Expert Care for <br />
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Every Engine.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg lg:text-xl text-slate-400 mb-12 leading-relaxed font-light">
            Professional washes, specialist detailing, and expert repairs available today.
            Experience the precision of elite moto care at your convenience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all active:scale-95"
            >
              Book Now
              <Calendar className="w-5 h-5" />
            </a>
            <a 
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-24 flex items-center justify-center gap-12 text-slate-600">
             <div className="text-center">
                <span className="block text-2xl font-bold text-white mb-1">4.9/5</span>
                <span className="text-[10px] uppercase tracking-widest font-black">Customer Rating</span>
             </div>
             <div className="h-10 w-px bg-white/10" />
             <div className="text-center">
                <span className="block text-2xl font-bold text-white mb-1">10k+</span>
                <span className="text-[10px] uppercase tracking-widest font-black">Services Done</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
