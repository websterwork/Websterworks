"use client";
import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  // Hero Section
  const HeroSection = () => (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/developmengt.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center bg-black/50 text-white p-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Custom Web Development</h1>
        <p className="max-w-2xl mb-6 text-lg">
          Unlock your business&apos;s full potential with our Custom Web Development Services. Tailored solutions
          designed to boost efficiency, streamline processes, and drive growth.
        </p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow text-white font-semibold transition-colors">
          Let&apos;s Connect
        </button>
      </div>
    </section>
  );

  // Two Column Section
  const TwoColumnSection = () => (
    <section className="py-16 px-6 md:px-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Revolutionize Your <br /> Business with Our Web <br /> Development Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We are a leading web development company that provides custom web development services, custom
            website development services, and custom web design services. Our team of web developers uses a
            thorough development process to design, create, deploy, and maintain customized websites and
            applications for specific users and organizations. Xeven Solutions, a top-tier website
            development company, focuses on narrowly defined requirements for custom website development and
            off-the-shelf website platforms requiring minor modifications. With a global presence, we
            rapidly expand our web design services and WordPress website Development Company in the USA. We
            provide a full range of web development agency services, including responsive web design
            services, website redesign services, and web design and development services to meet the
            specific requirements of our clients.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow text-white font-semibold transition-colors">
            Schedule a Demo
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src="/Custom Web Development img.png"
            alt="AI Services"
            className="rounded-xl shadow-lg"
            width={500}
            height={300}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );

  // Experience Section
  const services = [
    {
      title: 'AI Chatbot Development',
      description:
        'Step into the future of customer engagement with our AI Development Solutions. Intelligent chatbots that enhance engagement, streamline operations, and deliver personalized experiences.',
      image: '/AI-chatbot-development (1).png',
    },
    {
      title: 'NLP',
      description:
        'NLP solutions help machines understand human language better, making communication and decision-making more efficient across industries.',
      image: '/NLP.png',
    },
    {
      title: 'Predictive Analytics',
      description:
        'Utilizing advanced machine learning algorithms, predictive analysis ensures accurate forecasts, helping organizations anticipate and plan for future scenarios.',
      image: '/Predictive-Analytics.png',
    },
    {
      title: 'Machine Learning',
      description:
        'Data-driven algorithms unlock insights and drive transformative solutions, giving businesses a competitive edge in finance, healthcare, and e-commerce.',
      image: '/Machine-learning.png',
    },
    {
      title: 'Computer Vision',
      description:
        'Precise image recognition and object detection enhance healthcare diagnostics, e-commerce, and automation with cutting-edge computer vision solutions.',
      image: '/Computer-Vision.png',
    },
    {
      title: 'Chat GPT Integration',
      description:
        'Automate responses, handle queries effectively, and engage users in natural Conversations, enhancing your platform&apos;s user experience.',
      image: '/Chat-GPT-integration.png',
    },
  ];

  const ExperienceSection = () => (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Experience the Future of Enterprise Solutions with Our AI <br /> Development Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 text-center">
                <div className="mb-3">
                  <Image
                    src={service.image}
                    className="max-w-[100px] h-auto mx-auto"
                    alt={service.title}
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h5 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h5>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const industries = [
    {
      title: 'AI Chatbot Development',
      description:
        'Step into the future of customer engagement with our AI Development Solutions. Intelligent chatbots that enhance engagement, streamline operations, and deliver personalized experiences.',
      image: '/AI-chatbot-development (1).png',
    },
    {
      title: 'NLP',
      description:
        'NLP solutions help machines understand human language better, making communication and decision-making more efficient across industries.',
      image: '/NLP.png',
    },
    {
      title: 'Predictive Analytics',
      description:
        'Utilizing advanced machine learning algorithms, predictive analysis ensures accurate forecasts, helping organizations anticipate and plan for future scenarios.',
      image: '/Predictive-Analytics.png',
    },
  ];

  // FAQ Section
  const faqs = [
    {
      question: 'What services do you provide?',
      answer:
        'We provide AI development, chatbot solutions, and custom enterprise software tailored to your business needs.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact us through email, live chat, or by filling out the contact form on our website.',
    },
    {
      question: 'Do you offer free consultations?',
      answer: 'Yes, we offer a free 30-minute consultation call to understand your project requirements.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive ongoing support and maintenance packages for all our solutions.',
    },
  ];

  const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <button
                  className="w-full p-6 bg-white text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-800">{faq.question}</span>
                  <span
                    className={`text-blue-600 text-xl transform transition-transform ${
                      openIndex === index ? 'rotate-90' : ''
                    }`}
                  >
                    ➤
                  </span>
                </button>
                <div
                  className={`bg-gray-50 transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 p-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      <Head>
        <title>Custom Web Development</title>
        <meta name="description" content="Custom web development and AI solutions" />
      </Head>
      <main className="min-h-screen">
        <HeroSection />
        <TwoColumnSection />
        <ExperienceSection />
        <FaqSection />
      </main>
    </div>
  );
};

export default Home;