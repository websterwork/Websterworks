"use client";
import React, { useState } from 'react';
import Image from "next/image";
import { Shield } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactReasons: {
      webDesign: false,
      collaboration: false,
      mobileAppDesign: false,
      others: false,
    },
    budget: [2500],
    message: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (reason, checked) => {
    setFormData((prev) => ({
      ...prev,
      contactReasons: {
        ...prev.contactReasons,
        [reason]: checked,
      },
    }));
  };

  const handleBudgetChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      budget: [value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/ai-generated-8540913_1280.jpg" 
          alt="Background" 
          className="w-full h-full object-cover"
          fill
          priority
        />
      </div>
      
      {/* Contact Section Container */}
      <div
        className="relative bg-gradient-to-br from-slate-800/95 to-gray-900/95 backdrop-blur-lg border border-slate-600/30 rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width: "1596px",
          minHeight: "1771px",
          maxWidth: "100vw",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-blue-600/30 to-teal-600/30 text-center px-8 py-12 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10"></div>
            
            {/* Icon Box */}
            <div className="relative w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-500 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h1 className="relative text-white text-4xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto leading-tight">
              Thank you for your Interest in{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                SquareUp.
              </span>
            </h1>

            {/* Paragraph */}
            <p className="relative text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              We would love to hear from you and discuss how we can help bring
              your digital ideas to life. Here are the different ways you can
              get in touch with us.
            </p>

            {/* Button */}
            <button className="relative bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold px-10 py-4 rounded-xl shadow-xl transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-2xl">
              Start Project
            </button>
          </div>

          {/* Form Section */}
          <div className="flex-1 px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label
                      htmlFor="fullName"
                      className="block text-slate-200 text-lg font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Type here"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="block text-slate-200 text-lg font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Type here"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Contact Reasons */}
                <div className="space-y-6">
                  <label className="block text-slate-200 text-lg font-medium">
                    Why are you contacting us?
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[
                      { key: "webDesign", label: "Web Design" },
                      { key: "collaboration", label: "Collaboration" },
                      { key: "mobileAppDesign", label: "Mobile App Design" },
                      { key: "others", label: "Others" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-700/30 transition-all duration-200"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={item.key}
                            checked={formData.contactReasons[item.key]}
                            onChange={(e) =>
                              handleCheckboxChange(item.key, e.target.checked)
                            }
                            className="w-6 h-6 text-blue-400 bg-slate-800 border-slate-600 rounded-lg focus:ring-blue-400 focus:ring-2 transition-all duration-200"
                          />
                          {formData.contactReasons[item.key] && (
                            <svg
                              className="absolute top-1 left-1 w-4 h-4 text-blue-400 pointer-events-none"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <label
                          htmlFor={item.key}
                          className="text-slate-300 cursor-pointer hover:text-white transition-colors text-lg"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-6">
                  <label className="block text-slate-200 text-lg font-medium">
                    Your Budget
                  </label>
                  <p className="text-slate-400 text-base">
                    Slide to indicate your budget range
                  </p>
                  <div className="px-4 py-8 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <div className="relative">
                      <input
                        type="range"
                        min="1000"
                        max="5000"
                        step="100"
                        value={formData.budget[0]}
                        onChange={handleBudgetChange}
                        className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div
                        className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg pointer-events-none transition-all duration-300"
                        style={{
                          width: `${
                            ((formData.budget[0] - 1000) / 4000) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-base text-slate-400 mt-6">
                      <span>$1,000</span>
                      <span className="text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text font-bold text-xl">
                        ${formData.budget[0].toLocaleString()}
                      </span>
                      <span>$5,000</span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="block text-slate-200 text-lg font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Type here"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows="6"
                    className="w-full px-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white text-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none backdrop-blur-sm transition-all duration-200"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <button
                    type="submit"
                    className="w-full max-w-md bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-5 px-8 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl text-lg transform hover:scale-105 hover:-translate-y-1"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #14b8a6);
          cursor: pointer;
          border: 4px solid #1e293b;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #14b8a6);
          cursor: pointer;
          border: 4px solid #1e293b;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        @media (max-width: 1596px) {
          .contact-container {
            width: 100% !important;
            margin: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
