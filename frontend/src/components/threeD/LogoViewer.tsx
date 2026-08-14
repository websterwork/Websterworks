"use client";

/**
 * -----------------------------------------------------------------------------
 * Logo Viewer
 * -----------------------------------------------------------------------------
 *
 * High-level entry point for rendering 3D logos.
 *
 * Responsibilities:
 * • Select model
 * • Select animation
 * • Render inside LogoCanvas
 *
 * -----------------------------------------------------------------------------
 */

import { LogoCanvas } from "./LogoCanvas";

import { Logo } from "./models/Logo";
import { IndividualLogo } from "./models/IndividualLogo";

import { Rotate } from "./animations/Rotate";
import { Explode } from "./animations/Explode";

export type LogoModel = "default" | "individual";

export type LogoAnimation = "none" | "rotate" | "explode";

export interface LogoViewerProps {
  model?: LogoModel;

  animation?: LogoAnimation;

  className?: string;
}

export function LogoViewer({
  model = "default",
  animation = "none",
  className,
}: LogoViewerProps) {
  return (
    <LogoCanvas className={className}>
      {(primaryColor) => {
        /**
         * ----------------------------------------------------------
         * Rotating Logo
         * ----------------------------------------------------------
         */

        if (animation === "rotate") {
          return (
            <Rotate speed={1}>
              <Logo primaryColor={primaryColor} />
            </Rotate>
          );
        }

        /**
         * ----------------------------------------------------------
         * Exploding Logo
         * ----------------------------------------------------------
         */

        if (animation === "explode") {
          return (
            <Explode
              distance={0.6}
              explodeDuration={1.4}
              assembleDuration={1.4}
              holdDuration={1}
            >
              <IndividualLogo primaryColor={primaryColor} />
            </Explode>
          );
        }

        /**
         * ----------------------------------------------------------
         * Static Logo
         * ----------------------------------------------------------
         */

        return model === "individual" ? (
          <IndividualLogo primaryColor={primaryColor} />
        ) : (
          <Logo primaryColor={primaryColor} />
        );
      }}
    </LogoCanvas>
  );
}
