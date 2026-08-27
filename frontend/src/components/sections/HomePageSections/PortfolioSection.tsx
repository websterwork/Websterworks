"use client";

import React, { useState, useRef } from "react";
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
}: {
  onSelectProject: (p: (typeof projects)[0]) => void;
  activeId: string | null;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 4.6;

  useFrame((_, delta) => {
    if (groupRef.current && !activeId) {
      groupRef.current.rotation.y += delta * 0.18;
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
            <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.3}>
              <Html
                transform
                sprite
                distanceFactor={5.5}
                center
                zIndexRange={[100, 0]}
              >
                <div
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => onSelectProject(project)}
                  className="group relative h-[218px] w-48 cursor-pointer rounded-2xl border border-primary/20 bg-background/90 p-3 backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:border-primary hover:shadow-[0_0_30px_rgba(152,16,250,0.35)]"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="mt-2.5 flex flex-col">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-primary">
                      {project.category}
                    </span>
                    <h4 className="mt-0.5 truncate text-xs font-black text-foreground group-hover:text-primary">
                      {project.title}
                    </h4>
                    <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
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

  return (
    <section className="relative overflow-hidden py-32">
      {/* Shared Hero Background Stack */}
      <Aurora />
      <Spotlight />
      <GradientBlur />

      {/* Header */}
      <div className="relative z-10 mx-auto text-center">
        <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="size-3.5" /> Selected Works
        </span>
        <h2 className="mt-1.5 text-3xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Orbital Void Stage
        </h2>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
          Hover or tap any project node to open full specification modal
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="relative z-10 h-[75vh] w-full">
        <Canvas camera={{ position: [0, 1.2, 8.2], fov: 42 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#9810fa" />
          <OrbitalRing
            onSelectProject={setSelectedProject}
            activeId={selectedProject?.id || null}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-3xl md:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 shadow-2xl md:p-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 z-20 rounded-full border border-border bg-muted p-2.5 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <X className="size-5" />
              </button>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 font-mono text-xs font-bold text-primary">
                        {selectedProject.category}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {selectedProject.year}
                      </span>
                    </div>

                    <h3 className="mt-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                      {selectedProject.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {selectedProject.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3.5 rounded-2xl border border-primary/20 bg-muted/50 p-4">
                      <Layers className="size-5 text-primary" />
                      <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          Key Outcome
                        </span>
                        <span className="text-sm font-bold text-foreground">
                          {selectedProject.metrics}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border bg-background px-3 py-1 font-mono text-xs text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6">
                      <Button
                        asChild
                        size="lg"
                        className="rounded-xl font-bold"
                      >
                        <Link href={selectedProject.href}>
                          Inspect Project Spec
                          <ArrowUpRight className="ml-2 size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative min-h-[300px] w-full overflow-hidden rounded-2xl border border-border/40 bg-background lg:min-h-[420px]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    priority
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
