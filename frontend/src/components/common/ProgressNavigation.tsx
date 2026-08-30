"use client";

/**
 * -----------------------------------------------------------------------------
 * Progress Navigation
 * -----------------------------------------------------------------------------
 *
 * Generic vertical section navigation.
 *
 * Features
 * • Active section highlight
 * • Smooth navigation
 * • Reusable
 *
 * -----------------------------------------------------------------------------
 */

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface ProgressNavigationItem {
  id: string;

  title: string;
}

interface ProgressNavigationProps {
  sections: ProgressNavigationItem[];

  activeSection: string;

  onNavigate: (id: string) => void;

  className?: string;
}

export function ProgressNavigation({
  sections,
  activeSection,
  onNavigate,
  className,
}: ProgressNavigationProps) {
  return (
    <aside
      className={cn(
        "fixed right-10 top-1/2 z-50 hidden -translate-y-1/2 xl:flex",
        className,
      )}
    >
      <nav>
        <ul className="space-y-8">
          {sections.map((section) => {
            const active = activeSection === section.id;

            return (
              <li key={section.id}>
                <button
                  onClick={() => onNavigate(section.id)}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                  "
                >
                  {/* Indicator */}

                  <motion.div
                    animate={{
                      width: active ? 16 : 10,
                      height: active ? 16 : 10,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className={cn(
                      "rounded-full border transition-all",

                      active
                        ? "border-primary bg-primary shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                        : "border-border bg-muted",
                    )}
                  />

                  {/* Text */}

                  <span
                    className={cn(
                      "text-sm transition-all duration-300",

                      active
                        ? "translate-x-0 font-semibold text-primary"
                        : "translate-x-2 text-muted-foreground group-hover:translate-x-0 group-hover:text-foreground",
                    )}
                  >
                    {section.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
