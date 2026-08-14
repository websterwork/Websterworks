"use client";

/**
 * -----------------------------------------------------------------------------
 * Glass Card
 * -----------------------------------------------------------------------------
 *
 * Premium glassmorphism card.
 *
 * Built on top of the generic Glass component.
 *
 * Features
 * • Composes Glass
 * • Header
 * • Description
 * • Footer
 * • Hover animation
 * • Configurable padding
 * • ClassName support
 *
 * -----------------------------------------------------------------------------
 */

import React from "react";
import type { HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

import { Glass } from "./Glass";

/* -------------------------------------------------------------------------- */
/* Props                                                                      */
/* -------------------------------------------------------------------------- */

export interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "title"> {
  /**
   * Card title.
   */
  title?: React.ReactNode;

  /**
   * Card description.
   */
  description?: React.ReactNode;

  /**
   * Footer content.
   */
  footer?: React.ReactNode;

  /**
   * Card content.
   */
  children?: React.ReactNode;

  /**
   * Inner padding.
   */
  padding?: string;

  /**
   * Enable hover animation.
   */
  hover?: boolean;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function GlassCard({
  title,
  description,
  footer,
  children,

  padding = "p-6",

  hover = true,

  className,

  ...props
}: GlassCardProps) {
  return (
    <Glass
      hover={hover}
      className={cn("flex h-full flex-col", className)}
      {...props}
    >
      <div className={padding}>
        {(title || description) && (
          <header className="mb-6">
            {title && (
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            )}

            {description && (
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </header>
        )}

        {children && <div className="flex-1">{children}</div>}

        {footer && (
          <footer className="mt-6 border-t border-border/50 pt-6">
            {footer}
          </footer>
        )}
      </div>
    </Glass>
  );
}
