"use client";

/**
 * -----------------------------------------------------------------------------
 * Individual Logo Model
 * -----------------------------------------------------------------------------
 *
 * Loads the exploded logo model.
 *
 * Every piece remains its own mesh so animation
 * wrappers can manipulate them individually.
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo } from "react";

import { useGLTF } from "@react-three/drei";

import * as THREE from "three";

export interface IndividualLogoProps {
  primaryColor: string;
}

export function IndividualLogo({ primaryColor }: IndividualLogoProps) {
  const { scene } = useGLTF("/models/individualmeshlogo.glb");

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

useGLTF.preload("/models/individualmeshlogo.glb");
