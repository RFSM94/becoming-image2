import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const Particles = ({ count, spread, positions, imagePaths }) => {
  const particleGroup = useRef();

const textures = useTexture(imagePaths);

  const particles = useMemo(() => {
    const particlePositions = [];
    const step = positions.length / count;
    let index = 0;
    for (let i = 0; i < count; i++) {
      const position = positions[Math.floor(index)];
      particlePositions.push(position);
      index += step;
    }
    return particlePositions;
  }, [count, positions]);

  const smoothstep = (min, max, value) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  const updateParticles = () => {
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      const mesh = particleGroup.current.children[i];

      // Apply initial position from the positions array
      if (!particle.initialized) {
        const position = positions[i % positions.length];
        mesh.position.x = position[0];
        mesh.position.y = position[1];
        mesh.position.z = position[2];
        particle.initialized = true;
      }

      const flow = new THREE.Vector3(
        Math.sin(mesh.position.y * 0.2 + Math.random()) * Math.sin(mesh.position.z * 0.5 + Math.random()),
        Math.cos(mesh.position.x * 0.2 + Math.random()) * Math.cos(mesh.position.z * 0.5 + Math.random()),
        Math.sin(mesh.position.x * 0.2 + Math.random()) * Math.cos(mesh.position.y * 0.5 + Math.random())
      );

      const speed = 0.05;
      mesh.position.x += flow.x * speed;
      mesh.position.y += flow.y * speed;
      mesh.position.z += flow.z * speed;

      // wrap particles around when they go out of bounds
      if (Math.abs(mesh.position.x) > spread / 2) {
        mesh.position.x *= -1;
      }
      if (Math.abs(mesh.position.y) > spread / 2) {
        mesh.position.y *= -1;
      }
      if (Math.abs(mesh.position.z) > spread / 2) {
        mesh.position.z *= -1;
      }
    }
  };

  useFrame(() => {
    updateParticles();
  });

  useEffect(() => {
    return () => {
      // Clean up any resources if needed
    };
  }, []);

  return (
    <group ref={particleGroup} frustumCulled={false}>
      {particles.map((position, index) => (
        <mesh key={index} position={position}>
          <planeGeometry args={[1, 1]} /> {/* Increase the size of the particles */}
          <meshBasicMaterial
  map={textures[index % textures.length]}
  alphaTest={1}
  depthTest={false}
  dithering={true}
/>
        </mesh>
      ))}
    </group>
  );
};

export default Particles;