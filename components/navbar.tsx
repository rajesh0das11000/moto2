'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import {
  Bike,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
} from 'motion/react';

export const Navbar = () => {
  const { user, login, logout } = useAuth();

  const [isOpen, setIsOpen] =
    React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0d14]/80 backdrop-blur-md border-b border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:scale-110 transition-all">
              <Bike className="w-6 h-6" />
            </div>

            <span className="text-xl font-bold tracking-tight text-white uppercase">
              Moto
              <span className="text-blue-500">
                Glow
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              href="#services"
              className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
            >
              Services
            </Link>

            <Link
              href="#blogs"
              className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
            >
              Blogs
            </Link>

            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
            >
              How it Works
            </Link>

            <Link
              href="#contact"
              className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4">

                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-slate-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <User className="w-4 h-4" />

                  My Bookings
                </Link>

                <button
                  onClick={logout}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">

            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="text-slate-400 p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="md:hidden bg-[#0d1117] border-b border-white/5 overflow-hidden"
          >

            <div className="px-4 pt-2 pb-6 space-y-2">

              <Link
                href="#services"
                onClick={() =>
                  setIsOpen(false)
                }
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg"
              >
                Services
              </Link>

              <Link
                href="#blogs"
                onClick={() =>
                  setIsOpen(false)
                }
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg"
              >
                Blogs
              </Link>

              <Link
                href="#how-it-works"
                onClick={() =>
                  setIsOpen(false)
                }
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg"
              >
                How it Works
              </Link>

              <Link
                href="#contact"
                onClick={() =>
                  setIsOpen(false)
                }
                className="block px-3 py-2 text-base font-medium text-slate-300 hover:bg-white/5 rounded-lg"
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() =>
                      setIsOpen(false)
                    }
                    className="block px-3 py-2 text-base font-medium text-blue-400"
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
