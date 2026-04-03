"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Import local images
import Image1 from "../../../public/assets/img/saman_1.png";
import Image2 from "../../../public/assets/img/saman_2.png";
import Image3 from "../../../public/assets/img/saman_3.png";
import Image4 from "../../../public/assets/img/saman_4.png";

const HoverFollowImages = () => {
    const containerRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        gsap.set(".swipeimage", { xPercent: -50, yPercent: -50 });

        containerRefs.current.forEach((el) => {
            const wrapper = el.querySelector<HTMLDivElement>(".swipeimage");
            if (!wrapper) return;

            const setX = gsap.quickTo(wrapper, "x", { duration: 0.4, ease: "power3" });
            const setY = gsap.quickTo(wrapper, "y", { duration: 0.4, ease: "power3" });

            const move = (e: MouseEvent) => {
                setX(e.clientX);
                setY(e.clientY);
            };

            const show = () => {
                document.addEventListener("mousemove", move);
                gsap.to(wrapper, { autoAlpha: 1, visibility: "visible", duration: 0.25 });
            };

            const hide = () => {
                document.removeEventListener("mousemove", move);
                gsap.to(wrapper, { autoAlpha: 0, visibility: "hidden", duration: 0.2 });
            };

            el.addEventListener("mouseenter", show);
            el.addEventListener("mouseleave", hide);
        });
    }, []);

    const items = [
        {
            id: "01",
            title: "Corporate Shows",
            images: [Image1, Image2, Image3],
            desc: "One Man Wonder Show is a high-impact entertainment experience designed especially for professional events and business gatherings.",
        },
        {
            id: "02",
            title: "Closeup Magic",
            images: [Image2, Image3, Image4],
            desc: "An interactive 2-hour close-up magic show with full entertainment and a powerful surprise twist.",
        },
        {
            id: "03",
            title: "Private Parties",
            images: [Image1, Image4],
            desc: "A 1-hour One Man Wonder Show with close-up and stage magic, full entertainment, and a surprise twist.",
        },
        {
            id: "04",
            title: "Special Events",
            images: [Image2, Image3],
            desc: "A 2-hour One Man Wonder Show featuring close-up and stage magic, full entertainment, and a powerful plot twist.",
        },
    ];

    return (
        <div className="border-2 border-green-600 bg-gray-900 min-h-screen">
            <div className="max-w-[1440px] mx-auto px-[20px] md:px-[80px] py-[50px] md:py-[100px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="big-shoulders font-bold text-[48px] lg:text-[64px] xl:text-[87px] text-[#F0EBE6]">
                        What I Do
                    </h1>
                    <p className="mt-4 mx-auto text-sm sm:text-base md:text-lg lg:text-xl max-w-xl sm:max-w-2xl leading-relaxed text-[#F0EBE6] opacity-80">
                        Saman’s unique and artistic style has dazzled audiences everywhere from small private parties to large theatrical venues, and he’ll guarantee to keep you on the edge of your seat.
                    </p>
                </div>

                {/* Items */}
                <ul className="list-none m-0 p-0 space-y-12">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="relative border-b border-gray-700 pb-8 sm:pb-12 cursor-pointer"
                            ref={(el) => { if (el) containerRefs.current[index] = el; }}
                        >
                            {/* Hover Images */}
                            <div className="swipeimage fixed top-0 left-0 flex gap-3 pointer-events-none z-50 opacity-0 invisible transform -translate-x-1/2 -translate-y-1/2">
                                {item.images.map((imgSrc, i) => (
                                    <Image
                                        key={i}
                                        src={imgSrc}
                                        alt={`hover-${i}`}
                                        width={180}
                                        height={180}
                                        className="object-cover rounded-lg shadow-lg"
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-12">
                                {/* Left Text */}
                                <div>
                                    <span className="big-shoulders text-lg sm:text-xl font-bold text-[#F0EBE6]">
                                        {item.id}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl big-shoulders font-bold text-[#F0EBE6] mt-2">
                                        {item.title}
                                    </h2>
                                </div>

                                {/* Right Description + Link */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-8">
                                    <p className="text-sm sm:text-base md:text-lg text-[#F0EBE6] opacity-90 max-w-md">
                                        {item.desc}
                                    </p>
                                    <Link href="#" className="mt-2 sm:mt-0">
                                        <ArrowUpRight size={30} className="text-[#F0EBE6]" />
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HoverFollowImages;