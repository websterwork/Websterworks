"use client";

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
   * Resize Observer
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
   * Dynamic Item Density Based on Screen Width
   * ---------------------------------------------------------------------------
   */
  const items = useMemo(() => {
    const allItems = technologies.flatMap((group) => group.items);

    if (size.width === 0) return allItems;

    // Mobile screens (< 640px)
    if (size.width < 640) {
      return allItems.slice(0, 12);
    }
    // Tablet screens (< 1024px)
    if (size.width < 1024) {
      return allItems.slice(0, 22);
    }

    // Desktop
    return allItems;
  }, [size.width]);

  /**
   * ---------------------------------------------------------------------------
   * Interactions & Physics
   * ---------------------------------------------------------------------------
   */
  const interaction = useTechnologyInteraction({
    containerRef,
    width: size.width,
    height: size.height,
  });

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
        "relative w-full overflow-hidden select-none",
        "h-[400px] sm:h-[550px] md:h-[650px] lg:h-[750px]",
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
