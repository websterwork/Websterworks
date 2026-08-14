"use client";

/**
 * -----------------------------------------------------------------------------
 * Rotate Animation
 * -----------------------------------------------------------------------------
 *
 * Generic rotation wrapper.
 *
 * Responsibilities
 * • Rotate any Three.js object
 * • Expose configurable speed & axis
 *
 * -----------------------------------------------------------------------------
 */

import { PropsWithChildren, useRef } from "react";

import * as THREE from "three";

import { useRotate } from "../hooks/useRotate";

export interface RotateProps extends PropsWithChildren {
  speed?: number;

  axis?: "x" | "y" | "z";
}

export function Rotate({ children, speed = 1, axis = "y" }: RotateProps) {
  const groupRef = useRef<THREE.Group>(null);

  useRotate(groupRef, {
    speed,
    axis,
  });

  return <group ref={groupRef}>{children}</group>;
}
