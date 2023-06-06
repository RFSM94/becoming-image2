import { Billboard, useTexture } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";
import { curlNoise } from "../utils/curlNoise"; // Import the curlNoise function
import { gsap } from "gsap";

export const Images = ({ sceneOpacity, imagePaths, positions }) => {
  const imageRefs = useRef([]);
  const [imageSizes, setImageSizes] = useState([]);

  useEffect(() => {
    imageRefs.current = imageRefs.current.slice(0, imagePaths.length);
  }, [imagePaths]);

  useEffect(() => {
    const calculateImageSizes = async () => {
      const sizes = await Promise.all(
        imagePaths.map((imagePath) => {
          return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
              const { width, height } = image;
              resolve({ width, height });
            };
            image.src = imagePath;
          });
        })
      );
      setImageSizes(sizes);
    };

    calculateImageSizes();
  }, [imagePaths]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    imageRefs.current.forEach((imageRef, index) => {
      if (imageRef && imageRef.material) {
        const position = positions[index];
        const noise = curlNoise(
          position[0] * 0.01,
          position[1] * 0.01,
          position[2] * 0.01
        );
        const movementScale = 0.2; // Adjust the movement scale as desired

        const newPosition = [
          position[0] + noise.x * movementScale,
          position[1] + noise.y * movementScale,
          position[2] + noise.z * movementScale,
        ];

        imageRef.current.position.set(...newPosition);
        imageRef.current.lookAt(new THREE.Vector3(...position));
        imageRef.current.opacity = sceneOpacity.current;
      }
    });
  });

  return (
    <>
      {positions.map((position, index) => {
        const imagePath = imagePaths[index];
        const size = imageSizes[index];
        const width = size ? size.width : 1;
        const height = size ? size.height : 1;
        const aspectRatio = width / height;
        const scale = 3; // Adjust the scale factor as desired

        const side = index % 2 === 0 ? -1 : 1; // Alternate between -1 (left) and 1 (right)
        const offset = side * 3; // Increase the offset value for wider spacing

        const imagePosition = [
          position[0] + offset,
          position[1],
          position[2],
        ];

        return (
          <Billboard key={index} position={imagePosition}>
            <Plane args={[aspectRatio * scale, 1 * scale]}>
              <meshStandardMaterial
                ref={(imageRef) => (imageRefs.current[index] = imageRef)}
                map={useTexture(imagePath)}
                transparent
                onBeforeCompile={fadeOnBeforeCompileFlat}
                onPointerOver={(e) => {
                  gsap.to(e.object.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 0.3,
                  });
                }}
                onPointerOut={(e) => {
                  gsap.to(e.object.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.3,
                  });
                }}
              />
            </Plane>
          </Billboard>
        );
      })}
    </>
  );
};
