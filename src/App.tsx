import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import Scene from "./components/Scene";
import "./App.css";
import img1 from "/1.png";
import img2 from "/2.png";
import img3 from "/3.png";
import img4 from "/4.png";
import img5 from "/5.png";
import img6 from "/6.png";
import img7 from "/7.png";
import img8 from "/8.png";
import d1 from "/d1.png";
import d2 from "/d2.png";
import d3 from "/d3.png";
import d4 from "/d4.png";
import d5 from "/d5.png";

import DualSlider from "./components/DualSlider/DualSlider";

interface Image {
  url: string;
  name: string;
}

const App = () => {
  const placeholderImages: Image[] = [
    { url: d1, name: "3D" },
    { url: d2, name: "  Sl" },
    { url: d3, name: "    ic" },
    { url: d4, name: "      er" },
    { url: d5, name: "        🔬" },
  ];
  const [uploadedImages, setUploadedImages] =
    useState<Image[]>(placeholderImages);

  const defaultImages: Image[] = [
    { url: img1, name: "img1" },
    { url: img2, name: "img2" },
    { url: img3, name: "img3" },
    { url: img4, name: "img4" },
    { url: img5, name: "img5" },
    { url: img6, name: "img6" },
    { url: img7, name: "img7" },
    { url: img8, name: "img8" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const uploadedImageUrls =
      files &&
      Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      }));

    setUploadedImages(uploadedImageUrls || []);
  };
  const [aspectRatio, setAspectRatio] = useState<number[]>([1, 1]);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);
  const [translateZ, setTranslateZ] = useState<number>(0);
  const [spacing, setSpacing] = useState<number>(0.5);
  const [showSlices, setShowSlices] = useState<number[]>([
    0,
    uploadedImages.length,
  ]);
  const [labels, setLabels] = useState<boolean>(true);

  return (
    <div className="App flex">
      <div className="flex flex-col h-fit w-60 m-4 p-4 bg-slate-300 rounded-xl">
        <input
          className="py-2"
          title="Upload image"
          type="file"
          multiple
          onChange={handleFileUpload}
        />
        <div className="pb-2">
          <p>Aspect Ratio:</p>
          <input
            title="X"
            className="w-10"
            type="number"
            value={aspectRatio[0]}
            onChange={(e) =>
              setAspectRatio([parseFloat(e.target.value), aspectRatio[1]])
            }
          />{" "}
          x{" "}
          <input
            title="Y"
            className="w-10"
            type="number"
            value={aspectRatio[1]}
            onChange={(e) =>
              setAspectRatio([aspectRatio[0], parseFloat(e.target.value)])
            }
          />
        </div>
        <button
          className="p-2 border rounded bg-indigo-600 text-slate-50 hover:bg-indigo-500 "
          onClick={() => setUploadedImages(defaultImages)}
        >
          insert sample set
        </button>
        <div>
          {" "}
          <p>translateX</p>
          <input
            className="w-full"
            title="translateX"
            type="range"
            min="-10"
            max="10"
            value={translateX}
            onChange={(e) => setTranslateX(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <p>translateY</p>
          <input
            className="w-full"
            title="translateY"
            type="range"
            min="-10"
            max="10"
            value={translateY}
            onChange={(e) => setTranslateY(parseFloat(e.target.value))}
          />
        </div>
        <div>
          {" "}
          <p>translateZ</p>
          <input
            className="w-full"
            title="translateZ"
            type="range"
            min="-10"
            max="10"
            value={translateZ}
            onChange={(e) => setTranslateZ(parseFloat(e.target.value))}
          />
        </div>
        <div>
          {" "}
          <p>Spacing</p>
          <input
            className="w-full"
            title="spacing"
            type="range"
            min="0.01"
            max="2"
            step="0.01"
            value={spacing}
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <p>Displayed Slices</p>
          <DualSlider
            key={uploadedImages.length}
            min={0}
            max={uploadedImages.length}
            onChange={(min, max) => setShowSlices([min, max])}
          />
        </div>
        <div>
          <p>Show labels</p>
          <input
            title="labels"
            type="checkbox"
            defaultChecked
            onChange={() => setLabels(!labels)}
          />
        </div>
      </div>
      {uploadedImages.length > 0 && (
        <Canvas
          camera={{
            fov: 70,
            position: [0, 0, -3],
          }}
        >
          <Suspense fallback={<Html>Loading...</Html>}>
            <Scene
              uploadedImages={uploadedImages}
              translateX={translateX}
              translateY={translateY}
              translateZ={translateZ}
              spacing={spacing}
              showSlices={showSlices}
              aspectRatio={aspectRatio[0] / aspectRatio[1]}
              labels={labels}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
};

export default App;
