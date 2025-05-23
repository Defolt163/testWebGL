'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import PhoneModel from './PhoneModel';
import { useSpring, a } from '@react-spring/three';
import { motion } from 'framer-motion';


export default function ScrollMobileScenePhone({progress}) {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  const scrollOffset = useRef(0);
  const cameraRef = useRef();
  const textRef = useRef();

  const { transform, opacity } = useSpring({
    opacity: !progress ? 1 : 0,
    transform: `perspective(600px) rotateX(${!progress ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  const styles = useSpring({
    opacity: progress < 0.6 ? 1 : 0,
    config: { mass: 3, tension: 170, friction: 26 },
  });

  useFrame(() => {
    const offset = scroll.offset;
    scrollRef.current = offset;
    scrollOffset.current = scroll.offset;
    const localProgress = Math.min(offset / 0.5, 1)

    // Двигаем камеру по оси Y от -0.3 до 0.5, например
    const cameraY = 0.2 + scrollRef.current * -0.1
    const cameraX = 0;
    const cameraZ = 2.1 + scrollRef.current;

    const newCameraY = cameraY >= 0 ? 0 : cameraY
    const newCameraX = cameraX >= 0.64 ? 0.64 : cameraX
    const newCameraZ = cameraZ <= 0.7 ? 1.1 : cameraZ

    cameraRef.current.position.y = cameraY;
    cameraRef.current.position.x = cameraX;
    cameraRef.current.position.z = cameraZ;

    const textY = 0 + scrollRef.current * -0.9;
    const textX = 0 + scrollRef.current * 0;
    const textZ = 3.2 + scrollRef.current * -2;
    
    textRef.current.position.y = textY;
    textRef.current.position.x = textX;
    textRef.current.position.z = textZ;

    scrollRef.current = localProgress;
  });

  return (<a.group style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}>
    <Billboard
      ref={textRef}
      position={[0, 0, 4]}
    >
      <Text fontSize={0.15}>REVVO</Text>
    </Billboard>
    <OrthographicCamera ref={cameraRef}
        position={[0, 0, 3]}>
      <PhoneModel scroll={scrollRef} />
      {/* <Html position={[-0.59, -1, 0]} prepend  wrapperClass='w-1/2' fullscreen as='div'>
        <motion.div initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: -20 }}
          transition={{ duration: 0.6 }}
          className="absolute w-1/2 top-1/4 left-5 text-gray-500 text-6xl font-bold pointer-events-none">
          Мобильный сервис создания и бронирования поездок
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: -20 }}
          transition={{ duration: 0.6 }}
          className="absolute w-1/2 top-1/2 left-5 text-gray-500 text-3xl font-bold pointer-events-none">
          В современном ритме жизни, время имеет решающее значение. Наше приложение дает тебе возможность создавать поездки и бронировать трансфер в удобное для тебя время, экономя драгоценные минуты.
        </motion.div>
      </Html> */}
    </OrthographicCamera>
  </a.group>);
}