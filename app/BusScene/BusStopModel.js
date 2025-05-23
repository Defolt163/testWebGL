import { Billboard, Grid, Html, Text, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scale } from 'framer-motion';

export default function BusStopModel({ scroll }) {
  
  const group = useRef();
  const { scene } = useGLTF('/bus_stop.glb');

  useFrame(() => {
    const r = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(7.2, Math.PI, r/2); // вращение влево
    group.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 16, r); // наклон по X
  });



  return (
      <group ref={group} scale={0.1} dispose={null}>
        <Billboard>
          <Text
          position={[0, 3, -2]} // позиция относительно модели
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight='bold'
        >
          ПАССАЖИР
        </Text>
        </Billboard>
        <primitive object={scene}/>
      </group>
   
  );
}
