"use client"
import { useState } from 'react';
import Image from 'next/image';

const GraphicsDesignPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "What graphic design services do you provide?",
      answer: "We provide comprehensive graphic design services including brand identity design, logo creation, print design, digital graphics, packaging design, and marketing materials tailored to your business needs."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact us through email, live chat, or by filling out the contact form on our website. Our design team is available to discuss your creative projects."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we offer a free 30-minute consultation call to understand your design requirements and discuss how we can bring your creative vision to life."
    },
    {
      question: "What file formats do you deliver?",
      answer: "We deliver designs in multiple formats including AI, EPS, PDF, PNG, JPG, and SVG to ensure compatibility across all your marketing channels and print requirements."
    },
    {
      question: "How long does a typical design project take?",
      answer: "Project timelines vary based on complexity. Logo designs typically take 5-7 business days, while comprehensive brand identity projects may take 2-3 weeks. We&apos;ll provide a detailed timeline during consultation."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes, we include up to 3 rounds of revisions in our standard packages to ensure your complete satisfaction with the final design."
    },
    {
      question: "Can you work with our existing brand guidelines?",
      answer: "Absolutely! We can work within your existing brand guidelines or help you develop new ones. Our team is experienced in maintaining brand consistency across all design materials."
    }
  ];

  const servicesData = [
    {
      image: "/AI-chatbot-development (1).png",
      title: "Brand Identity Design",
      description: "Create compelling brand identities that capture your company&apos;s essence. From logo design to complete visual identity systems, we help establish your unique market presence."
    },
    {
      image: "/NLP.png",
      title: "Print Design",
      description: "Professional print design services including brochures, flyers, business cards, posters, and marketing collateral. High-quality designs optimized for various printing methods."
    },
    {
      image: "/Predictive-Analytics.png",
      title: "Digital Graphics",
      description: "Eye-catching digital graphics for websites, social media, email campaigns, and online advertising. Optimized for digital platforms and various screen sizes."
    },
    {
      image: "/Machine-learning.png",
      title: "Packaging Design",
      description: "Innovative packaging design that stands out on shelves and communicates your brand values. From concept to production-ready files, we handle every aspect of package design."
    },
    {
      image: "/Computer-Vision.png",
      title: "Marketing Materials",
      description: "Comprehensive marketing design services including advertisements, promotional materials, trade show graphics, and campaign visuals that drive engagement and conversions."
    },
    {
      image: "/Chat-GPT-integration.png",
      title: "UI/UX Design",
      description: "User-centered interface design for websites and mobile applications. Creating intuitive, visually appealing designs that enhance user experience and drive business results."
    }
  ];

  const collaborationData = [
    {
      image: "/AI-chatbot-development (1).png",
      title: "Creative Process",
      description: "Our collaborative design approach ensures we capture your vision perfectly. We work closely with you through every stage, from initial concepts to final delivery, ensuring your complete satisfaction."
    },
    {
      image: "/NLP.png",
      title: "Flexible Design Solutions",
      description: "Leverage our extensive experience in graphic design across multiple industries and mediums. We create highly customized visual solutions that adapt to your unique brand needs and market demands."
    },
    {
      image: "/Predictive-Analytics.png",
      title: "Maximize Brand Impact",
      description: "Enjoy significant brand growth with custom design solutions that enhance your market presence and customer engagement. Our designs maximize your return on investment through increased brand recognition and customer loyalty."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        <Image 
          className="absolute inset-0 w-full h-full object-cover -z-10" 
          src="/Hero_graphic.jpg" 
          alt="Hero Graphic Design Background"
          width={1920}
          height={1080}
          priority
        />
        <div className="text-center text-white z-10 p-8 bg-black bg-opacity-50 rounded-xl max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Graphics Design</h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Unlock your business&apos;s full potential with our Custom Graphics Design Services. 
            Tailored visual solutions designed to enhance your brand, captivate audiences, and drive growth.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            Let&apos;s Connect
          </button>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column (Content) */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
                Transform Your Brand<br />
                with Professional<br />
                Graphics Design
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are a leading graphic design agency that provides comprehensive visual communication services, custom brand identity solutions, and creative design services. Our team of experienced designers uses a collaborative design process to conceptualize, create, and deliver stunning visual solutions for businesses and organizations. As a top-tier creative agency, we focus on understanding your unique brand requirements and translating them into compelling visual narratives. With a portfolio spanning multiple industries, we rapidly deliver high-quality design services including logo design, brand identity, print design, digital graphics, and marketing materials to meet the specific creative needs of our clients.
              </p>
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Schedule a Demo
              </button>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:w-1/2 text-center">
              <Image 
                src="/Graphic.jpg" 
                alt="Graphic Design Services" 
                className="w-full h-auto rounded-xl shadow-2xl"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4" id="experience">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
              Experience Creative Excellence with Our Professional<br />
              Graphic Design Services
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>
                  <h5 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h5>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Tools Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Why Choose Our Design Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborationData.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200">
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>
                  <h5 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h5>
                  <p className="text-gray-600 leading-relaxed text-justify">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <button 
                  className="w-full px-6 py-6 bg-white hover:bg-gray-50 text-left font-semibold flex justify-between items-center transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-gray-800">{faq.question}</span>
                  <span className={`text-blue-600 text-xl transform transition-transform duration-300 ${openFaq === index ? 'rotate-90' : ''}`}>
                    ➤
                  </span>
                </button>
                <div className={`bg-gray-50 overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 py-6 px-6' : 'max-h-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GraphicsDesignPage;