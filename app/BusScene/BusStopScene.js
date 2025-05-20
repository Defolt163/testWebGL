'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import PhoneModel from '../PhoneScene/PhoneModel';
import BusStopModel from './BusStopModel';
import { motion } from 'framer-motion';
import ScrollRouter from '../ScrollRouter'


export default function BusStopScene() {
  const scroll = useScroll();
  const scrollRef = useRef(0);
  const scrollOffset = useRef(0);
  const cameraRef = useRef();
  

  useFrame(() => {
    const offset = scroll.offset;
    scrollRef.current = offset;
    scrollOffset.current = scroll.offset;
    // Двигаем камеру по оси Y от -0.3 до 0.5, например
    const cameraY = 0
    const cameraX = 0
    const cameraZ = 0
    cameraRef.current.position.y = cameraY;
    cameraRef.current.position.x = cameraX;
    cameraRef.current.position.z = cameraZ;
  });

  return (<>
    <OrthographicCamera ref={cameraRef}>
        <BusStopModel scroll={scrollRef}/>
        <Html transform distanceFactor={10}>
          <div
            style={{
              width: "200px",
              fontSize: "10px",
              background: "rgba(0, 0, 0, 0.7)",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            <h1>Hello, 3D World!</h1>
            <p>This is an HTML element in the 3D scene.</p>
          </div>
        </Html>
    </OrthographicCamera>
  </>);
}