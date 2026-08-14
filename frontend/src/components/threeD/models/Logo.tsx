"use client";

/**
 * -----------------------------------------------------------------------------
 * Logo Model
 * -----------------------------------------------------------------------------
 *
 * Loads the merged logo model.
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo } from "react";

import { useGLTF } from "@react-three/drei";

import * as THREE from "three";

export interface LogoProps {
  primaryColor: string;
}

export function Logo({ primaryColor }: LogoProps) {
  const { scene } = useGLTF("/models/logo.glb");

  const model = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(primaryColor),

        metalness: 0.35,

        roughness: 0.2,

        envMapIntensity: 1.5,
      });
    });
  }, [model, primaryColor]);

  return <primitive object={model} />;
}

useGLTF.preload("/models/logo.glb");
