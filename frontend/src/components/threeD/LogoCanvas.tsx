"use client";

/**
 * -----------------------------------------------------------------------------
 * Logo Canvas
 * -----------------------------------------------------------------------------
 *
 * Shared Three.js renderer.
 *
 * Responsibilities
 * • Canvas
 * • Camera
 * • Lighting
 * • Theme synchronization
 *
 * -----------------------------------------------------------------------------
 */

import { ReactNode, Suspense } from "react";

import { Canvas } from "@react-three/fiber";

import { useLogoTheme } from "./hooks/useLogoTheme";
import { Bounds, Center } from "@react-three/drei";
interface LogoCanvasProps {
  className?: string;

  children: (primaryColor: string) => ReactNode;
}

export function LogoCanvas({ className, children }: LogoCanvasProps) {
  const { primary } = useLogoTheme();

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          position: [0, 0, 3.5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient */}

        <ambientLight intensity={1.8} />

        {/* Key */}

        <directionalLight position={[5, 5, 5]} intensity={2.5} />

        {/* Fill */}

        <directionalLight position={[-5, -5, -2]} intensity={1.2} />

        {/* Accent */}

        <directionalLight position={[0, 2, 4]} intensity={2} color={primary} />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.1}>
            <Center>{children(primary)}</Center>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}
