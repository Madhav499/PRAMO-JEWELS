import * as THREE from 'three';

export function createDiamondPhysicalMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    metalness: 0.0,
    roughness: 0.0,
    transmission: 0.98, // High transparency refraction
    ior: 2.417,          // Exact Index of Refraction for Diamond
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    dispersion: 0.044,   // High dispersion diamond fire
    envMapIntensity: 3.5,
  });
}
