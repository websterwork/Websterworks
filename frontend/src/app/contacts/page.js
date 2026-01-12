"use client";
import Link from 'next/link';
import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    alert('Message sent! We&apos;ll get back to you soon.');
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch with Websterwork. We&apos;re here to help with your digital projects.
          </p>

          {/* Owner Verification Note */}
          <div className="mt-6 inline-block bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Websterwork is operated by <strong>Muhammad Hussnain</strong> from Lahore, Pakistan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Form - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info - Right Column */}
          <div className="space-y-8">

            {/* Business Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Business Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Business Name</p>
                  <p className="font-medium dark:text-white">Websterwork</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Legal Owner</p>
                  <p className="font-medium dark:text-white">Muhammad Hussnain</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium dark:text-white">Lahore, Pakistan</p>
                </div>
                <div className="pt-4 border-t">
                  <Link
                    href="/legal/owner"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    View Full Business Verification →
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Details Card - UPDATED WITH SOCIAL MEDIA */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <Link
                    href="tel:+923134385885"
                    className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    +92 313 4385885
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <Link
                    href="mailto:info@websterwork.com"
                    className="font-medium dark:text-white text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    info@websterwork.com
                  </Link>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                  <p className="font-medium dark:text-white">Within 24 hours</p>
                </div>

                {/* Social Media Section */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Connect on Social Media</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Social media links remain unchanged */}
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-5">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                Verification Note
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This contact page verifies that Websterwork is operated by Muhammad Hussnain.
                For official business verification, visit our verification page.
              </p>
            </div>

          </div>
        </div>

        {/* Additional Verification Section */}
        <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Business Verification
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Websterwork is a sole proprietorship business operating under the legal
              ownership of Muhammad Hussnain. For detailed verification information:
            </p>
            <Link
              href="/legal/owner"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              Visit Verification Page
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
