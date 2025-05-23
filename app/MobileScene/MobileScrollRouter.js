'use client';
import SceneBackground from './SceneBackground'
import { useSpring, a } from '@react-spring/three';
import ScrollMobileScenePhone from './MobileScenePhone/ScenePhone';

export default function MobileScrollRouter({ setCurrentScene, currentScene }) {

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
    </>
  );
}