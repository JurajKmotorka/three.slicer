import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
export default function Image({
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
