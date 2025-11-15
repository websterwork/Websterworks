"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image"; // Import Next.js Image component

const GameDevelopmentPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const services = [
    {
      title: "AI Chatbot Development",
      description:
        "Step into the future of customer engagement with our AI Development Solutions. Intelligent chatbots that enhance engagement, streamline operations, and deliver personalized experiences.",
      image: "/AI-chatbot-development (1).png",
    },
    {
      title: "NLP",
      description:
        "NLP solutions help machines understand human language better, making communication and decision-making more efficient across industries.",
      image: "/NLP.png",
    },
    {
      title: "Predictive Analytics",
      description:
        "Utilizing advanced machine learning algorithms, predictive analysis ensures accurate forecasts, helping organizations anticipate and plan for future scenarios.",
      image: "/Predictive-Analytics.png",
    },
    {
      title: "Machine Learning",
      description:
        "Data-driven algorithms unlock insights and drive transformative solutions, giving businesses a competitive edge in finance, healthcare, and e-commerce.",
      image: "/Machine-learning.png",
    },
    {
      title: "Computer Vision",
      description:
        "Precise image recognition and object detection enhance healthcare diagnostics, e-commerce, and automation with cutting-edge computer vision solutions.",
      image: "/Computer-Vision.png",
    },
    {
      title: "Chat GPT Integration",
      description:
        "Automate responses, handle queries effectively, and engage users in natural conversations, enhancing your platform's user experience.",
      image: "/Chat-GPT-integration.png",
    },
  ];

  const industries = [
    {
      title: "AI Chatbot Development",
      description:
        "Step into the future of customer engagement with our AI Development Solutions. Intelligent chatbots that enhance engagement, streamline operations, and deliver personalized experiences.",
      image: "/AI-chatbot-development (1).png",
    },
    {
      title: "NLP",
      description:
        "NLP solutions help machines understand human language better, making communication and decision-making more efficient across industries.",
      image: "/NLP.png",
    },
    {
      title: "Predictive Analytics",
      description:
        "Utilizing advanced machine learning algorithms, predictive analysis ensures accurate forecasts, helping organizations anticipate and plan for future scenarios.",
      image: "/Predictive-Analytics.png",
    },
  ];

  const faqs = [
    {
      question: "What services do you provide?",
      answer:
        "We provide AI development, chatbot solutions, and custom enterprise software tailored to your business needs.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact us through email, live chat, or by filling out the contact form on our website.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer a free 30-minute consultation call to understand your project requirements.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer a free 30-minute consultation call to understand your project requirements.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer a free 30-minute consultation call to understand your project requirements.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer a free 30-minute consultation call to understand your project requirements.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes, we offer a free 30-minute consultation call to understand your project requirements.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Game.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Game Development
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
            We offer top-tier Game Development services, seamlessly integrating teams and automating workflows. We streamline processes for agile and high-quality product delivery.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Let&apos;s Connect
          </button>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Revolutionize Your <br />
                Business with Our <br />
                DevOps consulting <br />
                services
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Experience streamlined and accelerated DevOps software development services with our collaborative workspace culture and customized AI integration. Xeven Solutions, a top-tier devops consultants, integrates AI-powered automation tools, predictive analysis, and quality assurance. This helps us optimize efficiency, mitigate risks, and achieve faster, more reliable software deployments. Experience the transformational power of our Best DevOps Consulting Services. We offer expert guidance to optimize your DevOps operations, enhancing collaboration between development and operations teams. Our devops development services encompass tailored strategies, tools, and methodologies to accelerate software delivery and ensure efficient deployment. Embrace the future of software development and gain a competitive edge with our Best DevOps solutions and services.
                </p>
              </div>

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Schedule a Demo
              </button>
            </div>

            {/* Right Column */}
            <div className="text-center">
              <Image
                src="/Game.jpg"
                alt="Game Development Services"
                width={800} // Specify appropriate width
                height={600} // Specify appropriate height
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Experience the Future of Enterprise Solutions with Our AI <br />
              Development Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div className="mb-6">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={80} // Specify appropriate width
                    height={80} // Specify appropriate height
                    className="mx-auto object-contain"
                  />
                </div>
                <h5 className="text-xl font-bold mb-4 text-gray-800">
                  {service.title}
                </h5>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Industries We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center border hover:border-blue-200 transform hover:-translate-y-1"
              >
                <div className="mb-6">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    width={80} // Specify appropriate width
                    height={80} // Specify appropriate height
                    className="mx-auto object-contain"
                  />
                </div>
                <h5 className="text-xl font-bold mb-4 text-gray-800">
                  {industry.title}
                </h5>
                <p className="text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-600 transition-transform duration-200" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameDevelopmentPage;