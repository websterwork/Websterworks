'use client';

import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, useMatcapTexture, Environment } from '@react-three/drei';
import { useRef, Suspense, useState } from 'react';
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
  
  const floatingItems = [
    { type: 'cube', color: '#8B5CF6', position: [3.5, 1, 0], delay: 0 },
    { type: 'pyramid', color: '#3B82F6', position: [-3.5, -1, 0], delay: 1 },
    { type: 'torus', color: '#10B981', position: [0, 2.5, 2.5], delay: 2 },
    { type: 'octa', color: '#F59E0B', position: [0, -2, -3], delay: 3 },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-3xl blur-3xl group-hover:blur-4xl transition-all duration-1000"></div>
      
      <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow duration-500">
        <Canvas
          camera={{ position: [6, 3, 6], fov: 50 }}
          shadows
          dpr={[1, 2]}
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
              enableZoom={controlsEnabled}
              enablePan={controlsEnabled}
              enableRotate={controlsEnabled}
              zoomSpeed={0.8}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
              minDistance={3}
              maxDistance={15}
            />
            
            {/* Grid floor */}
            <gridHelper args={[20, 20, '#4B5563', '#374151']} rotation-x={-Math.PI / 2} position-y={-3} />
          </Suspense>
        </Canvas>
        
        {/* Overlay controls */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={() => setControlsEnabled(!controlsEnabled)}
              className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-purple-500/50 transition-all text-sm"
            >
              {controlsEnabled ? '🔒 Lock View' : '🔓 Unlock View'}
            </button>
            <button className="px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-gray-300 rounded-lg border border-gray-800 hover:bg-gray-800/80 hover:border-purple-500/50 transition-all text-sm">
              Reset View
            </button>
          </div>
          
          <div className="text-xs text-gray-400 hidden md:block">
            Drag to rotate • Scroll to zoom
          </div>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}