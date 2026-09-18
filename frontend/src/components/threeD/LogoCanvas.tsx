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

import { ReactNode, Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Bounds, Center } from "@react-three/drei";
import { useLogoTheme } from "./hooks/useLogoTheme";

interface LogoCanvasProps {
  className?: string;
  children: (primaryColor: string) => ReactNode;
}

/**
 * Ensures projection matrix updates without triggering camera shifts.
 */
function CameraSync() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
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
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true,
        }}
        onCreated={({ camera }) => {
          camera.updateProjectionMatrix();
        }}
      >
        <CameraSync />

        {/* Ambient */}
        <ambientLight intensity={1.8} />

        {/* Key */}
        <directionalLight position={[5, 5, 5]} intensity={2.5} />

        {/* Fill */}
        <directionalLight position={[-5, -5, -2]} intensity={1.2} />

        {/* Accent */}
        <directionalLight position={[0, 2, 4]} intensity={2} color={primary} />

        <Suspense fallback={null}>
          {/* 
            fit & clip frame the logo tightly on load.
            margin={0.85} brings it close and zoomed-in.
            NO 'observe' prop ensures explosion/scroll won't trigger re-zooming!
          */}
          <Bounds fit clip margin={1.8}>
            <Center>{children(primary)}</Center>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}
