'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Text3D, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SceneBackground from './SceneBackground'
import { useSpring, a } from '@react-spring/three';
import ScrollMobileScenePhone from './MobileScenePhone/ScenePhone';

export default function MobileScrollRouter({ setCurrentScene, currentScene }) {
  const scroll = useScroll();

  const stylesAnimationPhone = useSpring({
    scale: currentScene === "phone" ? 1 : 0,
    rotation: currentScene === "phone" ? [0, 0, 0] : [0, Math.PI / 2, 0],
    config: { mass: 3, tension: 170, friction: 26 },
  });

  return (
    <>
      {currentScene === "phone" && <a.group rotation={stylesAnimationPhone.rotation} scale={stylesAnimationPhone.scale}>
        <ScrollMobileScenePhone/>
        <SceneBackground color={'#ffff'} />
      </a.group>}
      {/* {currentScene === "car" && <a.group rotation={stylesAnimationCar.rotation} scale={stylesAnimationCar.scale}>
        <ScrollSceneCar />
        <SceneBackground color={'#1e1b4b'} />
      </a.group>}
      {currentScene === "passenger" && <a.group  rotation={stylesAnimationPassenger.rotation} scale={stylesAnimationPassenger.scale}>
        <BusStopScene/>
        <SceneBackground color={'#0e0021'} />
      </a.group>} */}
    </>
  );
  return (
    <>
      {currentScene === "phone" && <a.group rotation={stylesAnimationPhone.rotation} scale={stylesAnimationPhone.scale}>
        <ScrollScenePhone/>
        <SceneBackground color={'#ffff'} />
      </a.group>}
      {currentScene === "car" && <a.group rotation={stylesAnimationCar.rotation} scale={stylesAnimationCar.scale}>
        <ScrollSceneCar />
        <SceneBackground color={'#1e1b4b'} />
      </a.group>}
      {currentScene === "passenger" && <a.group  rotation={stylesAnimationPassenger.rotation} scale={stylesAnimationPassenger.scale}>
        <BusStopScene/>
        <SceneBackground color={'#0e0021'} />
      </a.group>}
    </>
  );
}