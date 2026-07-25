import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createGoldStandardMaterial } from './GoldShaderMaterial';
import { createDiamondPhysicalMaterial } from './DiamondShaderMaterial';
import { MetalType } from '@/types';

export interface HeroRingModelProps {
  metalType?: MetalType;
  scrollProgress?: number;
}

export const HeroRingModel: React.FC<HeroRingModelProps> = ({
  metalType = '22K_GOLD',
  scrollProgress = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  const goldMat = React.useMemo(() => createGoldStandardMaterial(metalType), [metalType]);
  const diamondMat = React.useMemo(() => createDiamondPhysicalMaterial(), []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Base continuous slow spin + scroll-driven rotation
      groupRef.current.rotation.y += delta * 0.4 + scrollProgress * 0.05;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Torus Ring Shank (22K Gold Band) */}
      <mesh material={goldMat} castShadow receiveShadow>
        <torusGeometry args={[1.0, 0.12, 32, 100]} />
      </mesh>

      {/* Lotus Crown Base */}
      <mesh position={[0, 1.0, 0]} material={goldMat} castShadow>
        <cylinderGeometry args={[0.3, 0.15, 0.25, 16]} />
      </mesh>

      {/* 6 Lotus Prongs */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const px = Math.sin(rad) * 0.25;
        const pz = Math.cos(rad) * 0.25;
        return (
          <mesh
            key={i}
            position={[px, 1.18, pz]}
            rotation={[0.15 * Math.cos(rad), 0, -0.15 * Math.sin(rad)]}
            material={goldMat}
            castShadow
          >
            <cylinderGeometry args={[0.035, 0.045, 0.35, 8]} />
          </mesh>
        );
      })}

      {/* Diamond Solitaire Centerpiece (Brilliant Octahedron Geometry) */}
      <mesh position={[0, 1.32, 0]} material={diamondMat} castShadow>
        <octahedronGeometry args={[0.42, 2]} />
      </mesh>
    </group>
  );
};
