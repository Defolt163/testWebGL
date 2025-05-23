'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, useScroll, OrbitControls, Environment, OrthographicCamera, CameraControls, Text, Billboard, Html } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import PhoneModel from './PhoneScene/PhoneModel';
import CarModel from './CarScene/CarModel';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollRouter from './ScrollRouter'
import MobileScrollRouter from './MobileScene/MobileScrollRouter'
import { useSpring, a } from '@react-spring/three';
import * as THREE from 'three';
import ScrollScenePhone from './PhoneScene/ScenePhone';
import ScrollSceneCar from './CarScene/SceneCar';
import BusStopScene from './BusScene/BusStopScene';

/* function ScrollScene({ setShowText }) {
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
} */

export function Scene1() {
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
      <Canvas camera={{ position: [0, 0, 5], fov: 15 }}>
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

export default function Scene() {
  const [currentScene, setCurrentScene] = useState("phone");
  const [showText, setShowText] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(false)
  const [mouseOnFrame, setMouseOnFrame] = useState(true)
  const [overflowY, setOverflowY] = useState('')

  useEffect(()=>{
    //console.log(mouseOnFrame)
    console.log(scrollProgress)
    if (mouseOnFrame && !scrollProgress){
      window.scrollTo(0, 0)
      setOverflowY('overflow-y-hidden')
    }else{
      setOverflowY('')
    } 
  },[scrollProgress, mouseOnFrame])
  const [screenWidth, setScreenWidth] = useState(1300);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <div className={`relative h-full ${overflowY}`}>
      {/* HTML-блоки для каждой сцены */}
      <AnimatePresence mode='wait'>
        {currentScene === "phone" && showText && (
          <>
            <motion.div
              key="text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: showText ? 0.3 : 0.1 }}
              className="absolute top-1/4 left-5 z-10 w-1/2 text-gray-500 font-bold pointer-events-none"
            >
              <div>
                <h2 className='mb-6 text-6xl max-xl:text-4xl'>Мобильный сервис создания и бронирования поездок</h2>
                <h3 className='text-3xl max-xl:text-2xl'>В современном ритме жизни, время имеет решающее значение. Наше приложение дает тебе возможность создавать поездки и бронировать трансфер в удобное для тебя время, экономя драгоценные минуты.</h3>
              </div>
              
            </motion.div>
          </>
        )}
        {screenWidth >= 768 && currentScene === "car" && showText && (
          <>
            <motion.div 
               key="driverScreen"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: showText ? 0.2 : 0.1 }}
                className="pointer-events-none overflow-hidden absolute top-0 right-0 h-full w-1/2 bg-black z-[9] text-white py-8 px-6 after:content-[''] after:absolute after:top-2 after:left-2 after:w-4 after:h-4 after:rounded-full after:bg-green-400 flex flex-col items-center justify-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('/white-short-logo.png')] before:bg-cover before:opacity-5 shadow-2xl shadow-amber-600">
                  <h2 className='text-3xl mb-4 max-xl:text-2xl'>Наша платформа предоставляет вам абсолютную свободу действий. Вы сами решаете, когда и какие поездки выполнять. Создавайте собственный гибкий график, выбирайте наиболее привлекательные заказы и путешествуйте по городу, зарабатывая на каждой поездке</h2>
                  <h3 className='text-2xl font-bold max-xl:text-xl'>Присоединяйтесь к нам и станьте частью революционного движения, которое меняет правила игры в сфере мобильности. </h3>
            </motion.div>
          </>
        )}
        {screenWidth >= 768 && currentScene === "passenger" && showText && (
          <>
            <motion.div 
               key="PassengerScreen"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: showText ? 0.2 : 0.1 }}
                className="pointer-events-none overflow-hidden absolute top-0 left-0 h-full w-1/2 bg-black z-[9] text-white py-8 px-6 after:content-[''] after:absolute after:top-2 after:right-2 after:w-4 after:h-4 after:rounded-full after:bg-green-400 flex flex-col items-center justify-center before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url('/white-short-logo.png')] before:opacity-5 shadow-amber-600 shadow-[15px_0_10px_0_rgba(0,0,0,0.3)]">
                  <h2 className='text-3xl mb-4 max-xl:text-2xl'>Всего в несколько кликов вы сможете разместить заявку на поездку по вашим личным предпочтениям. Укажите пункт отправления и назначения. Мы организуем для вас идеальную поездку.</h2>
                  <h3 className='text-2xl font-bold max-xl:text-xl'>Путешествуйте в своем ритме, наслаждайтесь свободой маршрута и открывайте новые места. Создавайте поездки так, как вам удобно, и наш сервис воплотит ваши пожелания в реальность. Добро пожаловать в мир персонализированной мобильности!</h3>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CANVAS — одна для всех */}
        <div className='h-full' onMouseEnter={()=>{setMouseOnFrame(true)}} onMouseLeave={()=>{setMouseOnFrame(false)}}>
          <Canvas camera={{ position: [0, 0, 5], fov: (screenWidth > 1200 ? 15 : 27) || (screenWidth < 768 ? 35 : 15) }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <ScrollControls pages={screenWidth <= 768 ? 1 : 3 } damping={0.3}>
                {/* <ScrollScene setShowText={setShowText}/> */}
                {screenWidth <= 768 ? <MobileScrollRouter setCurrentScene={setCurrentScene} currentScene={currentScene} setShowText={setShowText} /> : 
                <ScrollRouter setScrollProgress={setScrollProgress} screenWidth={screenWidth} setCurrentScene={setCurrentScene} currentScene={currentScene} setShowText={setShowText}/>
                }
                
              </ScrollControls>
              <Environment preset="sunset" />
            </Suspense>
          </Canvas>
        </div>
    </div>
  );
}