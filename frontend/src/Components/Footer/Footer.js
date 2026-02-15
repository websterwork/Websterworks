"use client";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  X as XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion,AnimatePresence } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationColumns = [
    {
      heading: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Our Process", href: "/process" },
        { name: "Careers", href: "/careers" },
        { name: "Customer Support", href: "/contacts/customer-support" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Featured", href: "/resources/featured" },
        { name: "Blogs", href: "/resources/blog" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Guides", href: "/resources/guides" },
        { name: "Topics", href: "/resources/topics" },
        { name: "Webinars", href: "/resources/webinars" },
        { name: "White Papers", href: "/resources/whitepapers" },
        { name: "Tools", href: "/resources/tools" },
        { name: "FAQs", href: "/resources/faqs" },
      ],
    },
    {
      heading: "Services",
      links: [
        { name: "AI Models", href: "/services/ai-models" },
        { name: "Website Development", href: "/services/website-development" },
        { name: "Mobile Development", href: "/services/app-development" },
        { name: "Game Development", href: "/services/game-development" },
        { name: "Graphics Design", href: "/services/graphics-design" },
        { name: "UI/UX Design", href: "/services/uiux-design" },
        { name: "Video Editing", href: "/services/video-editing" },
        { name: "Content Writing", href: "/services/content-writing" },
        { name: "SEO Optimization", href: "/services/seo-optimisation" },
        { name: "Cyber Security", href: "/services/cyber-security" },
      ],
    },
    {
      heading: "Industries",
      links: [
        { name: "IT & Technology", href: "/industry/it-technology" },
        { name: "Healthcare", href: "/industry/medical-healthcare" },
        { name: "Finance & Banking", href: "/industry/finance-banking" },
        { name: "Education", href: "/industry/education" },
        { name: "Manufacturing", href: "/industry/manufacturing-telecommunication" },
        { name: "Travel & Hospitality", href: "/industry/travel-hospitality" },
        { name: "Media & Entertainment", href: "/industry/media-entertainment" },
        { name: "Gaming", href: "/industry/gaming" },
        { name: "IoT", href: "/industry/internet-of-things" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { name: "Owner Info", href: "/legal/owner" },
        { name: "Privacy Policy", href: "/legal/privacy-policy" },
        { name: "Terms & Conditions", href: "/legal/terms-conditions" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/profile.php?id=61578076003511",
      label: "Facebook",
      color: "hover:bg-[#1877f2]"
    },
    {
      icon: FaXTwitter,
      href: "https://x.com/webs_terwork",
      label: "Twitter",
      color: "hover:bg-[#000000]"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/company/websterworks",
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]"
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/webs.terwork/",
      label: "Instagram",
      color: "hover:bg-[#E4405F]"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/923134385885?text=Hello%20Websterwork%2C%20I%20need%20assistance",
      label: "WhatsApp",
      color: "hover:bg-[#25D366]"
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "info@websterwork.com",
      href: "mailto:info@websterwork.com",
    },
    { icon: Phone, text: "+92 313 4385885", href: "tel:+923134385885" },
    { icon: MapPin, text: "Lahore, Pakistan", href: "https://maps.app.goo.gl/SnCvxeUT6uRhHeEL6" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        {/* Map Section with Overlay */}
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 z-10 pointer-events-none" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.5580093445!2d74.16958137351305!3d31.48312759092795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1754223287642!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ filter: "grayscale(20%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent z-20 pointer-events-none" />

          {/* Map Overlay Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center"
          >
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-xl border border-white/20 dark:border-gray-800">
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium">Headquarters: Lahore, Pakistan</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row justify-between gap-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Link href="/">
                    <Image
                      src="/w_white.png"
                      width={32}
                      height={32}
                      alt="Websterwork"
                      className="w-8 h-8"
                    />
                  </Link>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Websterwork
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Transforming ideas into digital reality. We deliver enterprise-grade solutions with transparency and excellence.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Connect With Us
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={`w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${social.color} group transition-all duration-300`}
                      >
                        <social.icon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 flex-1">
              {navigationColumns.map((column, colIndex) => (
                <motion.div
                  key={column.heading}
                  variants={itemVariants}
                  custom={colIndex}
                  className="flex flex-col"
                >
                  <h3 className="text-gray-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">
                    {column.heading}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: linkIndex * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors duration-200 inline-block relative group"
                        >
                          {link.name}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={contact.href}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 group"
                    >
                      <contact.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 dark:text-gray-500 dark:group-hover:text-blue-400" />
                      <span className="text-sm">{contact.text}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-right">
                <span>© {new Date().getFullYear()} Websterwork. </span>
                <span>Operated by </span>
                <Link
                  href="/legal/owner"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Muhammad Hussnain
                </Link>
                <span className="mx-2">•</span>
                <Link
                  href="/legal/owner"
                  className="text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Verification
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;