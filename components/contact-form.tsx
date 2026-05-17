'use client';

import { useState } from 'react';

export default function ContactForm() {

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState(false);

  async function handleSubmit(e: any) {

    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError(false);

    const formData = new FormData();

    formData.append(
      'names',
      e.target.name.value
    );

    formData.append(
      'email',
      e.target.email.value
    );

    formData.append(
      'phone',
      e.target.phone.value
    );

    formData.append(
      'message',
      e.target.message.value
    );

    try {

      const response = await fetch(
        'https://indigo-mallard-456804.hostingersite.com/wp-json/fluentform/v1/contact-forms/1/entries',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (response.ok) {

        setSuccess(true);

        e.target.reset();

      } else {

        setError(true);
      }

    } catch (err) {

      console.error(err);

      setError(true);
    }

    setLoading(false);
  }

  return (
    <section
      id="contact"
      className="py-32 bg-[#0a0d14]"
    >

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact Us
          </h2>

          <p className="text-slate-400 text-lg">
            Book your bike or car service today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          {/* Phone */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          {/* Message */}
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition-all"
          >
            {loading
              ? 'Sending...'
              : 'Send Message'}
          </button>

          {/* Success Message */}
          {success && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4">

              <p className="text-green-400 text-center">
                Message sent successfully.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">

              <p className="text-red-400 text-center">
                Something went wrong.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
