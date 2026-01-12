import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  X as XIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
  const navigationColumns = [
    {
      heading: "Company",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Career", href: "/careers" },
        { name: "Customer-Support", href: "/contacts/customer-support" },
      ],
    },
    {
      heading: "Resources",
      links: [
        { name: "Blogs", href: "/resources/blogs" },
        { name: "FAQs", href: "/resources/faqs" },
        { name: "Industry Reports", href: "/resources/industry-reports" },
        { name: "Case Studies", href: "/resources/case-studies" },
        { name: "Market Analysis", href: "/resources/market-analysis" },
      ],
    },
    {
      heading: "Services",
      links: [
        { name: "AI-Models", href: "/services/ai-models" },
        { name: "Website Development", href: "/services/website-development" },
        { name: "Android/IOS Development", href: "/services/app-development" },
        { name: "Game Development", href: "/services/game-development" },
        { name: "Graphics Design", href: "/services/graphics-design" },
        { name: "UI/UX Design", href: "/services/uiux-design" },
        { name: "Video Editing", href: "/services/video-editing" },
        { name: "Content-Writing", href: "/services/content-writing" },
        { name: "SEO Optimisation", href: "/services/seo-optimisation" },
        { name: "Cyber-Security", href: "/services/cyber-security" },
      ],
    },

    {
      heading: "Industries",
      links: [
        { name: "IT Technology", href: "/industry/it-technology" },
        { name: "Medical & Healthcare", href: "/industry/medical&healthcare" },
        { name: "Finance & Banking", href: "/industry/finance&banking" },
        { name: "Education", href: "/industry/education" },
        { name: "Manufacturing & Telecommunication", href: "/industry/manufacturing&telecommunication" },
        { name: "Travel & Hospitality", href: "/industry/travel&hospitality" },
        { name: "Media & Entertainment", href: "/industry/media&entertainment" },
        { name: "Gaming", href: "/industry/gaming" },
        { name: "IOT- Internet Of Things", href: "/industry/internetOfThings" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { name: "Owner Info", href: "/legal/owner" },
        { name: "Privacy Policy", href: "/legal/privacypolicy" },
        { name: "Terms & Conditions", href: "/legal/terms&conditions" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61578076003511", label: "Facebook" },
    { icon: X, href: "https://x.com/webs_terwork?t=cTepD5HHj-Y71Mnl61bFBg&s=08", label: "X" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/hussnain-b00b06373", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/webs.terwork/", label: "Instagram" },
    { icon: FaWhatsapp, href: "https://wa.me/qr/IYPOXSLB77ADO1", label: "Whatsapp" }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "info@websterwork.com",
      href: "mailto:info@websterwork.com",
    },
    { icon: Phone, text: "+92 313-4385885", href: "tel:+923134385885" },
    { icon: MapPin, text: "PAKISTAN", href: "https://maps.app.goo.gl/SnCvxeUT6uRhHeEL6" },
  ];

  return (
    <footer className="bg-white dark:bg-black text-white">
      <div className="relative w-full h-max">
        <div id="map" className="w-full h-max">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.5580093445!2d74.16958137351305!3d31.48312759092795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1754223287642!5m2!1sen!2s"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Dark mode overlay */}
        <div className="absolute inset-0 bg-black opacity-30 hidden dark:block pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col items-center gap-6">
            <div className="w-max h-max bg-gradient-to-br from-purple-500 via-zinc-200 dark:via-zinc-800 to-purple-950 rounded-lg flex items-center justify-center transform rotate-45 hover:rotate-0 transition-transform duration-300">
              <Link href="/">
                <Image
                  src="/w_dark.png"
                  width={120}
                  height={40}
                  alt="Logo light"
                  className="block dark:hidden"
                />
                <Image
                  src="/w_white.png"
                  width={120}
                  height={40}
                  alt="Logo dark"
                  className="hidden dark:block"
                />
              </Link>
            </div>

            <div className="flex flex-col">
              <h3 className="text-black dark:text-white font-semibold mb-3">Connect With Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-purple-500 group-hover:text-white transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
            {navigationColumns.map((column) => (
              <div key={column.heading} className="flex flex-col">
                <h3 className="text-black dark:text-white font-semibold mb-4">
                  {column.heading}
                </h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-black dark:text-white text-sm font-medium relative group transition-colors duration-300 hover:text-purple-600"
                      >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              {contactInfo.map((contact, index) => (
                <Link
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-2 text-black dark:text-white hover:text-purple-600 transition-colors duration-300 group"
                >
                  <contact.icon className="w-4 h-4 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" />
                  <span className="text-sm">{contact.text}</span>
                </Link>
              ))}
            </div>
            <div className="text-black dark:text-white text-sm">
              © {new Date().getFullYear()} Websterwork. Operated by Muhammad Hussnain.
              <Link href="/legal/owner" className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
                Verification
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
