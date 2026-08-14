"use client";

/**
 * -----------------------------------------------------------------------------
 * useExplode
 * -----------------------------------------------------------------------------
 *
 * Collects all meshes inside a group and prepares data
 * for the explode animation.
 *
 * Responsibilities
 * • Find all meshes
 * • Store original positions
 * • Compute explode directions
 * • Assign delays
 * • Assign explode distances
 *
 * -----------------------------------------------------------------------------
 */

import
    {
        MutableRefObject,
        useEffect,
        useMemo,
        useState,
    } from "react";

import * as THREE from "three";

export interface ExplodePiece
{
    mesh: THREE.Mesh;

    origin: THREE.Vector3;

    direction: THREE.Vector3;

    distance: number;

    delay: number;
}

interface UseExplodeOptions
{
    distance?: number;
}

export function useExplode (
    groupRef: MutableRefObject<THREE.Group | null>,
    {
        distance = 0.6,
    }: UseExplodeOptions = {},
)
{
    const [ ready, setReady ] =
        useState( false );

    const [ meshes, setMeshes ] =
        useState<ExplodePiece[]>( [] );

    useEffect( () =>
    {
        if ( !groupRef.current ) return;

        const group = groupRef.current;

        /**
         * ---------------------------------------------------------
         * Logo Bounding Box
         * ---------------------------------------------------------
         */

        const box =
            new THREE.Box3().setFromObject(
                group,
            );

        const center =
            box.getCenter( new THREE.Vector3() );

        const pieces: ExplodePiece[] = [];

        let index = 0;

        group.traverse( ( child ) =>
        {
            if ( !( child instanceof THREE.Mesh ) )
                return;

            /**
             * World Position
             */

            const world =
                new THREE.Vector3();

            child.getWorldPosition( world );

            /**
             * Direction from logo center
             */

            const direction = world
                .clone()
                .sub( center );

            /**
             * Prevent zero vector
             */

            if (
                direction.lengthSq() <
                0.000001
            )
            {
                direction.set(
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                    Math.random() - 0.5,
                );
            }

            direction.normalize();

            /**
             * Outer pieces travel farther
             */

            const strength =
                distance *
                THREE.MathUtils.lerp(
                    0.5,
                    1,
                    Math.min(
                        world.distanceTo( center ) /
                        2,
                        1,
                    ),
                );

            pieces.push( {
                mesh: child,

                origin:
                    child.position.clone(),

                direction,

                distance: strength,

                delay: index * 0.03,
            } );

            index++;
        } );

        setMeshes( pieces );

        setReady( true );
    }, [ groupRef, distance ] );

    /**
     * ---------------------------------------------------------
     * Ease
     * ---------------------------------------------------------
     */

    const easeInOut = useMemo(
        () => ( t: number ) =>
        {
            t = THREE.MathUtils.clamp(
                t,
                0,
                1,
            );

            return t < 0.5
                ? 4 * t * t * t
                : 1 -
                Math.pow(
                    -2 * t + 2,
                    3,
                ) /
                2;
        },
        [],
    );

    return {
        ready,

        meshes,

        easeInOut,
    };
}