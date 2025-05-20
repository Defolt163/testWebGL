import { Billboard, Grid, Html, Text, useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CarModel({ scroll }) {
  
  const group = useRef();
  const { scene } = useGLTF('/car.glb');

  useFrame(() => {
    const r = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(0, -Math.PI, r); // вращение влево
    group.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 9, r); // наклон по X
  });

  return (
      <group ref={group} scale={0.05} dispose={null}>
        <Billboard>
              <Html transform wrapperClass='w-full' position={[2, 6, 3]}>
                <div className='w-[70%]  bg-purple-950/90 rounded-2xl shadow-2xl shadow-purple-400 p-4 text-white'>
                  <h2 className='text-3xl text-bold mb-4'>1. Водитель</h2>
                  <h3 className='text-2xl'>
                    Вы можете стать частью нашего сообщества водителей и начать принимать заказы на поездки от пассажиров. <br/> Никаких лишних формальностей – просто садитесь за руль и начинайте зарабатывать деньги.
                  </h3>
                </div>
              </Html>
        </Billboard>
        <primitive object={scene}/>
        {/* <Text position={[-2,-2,-3]} transform>Limited Edition</Text> */}
        
      
        <Billboard>
          <Text
          position={[2, 6, 0]} // позиция относительно модели
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
