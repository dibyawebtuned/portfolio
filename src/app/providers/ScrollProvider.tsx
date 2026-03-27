"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "locomotive-scroll/dist/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollRef.current) return;

        let locoScroll: any;

        const initScroll = async () => {
            const LocomotiveScroll = (await import("locomotive-scroll")).default;

            locoScroll = new LocomotiveScroll({
                el: scrollRef.current,
                smooth: true,
                lerp: 0.08,
            });

            // Sync GSAP with Locomotive
            locoScroll.on("scroll", ScrollTrigger.update);

            ScrollTrigger.scrollerProxy(scrollRef.current!, {
                scrollTop(value) {
                    if (arguments.length) {
                        locoScroll.scrollTo(value, {
                            duration: 0,
                            disableLerp: true,
                        });
                    } else {
                        return locoScroll.scroll.instance.scroll.y;
                    }
                },

                getBoundingClientRect() {
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight,
                    };
                },

                pinType: scrollRef.current!.style.transform
                    ? "transform"
                    : "fixed",
            });

            // Update on refresh
            const onRefresh = () => locoScroll.update();
            ScrollTrigger.addEventListener("refresh", onRefresh);

            ScrollTrigger.refresh();
        };

        initScroll();

        return () => {
            if (locoScroll) {
                locoScroll.destroy();
            }

            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div
            id="scroll-container"
            data-scroll-container
            ref={scrollRef}
            style={{ overflow: "hidden" }}
        >
            {children}
        </div>
    );
}