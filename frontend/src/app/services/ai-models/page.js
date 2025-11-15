"use client";
import React from 'react';
import Image from 'next/image';

const AIServicesPage = () => {
  return (
    <div className="ai-services-page">
      {/* Hero Section */}
      <section className="hero">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="hero-video"
        >
          <source src="/two.mp4" type="video/mp4" />
        </video>

        <div className="hero-content">
          <h1>AI Development Services</h1>
          <p>
            Explore limitless possibilities with our AI development services. Our AI solutions are here to drive
            innovation, efficiency, and success in your business endeavors.
          </p>
          <button className="btn btn-custom">Let&apos;s Connect</button>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="section-two">
        <div className="container-fluid">
          <div className="row align-items-center">
            {/* Left Column (Content) */}
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <h2 className="gradient-text mb-4">
                Excel in Emerging Tech <br /> with Our AI Services
              </h2>
              <p className="para">
                Embark on Your AI Journey with Xeven Solutions, Your Premier AI Software Development Company.
                We provide comprehensive AI development services, from ideation to seamless integration into
                your infrastructure. Our expertise extends to AI in healthcare and refining foundational models
                like GPT tailored to your business needs.
              </p>
              <p className="para">
                With our holistic AI as a service, we don&apos;t just create AI solutions;
                we lay the foundation for your business&apos;s sustainable success in the age of AI.
                Whether it&apos;s automating tasks or enhancing customer experiences we&apos;re here to empower your
                journey.
              </p>
              <button className="btn btn-primary mt-3">Schedule a Demo</button>
            </div>

            {/* Right Column (Image) */}
            <div className="excel-img col-lg-6 col-md-6 col-12 text-center">
              <Image
                src="/Option.jpg"
                alt="AI Services"
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
                Experience the Future of Enterprise Solutions with Our AI <br /> Development Services
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
                        src="/AI-chatbot-development (1).png"
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
                        src="/AI-chatbot-development (1).png"
                        alt="AI Chatbot Development"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">AI Chatbot Development</h5>
                    <p className="card-text">
                      Step into the future of customer engagement with our AI Development Solutions.
                      Intelligent chatbots that enhance engagement, streamline operations, and deliver
                      personalized experiences.
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
                        src="/NLP.png"
                        alt="Natural Language Processing"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">NLP</h5>
                    <p className="card-text">
                      NLP solutions help machines understand human language better,
                      making communication and decision-making more efficient across industries.
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
                        src="/Predictive-Analytics.png"
                        alt="Predictive Analytics"
                        width={80}
                        height={80}
                        className="img-fluid"
                      />
                    </div>
                    <h5 className="card-title fw-bold mb-3">Predictive Analytics</h5>
                    <p className="card-text">
                      Utilizing advanced machine learning algorithms, predictive analysis ensures accurate
                      forecasts, helping organizations anticipate and plan for future scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
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
        }

        .hero-content p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }

        .btn {
          padding: 12px 30px;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-custom {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-primary {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        .section-two {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .gradient-text {
          background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2.5rem;
          font-weight: 700;
        }

        .para {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .excel-img img {
          border-radius: 15px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .full-container {
          background: white;
        }

        .card {
          border-radius: 15px;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          background: white;
        }

        .card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .img-card {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          margin: 0 auto;
          background: linear-gradient(45deg, #667eea20, #764ba220);
          border-radius: 50%;
        }

        .card-title {
          color: #2c3e50;
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }

        .industries {
          padding: 80px 0;
          background: linear-gradient(135deg, #667eea10, #764ba210);
        }

        .industries-heading {
          font-size: 2.8rem;
          color: #2c3e50;
          margin-bottom: 3rem;
        }

        .industry-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .industry-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
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
          border-radius: 15px;
        }

        .shadow {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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
            font-size: 2rem;
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
            padding: 60px 0;
          }

          .industries {
            padding: 60px 0;
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
      `}</style>
    </div>
  );
};

export default AIServicesPage;