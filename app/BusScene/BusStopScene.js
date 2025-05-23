'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import PhoneModel from '../PhoneScene/PhoneModel';
import BusStopModel from './BusStopModel';
import { motion } from 'framer-motion';
import ScrollRouter from '../ScrollRouter'


export default function BusStopScene({screenWidth}) {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  const scrollOffset = useRef(0);
  const cameraRef = useRef();

  useFrame(() => {
    const offset = scroll.offset;
    scrollRef.current = offset;
    scrollOffset.current = scroll.offset;
    // Двигаем камеру по оси Y от -0.3 до 0.5, например
    const cameraY = -0.2
    const cameraX = 0.4
    const cameraZ = screenWidth >= 1280 ? 2 : 2.5
    cameraRef.current.position.y = cameraY;
    cameraRef.current.position.x = cameraX;
    cameraRef.current.position.z = cameraZ;
  });

  return (<>
    <OrthographicCamera ref={cameraRef}>
      <BusStopModel scroll={scrollRef}/>
    </OrthographicCamera>
  </>);
}