"use client";

/**
 * -----------------------------------------------------------------------------
 * Service Card
 * -----------------------------------------------------------------------------
 *
 * Generic reusable card.
 *
 * -----------------------------------------------------------------------------
 */

import { ReactNode } from "react";

import { motion } from "motion/react";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Icon, type IconName } from "@/components/icons";

import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title?: string;

  subtitle?: string;

  description?: string;

  badge?: string;

  image?: string;

  imageAlt?: string;

  icon?: IconName;

  footer?: ReactNode;

  children?: ReactNode;

  className?: string;
}

export function ServiceCard({
  title,
  subtitle,
  description,
  badge,
  image,
  imageAlt,
  icon,
  footer,
  children,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className={cn("shrink-0", className)}
    >
      <Card
        className={cn(
          "group overflow-hidden",
          "border-border",
          "bg-card/70 backdrop-blur-xl",
          "transition-all duration-300",
          "hover:border-primary",
          "hover:shadow-[0_0_30px_rgba(152,16,250,0.25)]",
        )}
      >
        {/* Image */}

        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image}
              alt={imageAlt ?? title ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-col p-6">
          {/* Badge */}

          {badge && <Badge className="mb-4 w-fit">{badge}</Badge>}

          {/* Icon */}

          {icon && (
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.1,
              }}
            >
              <Icon name={icon} size={40} className="mb-4 text-primary" />
            </motion.div>
          )}

          {/* Title */}

          {title && <h3 className="text-lg font-semibold">{title}</h3>}

          {/* Subtitle */}

          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}

          {/* Description */}

          {description && (
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {description}
            </p>
          )}

          {/* Custom Content */}

          {children}

          {/* Footer */}

          {footer && <div className="mt-6">{footer}</div>}
        </div>
      </Card>
    </motion.div>
  );
}
