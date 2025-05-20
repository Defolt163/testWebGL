'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from './Scene';

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene/>
    </div>
  );
}
