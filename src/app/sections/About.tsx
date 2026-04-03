"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

import "aos/dist/aos.css";
import AOS from "aos";

const About = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    // Reference for the text to animate
    const textRef = useRef<HTMLParagraphElement | null>(null);

    // Reference for GSAP animation instance
    const animationRef = useRef<GSAPTween | null>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            // Dynamic import of GSAP plugins
            const SplitTextModule = await import("gsap/SplitText");
            const SplitText = SplitTextModule.default;

            const ScrollTriggerModule = await import("gsap/ScrollTrigger");
            const ScrollTrigger = ScrollTriggerModule.default;

            // Register plugins
            gsap.registerPlugin(SplitText, ScrollTrigger);

            if (!textRef.current) return;

            // Wait for fonts to load for smoother animation
            document.fonts.ready.then(() => {
                gsap.set(textRef.current, { opacity: 1 });

                const splitInstance = new SplitText(textRef.current, {
                    type: "lines,words",
                    linesClass: "line",
                });

                // Animate each line
                animationRef.current = gsap.from(splitInstance.lines, {
                    duration: 1.2,
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.25,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });
            });
        };

        loadGSAP();
    }, []);

    // Optional: replay animation
    const handleReplay = () => {
        if (animationRef.current) {
            animationRef.current.timeScale(0.3).restart();
        }
    };

    return (
        <section className="relative w-full bg-[#0f0f0f] overflow-hidden font-sans text-white" id="about">
            {/* Background Gradient Glow */}
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" /> */}

            {/* Content Container */}
            <div className="relative max-w-[1440px] mx-auto px-[20px] md:px-[80px] py-[50px] md:py-[100px]">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="sm:flex-1" data-aos="fade-right">
                        <h1 className="big-shoulders text-[#F0EBE6] text-center sm:text-start font-bold mb-4 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[48px] lg:text-[64px] xl:text-[87px]">
                            The Journey
                        </h1>
                    </div>

                    <div className="sm:flex-1">
                        <p ref={textRef} className="geist text-center sm:text-end text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] text-[#F5F5F5] max-w-full sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed opacity-0"
                        >
                            Saman Maharjan was born and raised in Kathmandu, Nepal,
                            where he began learning magic at the age of eleven.
                            Saman’s unique and artistic style has dazzled audiences
                            everywhere from small private parties to large theatrical
                            venues, and he’ll guarantee to keep you on the edge of your
                            seat! He’s been featured on several shows like Daraz Online
                            Gala, where he appeared on the live show for different celebrities.
                            In addition to being a mind-blowing entertainer, Saman is also an
                            interesting, creative, and fun person to meet!
                        </p>
                    </div>
                </div>

                {/* Video Section */}
                <div className="mt-16 flex justify-center rounded-[20px] overflow-hidden"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay="300"
                    data-aos-easing="ease-out-cubic"
                    data-aos-once="true">
                    <video
                        src="/assets/img/bannervideo.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-[480px] rounded-xl shadow-lg object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default About;