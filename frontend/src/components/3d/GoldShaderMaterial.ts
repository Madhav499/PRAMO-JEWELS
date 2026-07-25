import * as THREE from 'three';

export interface MetalMaterialOptions {
  metalType: '24K_GOLD' | '22K_GOLD' | '18K_ROSE_GOLD' | '950_PLATINUM' | '999_SILVER';
}

export function createGoldStandardMaterial(metalType: MetalMaterialOptions['metalType']) {
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.12,
    metalness: 0.95,
    envMapIntensity: 2.2,
  });

  switch (metalType) {
    case '24K_GOLD':
      material.color = new THREE.Color('#FFD700');
      material.roughness = 0.08;
      break;
    case '22K_GOLD':
      material.color = new THREE.Color('#C7A76C'); // Official Champagne Gold
      material.roughness = 0.12;
      break;
    case '18K_ROSE_GOLD':
      material.color = new THREE.Color('#E8A598');
      material.roughness = 0.15;
      break;
    case '950_PLATINUM':
      material.color = new THREE.Color('#E5E8EC');
      material.roughness = 0.06;
      material.metalness = 0.98;
      break;
    case '999_SILVER':
      material.color = new THREE.Color('#F0F3F6');
      material.roughness = 0.10;
      material.metalness = 0.92;
      break;
  }

  return material;
}
