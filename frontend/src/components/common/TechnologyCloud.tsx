"use client";

/**
 * -----------------------------------------------------------------------------
 * Technology Cloud
 * -----------------------------------------------------------------------------
 *
 * Floating technology simulation.
 *
 * Responsibilities
 * • Measure container
 * • Particle engine
 * • Interaction engine
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef, useState } from "react";

import { technologies } from "@/data/technologies";

import { useTechnologyCloud } from "@/hooks/useTechnologyCloud";
import { useTechnologyInteraction } from "@/hooks/useTechnologyInteraction";

import { TechnologyParticle } from "./TechnologyParticles";

import { cn } from "@/lib/utils";

interface TechnologyCloudProps {
  className?: string;
}

export function TechnologyCloud({ className }: TechnologyCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  /**
   * ---------------------------------------------------------------------------
   * Resize
   * ---------------------------------------------------------------------------
   */

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      if (!containerRef.current) return;

      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };

    resize();

    const observer = new ResizeObserver(resize);

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Flatten technologies
   * ---------------------------------------------------------------------------
   */

  const items = useMemo(() => technologies.flatMap((group) => group.items), []);

  /**
   * ---------------------------------------------------------------------------
   * Interaction
   * ---------------------------------------------------------------------------
   */

  const interaction = useTechnologyInteraction({
    containerRef,
    width: size.width,
    height: size.height,
  });

  /**
   * ---------------------------------------------------------------------------
   * Physics
   * ---------------------------------------------------------------------------
   */

  const particles = useTechnologyCloud({
    width: size.width,
    height: size.height,
    items,

    interaction,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative",
        "h-[700px]",
        "w-full",
        "overflow-hidden",
        className,
      )}
    >
      {particles.map((particle) => (
        <TechnologyParticle
          key={particle.id}
          name={particle.name}
          icon={particle.icon}
          x={particle.x}
          y={particle.y}
          rotation={particle.rotation}
          scale={particle.scale}
        />
      ))}
    </div>
  );
}
