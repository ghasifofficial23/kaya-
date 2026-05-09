import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function EmberParticles() {
  const ref = useRef<THREE.Points>(null!);
  
  const [positions, colors] = useMemo(() => {
    const itemCount = 1500;
    const pos = new Float32Array(itemCount * 3);
    const cols = new Float32Array(itemCount * 3);
    
    for (let i = 0; i < itemCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const r = Math.random();
      if (r < 0.4) {
        cols[i * 3] = 0.78; // #C8442A R
        cols[i * 3 + 1] = 0.26; // G
        cols[i * 3 + 2] = 0.16; // B
      } else if (r < 0.7) {
        cols[i * 3] = 0.83; // #D4A44C
        cols[i * 3 + 1] = 0.64;
        cols[i * 3 + 2] = 0.3;
      } else {
        cols[i * 3] = 0.96; // #F5EFE0
        cols[i * 3 + 1] = 0.94;
        cols[i * 3 + 2] = 0.88;
      }
    }
    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    // Make interactive to mouse
    const targetX = (state.pointer.y * Math.PI) / 4;
    const targetY = (state.pointer.x * Math.PI) / 4;
    
    // Smooth interpolation towards mouse position
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * delta * 2;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * delta * 2;
    
    // Auto rotation base
    ref.current.rotation.x += delta * 0.02;
    ref.current.rotation.y += delta * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#1A1612']} />
        <EmberParticles />
      </Canvas>
    </div>
  );
};
