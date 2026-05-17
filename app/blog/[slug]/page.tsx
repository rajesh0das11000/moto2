import Link from 'next/link';
import { ChevronLeft, CalendarDays } from 'lucide-react';

async function getPost(slug: string) {

  const res = await fetch(
    `https://indigo-mallard-456804.hostingersite.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    {
      cache: 'no-store',
    }
  );

  const data = await res.json();

  return data[0];
}

export default async function BlogPost({
  params,
}: any) {

  const post =
    await getPost(params.slug);

  if (!post) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Blog not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#05070a] text-white">

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">

        {/* Featured Image */}
        {post._embedded?.[
          'wp:featuredmedia'
        ]?.[0]?.source_url && (

          <img
            src={
              post._embedded[
                'wp:featuredmedia'
              ][0].source_url
            }
            alt={post.title.rendered}
            className="w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
            >
              <ChevronLeft className="w-5 h-5" />

              Back to Home
            </Link>

            {/* Date */}
            <div className="flex items-center gap-2 text-slate-300 mb-6">

              <CalendarDays className="w-5 h-5" />

              {new Date(
                post.date
              ).toDateString()}
            </div>

            {/* Title */}
            <h1
              className="text-4xl lg:text-7xl font-black leading-tight max-w-4xl"
              dangerouslySetInnerHTML={{
                __html:
                  post.title.rendered,
              }}
            />
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-24">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div
            className="
              prose
              prose-invert
              prose-lg
              max-w-none

              prose-headings:text-white
              prose-p:text-slate-300
              prose-p:leading-relaxed

              prose-strong:text-white

              prose-a:text-blue-400
              prose-a:no-underline
              hover:prose-a:text-blue-300

              prose-img:rounded-3xl
              prose-img:shadow-2xl
            "
            dangerouslySetInnerHTML={{
              __html:
                post.content.rendered,
            }}
          />
        </div>
      </section>
    </main>
  );
}
