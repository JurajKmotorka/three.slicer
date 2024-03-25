import { OrbitControls, Html } from "@react-three/drei";
import Image from "./Image";

interface Image {
  url: string;
  name: string;
}
export default function Scene({
  uploadedImages,
  aspectRatio,
  translateX,
  translateY,
  translateZ,
  spacing,
  showSlices,
  labels,
}: {
  uploadedImages: Image[];
  aspectRatio: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  spacing: number;
  showSlices: number[];
  labels: boolean;
}) {
  return (
    <>
      <ambientLight />
      <OrbitControls />
      {uploadedImages.map((img, i) => (
        <>
          <Image
            key={i}
            img={img.url}
            visible={i >= showSlices[0] && i < showSlices[1]}
            position={[translateX * -1, translateY, translateZ + i * spacing]}
            aspectRatio={aspectRatio}
          />
          {labels && (
            <Html
              position={[
                translateX + 2,
                translateY - 1,
                translateZ + i * spacing,
              ]}
            >
              {img.name}
            </Html>
          )}
        </>
      ))}
    </>
  );
}
