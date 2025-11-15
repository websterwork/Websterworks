"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faRocket,
  faEye,
  faHeart,
  faUsers,
  faTrophy,
  faGlobe,
  faLightbulb,
  faHandshake,
  faChartLine,
  faStar,
} from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function AboutPage() {
  const router = useRouter()

  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    experience: 0,
    awards: 0,
  })

  useEffect(() => {
    const animateCounters = () => {
      const targets = { clients: 500, projects: 1200, experience: 8, awards: 25 }
      const duration = 2000
      const steps = 60
      const increment = duration / steps

      let currentStep = 0
      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounters({
          clients: Math.floor(targets.clients * progress),
          projects: Math.floor(targets.projects * progress),
          experience: Math.floor(targets.experience * progress),
          awards: Math.floor(targets.awards * progress),
        })

        if (currentStep >= steps) {
          clearInterval(timer)
          setCounters(targets)
        }
      }, increment)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    })

    const statsSection = document.getElementById("stats-section")
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => observer.disconnect()
  }, [])

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Visionary leader with 15+ years in tech innovation",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Technical expert specializing in scalable solutions",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Creative director with passion for user experience",
    },
  ]

  const values = [
    {
      icon: faLightbulb,
      title: "Innovation",
      description:
        "We constantly push boundaries and embrace cutting-edge technologies to deliver exceptional solutions.",
    },
    {
      icon: faHandshake,
      title: "Integrity",
      description: "We build trust through transparency, honesty, and ethical practices in all our interactions.",
    },
    {
      icon: faUsers,
      title: "Collaboration",
      description: "We believe in the power of teamwork and foster an environment where everyone&apos;s voice matters.",
    },
    {
      icon: faStar,
      title: "Excellence",
      description: "We strive for perfection in every project, delivering quality that exceeds expectations.",
    },
  ]

  const handleGetInTouch = () => {
    router.push("/contacts")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br via-blue-700 to-blue-800 text-white py-24 px-4">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/ai-generated-8540913_1280.jpg"
            alt="Background"
            fill
            className="object-cover"
            quality={75}
          />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-8">
            <FontAwesomeIcon icon={faRocket} className="text-3xl text-white w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About Our <span className="text-orange-400">Company</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We&apos;re passionate innovators dedicated to transforming ideas into digital reality. Our mission is to empower
            businesses through cutting-edge technology solutions.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Mission */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <FontAwesomeIcon
                  icon={faRocket}
                  className="text-2xl text-blue-600 group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver innovative technology solutions that drive business growth and create meaningful impact in
                the digital world. We strive to exceed expectations through creativity, expertise, and dedication.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-2xl text-orange-600 group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading technology partner that businesses trust to navigate the digital transformation
                journey. We envision a future where technology seamlessly enhances human potential.
              </p>
            </div>

            {/* Values */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-2xl text-green-600 group-hover:text-white transition-colors duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Built on integrity, innovation, and collaboration. We believe in transparent communication, continuous
                learning, and creating solutions that make a positive difference in people&apos;s lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 px-4 bg-blue-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
            <p className="text-blue-100 text-xl">Trusted by businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faUsers} className="text-2xl text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.clients}+</div>
              <p className="text-blue-100">Happy Clients</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.projects}+</div>
              <p className="text-blue-100">Projects Completed</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faGlobe} className="text-2xl text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.experience}+</div>
              <p className="text-blue-100">Years Experience</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <FontAwesomeIcon icon={faTrophy} className="text-2xl text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{counters.awards}+</div>
              <p className="text-blue-100">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              The principles that guide our decisions and shape our culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 h-full">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6">
                    <FontAwesomeIcon icon={value.icon} className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Talented individuals working together to create exceptional solutions
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={400}
                      height={256}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with innovative technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetInTouch}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              <FontAwesomeIcon icon={faHandshake} className="mr-2" />
              Get In Touch
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300">
              View Our Work
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}