"use client";

/**
 * -----------------------------------------------------------------------------
 * useRotate
 * -----------------------------------------------------------------------------
 *
 * Reusable hook for rotating a Three.js object.
 *
 * -----------------------------------------------------------------------------
 */

import { RefObject } from "react";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

interface UseRotateOptions
{
    speed?: number;
    axis?: "x" | "y" | "z";
}

export function useRotate (
    ref: RefObject<THREE.Object3D | null>,
    {
        speed = 1,
        axis = "y",
    }: UseRotateOptions = {},
)
{
    useFrame( ( _, delta ) =>
    {
        if ( !ref.current ) return;

        switch ( axis )
        {
            case "x":
                ref.current.rotation.x += delta * speed;
                break;

            case "y":
                ref.current.rotation.y += delta * speed;
                break;

            case "z":
                ref.current.rotation.z += delta * speed;
                break;
        }
    } );
}