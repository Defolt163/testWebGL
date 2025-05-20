import { Billboard, Grid, Html, Text, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scale } from 'framer-motion';

function Box() {
  return (
    <mesh position={[0, 0, 0]} scale={0.001}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>

  );
}
function RotatingCube() {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh position={[0, 0, 0]} scale={0.001} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}
export default function BusStopModel({ scroll }) {
  
  const group = useRef();
  const { scene } = useGLTF('/bus_stop.glb');

  useFrame(() => {
    const r = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(10.6, Math.PI, r); // вращение влево
    group.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 9, r); // наклон по X
  });



  return (
      <group ref={group} scale={100} dispose={null}>
        <RotatingCube/>
        <Html transform scale={0.5} position={[0, 0, -5]}>
          <div style={{ transform: 'scale(2)' }} className='w-[70%]  bg-purple-950/90 rounded-2xl shadow-2xl shadow-purple-400 p-4 text-white'>
            <h3 className='text-2xl'>
              С нашим приложением вы получаете абсолютную свободу передвижения. Создавайте поездки в удобное для вас время, выбирайте желаемый маршрут и наслаждайтесь комфортным путешествием. Больше никаких компромиссов!<br/><br/>
  
              Создание поездок никогда не было таким простым. Всего в несколько кликов вы сможете разместить заявку на поездку по вашим личным предпочтениям.
            </h3>
          </div>
        </Html>
        {/* <Text position={[-2,-2,-3]} transform>Limited Edition</Text> */}
        
      
        <Billboard>
          <Text
          position={[4, 3, -2]} // позиция относительно модели
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight='bold'
        >
          ПАССАЖИР
        </Text>
        </Billboard>
      </group>
   
  );
}
