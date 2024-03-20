import * as THREE from "three";
import React, { useRef } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import img1 from "/1.png";
import img2 from "/2.png";
import img3 from "/3.png";
import img4 from "/4.png";
import img5 from "/5.png";
import img6 from "/6.png";
import img7 from "/7.png";
import img8 from "/8.png";
import { degToRad } from "three/src/math/MathUtils";

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
      {[img1, img2, img3, img4, img5, img6, img7, img8].map((img, i) => (
        <Image key={i} img={img} position={[0, 0, i]} />
      ))}
    </>
  );
};

const App = () => {
  return (
    <div id="canvas-container">
      <Canvas
        camera={{
          fov: 70,
          position: [0, 0, -3],
        }}
      >
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
};

export default App;
