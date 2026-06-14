import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleField() {
  const points = useRef();
  const count = 1800;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.04;
      points.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#A78BFA" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function FloatingSphere() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.15;
      mesh.current.rotation.y = clock.elapsedTime * 0.2;
      mesh.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color="#7C3AED"
        emissive="#4C1D95"
        emissiveIntensity={0.4}
        wireframe={false}
        transparent
        opacity={0.85}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

function WireFrame() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.15;
      mesh.current.rotation.y = clock.elapsedTime * 0.2;
      mesh.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.65, 1]} />
      <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Ring() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.PI / 2 + clock.elapsedTime * 0.08;
      mesh.current.rotation.z = clock.elapsedTime * 0.12;
      mesh.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
    }
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[2.4, 0.015, 8, 80]} />
      <meshBasicMaterial color="#EC4899" transparent opacity={0.5} />
    </mesh>
  );
}

export default function ThreeScene({ className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#A78BFA" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#06B6D4" />
        <ParticleField />
        <FloatingSphere />
        <WireFrame />
        <Ring />
      </Canvas>
    </div>
  );
}
