"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { ArrowUpRight, X, Layers, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Aurora, Spotlight, GradientBlur } from "@/components/effects";

const projects = [
  {
    id: "websterwork-mart",
    title: "Websterwork Mart",
    category: "E-Commerce Architecture",
    year: "2026",
    accentColor: "#9810fa",
    image: "/images/portfolio/mart-preview.webp",
    description:
      "A modern e-commerce platform integrated with Next.js 15, Zod validation schemas, Next-Auth, and instant checkout capabilities.",
    tags: ["Next.js 15", "Tailwind CSS", "Zod", "Stripe"],
    metrics: "+140% Conversion Lift",
    href: "/work/websterwork-mart",
  },
  {
    id: "msquare-skool",
    title: "M² Skool Institute",
    category: "EdTech Portal",
    year: "2026",
    accentColor: "#b042ff",
    image: "/images/portfolio/msquare-preview.webp",
    description:
      "Interactive educational portal built with custom middleware routing and real-time student analytics.",
    tags: ["React", "Next-Auth", "MongoDB", "Framer Motion"],
    metrics: "10k+ Active Students",
    href: "/work/msquare-skool",
  },
  {
    id: "cyber-ai-core",
    title: "Cyber AI Core",
    category: "3D WebGL Engine",
    year: "2026",
    accentColor: "#9810fa",
    image: "/images/portfolio/aicore-preview.webp",
    description:
      "A real-time interactive 3D sci-fi reactor core rendered at 60 FPS using React Three Fiber.",
    tags: ["Three.js", "React Three Fiber", "GSAP", "Blender"],
    metrics: "60 FPS Interactive",
    href: "/work/cyber-ai-core",
  },
  {
    id: "vector-node-brand",
    title: "Websterwork Identity",
    category: "Brand Vector System",
    year: "2026",
    accentColor: "#b042ff",
    image: "/images/portfolio/brand-preview.webp",
    description:
      "Vector design ecosystem centered around interconnected geometric line nodes and dynamic high-contrast UI branding.",
    tags: ["Vector Graphic", "Logo Spec", "Framer"],
    metrics: "Full Spec System",
    href: "/work/websterwork-brand",
  },
];

function OrbitalRing({
  onSelectProject,
  activeId,
  isMobile,
}: {
  onSelectProject: (p: (typeof projects)[0]) => void;
  activeId: string | null;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = isMobile ? 3.2 : 4.6;

  useFrame((_, delta) => {
    if (groupRef.current && !activeId) {
      groupRef.current.rotation.y += delta * (isMobile ? 0.22 : 0.18);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group key={project.id} position={[x, 0, z]}>
            <Float
              speed={1.8}
              rotationIntensity={0.1}
              floatIntensity={isMobile ? 0.15 : 0.3}
            >
              <Html
                transform
                sprite
                distanceFactor={isMobile ? 4.2 : 5.5}
                center
                zIndexRange={[100, 0]}
              >
                <div
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => !isMobile && onSelectProject(project)}
                  className="group relative h-[175px] w-36 sm:h-[218px] sm:w-48 cursor-pointer rounded-2xl border border-primary/20 bg-background/90 p-2.5 sm:p-3 backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-[0_0_30px_rgba(152,16,250,0.35)] active:scale-95"
                >
                  <div className="relative h-20 sm:h-28 w-full overflow-hidden rounded-xl border border-border/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 144px, 192px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="mt-2 sm:mt-2.5 flex flex-col">
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-primary truncate">
                      {project.category}
                    </span>
                    <h4 className="mt-0.5 truncate text-[11px] sm:text-xs font-black text-foreground group-hover:text-primary">
                      {project.title}
                    </h4>
                    <p className="mt-0.5 font-mono text-[8px] sm:text-[9px] text-muted-foreground">
                      {project.year}
                    </p>
                  </div>
                </div>
              </Html>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* Shared Hero Background Stack */}
      <Aurora />
      <Spotlight />
      <GradientBlur />

      {/* Header */}
      <div className="relative z-10 mx-auto px-4 text-center max-w-4xl">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-primary">
          <Sparkles className="size-3 sm:size-3.5" /> Selected Works
        </span>
        <h2 className="mt-1.5 text-2xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Orbital Void Stage
        </h2>
        <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
          {isMobile
            ? "Tap any project node to open full specification modal"
            : "Hover or tap any project node to open full specification modal"}
        </p>
      </div>

      {/* 3D Canvas Container */}
      <div className="relative z-10 h-[55vh] sm:h-[65vh] md:h-[75vh] w-full touch-none">
        <Canvas
          camera={{
            position: [0, 1.2, isMobile ? 7.2 : 8.2],
            fov: isMobile ? 50 : 42,
          }}
        >
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#9810fa" />
          <OrbitalRing
            onSelectProject={setSelectedProject}
            activeId={selectedProject?.id || null}
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      {/* Specification Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-3 sm:p-6 md:p-8 backdrop-blur-3xl overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl my-auto max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-primary/30 bg-card p-5 sm:p-8 md:p-10 shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 rounded-full border border-border bg-muted p-2 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Close modal"
              >
                <X className="size-4 sm:size-5" />
              </button>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 sm:px-3.5 sm:py-1 font-mono text-[10px] sm:text-xs font-bold text-primary">
                        {selectedProject.category}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                        {selectedProject.year}
                      </span>
                    </div>

                    <h3 className="mt-3 sm:mt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
                      {selectedProject.title}
                    </h3>

                    <p className="mt-2 sm:mt-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {selectedProject.description}
                    </p>

                    <div className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-3.5 rounded-xl sm:rounded-2xl border border-primary/20 bg-muted/50 p-3 sm:p-4">
                      <Layers className="size-4 sm:size-5 text-primary shrink-0" />
                      <div>
                        <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
                          Key Outcome
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground">
                          {selectedProject.metrics}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-background px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[10px] sm:text-xs text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 sm:mt-6">
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto rounded-xl font-bold text-xs sm:text-sm h-10 sm:h-11"
                      >
                        <Link href={selectedProject.href}>
                          Inspect Project Spec
                          <ArrowUpRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[220px] sm:min-h-[300px] w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border/40 bg-background lg:min-h-[420px]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
