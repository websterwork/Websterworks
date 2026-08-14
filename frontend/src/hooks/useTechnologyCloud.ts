"use client";

/**
 * -----------------------------------------------------------------------------
 * useTechnologyCloud
 * -----------------------------------------------------------------------------
 *
 * Floating particle engine.
 *
 * Responsibilities
 * • Create particles
 * • MotionValues
 * • Physics loop
 * • Ready for mouse interaction
 *
 * -----------------------------------------------------------------------------
 */

import { useEffect, useMemo } from "react";

import
    {
        motionValue,
        type MotionValue,
    } from "motion/react";

import type { IconName } from "@/components/icons";

import type { useTechnologyInteraction } from "./useTechnologyInteraction";

export interface TechnologyParticle
{
    id: string;

    name: string;

    icon: IconName;

    x: MotionValue<number>;

    y: MotionValue<number>;

    rotation: MotionValue<number>;

    scale: MotionValue<number>;

    velocityX: number;

    velocityY: number;

    homeX: number;

    homeY: number;

    rotationSpeed: number;

    /**
     * Physics
     */

    radius: number;

    timeOffset: number;

    floatAmplitude: number;

    floatSpeed: number;
  }

interface UseTechnologyCloudProps
{
    width: number;

    height: number;

    items: {
        name: string;

        icon: IconName;
    }[];

    interaction: ReturnType<typeof useTechnologyInteraction>;
}

export function useTechnologyCloud ( {
    width,
    height,
    items,
    interaction,
}: UseTechnologyCloudProps )
{
    /**
     * ---------------------------------------------------------------------------
     * Create Particles
     * ---------------------------------------------------------------------------
     */

    const particles = useMemo<TechnologyParticle[]>( () =>
    {
        if ( !width || !height ) return [];

        return items.map( ( item, index ) =>
        {
            const radius = 30 + Math.random() * 8;

            const homeX =
                radius +
                Math.random() * ( width - radius * 2 );

            const homeY =
                radius +
                Math.random() * ( height - radius * 2 );

            return {
                id: `${ item.name }-${ index }`,

                name: item.name,

                icon: item.icon,

                x: motionValue( homeX ),

                y: motionValue( homeY ),

                rotation: motionValue( Math.random() * 360 ),

                scale: motionValue(
                    0.9 + Math.random() * 0.35,
                ),

                velocityX:
                    ( Math.random() - 0.5 ) * 0.4,

                velocityY:
                    ( Math.random() - 0.5 ) * 0.4,

                homeX,

                homeY,

                rotationSpeed:
                    ( Math.random() - 0.5 ) * 0.05,

                radius,

                timeOffset:
                    Math.random() * Math.PI * 2,

                floatAmplitude:
                    0.15 + Math.random() * 0.45,

                floatSpeed:
                    0.3 + Math.random() * 0.6,
            };
        } );
    }, [ items, width, height]);

    /**
     * ---------------------------------------------------------------------------
     * Physics Loop
     * ---------------------------------------------------------------------------
     */

    useEffect( () =>
    {
        if ( !particles.length ) return;

        const SIZE = 56;

        let frame = 0;

        const animate = () =>
        {
            const mouseX = interaction.mouse.x;

            const mouseY = interaction.mouse.y;

            const time = performance.now() * 0.001;

            particles.forEach( ( particle ) =>
            {
                let x = particle.x.get();

                let y = particle.y.get();

                let vx = particle.velocityX;

                let vy = particle.velocityY;

                /**
                 * -------------------------------------------------------
                 * Particle Separation
                 * -------------------------------------------------------
                 */

                particles.forEach( ( other ) =>
                {
                    if ( other === particle ) return;

                    const dx = x - other.x.get();

                    const dy = y - other.y.get();

                    const distance = Math.sqrt( dx * dx + dy * dy );

                    if ( distance <= 0.001 ) return;

                    const minimum =
                        particle.radius +
                        other.radius +
                        interaction.config.particleSpacing;

                    if ( distance < minimum )
                    {
                        const overlap = minimum - distance;

                        const nx = dx / distance;

                        const ny = dy / distance;

                        vx += nx * overlap * 0.045;

                        vy += ny * overlap * 0.045;
                    }
                } );

                /**
                 * -------------------------------------------------------
                 * Mouse Repulsion
                 * -------------------------------------------------------
                 */

                if ( interaction.inside )
                {
                    const dx = x - mouseX;

                    const dy = y - mouseY;

                    const distance = Math.sqrt( dx * dx + dy * dy );

                    if (
                        distance > 0 &&
                        distance < interaction.config.repulsionRadius
                    )
                    {
                        const influence =
                            1 -
                            distance /
                            interaction.config.repulsionRadius;

                        const power = influence * influence;

                        const nx = dx / distance;

                        const ny = dy / distance;

                        vx +=
                            nx *
                            power *
                            interaction.config.repulsionStrength;

                        vy +=
                            ny *
                            power *
                            interaction.config.repulsionStrength;
                    }
                }

                /**
                 * -------------------------------------------------------
                 * Spring Home
                 * -------------------------------------------------------
                 */

                vx +=
                    ( particle.homeX - x ) *
                    interaction.config.returnForce;

                vy +=
                    ( particle.homeY - y ) *
                    interaction.config.returnForce;

                /**
                 * -------------------------------------------------------
                 * Velocity Damping
                 * -------------------------------------------------------
                 */

                vx *= interaction.config.damping;

                vy *= interaction.config.damping;

                /**
                 * -------------------------------------------------------
                 * Organic Drift
                 * -------------------------------------------------------
                 */

                x +=
                    vx +
                    Math.cos(
                        time * particle.floatSpeed +
                        particle.timeOffset,
                    ) *
                    particle.floatAmplitude;

                y +=
                    vy +
                    Math.sin(
                        time * particle.floatSpeed +
                        particle.timeOffset,
                    ) *
                    particle.floatAmplitude;

                /**
                 * -------------------------------------------------------
                 * Wall Bounce
                 * -------------------------------------------------------
                 */

                if ( x <= particle.radius )
                {
                    x = particle.radius;

                    vx *= -0.8;
                }

                if ( x >= width - particle.radius )
                {
                    x = width - particle.radius;

                    vx *= -0.8;
                }

                if ( y <= particle.radius )
                {
                    y = particle.radius;

                    vy *= -0.8;
                }

                if ( y >= height - particle.radius )
                {
                    y = height - particle.radius;

                    vy *= -0.8;
                }

                /**
                 * -------------------------------------------------------
                 * Save
                 * -------------------------------------------------------
                 */

                particle.velocityX = vx;

                particle.velocityY = vy;

                particle.x.set( x );

                particle.y.set( y );

                particle.rotation.set(
                    particle.rotation.get() +
                    particle.rotationSpeed,
                );
            } );

            frame = requestAnimationFrame( animate );
        };

        frame = requestAnimationFrame( animate );

        return () => cancelAnimationFrame( frame );
    }, [ particles, interaction, width, height ] );

    return particles;
}