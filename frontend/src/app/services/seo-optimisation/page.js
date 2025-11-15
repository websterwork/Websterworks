'use client';
import Image from 'next/image';
import { useState } from 'react';

const SEOServices = () => {
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

  const aiServices = [
    {
      image: "/AI-chatbot-development (1).png",
      title: "AI Chatbot Development",
      description: "Step into the future of customer engagement with our AI Development Solutions. Intelligent chatbots that enhance engagement, streamline operations, and deliver personalized experiences."
    },
    {
      image: "/NLP.png",
      title: "NLP",
      description: "NLP solutions help machines understand human language better, making communication and decision-making more efficient across industries."
    },
    {
      image: "/Predictive-Analytics.png",
      title: "Predictive Analytics",
      description: "Utilizing advanced machine learning algorithms, predictive analysis ensures accurate forecasts, helping organizations anticipate and plan for future scenarios."
    },
    {
      image: "/Machine-learning.png",
      title: "Machine Learning",
      description: "Data-driven algorithms unlock insights and drive transformative solutions, giving businesses a competitive edge in finance, healthcare, and e-commerce."
    },
    {
      image: "/Computer-Vision.png",
      title: "Computer Vision",
      description: "Precise image recognition and object detection enhance healthcare diagnostics, e-commerce, and automation with cutting-edge computer vision solutions."
    },
    {
      image: "/Chat-GPT-integration.png",
      title: "Chat GPT Integration",
      description: "Automate responses, handle queries effectively, and engage users in natural conversations, enhancing your platform's user experience."
    }
  ];

  return (
    <div className="graphics-design-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Image 
          className="hero-background" 
          src="/seo.jpg" 
          alt="SEO Optimization Services"
          width={1200}
          height={600}
          priority
        />
        <div className="hero-content">
          <h1 className="hero-title">SEO Optimisation</h1>
          <p className="hero-description">
            We offer top-tier SEO Optimisation services, seamlessly integrating teams and automating workflows. 
            We streamline processes for agile and high-quality product delivery.
          </p>
          <button className="hero-button">Let&apos;s Connect</button>
        </div>
      </section>

      {/* DevOps Consulting Section */}
      <section className="two-column-section">
        <div className="two-column-container">
          <div className="two-column-content">
            {/* Left Column (Content) */}
            <div className="content-left">
              <div className="space-y-6">
                <h2 className="section-title">
                  Revolutionize Your <br />
                  Business with Our <br />
                  DevOps Consulting <br />
                  Services
                </h2>
                <p className="section-description">
                  Experience streamlined and accelerated DevOps software development services with our collaborative workspace culture and customized AI integration. Xeven Solutions, a top-tier DevOps consultancy, integrates AI-powered automation tools, predictive analysis, and quality assurance. This helps us optimize efficiency, mitigate risks, and achieve faster, more reliable software deployments. Experience the transformational power of our Best DevOps Consulting Services. We offer expert guidance to optimize your DevOps operations, enhancing collaboration between development and operations teams. Our DevOps development services encompass tailored strategies, tools, and methodologies to accelerate software delivery and ensure efficient deployment. Embrace the future of software development and gain a competitive edge with our Best DevOps solutions and services.
                </p>
                <button className="demo-button">Schedule a Demo</button>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="content-right">
              <Image 
                src="/SEO-Bubbles-Blue-Background.jpg" 
                alt="AI Services" 
                width={600}
                height={400}
                className="section-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section" id="experience">
        <div className="experience-container">
          <div className="experience-header">
            <h2 className="experience-title">
              Experience the Future of Enterprise Solutions with Our AI <br />
              Development Services
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="services-grid">
            {aiServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-card-content">
                  <div className="service-icon-container">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      width={80}
                      height={80}
                      className="service-icon"
                    />
                  </div>
                  <h5 className="service-title">{service.title}</h5>
                  <p className="service-description">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question-button"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className={`faq-arrow ${openFaqIndex === index ? 'open' : ''}`}>➤</span>
                </button>
                <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                  <p className="faq-answer-text">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .graphics-design-page {
          min-height: 100vh;
        }

        .hero-section {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -10;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 10;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 0.75rem;
          max-width: 64rem;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .hero-description {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          line-height: 1.625;
        }

        .hero-button {
          padding: 1rem 2rem;
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          color: white;
          font-weight: 700;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transform: translateY(0);
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .hero-button:hover {
          background: linear-gradient(to right, #1d4ed8, #1e40af);
          transform: translateY(-0.25rem);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .two-column-section {
          padding: 5rem 1rem;
        }

        .two-column-container {
          max-width: 80rem;
          margin: 0 auto;
        }

        .two-column-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
        }

        .content-left {
          width: 100%;
        }

        .content-right {
          width: 100%;
          text-align: center;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          background: linear-gradient(to right, #2563eb, #16a34a);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }

        .section-description {
          color: #4b5563;
          font-size: 1.125rem;
          line-height: 1.625;
          margin-bottom: 1.5rem;
        }

        .demo-button {
          padding: 1rem 2rem;
          background: #2563eb;
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transform: translateY(0);
          transition: all 0.3s ease;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .demo-button:hover {
          background: #1d4ed8;
          transform: translateY(-0.25rem);
        }

        .section-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .experience-section {
          padding: 5rem 1rem;
        }

        .experience-container {
          max-width: 80rem;
          margin: 0 auto;
        }

        .experience-header {
          margin-bottom: 4rem;
          text-align: center;
        }

        .experience-title {
          font-size: 2.25rem;
          font-weight: 700;
          background: linear-gradient(to right, #2563eb, #16a34a);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          line-height: 1.1;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .service-card {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          transform: translateY(0);
          transition: all 0.3s ease;
        }

        .service-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: translateY(-0.5rem);
        }

        .service-card-content {
          padding: 2rem;
        }

        .service-icon-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .service-icon {
          width: 5rem;
          height: 5rem;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .service-description {
          color: #4b5563;
          line-height: 1.625;
        }

        .faq-section {
          padding: 5rem 1rem;
        }

        .faq-container {
          max-width: 64rem;
          margin: 0 auto;
        }

        .faq-title {
          font-size: 2.25rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 4rem;
          color: #1f2937;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .faq-question-button {
          width: 100%;
          padding: 1.5rem;
          background: white;
          border: none;
          text-align: left;
          font-weight: 600;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .faq-question-button:hover {
          background: #f9fafb;
        }

        .faq-question-text {
          color: #1f2937;
        }

        .faq-arrow {
          color: #2563eb;
          font-size: 1.25rem;
          transform: rotate(0deg);
          transition: transform 0.3s ease;
        }

        .faq-arrow.open {
          transform: rotate(90deg);
        }

        .faq-answer {
          background: #f9fafb;
          overflow: hidden;
          transition: all 0.3s ease;
          max-height: 0;
        }

        .faq-answer.open {
          max-height: 24rem;
          padding: 1.5rem;
        }

        .faq-answer-text {
          color: #4b5563;
          line-height: 1.625;
        }

        .space-y-6 > * + * {
          margin-top: 1.5rem;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 3.75rem;
          }

          .hero-description {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 3rem;
          }

          .experience-title {
            font-size: 3rem;
          }

          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .two-column-content {
            flex-direction: row;
          }

          .content-left {
            width: 50%;
          }

          .content-right {
            width: 50%;
          }

          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default SEOServices;