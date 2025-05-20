import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export default function SceneBackground({ color }) {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(color);
  }, [color, scene]);

  return null;
}
