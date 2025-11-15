"use client";
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQSection = () => {
  const [openItems, setOpenItems] = useState({ "01": true }); // First item open by default

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = [
    {
      id: "01",
      question: "What services does SquareUp provide?",
      answer:
        "SquareUp offers a range of services including design, engineering, and project management. We specialize in user experience design, web development, mobile app development, custom software development, branding and identity, and more.",
    },
    {
      id: "02",
      question: "How can SquareUp help my business?",
      answer:
        "SquareUp can help your business by providing comprehensive digital solutions tailored to your specific needs. We work closely with you to understand your goals and deliver results that drive growth and success.",
    },
    {
      id: "03",
      question: "What industries does SquareUp work with?",
      answer:
        "SquareUp works with a diverse range of industries including technology, healthcare, finance, e-commerce, education, and more. Our adaptable approach allows us to serve clients across various sectors.",
    },
    {
      id: "04",
      question: "How long does it take to complete a project with SquareUp?",
      answer:
        "Project timelines vary depending on scope and complexity. Typically, projects range from 4-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the process.",
    },
    {
      id: "05",
      question:
        "Do you offer ongoing support and maintenance after the project is completed?",
      answer:
        "Yes, we offer comprehensive ongoing support and maintenance packages to ensure your project continues to perform optimally after launch. Our support includes updates, monitoring, and technical assistance.",
    },
    {
      id: "06",
      question: "Can you work with existing design or development frameworks?",
      answer:
        "Absolutely! We can work with your existing design systems, frameworks, and development environments. Our team is experienced in integrating with various platforms and technologies.",
    },
    {
      id: "07",
      question: "How involved will I be in the project development process?",
      answer:
        "We believe in collaborative partnerships. You'll be involved throughout the entire process with regular check-ins, progress updates, and opportunities for feedback at key milestones.",
    },
    {
      id: "08",
      question: "Can you help with website or app maintenance and updates?",
      answer:
        "Yes, we provide ongoing maintenance and update services for websites and applications. This includes security updates, feature enhancements, performance optimization, and content management.",
    },
  ];

  return (
    <section className="w-full min-h-screen  dark:bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border border-gray-700 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 border border-gray-700 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 border border-gray-700 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Still you have any questions? Contact our Team via{" "}
            <span className="text-white">hello@squareup.com</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors duration-300"
            >
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <span className="text-green-400 font-bold text-lg min-w-[2rem]">
                    {item.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2 pr-4">
                      {item.question}
                    </h3>
                    {openItems[item.id] && (
                      <p className="text-gray-400 leading-relaxed">
                        {item.answer}
                      </p>
                    )}
                  </div>
                </div>
                <button className="text-white hover:text-green-400 transition-colors duration-200 ml-4 flex-shrink-0">
                  {openItems[item.id] ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
