// src/components/sections/ContactPageSections/ContactForm.tsx
"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/animations/FadeIn";
import { BorderBeam } from "@/components/effects/BorderBeam";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Globe 
} from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaInstagram, 
  FaXTwitter, 
  FaWhatsapp 
} from "react-icons/fa6";

const socialIcons: Record<string, React.ReactNode> = {
  github: <FaGithub className="w-5 h-5" />,
  linkedin: <FaLinkedin className="w-5 h-5" />,
  facebook: <FaFacebook className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  x: <FaXTwitter className="w-5 h-5" />,
  whatsapp: <FaWhatsapp className="w-5 h-5" />,
};

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "AI Models",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate inquiry submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  const activeSocials = Object.entries(siteConfig.social).filter(
    ([_, url]) => url && url.trim() !== ""
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
      {/* Left Column: Contact Channels & Socials */}
      <div className="lg:col-span-5 space-y-8">
        <FadeIn delay={0.3}>
          <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10 space-y-8 h-full flex flex-col justify-between overflow-hidden">
            <BorderBeam size={150} duration={6} colorFrom="#9810fa" colorTo="transparent" />

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-primary">
                  Contact Channels
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Get in Touch
                </h3>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.tagline} — Connect with our offices or drop us an email anytime.
                </p>
              </div>

              {/* Direct Contact Items */}
              <div className="space-y-4 pt-4 border-t border-border/60">
                <a
                  href={`mailto:${siteConfig.company.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/80 hover:border-primary/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Email Us</span>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {siteConfig.company.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.company.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/80 hover:border-primary/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Call / WhatsApp</span>
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {siteConfig.company.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/80">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Location</span>
                    <span className="font-semibold text-foreground">
                      {siteConfig.company.city}, {siteConfig.company.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="space-y-4 pt-6 border-t border-border/60">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Connected Networks
              </span>
              <div className="flex flex-wrap gap-3">
                {activeSocials.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-sm"
                  >
                    {socialIcons[platform] || <Globe className="w-5 h-5" />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Right Column: Inquiry Form */}
      <div className="lg:col-span-7">
        <FadeIn delay={0.4}>
          <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10 shadow-xl overflow-hidden">
            <BorderBeam size={200} duration={8} colorFrom="#9810fa" colorTo="transparent" />

            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Message Received!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out, <span className="font-semibold text-foreground">{formData.name}</span>. Our technical team will review your inquiry and get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", service: "AI Models", message: "" });
                  }}
                  className="px-6 py-3 rounded-xl bg-secondary text-foreground font-semibold text-sm hover:bg-secondary/80 transition-all border border-border"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-primary">
                    Project Consultation
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    Send Us a Query
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the details below and we'll respond within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Your Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Muhammad Hussnain"
                      className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="info@websterwork.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-all text-sm text-foreground"
                  >
                    <option value="AI Models">AI Model Development & Automation</option>
                    <option value="Website Development">Website & SaaS Development</option>
                    <option value="Mobile Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX & Product Design</option>
                    <option value="Cyber Security">Cyber Security Audit</option>
                    <option value="SEO Optimization">SEO Optimization & Content</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Project Scope & Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your technical requirements, goals, or timeline..."
                    className="w-full px-4 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Message</span>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}