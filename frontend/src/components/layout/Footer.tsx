/**
 * -----------------------------------------------------------------------------
 * Footer
 * -----------------------------------------------------------------------------
 *
 * Global website footer.
 *
 * Responsibilities:
 * • Company branding
 * • Footer navigation
 * • Contact information
 * • Social links
 * • Copyright
 *
 * -----------------------------------------------------------------------------
 */

import Link from "next/link";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { Container } from "@/components/common/Container";
import { Logo } from "@/components/common/Logo";

import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/* -------------------------------------------------------------------------- */
/* Social Icons                                                               */
/* -------------------------------------------------------------------------- */

const socialIcons = {
  facebook: FaFacebookF,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  x: FaXTwitter,
} as const;

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export function Footer() {
  const mainSections = navigationConfig.footer.sections.filter(
    (section) => section.title !== "Legal",
  );

  const legalSection = navigationConfig.footer.sections.find(
    (section) => section.title === "Legal",
  );

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-20">
          {/* ---------------------------------------------------------------- */}
          {/* Top Section                                                      */}
          {/* ---------------------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* -------------------------------------------------------------- */}
            {/* Brand                                                         */}
            {/* -------------------------------------------------------------- */}

            <div className="space-y-6">
              <Logo />

              <p className="text-sm leading-7 text-muted-foreground">
                {siteConfig.description}
              </p>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                  Connect With Us
                </h3>

                <div className="flex flex-wrap gap-3">
                  {Object.entries(siteConfig.social).map(([name, href]) => {
                    if (!href) return null;

                    const Icon = socialIcons[name as keyof typeof socialIcons];

                    if (!Icon) return null;

                    return (
                      <Link
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-lg
                          border
                          border-border
                          bg-secondary
                          transition-all
                          duration-300
                          hover:border-primary
                          hover:bg-primary
                          hover:text-primary-foreground
                        "
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <a
                    href={`mailto:${siteConfig.company.email}`}
                    className="transition-colors hover:text-primary"
                  >
                    {siteConfig.company.email}
                  </a>
                </p>

                {siteConfig.company.phone && (
                  <p>
                    <a
                      href={`tel:${siteConfig.company.phone.replace(/\s+/g, "")}`}
                      className="transition-colors hover:text-primary"
                    >
                      {siteConfig.company.phone}
                    </a>
                  </p>
                )}

                <p>
                  {siteConfig.company.city}, {siteConfig.company.country}
                </p>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Navigation                                                    */}
            {/* -------------------------------------------------------------- */}

            {mainSections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Bottom Bar                                                      */}
          {/* ---------------------------------------------------------------- */}

          <div className="mt-16 border-t border-border pt-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <p className="text-sm text-muted-foreground">
                {siteConfig.copyright}
              </p>

              <div className="flex flex-wrap items-center gap-6">
                {legalSection?.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
