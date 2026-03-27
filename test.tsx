"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import MagicCards from "@/app/component/UI/MagicCards";
import { handleBuildComplete } from "next/dist/build/adapter/build-complete";

const sentence =
    "Where Magic Meets Mind, Revealing What the Eyes Cannot See.";

const LETTER_SPACING = 3;
const FONT_SIZE = 5;
const FONT_PATH = "/fonts/BigShoulders_18pt-Bold.ttf";

const FormingText = ({ scrollY }: { scrollY: number }) => {
    const groupRef = useRef<any>(null);
    const chars = sentence.split("");

    useFrame(() => {
        if (!groupRef.current) return;

        const group = groupRef.current;
        const totalTextWidth = chars.length * LETTER_SPACING;
        const startX = totalTextWidth / 2;
        const offsetRight = 5;
        group.position.x = startX + offsetRight - scrollY * 0.02;

        let offsetX = -totalTextWidth / 2;

        group.children.forEach((child: any, i: number) => {
            const char = chars[i];
            const direction = i % 2 === 0 ? 6 : -5;
            const delay = i * 15;
            const progress = (scrollY - delay) * 0.02;
            const p = Math.max(0.2, Math.min(progress, 1));
            child.position.y = direction * (1 - p);
            child.position.x = offsetX;
            child.material.opacity = p;

            offsetX += LETTER_SPACING;
            if (char === " ") offsetX += 0.5;
        });
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {chars.map((char, i) => (
                <Text
                    key={i}
                    fontSize={FONT_SIZE}
                    font={FONT_PATH}
                    anchorX="center"
                    anchorY="middle"
                    material-transparent
                    material-opacity={0}
                    position={[0, 0, 0]}
                >
                    {char === " " ? "\u00A0" : char}
                </Text>
            ))}
        </group>
    );
};

const Marquee = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div
                style={{
                    height: "50vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Canvas
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    camera={{ position: [0, 0, 15] }}
                >
                    <ambientLight intensity={0.5} />
                    <FormingText scrollY={scrollY} />
                </Canvas>
            </div>

            <div className="max-w-2xl mx-auto">
                <p className="text-center">
                    Attention is everywhere — but true experiences
                    are rare. We create moments that captivate minds
                    and defy explanation.
                </p>

                <MagicCards />

                <p className="text-center">
                    His signature style lies in close-up magic —
                    intimate, interactive, and astonishing.
                    Performing directly at tables, he makes objects
                    vanish and reappear in impossible places, often
                    in the very hands of his audience. Cards, cash,
                    borrowed jewelry, strings, even phones become
                    instruments of wonder.
                </p>
            </div>
        </>
    );
};

export default Marquee;