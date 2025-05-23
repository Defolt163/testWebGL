'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Text3D, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollScenePhone from './PhoneScene/ScenePhone'
import ScrollSceneCar from './CarScene/SceneCar'
import SceneBackground from './SceneBackground'
import { useSpring, a } from '@react-spring/three';
import BusStopScene from './BusScene/BusStopScene';

export default function ScrollRouter({ setScrollProgress, setCurrentScene, currentScene, setShowText, screenWidth }) {

  const scroll = useScroll();

  useFrame(() => {
    const progress = scroll.offset * 2;

    if (progress < 1) {
      setCurrentScene("phone")
      if(progress > 0.5344080511007334 && progress < 1){
        setShowText(true)
      }else{
        setShowText(false)
      }
    }
    else if (progress > 1 && progress < 1.39)setCurrentScene("car")
    else if (progress > 1.39){
      setCurrentScene("passenger")
      if(progress > 1.7){
        setScrollProgress(true)
      }else{
        setScrollProgress(false)
      }
    }
  });
  useEffect(()=>{
    console.log(currentScene)
  }, [currentScene])
  const groupRef = useRef();
  const stylesAnimationPhone = useSpring({
    scale: currentScene === "phone" ? 1 : 0,
    rotation: currentScene === "phone" ? [0, 0, 0] : [0, Math.PI / 2, 0],
    config: { mass: 3, tension: 170, friction: 26 },
  });

  const stylesAnimationCar = useSpring({
    scale: currentScene == "car" ? 1 : 0,
    rotation: currentScene == "car" ? [0, 0, 0] : [0, Math.PI / 2, 0],
    config: { mass: 3, tension: 170, friction: 26 },
  });

  const stylesAnimationPassenger = useSpring({
    scale: currentScene === "passenger" ? 1 : 0,
    rotation: currentScene === "passenger" ? [0, 0, 0] : [0.2, Math.PI / -2,0],
    config: { mass: 0.2, tension: 400, friction: 50 },
  });

  return (
    <>
      {<a.group visible={currentScene === 'phone'} rotation={stylesAnimationPhone.rotation} scale={stylesAnimationPhone.scale}>
        <ScrollScenePhone screenWidth={screenWidth}/>
      </a.group>}
      {<a.group visible={currentScene === 'car'} rotation={stylesAnimationCar.rotation} scale={stylesAnimationCar.scale}>
        <ScrollSceneCar screenWidth={screenWidth}/>
      </a.group>}
      {<a.group visible={currentScene === 'passenger'} rotation={stylesAnimationPassenger.rotation} scale={stylesAnimationPassenger.scale}>
        <BusStopScene screenWidth={screenWidth}/>
      </a.group>}
      {currentScene === 'phone' && <SceneBackground color={'#ffff'} />}
      {currentScene === 'car' && <SceneBackground color={'#1e1b4b'} />}
      {currentScene === 'passenger' && <SceneBackground color={'#0e0021'} />}
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