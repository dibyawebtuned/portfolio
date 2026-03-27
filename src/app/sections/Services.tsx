"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";

const servicesData = [
    {
        id: "01",
        title: "Corporate Shows",
        desc: "One Man Wonder Show is a high-impact entertainment experience designed especially for professional events and business gatherings.",
        images: [
            "/assets/img/saman_1.png",
            "/assets/img/saman_2.png",
            "/assets/img/saman_3.png",
        ],
    },
    {
        id: "02",
        title: "Closeup Magic",
        desc: "An interactive 2-hour close-up magic show with full entertainment and a powerful surprise twist.",
        images: [
            "/assets/img/saman_4.png",
            "/assets/img/saman_3.png",
            "/assets/img/saman_2.png",
        ],
    },
    {
        id: "03",
        title: "Private Parties",
        desc: "A 1-hour One Man Wonder Show with close-up and stage magic, full entertainment, and a surprise twist.",
        images: [
            "/assets/img/saman_3.png",
            "/assets/img/saman_1.png",
            "/assets/img/saman_2.png",
        ],
    },
    {
        id: "04",
        title: "Special Events",
        desc: "A 2-hour One Man Wonder Show featuring close-up and stage magic, full entertainment, and a powerful plot twist.",
        images: [
            "/assets/img/saman_3.png",
            "/assets/img/saman_1.png",
            "/assets/img/saman_2.png",
        ],
    },
];

const Services = () => {
    const previewRef = useRef<HTMLDivElement>(null);

    // quickTo setters
    const xTo = useRef<((value: number) => void) | null>(null);
    const yTo = useRef<((value: number) => void) | null>(null);

    const [activeImages, setActiveImages] = useState(
        servicesData[0].images
    );

    // initialize quickTo once
    useEffect(() => {
        const preview = previewRef.current;
        if (!preview) return;

        xTo.current = gsap.quickTo(preview, "x", {
            duration: 0.25,
            ease: "power2.out",
        });

        yTo.current = gsap.quickTo(preview, "y", {
            duration: 0.25,
            ease: "power2.out",
        });
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!xTo.current || !yTo.current) return;

        xTo.current(e.clientX + 20);
        yTo.current(e.clientY + 20);
    };

    const handleMouseEnter = (images: string[]) => {
        const preview = previewRef.current;
        if (!preview) return;

        setActiveImages(images);

        gsap.fromTo(
            preview,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                ease: "power3.out",
            }
        );
    };

    const handleMouseLeave = () => {
        const preview = previewRef.current;
        if (!preview) return;

        gsap.to(preview, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power3.out",
        });
    };

    return (
        <section className="relative w-full bg-black overflow-hidden text-white">
            {/* Cursor Preview */}
            <div
                ref={previewRef}
                className="fixed top-0 left-0 flex gap-2 p-2 rounded-xl pointer-events-none z-50 opacity-0 scale-75"
            >
                {activeImages.map((img, i) => (
                    <div
                        key={i}
                        className="relative w-[300px] h-[150px] overflow-hidden rounded-md"
                    >
                        <Image
                            src={img}
                            alt="preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>

            <div className="max-w-[1440px] mx-auto px-[80px] py-[100px]">
                <div>
                    <h1 className="text-[87px] font-bold text-center big-shoulders text-[#F0EBE6]">
                        What I Do
                    </h1>
                    <p className="max-w-2xl mx-auto geist text-center text-[18px] leading-6">
                        Saman’s unique and artistic style has dazzled audiences everywhere
                        from small private parties to large theatrical venues, and he’ll
                        guarantee to keep you on the edge of your seat.
                    </p>
                </div>

                <div>
                    {servicesData.map((service) => (
                        <div
                            key={service.id}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() =>
                                handleMouseEnter(service.images)
                            }
                            onMouseLeave={handleMouseLeave}
                            className="flex border-b border-[#CACACA] p-[20px] cursor-pointer"
                        >
                            <div className="flex-1">
                                <span className="big-shoulders text-[18px] font-bold text-[#F0EBE6]">{service.id}</span>
                                <h2 className="text-[47px] big-shoulders tracking-normal text-[#F0EBE6] font-bold">
                                    {service.title}
                                </h2>
                            </div>

                            <div className="flex-1 flex items-center gap-[60px]">
                                <p className="text-end">{service.desc}</p>

                                <Link href="#">
                                    <ArrowUpRight size={40} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;