import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { JewelryCanvas } from './JewelryCanvas';
import { createGoldStandardMaterial } from './GoldShaderMaterial';
import { MetalType } from '@/types';
import * as THREE from 'three';

export interface Coin3DViewerProps {
  metalType?: MetalType;
  weightLabel?: string;
}

const CoinMesh: React.FC<{ metalType: MetalType }> = ({ metalType }) => {
  const coinRef = useRef<THREE.Group>(null);
  const material = React.useMemo(() => createGoldStandardMaterial(metalType), [metalType]);

  useFrame((_, delta) => {
    if (coinRef.current) {
      coinRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={coinRef} rotation={[0.4, 0, 0]} scale={1.3}>
      {/* Outer Coin Cylinder */}
      <mesh material={material} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.12, 64]} />
      </mesh>

      {/* Embossed Inner Bezel Rim */}
      <mesh position={[0, 0.065, 0]} material={material}>
        <ringGeometry args={[0.95, 1.15, 64]} />
      </mesh>
      <mesh position={[0, -0.065, 0]} rotation={[Math.PI, 0, 0]} material={material}>
        <ringGeometry args={[0.95, 1.15, 64]} />
      </mesh>

      {/* Center Crest Emblem (Hexagonal Embossed Motif) */}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={material}>
        <circleGeometry args={[0.7, 6]} />
      </mesh>
    </group>
  );
};

export const Coin3DViewer: React.FC<Coin3DViewerProps> = ({
  metalType = '24K_GOLD',
  weightLabel = '10 Grams 999.9 Fine',
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <JewelryCanvas height="h-72 md:h-96" enableOrbit={true} autoRotate={false}>
        <CoinMesh metalType={metalType} />
      </JewelryCanvas>

      <div className="mt-2 text-center">
        <span className="text-[10px] uppercase tracking-widest font-mono text-brand-gold-dark font-bold">
          Assayed Investment Bullion • {weightLabel}
        </span>
      </div>
    </div>
  );
};
