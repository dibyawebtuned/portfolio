"use client";
import { useEffect, useRef } from "react";
import Image from 'next/image'

const About = () => {
    const textRef = useRef<HTMLHeadingElement | null>(null);
    const animationRef = useRef<any>(null);

    useEffect(() => {
        const loadGSAP = async () => {
            const gsapModule = await import("gsap");
            const gsap = gsapModule.default;

            // @ts-ignore (SplitText is external)
            const SplitText = (await import("gsap/SplitText")).default || (window as any).SplitText;

            // @ts-ignore (ScrollTrigger is external)
            const ScrollTriggerModule = (await import("gsap/ScrollTrigger")).default || (window as any).ScrollTrigger;

            if (!textRef.current || !SplitText || !ScrollTriggerModule) return;

            gsap.registerPlugin(SplitText, ScrollTriggerModule);

            document.fonts.ready.then(() => {
                gsap.set(textRef.current, { opacity: 1 });

                const splitInstance = new SplitText(textRef.current, {
                    type: "lines,words",
                    linesClass: "line",
                });

                animationRef.current = gsap.from(splitInstance.lines, {
                    duration: 1.2,
                    yPercent: 120,
                    opacity: 0,
                    stagger: 0.25,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%", // Trigger when top of element hits 80% of viewport height
                        toggleActions: "play none none none", // Play once
                    },
                });
            });
        };

        loadGSAP();
    }, []);

    const handleReplay = () => {
        if (animationRef.current) {
            animationRef.current.timeScale(0.3).restart();
        }
    };

    return (
        <section className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />

            {/* CONTENT CONTAINER */}
            <div className='relative max-w-[1440px] mx-auto px-[80px] py-[100px]'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='flex-1'>
                        <h1
                            className={`heading text-5xl font-bold mb-6 big-shoulders text-[#F0EBE6]`}>
                            About
                        </h1>
                    </div>

                    <div className='flex-1'>
                        <p
                            ref={textRef}
                            className='geist text-end text-[16px] text-[#F5F5F5]'>
                            Saman Maharjan was born and raised in Kathmandu, Nepal, where he began learning magic at the age of eleven.
                            Saman’s unique and artistic style has dazzled audiences everywhere from small private parties to large theatrical
                            venues, and he’ll guarantee to keep you on the edge of your seat.
                        </p>
                    </div>
                </div>

                {/* ================ VIDEO SECTION ================ */}
                <div className='mt-16 flex justify-center'>
                    {/* <video
                        src="/public/assets/img/video.avif"
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full h-[480px] rounded-xl shadow-lg"
                    >
                        Your browser does not support the video tag.
                    </video> */}

                    <Image
                        src="/assets/img/video.avif"
                        alt="Banner"
                        width={1200}
                        height={480}
                        className="w-full h-[480px] object-cover rounded-xl shadow-lg"
                    />

                    {/* Alternatively, for YouTube embed: */}
                    {/*
                    <iframe
                        width="100%"
                        height="500"
                        className="max-w-4xl rounded-xl shadow-lg"
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        title="Showreel Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    */}
                </div>
            </div>
        </section>
    )
}

export default About