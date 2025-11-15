"use client";
import { useState } from "react";
import Image from 'next/image';

export default function UiUxDesignPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What services do you provide?",
      answer: "We provide AI development, chatbot solutions, and custom enterprise software tailored to your business needs."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact us through email, live chat, or by filling out the contact form on our website."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we offer a free 30-minute consultation call to understand your project requirements."
    },
    {
      question: "What is your project timeline?",
      answer: "Project timelines vary based on complexity and requirements. We provide detailed timelines during our consultation phase."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive ongoing support and maintenance packages for all our solutions."
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/img/UI UX Design.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center bg-black/50 text-white p-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">UI UX Design</h1>
          <p className="max-w-2xl mb-6 text-lg">
            Boost engagement with our top-tier UI UX design services. Craft
            captivating interfaces for seamless navigation and enhanced digital
            presence.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white font-semibold transition-colors">
            Let&apos;s Connect
          </button>
        </div>
      </section>

      {/* 2 Column Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Top-Tier User-Friendly <br /> Custom UI/UX Design <br /> Services
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              In today&apos;s digital landscape, exceptional UI/UX design is
              paramount...
            </p>
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow text-white font-semibold transition-colors">
              Schedule a Demo
            </button>
          </div>

          <div className="flex justify-center">
            <Image
              src="/UI UX Design.jpg"
              alt="AI Services"
              width={600} // Adjust width as per your image dimensions
              height={400} // Adjust height as per your image dimensions
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full p-6 bg-white text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-800">{faq.question}</span>
                  <span className={`text-blue-600 text-xl transform transition-transform ${openFaqIndex === index ? 'rotate-90' : ''}`}>
                    ➤
                  </span>
                </button>
                <div className={`bg-gray-50 transition-all duration-300 ${openFaqIndex === index ? 'max-h-96 p-6' : 'max-h-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}