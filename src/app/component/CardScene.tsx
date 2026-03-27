"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ✅ Type for GLTF
type GLTFResult = {
  scene: THREE.Group;
};

// 🎴 Card Component
function Card(): JSX.Element {
  const { scene } = useGLTF("/models/card.glb") as unknown as GLTFResult;
  const ref = useRef<THREE.Object3D | null>(null);

  useFrame(({ mouse }) => {
    if (!ref.current) return;

    // mouse interaction
    ref.current.rotation.y = mouse.x * 0.5;
    ref.current.rotation.x = mouse.y * 0.3;
  });

  return <primitive ref={ref} object={scene} scale={2} />;
}

// 🎥 Camera Animation
function CameraAnimation(): null {
  const { camera } = useThree();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(camera.position, {
        x: 2,
        y: 1,
        z: 3,
        scrollTrigger: {
          trigger: ".section",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(camera.rotation, {
        y: Math.PI / 4,
        scrollTrigger: {
          trigger: ".section",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [camera]);

  return null;
}

// 🎬 Main Scene
export default function CardScene(): JSX.Element {
  return (
    <div className="section h-[200vh]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 5]} />

        <Card />
        <CameraAnimation />
      </Canvas>
    </div>
  );
}

// 🔥 Preload model (performance boost)
useGLTF.preload("/models/card.glb");