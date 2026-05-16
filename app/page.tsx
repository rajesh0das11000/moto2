'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ServicesList } from '@/components/services';
import { BookingModal } from '@/components/booking-modal';
import { Phone, MessageCircle, MapPin, Mail, ChevronRight } from 'lucide-react';

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      <ServicesList onSelect={(service) => setSelectedService(service)} />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-[#0a0d14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">Process of <span className="font-bold border-b-2 border-blue-500">Precision.</span></h2>
            <p className="text-slate-400 font-light">Three simple steps to elite vehicle care.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: '01', 
                title: 'Select Service', 
                desc: 'Pick from our range of washes, detailing or specialized repairs.' 
              },
              { 
                step: '02', 
                title: 'Secure Slot', 
                desc: 'Pick a date and time that fits your requirements.' 
              },
              { 
                step: '03', 
                title: 'Ride Revived', 
                desc: 'Confirm your booking and experience expert engine care.' 
              }
            ].map((item, i) => (
              <div key={i} className="relative p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.05] transition-all">
                <span className="text-6xl font-black text-white/[0.03] absolute top-4 left-6 tracking-tighter">{item.step}</span>
                <h3 className="text-xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative z-10 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="bg-[#05070a] border-t border-white/5 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white uppercase">Moto<span className="text-blue-500">Glow</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mb-10 font-light leading-relaxed text-sm">
                Elite vehicle care since 2015. We merge traditional passion with modern precision to bring the sparkle back to your engine.
              </p>
              <div className="flex gap-4">
                 <a href="tel:+911234567890" className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-white/5">
                   <Phone className="w-5 h-5" />
                 </a>
                 <a href="mailto:contact@motoglow.com" className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-white/5">
                    <Mail className="w-5 h-5" />
                 </a>
                 <a href="#" className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-white/5">
                    <MessageCircle className="w-5 h-5" />
                 </a>
              </div>
            </div>

            <div>
              <h4 className="font-black text-slate-500 mb-8 uppercase text-[10px] tracking-[0.3em]">Services</h4>
              <ul className="space-y-6">
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Car Detailing</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Ceramic Coating</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Engine Repair</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Roadside Help</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black text-slate-500 mb-8 uppercase text-[10px] tracking-[0.3em]">Business</h4>
              <ul className="space-y-6">
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-sm font-light text-slate-400 hover:text-blue-400 transition-colors">Franchise</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-slate-600 font-mono">© {new Date().getFullYear()} MOTOGLOW PREMIUM. PRECISION ENGINEERED CARE.</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <a 
          href="https://wa.me/911234567890" 
          target="_blank"
          className="bg-[#25D366] text-white p-4 rounded-2xl shadow-xl shadow-green-900/20 hover:scale-110 active:scale-95 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
        <a 
          href="tel:+911234567890" 
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-110 active:scale-95 transition-all"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {selectedService && (
        <BookingModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </main>
  );
}
