import * as THREE from "three";
import React, { useRef } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Sphere,
  OrbitControls,
  Environment,
  useEnvironment,
} from "@react-three/drei";
import { useControls } from "leva";
import "./App.css";
import img from "./1.png";

function Image() {
  const texture = useLoader(THREE.TextureLoader, img);
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[4, 4]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
}

const ReflectiveSphere = () => {
  const tweakableProperties = useControls({
    color: "#ffffff",
    roughness: { value: 0.5, min: 0, max: 1, step: 0.01 },
    metalness: { value: 0.5, min: 0, max: 1, step: 0.01 },
  });

  const envMap = useEnvironment({ files: "./sky.hdr" });
  const sphere = useRef();
  useFrame((state, delta) => {
    sphere.current.rotation.y += delta;
  });
  return (
    <Sphere ref={sphere} args={[1, 1, 256]}>
      <meshStandardMaterial {...tweakableProperties} envMap={envMap} />
      <Environment background files={"./sky.hdr"} />
    </Sphere>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />
      <ReflectiveSphere />
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
