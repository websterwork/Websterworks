"use client";

import { useEffect, useState, useRef } from "react";

export interface SectionItem
{
  id: string;
}

interface UseActiveSectionProps
{
  sections: SectionItem[];
  rootMargin?: string;
  threshold?: number;
}

export function useActiveSection ( {
  sections,
  rootMargin = "-20% 0px -20% 0px",
  threshold = 0.2,
}: UseActiveSectionProps )
{
  const [ activeSection, setActiveSection ] = useState(
    sections[ 0 ]?.id ?? ""
  );

  const isScrollingRef = useRef( false );
  const activeSectionRef = useRef( activeSection );
  activeSectionRef.current = activeSection;

  const sectionIds = sections.map( ( s ) => s.id ).join( "," );

  // ---------------------------------------------------------------------------
  // Intersection Observer
  // ---------------------------------------------------------------------------
  useEffect( () =>
  {
    const observer = new IntersectionObserver(
      ( entries ) =>
      {
        const visible = entries.find( ( entry ) => entry.isIntersecting );

        if ( visible )
        {
          setActiveSection( visible.target.id );
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    sections.forEach( ( section ) =>
    {
      const element = document.getElementById( section.id );
      if ( element )
      {
        observer.observe( element );
      }
    } );

    return () => observer.disconnect();
  }, [ sectionIds, rootMargin, threshold ] );

  // ---------------------------------------------------------------------------
  // Scroll Lock (One Wheel Flick = Exactly One Section Change)
  // ---------------------------------------------------------------------------
  useEffect( () =>
  {
    const handleWheel = ( e: WheelEvent ) =>
    {
      // Prevent rapid scroll spam while animating
      if ( isScrollingRef.current )
      {
        e.preventDefault();
        return;
      }

      const currentIndex = sections.findIndex(
        ( s ) => s.id === activeSectionRef.current
      );

      if ( currentIndex === -1 ) return;

      if ( e.deltaY > 20 && currentIndex < sections.length - 1 )
      {
        // Scroll Down
        e.preventDefault();
        isScrollingRef.current = true;
        scrollToSection( sections[ currentIndex + 1 ].id );
      } else if ( e.deltaY < -20 && currentIndex > 0 )
      {
        // Scroll Up
        e.preventDefault();
        isScrollingRef.current = true;
        scrollToSection( sections[ currentIndex - 1 ].id );
      }

      // Unlock after transition completes (~800ms)
      setTimeout( () =>
      {
        isScrollingRef.current = false;
      }, 800 );
    };

    window.addEventListener( "wheel", handleWheel, { passive: false } );
    return () => window.removeEventListener( "wheel", handleWheel );
  }, [ sections ] );

  // ---------------------------------------------------------------------------
  // Helper
  // ---------------------------------------------------------------------------
  const scrollToSection = ( id: string ) =>
  {
    const element = document.getElementById( id );
    if ( !element ) return;

    element.scrollIntoView( {
      behavior: "smooth",
      block: "start",
    } );
  };

  return {
    activeSection,
    scrollToSection,
  };
}