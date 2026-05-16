'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Calendar, Clock, CheckCircle, Phone, MessageCircle, ArrowLeft, MapPin, Tag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function BookingDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && db) {
      const fetchBooking = async () => {
        try {
          const docRef = doc(db!, 'bookings', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBooking({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (error) {
          console.error('Error fetching booking:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchBooking();
    }
  }, [user, id]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Booking Not Found</h2>
          <Link href="/dashboard" className="text-blue-400 font-bold hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  // Double check ownership
  if (user && booking.userId !== user.uid) {
     return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a] p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Unauthorized</h2>
          <Link href="/dashboard" className="text-blue-400 font-bold hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070a] pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d1117] rounded-[2rem] border border-white/5 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-white/5 bg-white/[0.01]">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 ${
                  booking.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                  booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {booking.status}
                </span>
                <h1 className="text-3xl font-bold text-white uppercase tracking-tight">{booking.serviceName}</h1>
                <p className="text-slate-600 text-xs font-mono mt-1 uppercase tracking-widest">UID: {booking.id.slice(0, 8)}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-3xl font-black text-blue-400 font-mono">₹{booking.servicePrice}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Date</span>
                </div>
                <p className="font-bold text-white relative z-10">{booking.date}</p>
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-600/5 blur-2xl group-hover:bg-blue-600/10 transition-all"></div>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden group">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Time</span>
                </div>
                <p className="font-bold text-white relative z-10">{booking.time}</p>
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-600/5 blur-2xl group-hover:bg-cyan-600/10 transition-all"></div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-10">
            <div>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Service Hub</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600/10 p-2.5 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm uppercase tracking-tight">MotoGlow Premium Center</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-light mt-1">123 Shine Avenue, Maintenance District, <br />Crystal City - 400001</p>
                  </div>
                </div>
              </div>
            </div>

            {booking.notes && (
              <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Client Submission</h3>
                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <p className="text-sm text-slate-400 leading-relaxed font-light italic">&quot;{booking.notes}&quot;</p>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-white/5">
              <div className="flex flex-col sm:flex-row gap-4">
                 <a 
                  href="https://wa.me/911234567890"
                  className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-900/10"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Expert
                </a>
                <a 
                  href="tel:+911234567890"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                >
                  <Phone className="w-5 h-5" />
                  Call Concierge
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 p-6 bg-blue-600/5 rounded-[2rem] border border-blue-500/10 flex items-center gap-5">
          <div className="bg-blue-600/10 p-3.5 rounded-2xl text-blue-400">
             <Tag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-blue-200 font-bold text-sm">Policy Notice</p>
            <p className="text-blue-500/70 text-xs font-light mt-0.5">Flexible changes up to 4 hours before engine arrival.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
