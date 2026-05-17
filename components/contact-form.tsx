'use client';

import { useState } from 'react';

export default function ContactForm() {

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState('');

  async function handleSubmit(e: any) {

    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError('');

    const formData = new FormData();

    formData.append(
      'names',
      e.target.names.value
    );

    formData.append(
      'email',
      e.target.email.value
    );

    formData.append(
      'subject',
      e.target.subject.value
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

        setError(
          data.message ||
          'Submission failed'
        );
      }

    } catch (err) {

      console.error(err);

      setError(
        'Server error occurred'
      );
    }

    setLoading(false);
  }

  return (
    <section
      id="contact"
      className="py-32 bg-[#0a0d14]"
    >

      <div className="max-w-3xl mx-auto px-4">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-white mb-4">
            Contact Us
          </h2>

          <p className="text-slate-400">
            Send your enquiry instantly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Name */}
          <input
            type="text"
            name="names"
            placeholder="Your Name"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white"
          />

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white"
          />

          {/* Message */}
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold"
          >
            {loading
              ? 'Sending...'
              : 'Submit Form'}
          </button>

          {/* Success */}
          {success && (
            <p className="text-green-400 text-center">
              Message sent successfully.
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-400 text-center">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
