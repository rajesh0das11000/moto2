'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  ChevronRight,
  CalendarDays,
} from 'lucide-react';

export default function BlogSection() {

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchPosts() {

      try {

        const res = await fetch(
          'https://indigo-mallard-456804.hostingersite.com/wp-json/wp/v2/posts?_embed'
        );

        const data =
          await res.json();

        setPosts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);
      }
    }

    fetchPosts();

  }, []);

  return (
    <section className="py-32 bg-black">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-20">

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Latest Blogs
          </h2>

          <p className="text-slate-400 text-lg">
            Insights, tips & updates from MotoGlow.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-slate-500">
            Loading blogs...
          </p>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (

            <article
              key={post.id}
              className="group bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 hover:-translate-y-2 transition-all duration-300"
            >

              {/* Featured Image */}
              {post._embedded?.[
                'wp:featuredmedia'
              ]?.[0]?.source_url && (

                <div className="overflow-hidden">

                  <img
                    src={
                      post._embedded[
                        'wp:featuredmedia'
                      ][0].source_url
                    }
                    alt={
                      post.title.rendered
                    }
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-8">

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">

                  <CalendarDays className="w-4 h-4" />

                  {new Date(
                    post.date
                  ).toDateString()}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold text-white mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.title.rendered,
                  }}
                />

                {/* Excerpt */}
                <div
                  className="text-slate-400 text-sm leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.excerpt.rendered,
                  }}
                />

                {/* Read More */}
               <Link
  href={`/blog/${post.slug}`}
  className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold transition-all"
>
  Read Article

  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
