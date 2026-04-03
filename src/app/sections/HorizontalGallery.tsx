// components/HorizontalGallery.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, UserCheck, Handshake, Users } from "lucide-react";

import "aos/dist/aos.css";
import AOS from "aos";

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        icon: <Clock size={32} />,
        title: "ALWAYS ON TIME",
        description:
            "We know that time is precious, especially in the corporate event world. Our magicians arrive promptly, allowing you to focus on other crucial aspects of your event without worrying about delays or disruptions.",
    },
    {
        icon: <UserCheck size={32} />,
        title: "WELL-DRESSED",
        description:
            "First impressions matter, and our best corporate magicians really understand the significance of dressing to impress. They exude sophistication, elegance, and style.",
    },
    {
        icon: <Handshake size={32} />,
        title: "PROFESSIONAL CONDUCT",
        description:
            "Our corporate magicians maintain a respectful and courteous demeanor throughout the event. They interact seamlessly with your guests.",
    },
    {
        icon: <Users size={32} />,
        title: "TAILORED FOR ADULTS",
        description:
            "Corporate events often cater to adult audiences who have seen it all. Each magician specializes in captivating and engaging sophisticated crowds.",
    },
];

export default function HorizontalGallery() {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    const sectionRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !stripRef.current) return;

        const strip = stripRef.current;
        let stripWidth = strip.scrollWidth;
        let scrollDistance = stripWidth - window.innerWidth;

        const horizontalScroll = gsap.to(strip, {
            x: () => -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        const handleResize = () => {
            horizontalScroll.scrollTrigger?.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative w-full bg-black font-sans text-white overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,_#F13333_0%,_transparent_70%)] opacity-40 pointer-events-none" />

            <section ref={sectionRef} className="relative py-16">
                <h1 className="big-shoulders text-center text-[#F0EBE6] font-bold mb-12 leading-tight tracking-[0.02em] text-[48px] sm:text-[64px] lg:text-[87px]"
                    data-aos="fade-up">
                    How am I?
                </h1>

                <div className="overflow-hidden">
                    <div ref={stripRef} className="flex flex-nowrap gap-8 px-6">
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex-shrink-0 w-80 sm:w-100 p-6 rounded-3xl shadow-2xl backdrop-blur-md bg-black/50 border border-white/10 flex flex-col items-center text-center transform transition-transform hover:shadow-3xl"
                            >
                                {/* Glowing Icon */}
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#F13333] to-[#F13333]/10 shadow-lg relative animate-pulseHover mb-4">
                                    <span className="text-white">{item.icon}</span>
                                    {/* Glow ring */}
                                    <div className="absolute inset-0 rounded-full border border-[#F13333]/50 blur-md animate-pulseSlow"></div>
                                </div>

                                {/* Gradient Title */}
                                {/* <h3 className="big-shoulders text-2xl sm:text-3xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#F13333] via-[#FF5F5F] to-[#F13333]"> */}
                                <h3 className="big-shoulders text-2xl sm:text-3xl font-semibold mb-3 text-[#F0EBE6]">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="geist text-gray-300 text-[15px] leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}