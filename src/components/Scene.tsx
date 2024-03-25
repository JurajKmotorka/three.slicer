import { OrbitControls, Html } from "@react-three/drei";
import Image from "./Image";

interface Image {
  url: string;
  name: string;
}
export default function Scene({
  uploadedImages,
  translateX,
  translateY,
  translateZ,
  spacing,
  showSlices,
}: {
  uploadedImages: Image[];
  translateX: number;
  translateY: number;
  translateZ: number;
  spacing: number;
  showSlices: number[];
}) {
  return (
    <>
      <ambientLight />
      <OrbitControls />
      {uploadedImages.map((img, i) => (
        <>
          {" "}
          <Image
            key={i}
            img={img.url}
            visible={i >= showSlices[0] && i < showSlices[1]}
            position={[translateX * -1, translateY, translateZ + i * spacing]}
          />
          <Html
            position={[
              translateX + 2,
              translateY - 1,
              translateZ + i * spacing,
            ]}
          >
            {img.name}
          </Html>
        </>
      ))}
    </>
  );
}
