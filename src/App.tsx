import * as THREE from "three";
import { Suspense, useState } from "react";
import { useControls } from "leva";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import "./App.css";

function Image({
  img,
  position,
  visible,
}: {
  img: string;
  position: [number, number, number];
  visible: boolean;
}) {
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

const Scene = ({ uploadedImages }: { uploadedImages: string[] }) => {
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
      value: [0, uploadedImages.length],
      min: 0,
      max: uploadedImages.length,
      step: 1,
    },
  });

  return (
    <>
      <ambientLight />
      <OrbitControls />
      {uploadedImages.map((img, i) => (
        <>
          {" "}
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
          <Html
            position={[
              controls.translateX,
              controls.translateY,
              controls.translateZ + i * controls.spacing,
            ]}
          >
            {i}
          </Html>
        </>
      ))}
    </>
  );
};

const App = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const uploadedImageUrls =
      files && Array.from(files).map((file) => URL.createObjectURL(file));

    setUploadedImages(uploadedImageUrls || []);
  };

  return (
    <div className="App">
      <input
        title="Upload image"
        type="file"
        multiple
        onChange={handleFileUpload}
      />
      {uploadedImages.length > 0 && (
        <Canvas
          camera={{
            fov: 70,
            position: [0, 0, -3],
          }}
        >
          <Suspense fallback={<Html>Loading...</Html>}>
            <Scene uploadedImages={uploadedImages} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default App;
