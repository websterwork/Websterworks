"use client";

/**
 * -----------------------------------------------------------------------------
 * Explode Animation
 * -----------------------------------------------------------------------------
 *
 * Plays the explode / assemble animation.
 *
 * Responsibilities
 * • Animation Timeline
 * • useFrame()
 * • Mesh Transform Updates
 *
 * -----------------------------------------------------------------------------
 */

import { PropsWithChildren, useRef } from "react";

import * as THREE from "three";

import { useFrame } from "@react-three/fiber";

import { useExplode } from "../hooks/useExplode";

export interface ExplodeProps extends PropsWithChildren {
  distance?: number;

  explodeDuration?: number;

  assembleDuration?: number;

  holdDuration?: number;

  floatAmplitude?: number;
}

export function Explode({
  children,

  distance = 0.6,

  explodeDuration = 1.4,

  assembleDuration = 1.4,

  holdDuration = 1,

  floatAmplitude = 0.015,
}: ExplodeProps) {
  const groupRef = useRef<THREE.Group>(null);

  const explode = useExplode(groupRef, {
    distance,
  });

  useFrame((state) => {
    if (!explode.ready) return;

    const elapsed = state.clock.getElapsedTime();

    /**
     * -------------------------------------------------------------
     * Timeline
     * -------------------------------------------------------------
     *
     * Explode
     *
     * Hold
     *
     * Assemble
     *
     * Hold
     *
     * -------------------------------------------------------------
     */

    const total =
      explodeDuration + holdDuration + assembleDuration + holdDuration;

    const time = elapsed % total;

    explode.meshes.forEach((piece) => {
      const local = Math.max(0, time - piece.delay);

      let progress = 0;

      /**
       * ---------------------------------------------------------
       * Explode
       * ---------------------------------------------------------
       */

      if (local <= explodeDuration) {
        progress = explode.easeInOut(local / explodeDuration);
      } else if (local <= explodeDuration + holdDuration) {

      /**
       * ---------------------------------------------------------
       * Hold
       * ---------------------------------------------------------
       */
        progress = 1;
      } else if (local <= explodeDuration + holdDuration + assembleDuration) {

      /**
       * ---------------------------------------------------------
       * Assemble
       * ---------------------------------------------------------
       */
        progress =
          1 -
          explode.easeInOut(
            (local - explodeDuration - holdDuration) / assembleDuration,
          );
      } else {

      /**
       * ---------------------------------------------------------
       * Rest
       * ---------------------------------------------------------
       */
        progress = 0;
      }

      /**
       * ---------------------------------------------------------
       * Target Position
       * ---------------------------------------------------------
       */

      piece.mesh.position.copy(piece.origin);

      piece.mesh.position.addScaledVector(
        piece.direction,
        progress * piece.distance,
      );

      /**
       * ---------------------------------------------------------
       * Floating
       * ---------------------------------------------------------
       */

      if (progress > 0.98) {
        piece.mesh.position.y +=
          Math.sin(elapsed * 2 + piece.delay * 8) * floatAmplitude;

        piece.mesh.rotation.z =
          Math.sin(elapsed * 1.5 + piece.delay * 10) * 0.04;
      } else {
        piece.mesh.rotation.z *= 0.9;
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}
