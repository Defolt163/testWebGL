import { useGLTF } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PhoneModel({ scroll }) {
  const group = useRef();
  const { scene, materials } = useGLTF('/untitled.glb');

  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = '/demo.mp4';
    vid.crossOrigin = 'Anonymous';
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = false;
    return vid;
  });

  const [videoTexture] = useState(() => {
    const texture = new THREE.VideoTexture(video);
    texture.flipY = false;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.encoding = THREE.sRGBEncoding;
    return texture;
  });


  useEffect(() => {
    if (materials.Wallpaper) {
      materials.Wallpaper.map = videoTexture;
      materials.Wallpaper.needsUpdate = true;
    }
  }, [materials, videoTexture]);

  useFrame(() => {
    const r = scroll.current;
    group.current.rotation.y = THREE.MathUtils.lerp(0, Math.PI, r);

    // Запускаем видео, когда телефон почти повернулся
    if (r > 0.9 && video.paused) {
      video.play();
    }
  });

  return <primitive object={scene} ref={group} scale={1} />;
}
