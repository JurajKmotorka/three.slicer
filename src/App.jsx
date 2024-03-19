import * as THREE from "three";
import React, { useRef } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import img1 from "/1.png";
import img2 from "/2.png";

function Image({ img, position }) {
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh position={position}>
      <planeGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial
        transparent
        side={THREE.DoubleSide}
        attach="material"
        map={texture}
        toneMapped={false}
      />
    </mesh>
  );
}

const Scene = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />
      <Image img={img1} position={[0, 0, 0]} />
      <Image img={img2} position={[0, 0, 1]} />
    </>
  );
};

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
};

export default App;
