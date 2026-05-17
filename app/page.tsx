'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ServicesList } from '@/components/services';
import { BookingModal } from '@/components/booking-modal';
import ContactForm from '@/components/contact-form';

import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  ChevronRight,
} from 'lucide-react';

async function getPosts() {
  try {
    const res = await fetch(
      'https://indigo-mallard-456804.hostingersite.com/wp-json/wp/v2/posts?_embed',
      {
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }

    return await res.json();
  } catch (error) {
    console.error('WordPress API Error:', error);
    return [];
  }
}

export default function Home() {
  const [selectedService, setSelectedService] =
    useState<any>(null);

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();

      console.log('Posts:', data);

      setPosts(data);
      setLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <Hero />

      <ServicesList
        onSelect={(service) =>
          setSelectedService(service)
        }
      />

      {/* How it Works */}
      <section
        id="how-it-works"
        className="py-32 bg-[#0a0d14]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">
              Process of{' '}
              <span className="font-bold border-b-2 border-blue-500">
                Precision.
              </span>
            </h2>

            <p className="text-slate-400 font-light">
              Three simple steps to elite vehicle care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                step: '01',
                title: 'Select Service',
                desc:
                  'Pick from our range of washes, detailing or repairs.',
              },

              {
                step: '02',
                title: 'Secure Slot',
                desc:
                  'Choose your preferred time and date.',
              },

              {
                step: '03',
                title: 'Ride Revived',
                desc:
                  'Experience premium vehicle care.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative p-10 bg-white/[0.02] border border-white/5 rounded-[2rem]"
              >
                <span className="text-6xl font-black text-white/[0.03] absolute top-4 left-6">
                  {item.step}
                </span>

                <h3 className="text-xl font-bold text-white mb-4 relative z-10">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm relative z-10">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-32 bg-black">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-20">

            <h2 className="text-4xl font-bold text-white mb-4">
              Latest Blog Posts
            </h2>

            <p className="text-slate-400">
              Live posts from WordPress CMS
            </p>
          </div>

          {loading ? (
            <div className="text-center text-slate-400">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-red-500">
              No blog posts found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
                >

                  {post._embedded?.['wp:featuredmedia']?.[0]
                    ?.source_url && (
                    <img
                      src={
                        post._embedded[
                          'wp:featuredmedia'
                        ][0].source_url
                      }
                      alt={post.title.rendered}
                      className="w-full h-56 object-cover"
                    />
                  )}

                  <div className="p-6">

                    <h3
                      className="text-xl font-bold text-white mb-4"
                      dangerouslySetInnerHTML={{
                        __html: post.title.rendered,
                      }}
                    />

                    <div
                      className="text-slate-400 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />

                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-6 text-blue-400 hover:text-blue-300"
                    >
                      Read More

                      <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
 <ContactForm />
      {/* Footer */}
      <footer className="bg-[#05070a] border-t border-white/5 pt-32 pb-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">

            <div className="col-span-1 lg:col-span-2">

              <div className="flex items-center gap-2 mb-8">

                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                  <MapPin className="w-5 h-5" />
                </div>

                <span className="text-2xl font-bold tracking-tight text-white uppercase">
                  Moto
                  <span className="text-blue-500">
                    Glow
                  </span>
                </span>
              </div>

              <p className="text-slate-500 max-w-sm mb-10 text-sm">
                Elite vehicle care since 2015.
                Premium detailing and bike repair services.
              </p>

              <div className="flex gap-4">

                <a
                  href="tel:+911234567890"
                  className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white"
                >
                  <Phone className="w-5 h-5" />
                </a>

                <a
                  href="mailto:contact@motoglow.com"
                  className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 bg-white/5 text-slate-300 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} MOTOGLOW PREMIUM
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">

        <a
          href="https://wa.me/911234567890"
          target="_blank"
          className="bg-[#25D366] text-white p-4 rounded-2xl"
        >
          <MessageCircle className="w-6 h-6" />
        </a>

        <a
          href="tel:+911234567890"
          className="bg-blue-600 text-white p-4 rounded-2xl"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>

      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() =>
            setSelectedService(null)
          }
        />
      )}
    </main>
  );
}
