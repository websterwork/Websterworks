'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, useMatcapTexture, Environment } from '@react-three/drei';
import { useRef, Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function TechSphere() {
  const sphereRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      
      if (hovered) {
        sphereRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.1);
      } else {
        sphereRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group>
      <mesh 
        ref={sphereRef} 
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#000000"
          transmission={0.95}
          thickness={0.8}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.5}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.3} />
      </mesh>
      
      {/* Wireframe sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function FloatingTech({ type, color, position, delay }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + delay) * 0.4;
      meshRef.current.rotation.x = time * 0.2 + delay;
      meshRef.current.rotation.y = time * 0.3 + delay;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const geometry = () => {
    switch(type) {
      case 'cube': return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case 'pyramid': return <coneGeometry args={[0.4, 0.8, 4]} />;
      case 'torus': return <torusGeometry args={[0.5, 0.1, 16, 32]} />;
      case 'octa': return <octahedronGeometry args={[0.5]} />;
      default: return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    }
  };

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometry()}
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef();
  const count = 100;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeDModel() {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const floatingItems = [
    { type: 'cube', color: '#8B5CF6', position: [3.5, 1, 0], delay: 0 },
    { type: 'pyramid', color: '#3B82F6', position: [-3.5, -1, 0], delay: 1 },
    { type: 'torus', color: '#10B981', position: [0, 2.5, 2.5], delay: 2 },
    { type: 'octa', color: '#F59E0B', position: [0, -2, -3], delay: 3 },
  ];

  // Adjust camera position based on screen size
  const cameraPosition = isMobile ? [8, 4, 8] : isTablet ? [7, 3.5, 7] : [6, 3, 6];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-3xl group-hover:blur-4xl transition-all duration-1000"></div>
      
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-500">
        <Canvas
          camera={{ position: cameraPosition, fov: isMobile ? 55 : 50 }}
          shadows
          dpr={[1, isMobile ? 1.5 : 2]}
          className="cursor-grab active:cursor-grabbing"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" castShadow />
            <pointLight position={[-10, 5, -10]} intensity={0.8} color="#3B82F6" />
            <pointLight position={[0, -5, 5]} intensity={0.5} color="#10B981" />
            
            {/* Environment */}
            <Environment preset="city" />
            
            {/* Main components */}
            <TechSphere />
            <ParticleField />
            
            {floatingItems.map((item, i) => (
              <FloatingTech key={i} {...item} />
            ))}
            
            {/* Controls */}
            <OrbitControls 
              enableZoom={controlsEnabled && !isMobile}
              enablePan={controlsEnabled && !isMobile}
              enableRotate={controlsEnabled}
              zoomSpeed={0.8}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
              minDistance={isMobile ? 5 : 3}
              maxDistance={isMobile ? 20 : 15}
            />
            
            {/* Grid floor */}
            <gridHelper args={[20, 20, '#4B5563', '#374151']} rotation-x={-Math.PI / 2} position-y={-3} />
          </Suspense>
        </Canvas>
        
        {/* Overlay controls */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setControlsEnabled(!controlsEnabled)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-purple-500/50 transition-all text-xs sm:text-sm"
            >
              {controlsEnabled ? '🔒 Lock' : '🔓 Unlock'}
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-purple-500/50 transition-all text-xs sm:text-sm"
            >
              Reset
            </button>
          </div>
          
          <div className="text-[10px] sm:text-xs text-gray-400">
            {isMobile ? 'Touch to rotate' : 'Drag to rotate • Scroll to zoom'}
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>

        {/* Mobile warning */}
        {isMobile && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg text-center">
              Use two fingers to zoom, one finger to rotate
            </div>
          </div>
        )}
      </div>
    </div>
  );
}