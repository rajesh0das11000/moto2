'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalIcon, Clock, Phone, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const BookingModal = ({ service, onClose }: { service: any; onClose: () => void }) => {
  const { user, login } = useAuth();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await login();
      return;
    }

    setLoading(true);
    try {
      if (!db) throw new Error('Database not configured');
      const bookingData = {
        userId: user.uid,
        userName: user.displayName,
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
        date,
        time,
        notes,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db!, 'bookings'), bookingData);
      
      // WhatsApp redirect string
      const message = `Hello MotoGlow! I've just booked a ${service.name} for ${date} at ${time}. Order ID: (Pending)`;
      const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(message)}`;
      
      setSuccess(true);
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-[#0a0d14] rounded-3xl shadow-2xl overflow-hidden border border-white/10"
        >
          <div className="p-6 md:p-8">
            <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>

            {success ? (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-slate-400 mb-6 font-light">Redirecting to WhatsApp for expert confirmation...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-1">Book Your Service</h3>
                  <p className="text-sm text-slate-400 font-light">You are booking: <span className="font-bold text-blue-400 uppercase tracking-tight">{service.name}</span></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] items-center font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Select Date</label>
                    <div className="relative">
                      <CalIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Select Time Slot</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none text-white cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0d14]">Choose a slot</option>
                        {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((slot) => (
                          <option key={slot} value={slot} className="bg-[#0a0d14]">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Specifications</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Specific area to clean, repair details..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium resize-none text-white"
                    />
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all disabled:opacity-50 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                    >
                      {loading ? 'Processing...' : (user ? 'Confirm & Notify Expert' : 'Sign In to Book')}
                      {!loading && <Send className="w-5 h-5" />}
                    </button>
                    <a
                      href="tel:+911234567890"
                      className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                    >
                      <Phone className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed px-8 font-light italic">
                    Precision care begins with confirmation. We will reach out via WhatsApp immediately.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
