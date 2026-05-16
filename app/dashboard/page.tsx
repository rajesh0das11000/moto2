'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { Calendar, Clock, CheckCircle, Clock4, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user || !db) return;
      try {
        const q = query(
          collection(db!, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      load();
    }
  }, [user]);

  if (authLoading || (user && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05070a] p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Sign In Required</h2>
          <p className="text-slate-400 mb-8 font-light">Please sign in to view your service history and upcoming bookings.</p>
          <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070a] pt-32 pb-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <h1 className="text-3xl font-light text-white tracking-tight">Your <span className="font-bold">Dashboard.</span></h1>
        </div>

        {/* Reminder Banner */}
        {bookings.length > 0 && bookings[0].status === 'pending' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 text-white mb-10 shadow-2xl shadow-blue-900/40 relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock4 className="w-5 h-5 text-blue-200" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Next Service Reminder</span>
                </div>
                <h3 className="text-2xl font-bold">{bookings[0].serviceName}</h3>
                <p className="text-blue-100 font-light mt-1">{bookings[0].date} at {bookings[0].time}</p>
              </div>
              <button className="whitespace-nowrap bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                Reschedule
              </button>
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 blur-[40px] rounded-full"></div>
          </motion.div>
        )}

        <div className="bg-[#0d1117] rounded-[2rem] border border-white/5 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Service History</h2>
            <span className="text-[10px] text-slate-600 font-mono italic">{bookings.length} Services Total</span>
          </div>

          <div className="divide-y divide-white/[0.03]">
            {bookings.length === 0 ? (
              <div className="py-24 text-center px-6">
                <p className="text-slate-600 mb-6 font-light">No engine care history found yet.</p>
                <Link href="/" className="text-blue-400 font-bold hover:underline">Book your first service →</Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        booking.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                        booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {booking.status === 'completed' ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{booking.serviceName}</h4>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500 mt-2 font-mono uppercase">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {booking.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-right">
                        <p className="text-sm font-bold text-white font-mono">₹{booking.servicePrice}</p>
                        <span className={`text-[9px] font-black uppercase tracking-widest ${
                          booking.status === 'completed' ? 'text-green-500' : 
                          booking.status === 'cancelled' ? 'text-red-500' : 'text-blue-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <Link 
                        href={`/booking/${booking.id}`} 
                        className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                      >
                         <ChevronRight className="w-5 h-5 text-slate-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
  </svg>
);
