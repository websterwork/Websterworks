/**
 * -----------------------------------------------------------------------------
 * Container Component
 * -----------------------------------------------------------------------------
 *
 * Reusable layout wrapper.
 *
 * Responsibilities:
 * • Control maximum content width
 * • Provide consistent horizontal spacing
 * • Support custom className overrides
 *
 * Used by:
 * • Navbar
 * • Footer
 * • Sections
 * • Pages
 *
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ContainerProps {
  children: ReactNode;

  className?: string;
}

/* -------------------------------------------------------------------------- */
/* Container                                                                   */
/* -------------------------------------------------------------------------- */

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full  px-[5%]", className)}
    >
      {children}
    </div>
  );
}
