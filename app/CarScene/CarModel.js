import { Billboard, Grid, Html, Text, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CarModel({ scroll }) {
  
  const group = useRef();
  const { scene } = useGLTF('/car.glb');

  useFrame(() => {
    const r = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(2, -Math.PI, r); // вращение влево
    group.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 9, r); // наклон по X
  });

  return (
      <group ref={group} scale={0.05} dispose={null}>
        <primitive object={scene}/>
        {/* <Text position={[-2,-2,-3]} transform>Limited Edition</Text> */}
        
      
        <Billboard>
          <Text
            position={[-3, 6, 0]} // позиция относительно модели
            fontSize={3.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            fontWeight='bold'
          >
            Водитель
          </Text>
        </Billboard>
      </group>
   
  );
}
