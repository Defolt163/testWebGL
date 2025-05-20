'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import PhoneModel from './PhoneScene/PhoneModel';
import CarModel from './CarScene/CarModel';
import { motion } from 'framer-motion';
import ScrollRouter from './ScrollRouter'
import * as THREE from 'three';

function ScrollScene({ setShowText }) {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  const scrollOffset = useRef(0);
  const cameraRef = useRef();
  const textRef = useRef();
  
  useEffect(()=>{
    console.log(cameraRef)
  }, [cameraRef])

  useFrame(() => {
    const offset = scroll.offset;
    scrollRef.current = offset;
    scrollOffset.current = scroll.offset;

    // Двигаем камеру по оси Y от -0.3 до 0.5, например
    const cameraY = -0.3 + scrollRef.current * 0.3;
    const cameraX = -0.1 + scrollRef.current * 0.6;
    const cameraZ = 3 + scrollRef.current * -2;
    cameraRef.current.position.y = cameraY;
    cameraRef.current.position.x = cameraX;
    cameraRef.current.position.z = cameraZ;

    const textY = 0 + scrollRef.current * 0.45;
    const textX = 0 + scrollRef.current * -0.77;
    const textZ = 4 + scrollRef.current * -3;
    textRef.current.position.y = textY;
    textRef.current.position.x = textX;
    textRef.current.position.z = textZ;

    setShowText(offset > 0.19);
  });

  return (<>
    <Billboard
      ref={textRef}
      position={[0, 0, 4]}
    >
      <Text fontSize={0.15}>REVVO</Text>
    </Billboard>
    <OrthographicCamera ref={cameraRef}
        position={[-0.1, -0.3, 3]}>
      <PhoneModel scroll={scrollRef} />
    </OrthographicCamera>
  </>);
}
function ScrollSceneCar() {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  const scrollOffset = useRef(0);
  const cameraRef = useRef();
  const textRef = useRef();
  
  useEffect(()=>{
    console.log(cameraRef)
  }, [cameraRef])

  useFrame(() => {
    const offset = scroll.offset;
    scrollRef.current = offset;
    scrollOffset.current = scroll.offset;
  });

  return (<>
    <CarModel scroll={scrollRef}/>
  </>);
}
 
export default function Scene() {
  const [showText, setShowText] = useState(false);
  return (
    <>
        {/* <>
          <motion.div initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : -20 }}
            transition={{ duration: 0.6 }}
            className="absolute w-1/2 top-1/4 left-5 text-gray-500 text-6xl font-bold pointer-events-none">
            Мобильный сервис создания и бронирования поездок
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: showText ? 1 : 0, x: showText ? 0 : -20 }}
            transition={{ duration: 0.6 }}
            className="absolute w-1/2 top-1/2 left-5 text-gray-500 text-3xl font-bold pointer-events-none">
            В современном ритме жизни, время имеет решающее значение. Наше приложение дает тебе возможность создавать поездки и бронировать трансфер в удобное для тебя время, экономя драгоценные минуты.
          </motion.div>
        </> */}
      <Canvas camera={{ position: [0, 0, 2.45], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.3}>
            {/* <ScrollScene setShowText={setShowText}/> */}
            <ScrollRouter setShowText={setShowText}/>
          </ScrollControls>
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </>
  );
}
