import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { useAppStore } from '@/store/useAppStore';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

export interface JewelryCanvasProps {
  children: React.ReactNode;
  enableOrbit?: boolean;
  autoRotate?: boolean;
  height?: string;
}

const StaticFallbackImage: React.FC<{ height: string }> = ({ height }) => (
  <div className={`w-full ${height} bg-brand-beige/30 flex items-center justify-center`}>
    <img
      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
      alt="Pramo Jewels Solitaire Ring"
      className="max-h-80 object-contain drop-shadow-xl"
    />
  </div>
);

export const JewelryCanvas: React.FC<JewelryCanvasProps> = ({
  children,
  enableOrbit = true,
  autoRotate = true,
  height = 'h-full',
}) => {
  const { webglProfile } = useAppStore();

  if (webglProfile === 'FALLBACK') {
    return <StaticFallbackImage height={height} />;
  }

  return (
    <ErrorBoundary fallback={<StaticFallbackImage height={height} />}>
      <div className={`w-full ${height} relative cursor-grab active:cursor-grabbing`}>
        <Canvas
          camera={{ position: [0, 1.2, 4.5], fov: 45 }}
          dpr={webglProfile === 'ULTRA' ? [1, 2] : [1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              console.warn('WebGL context lost. Attempting recovery...');
            });
          }}
        >
          {/* Studio Pure Three.js Procedural Lighting (100% offline & CDN resilient) */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#FFF1D0" />
          <pointLight position={[0, -2, 2]} intensity={0.5} color="#C7A76C" />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              {children}
            </Float>
            <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#1F1F1F" />
          </Suspense>

          {enableOrbit && (
            <OrbitControls
              enableZoom={true}
              minDistance={2}
              maxDistance={8}
              autoRotate={autoRotate}
              autoRotateSpeed={1.2}
              enablePan={false}
            />
          )}
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};
