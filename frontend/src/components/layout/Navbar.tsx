"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronRight, LogIn } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // GSAP Scroll Shrink & Hide/Show effect
  useEffect(() => {
    if (!navbarRef.current) return;
    const navbar = navbarRef.current;

    const ctx = gsap.context(() => {
      gsap.to(navbar, {
        height: "64px",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "100px top",
          scrub: 0.5,
        },
      });

      const hideShowAnim = gsap.to(navbar, {
        yPercent: -100,
        paused: true,
        duration: 0.2,
        ease: "power2.inOut",
      });

      let lastScroll = 0;

      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (isOpen) return;

          const currentScroll = self.scroll();

          if (currentScroll > lastScroll && currentScroll > 80) {
            hideShowAnim.play();
          } else if (currentScroll < lastScroll) {
            hideShowAnim.reverse();
          }

          lastScroll = currentScroll;
        },
      });
    }, navbarRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      <header
        ref={navbarRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full h-20",
          "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm",
          "will-change-transform transition-colors duration-300 relative",
        )}
      >
        {/* Lightweight pure CSS laser glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 pointer-events-none" />

        <Container className="h-full">
          <nav className="flex h-full items-center justify-between">
            {/* LOGO SECTION */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 group tracking-wider font-extrabold text-lg sm:text-xl text-foreground"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary transition-all overflow-hidden">
                <span className="font-mono text-primary font-black text-base">W</span>
              </div>

              <span className="font-mono">
                WEBSTER
                <span className="text-primary drop-shadow-[0_0_10px_var(--primary)]">
                  WORK
                </span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {navigationConfig.main.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                const isAnotherHovered = hoveredIdx !== null && !isHovered;

                return (
                  <div
                    key={item.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    style={{
                      opacity: isAnotherHovered ? 0.4 : 1,
                      filter: isAnotherHovered ? "blur(1px)" : "blur(0px)",
                      transform: isHovered ? "scale(1.04)" : "scale(1)",
                    }}
                    className="transition-all duration-200"
                  >
                    <Link
                      href={item.href}
                      className="group relative rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-primary/10 flex items-center gap-2 border border-transparent hover:border-primary/20"
                    >
                      <item.icon
                        size={16}
                        className="text-muted-foreground group-hover:text-primary transition-colors"
                      />
                      <span>{item.title}</span>

                      {isHovered && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_var(--primary)] transition-all" />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* RIGHT ACTION MENU */}
            <div className="hidden items-center gap-4 lg:flex">
              <ThemeToggle />
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Log in
              </Link>
              <Link
                href="/contact"
                className={cn(
                  "relative group overflow-hidden rounded-md px-5 py-2 text-sm font-bold tracking-wide transition-all duration-300",
                  "bg-primary text-primary-foreground border border-primary/80",
                  "hover:shadow-[0_0_20px_var(--primary)] hover:border-primary",
                )}
              >
                <span className="absolute inset-0 bg-linear-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get Started</span>
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </Link>
            </div>

            {/* MOBILE TRIGGER */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? (
                  <X size={24} className="text-primary" />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 bg-background/95 backdrop-blur-2xl border-b border-border/80 p-6 overflow-y-auto lg:hidden flex flex-col justify-between transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navigationConfig.main.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-md p-3 text-base font-medium text-muted-foreground hover:bg-primary/10 hover:text-foreground border border-transparent hover:border-primary/20 transition-all"
                >
                  <item.icon size={20} className="text-primary" />
                  <span>{item.title}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* MOBILE ACTION BUTTONS (LOG IN + GET STARTED) */}
          <div className="mt-6 pt-6 border-t border-border/60 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center rounded-md border border-border bg-secondary/50 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} className="text-primary" />
              <span>Log in</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center rounded-md bg-primary py-3 text-sm font-bold text-primary-foreground shadow-[0_0_15px_var(--primary)] flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}