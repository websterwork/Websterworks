"use client";
import React, { useState } from "react";
import Image from "next/image";

const processes = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin by thoroughly understanding your business goals, target audience, and project objectives, allowing us to develop a tailored strategy and define project goals.",
  },
  {
    number: "02",
    title: "Planning and Strategy",
    description:
      "Based on the gathered information, we create a comprehensive project plan and resource allocation. We collaborate closely with you to align our strategy with your vision.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our expert designers translate the project requirements into captivating visual designs, wireframes, mockups, and interactive prototypes to showcase the user experience.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Once the designs are approved, our skilled development team brings them to life using cutting-edge technologies and coding best practices to build scalable digital products.",
  },
  {
    number: "05",
    title: "Testing and Quality Assurance",
    description:
      "We conduct rigorous testing to ensure quality, digital product functionality, performance metrics, and user satisfaction, achieving high-quality outcomes.",
  },
  {
    number: "06",
    title: "Deployment and Launch",
    description:
      "When your digital product is thoroughly tested and meets your satisfaction, we proceed with deployment, ensuring a smooth launch and ongoing support.",
  },
  {
    number: "07",
    title: "Deployment and Launch",
    description:
      "When your digital product is thoroughly tested and meets your satisfaction, we proceed with deployment, ensuring a smooth launch and ongoing support.",
  },
  {
    number: "08",
    title: "Deployment and Launch",
    description:
      "When your digital product is thoroughly tested and meets your satisfaction, we proceed with deployment, ensuring a smooth launch and ongoing support.",
  },
];

const contactReasons = [
  { id: "web-design", label: "Web Design", category: "design" },
  { id: "mobile-design", label: "Mobile Design", category: "design" },
  { id: "collaboration", label: "Collaboration", category: "business" },
  { id: "others", label: "Others", category: "business" },
];

function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactReason: "",
    budget: 1000,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBudgetChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      budget: parseInt(e.target.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[242px] flex items-center justify-center text-center">
        <Image
          src="/image.png" // Ensure this image is in the public folder
          alt="background image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-[#262626]/60 border-[5px] border-[#333333] z-10"></div>
        <div className="relative z-20 px-4 md:px-[70px] text-white w-full max-w-[4350px]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-[24.86px]">
            Process of starting the project
          </h2>
          <p className="text-base md:text-lg">
            At SquareUp we value transparency, collaboration, and delivery of
            exceptional results
          </p>
        </div>
      </section>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <p className="mb-4 md:mb-6 text-sm md:text-base">
          Here is an overview of our typical process:
        </p>
        <div className="space-y-6 md:space-y-8">
          {/* First Row: 2 Columns for Discovery and Planning */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {processes.slice(0, 2).map((process, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-2 md:mb-4">
                  {process.number}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {process.title}
                </h3>
                <p className="text-xs md:text-sm">{process.description}</p>
              </div>
            ))}
          </div>

          {/* Second Row: 2 Columns for Design and Development */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {processes.slice(2, 4).map((process, index) => (
              <div
                key={index + 2}
                className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-2 md:mb-4">
                  {process.number}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {process.title}
                </h3>
                <p className="text-xs md:text-sm">{process.description}</p>
              </div>
            ))}
          </div>

          {/* Third Row: 2 Columns for Testing and Deployment (05-06) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {processes.slice(4, 6).map((process, index) => (
              <div
                key={index + 4}
                className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-2 md:mb-4">
                  {process.number}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {process.title}
                </h3>
                <p className="text-xs md:text-sm">{process.description}</p>
              </div>
            ))}
          </div>

          {/* Fourth Row: 2 Columns for Additional Deployment (07-08) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {processes.slice(6).map((process, index) => (
              <div
                key={index + 6}
                className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-2 md:mb-4">
                  {process.number}
                </h2>
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {process.title}
                </h3>
                <p className="text-xs md:text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-800 min-h-screen px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-white font-medium mb-2 md:mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="w-full bg-transparent border-b border-gray-600 pb-2 md:pb-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2 md:mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Type here"
                  className="w-full bg-transparent border-b border-gray-600 pb-2 md:pb-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Contact Reason */}
            <div>
              <label className="block text-white font-medium mb-4 md:mb-6">
                Why are you contacting us?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {contactReasons.map((reason) => (
                  <label
                    key={reason.id}
                    className="flex items-center space-x-2 md:space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="contactReason"
                      value={reason.id}
                      checked={formData.contactReason === reason.id}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-lime-400 bg-transparent border-gray-600 focus:ring-lime-400 focus:ring-2"
                    />
                    <span className="text-gray-300 text-sm md:text-base">
                      {reason.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Slider */}
            <div>
              <label className="block text-white font-medium mb-2 md:mb-4">
                Your Budget
              </label>
              <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4">
                Slide to indicate your budget range
              </p>
              <div className="relative">
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={formData.budget}
                  onChange={handleBudgetChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs md:text-sm text-gray-400 mt-2">
                  <span>$1000</span>
                  <span className="text-lime-400 font-medium">
                    ${formData.budget.toLocaleString()}
                  </span>
                  <span>$50000</span>
                </div>
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    @apply w-5 h-5 bg-lime-400 rounded-full appearance-none cursor-pointer border-2 border-black;
                  }
                  input[type="range"]::-moz-range-thumb {
                    @apply w-5 h-5 bg-lime-400 rounded-full appearance-none cursor-pointer border-2 border-black;
                  }
                `}</style>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white font-medium mb-2 md:mb-3">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Type here"
                rows="4"
                className="w-full bg-transparent border-b border-gray-600 pb-2 md:pb-3 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 md:pt-8">
              <button
                type="submit"
                className="bg-lime-400 text-black px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold hover:bg-lime-300 transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Testimonial Section (Additional Portion) */}
      <div className="bg-gray-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-800 p-4 md:p-6 rounded-lg text-center">
              <p className="text-sm md:text-base mb-4 italic">
                &quot;SquareUp transformed our business with their innovative
                solutions. Highly recommend!&quot;
              </p>
              <p className="font-semibold">John Doe, CEO of TechCorp</p>
            </div>
            <div className="bg-gray-800 p-4 md:p-6 rounded-lg text-center">
              <p className="text-sm md:text-base mb-4 italic">
                &quot;Amazing team, great communication, and delivered on time!&quot;
              </p>
              <p className="font-semibold">Jane Smith, Founder of StyleHub</p>
            </div>
            <div className="bg-gray-800 p-4 md:p-6 rounded-lg text-center">
              <p className="text-sm md:text-base mb-4 italic">
                &quot;Their expertise in design and development is unmatched.&quot;
              </p>
              <p className="font-semibold">Mike Johnson, CTO of InnovateX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;