import * as THREE from "three";
import React from "react";
import { useControls } from "leva";
import { Canvas, useLoader } from "@react-three/fiber";
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

function Image({ img, position, visible }) {
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
        visible={visible}
      />
    </mesh>
  );
}

const Scene = () => {
  const controls = useControls({
    spacing: {
      value: 1,
      min: 0,
      max: 2,
      step: 0.01,
    },
    translateX: {
      value: 0,
      min: -4,
      max: 4,
      step: 0.01,
    },
    translateY: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.01,
    },
    translateZ: {
      value: 0,
      min: -15,
      max: 0,
      step: 0.01,
    },
    showSlices: {
      value: [0, 8],
      min: 0,
      max: 8,
      step: 1,
    },
  });

  console.log("Distance:", controls);

  return (
    <>
      <ambientLight />
      <OrbitControls />
      {[img1, img2, img3, img4, img5, img6, img7, img8].map((img, i) => (
        <Image
          key={i}
          img={img}
          visible={i >= controls.showSlices[0] && i < controls.showSlices[1]}
          position={[
            controls.translateX,
            controls.translateY,
            controls.translateZ + i * controls.spacing,
          ]}
        />
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
