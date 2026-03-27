"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Aboutme = () => {
    const textRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(textRef.current, {
            x: "-100%", // Move text fully to the left
            ease: "none",
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 20%",   // When top of text is 80% from top of viewport
                end: "bottom 20%",  // When bottom of text is 20% from top
                scrub: true,        // Smooth scroll syncing
            },
        });
    }, []);

    return (
        <div style={{ height: "100vh", paddingTop: "50vh", overflow: "hidden" }}>
            <h1
                ref={textRef}
                style={{
                    whiteSpace: "nowrap",   // Keep text in one line
                    fontSize: "4rem",
                    fontWeight: "bold",
                }}
            >
                This text scrolls horizontally as you scroll down! 🌟
            </h1>
        </div>
    );
};

export default Aboutme;