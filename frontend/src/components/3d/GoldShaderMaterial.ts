import * as THREE from 'three';
import { MetalType } from '@/types';

export function createGoldStandardMaterial(metalType: MetalType | string) {
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.12,
    metalness: 0.95,
    envMapIntensity: 2.2,
  });

  switch (metalType) {
    case '24K_GOLD':
      material.color = new THREE.Color('#FFD700'); // Pure Gold
      material.roughness = 0.08;
      break;
    case '22K_GOLD':
      material.color = new THREE.Color('#C7A76C'); // Official Champagne Gold
      material.roughness = 0.12;
      break;
    case '18K_GOLD':
    case '18K_ROSE_GOLD':
      material.color = new THREE.Color('#E8A598'); // Rose Gold / 18K
      material.roughness = 0.14;
      break;
    case '950_PLATINUM':
      material.color = new THREE.Color('#E5E8EC');
      material.roughness = 0.06;
      material.metalness = 0.98;
      break;
    case '999_SILVER':
      material.color = new THREE.Color('#F0F3F6'); // Pure Silver
      material.roughness = 0.08;
      material.metalness = 0.95;
      break;
    case '925_SILVER':
      material.color = new THREE.Color('#D8DEE4'); // Sterling Silver
      material.roughness = 0.12;
      material.metalness = 0.90;
      break;
    default:
      material.color = new THREE.Color('#C7A76C');
      break;
  }

  return material;
}
