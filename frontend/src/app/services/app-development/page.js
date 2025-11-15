"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const MobileAppPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
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
      question: "What platforms do you develop for?",
      answer: "We develop for iOS, Android, and cross-platform solutions using React Native and Flutter."
    },
    {
      question: "How long does app development take?",
      answer: "Development timeline varies based on complexity, typically ranging from 3-12 months for custom applications."
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, we offer comprehensive post-launch support including maintenance, updates, and feature enhancements."
    },
    {
      question: "Can you help with app store submission?",
      answer: "Absolutely! We handle the entire app store submission process for both iOS App Store and Google Play Store."
    }
  ];

  return (
    <div className="mobile-app-page">
      {/* Hero Section */}
      <section className="hero">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src="/mobile.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>Custom Mobile App Development</h1>
          <p>Turn your business ideas into compelling, user-focused apps with our top-tier Mobile App Developer Services.</p>
          <button className="btn btn-custom">Let&apos;s Connect</button>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="section-two">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left Column (Content) */}
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <h2 className="gradient-text mb-4">Premier mobile app solutions, your top choice</h2>
              <p className="para">
                WEBSTER, a top-tier mobile app development company, delivers cutting-edge custom solutions. We help ambitious businesses to build scalable, user-focused apps that succeed. Our unmatched custom iOS and custom android app development services and focus on exceptional experiences make us the premier choice to bring your vision to life. Our app development team collaborates to create custom features, streamline processes for a better user experience, analyze usage patterns for mobile optimization, and deliver actionable insights to refine your mobile strategy. Mobile application services help unlock your brand&apos;s full potential and deliver innovative solutions to gain a competitive edge in today&apos;s digital landscape.
              </p>
              <button className="btn btn-primary mt-3">Schedule a Demo</button>
            </div>

            {/* Right Column (Image) */}
            <div className="excel-img col-lg-6 col-md-6 col-12 text-center">
              <Image
                src="/Custom Software Development.png"
                alt="Mobile App Development Services"
                width={600}
                height={400}
                className="img-fluid rounded shadow"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="full-container">
        {/* Experience Section */}
        <section className="section-two" id="experience">
          <div className="container-fluid">
            <div className="mb-5 text-center">
              <h2 className="gradient-text fw-bold">
                Experience the Future of Enterprise Solutions with Our Mobile <br /> Development Services
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="row g-4">
              {/* Card 1 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/AI-chatbot-development.png"
                        alt="AI Chatbot Development"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">AI Chatbot Development</h5>
                    <p className="card-text para">
                      Step into the future of customer engagement with our AI Development Solutions.
                      Intelligent chatbots that enhance engagement, streamline operations, and deliver
                      personalized experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/NLP.png"
                        alt="Natural Language Processing"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">NLP</h5>
                    <p className="card-text para">
                      NLP solutions help machines understand human language better,
                      making communication and decision-making more efficient across industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/Predictive-Analytics.png"
                        alt="Predictive Analytics"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">Predictive Analytics</h5>
                    <p className="card-text para">
                      Utilizing advanced machine learning algorithms, predictive analysis ensures accurate
                      forecasts, helping organizations anticipate and plan for future scenarios.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/Machine-learning.png"
                        alt="Machine Learning"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">Machine Learning</h5>
                    <p className="card-text para">
                      Data-driven algorithms unlock insights and drive transformative solutions,
                      giving businesses a competitive edge in finance, healthcare, and e-commerce.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/Computer-Vision.png"
                        alt="Computer Vision"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">Computer Vision</h5>
                    <p className="card-text para">
                      Precise image recognition and object detection enhance healthcare diagnostics,
                      e-commerce, and automation with cutting-edge computer vision solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 border-0">
                  <div className="card-body text-center">
                    <div className="img-card mb-3">
                      <Image
                        src="/Chat-GPT-integration.png"
                        alt="Chat GPT Integration"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold">Chat GPT Integration</h5>
                    <p className="card-text para">
                      Automate responses, handle queries effectively, and engage users in natural
                      conversations, enhancing your platform&apos;s user experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="industries">
          <div className="container-fluid">
            <div className="text-center mb-5">
              <h2 className="industries-heading fw-bold">Industries We Serve</h2>
            </div>

            <div className="row g-4 justify-content-center">
              {/* Industry Card 1 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 industry-card text-center">
                  <div className="card-body">
                    <div className="img-card mb-3">
                      <Image
                        src="/Healthcare.png"
                        alt="Healthcare"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">Healthcare</h5>
                    <p className="card-text">
                      Developing HIPAA-compliant mobile health applications with telemedicine,
                      patient management, and health monitoring capabilities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Industry Card 2 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 industry-card text-center">
                  <div className="card-body">
                    <div className="img-card mb-3">
                      <Image
                        src="/Finance.png"
                        alt="Finance"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">Finance</h5>
                    <p className="card-text">
                      Building secure fintech applications with payment processing,
                      digital banking, and investment management features.
                    </p>
                  </div>
                </div>
              </div>

              {/* Industry Card 3 */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 industry-card text-center">
                  <div className="card-body">
                    <div className="img-card mb-3">
                      <Image
                        src="/E-commerce.png"
                        alt="E-commerce"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">E-commerce</h5>
                    <p className="card-text">
                      Creating seamless shopping experiences with mobile commerce apps,
                      inventory management, and personalized product recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="faq-heading text-center mb-5">Frequently Asked Questions</h2>

          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${openFaq === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <span className={`arrow ${openFaq === index ? 'rotated' : ''}`}>➤</span>
                </button>
                <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                  <p className="para">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .mobile-app-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        .hero-content {
          text-align: center;
          color: white;
          z-index: 1;
          max-width: 800px;
          padding: 0 20px;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
          line-height: 1.2;
        }

        .hero-content p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
          line-height: 1.6;
        }

        .btn {
          padding: 15px 35px;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .btn-custom {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-custom:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-primary {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(102, 126, 234, 0.3);
        }

        .section-two {
          padding: 100px 0;
          background: #f8f9fa;
        }

        .gradient-text {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2.8rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .para {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .excel-img {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .full-container {
          background: white;
        }

        .card {
          border-radius: 20px;
          transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          background: white;
          border: none;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .card-body {
          padding: 2rem;
        }

        .img-card {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          margin: 0 auto;
          background: linear-gradient(45deg, #667eea15, #764ba215);
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .card:hover .img-card {
          background: linear-gradient(45deg, #667eea25, #764ba225);
          transform: scale(1.1);
        }

        .card-title {
          color: #2c3e50;
          font-size: 1.4rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .card-text {
          color: #6c757d;
          line-height: 1.7;
        }

        .industries {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea08, #764ba208);
        }

        .industries-heading {
          font-size: 3rem;
          color: #2c3e50;
          margin-bottom: 3rem;
          font-weight: 800;
        }

        .industry-card {
          background: white;
          border-radius: 25px;
          padding: 25px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
          border: none;
        }

        .industry-card:hover {
          transform: translateY(-20px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
        }

        /* FAQ Section Styles */
        .faq-section {
          padding: 100px 0;
          background: #f8f9fa;
        }

        .faq-heading {
          font-size: 3rem;
          color: #2c3e50;
          font-weight: 800;
          margin-bottom: 3rem;
        }

        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .faq-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          margin-bottom: 1rem;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          background: white;
        }

        .faq-question {
          width: 100%;
          padding: 25px 30px;
          background: white;
          border: none;
          text-align: left;
          font-size: 1.2rem;
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: #f8f9fa;
        }

        .faq-question.active {
          background: linear-gradient(45deg, #667eea10, #764ba210);
          color: #667eea;
        }

        .arrow {
          font-size: 1rem;
          transition: transform 0.3s ease;
          color: #667eea;
        }

        .arrow.rotated {
          transform: rotate(90deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          background: white;
        }

        .faq-answer.open {
          max-height: 200px;
          padding: 0 30px 25px 30px;
        }

        .faq-answer p {
          margin: 0;
          color: #6c757d;
          line-height: 1.7;
        }

        .container-fluid {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 15px;
        }

        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -15px;
        }

        .col-12, .col-sm-6, .col-md-4, .col-lg-6 {
          padding: 0 15px;
        }

        .col-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .col-lg-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .col-md-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .col-sm-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }

        .align-items-center {
          align-items: center;
        }

        .text-center {
          text-align: center;
        }

        .justify-content-center {
          justify-content: center;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .mb-5 {
          margin-bottom: 3rem;
        }

        .mb-md-0 {
          margin-bottom: 0;
        }

        .mt-3 {
          margin-top: 1rem;
        }

        .g-4 > * {
          padding: 1.5rem;
        }

        .h-100 {
          height: 100%;
        }

        .border-0 {
          border: none;
        }

        .fw-bold {
          font-weight: 700;
        }

        .img-fluid {
          max-width: 100%;
          height: auto;
        }

        .rounded {
          border-radius: 20px;
        }

        .shadow {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            font-size: 1.1rem;
          }

          .gradient-text {
            font-size: 2.2rem;
          }

          .industries-heading {
            font-size: 2.2rem;
          }

          .faq-heading {
            font-size: 2.2rem;
          }

          .col-md-6, .col-lg-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .col-md-4 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .col-sm-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .section-two {
            padding: 80px 0;
          }

          .industries {
            padding: 80px 0;
          }

          .faq-section {
            padding: 80px 0;
          }

          .mb-md-0 {
            margin-bottom: 1.5rem;
          }

          .faq-question {
            padding: 20px 25px;
            font-size: 1.1rem;
          }

          .faq-answer.open {
            padding: 0 25px 20px 25px;
          }
        }

        @media (min-width: 576px) {
          .col-sm-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media (min-width: 768px) {
          .col-md-4 {
            flex: 0 0 33.333333%;
            max-width: 33.333333%;
          }

          .col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }

          .mb-md-0 {
            margin-bottom: 0;
          }
        }

        @media (min-width: 992px) {
          .col-lg-6 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }

        @media (min-width: 1200px) {
          .hero-content h1 {
            font-size: 4rem;
          }

          .gradient-text {
            font-size: 3.2rem;
          }

          .industries-heading {
            font-size: 3.5rem;
          }

          .faq-heading {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAppPage;