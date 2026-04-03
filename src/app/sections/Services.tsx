"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import "aos/dist/aos.css";
import AOS from "aos";

// Import local images
import Image1 from "../../../public/assets/img/saman_1.png";
import Image2 from "../../../public/assets/img/saman_2.png";
import Image3 from "../../../public/assets/img/saman_3.png";
import Image4 from "../../../public/assets/img/saman_4.png";
// Add more if needed

const HoverFollowImages = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    const containerRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        gsap.set(".swipeimage", { xPercent: -50, yPercent: -50 });

        containerRefs.current.forEach((el) => {
            const wrapper = el.querySelector<HTMLDivElement>(".swipeimage");
            if (!wrapper) return;

            const setX = gsap.quickTo(wrapper, "x", { duration: 0.4, ease: "power3" });
            const setY = gsap.quickTo(wrapper, "y", { duration: 0.4, ease: "power3" });

            const move = (e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                setX(e.clientX - rect.left);
                setY(e.clientY - rect.top);
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
        <div className="bg-[#0f0f0f] h-auto relative overflow-hidden" id="services">
            <div className="max-w-[1440px] mx-auto px-[20px] md:px-[80px] py-[50px] md:py-[100px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="big-shoulders font-bold text-[48px] lg:text-[64px] xl:text-[87px] text-[#F0EBE6]"
                        data-aos="fade-up">
                        What I Do
                    </h1>
                    <p className="geist text-center sm:text-end text-[13px] sm:text-[14px] md:text-[16px] lg:text-[16px] xl:text-[16px] text-[#F5F5F5] max-w-full sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed mx-auto text-sm sm:text-base md:text-lg lg:text-xl max-w-xl sm:max-w-2xl leading-relaxed text-[#F0EBE6] opacity-80"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        data-aos-delay="300"
                        data-aos-easing="ease-out-cubic"
                        data-aos-once="true">
                        Saman’s unique and artistic style has dazzled audiences everywhere from small private parties to large theatrical venues, and he’ll guarantee to keep you on the edge of your seat.
                    </p>
                </div>

                {/* Items */}
                <ul className="list-none m-0 p-0 space-y-12">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="relative border-b border-gray-700 pb-4 sm:pb-8 cursor-pointer"
                            ref={(el) => { if (el) containerRefs.current[index] = el; }}
                        >
                            {/* Hover Images */}
                            <div className="swipeimage absolute top-0 left-0 flex gap-3 pointer-events-none z-50 opacity-0 invisible transform -translate-x-1/2 -translate-y-1/2">
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
                                    <p className="text-sm sm:text-base md:text-md text-[#F0EBE6] opacity-90 max-w-md">
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





// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { ArrowUpRight } from "lucide-react";
// import { gsap } from "gsap";

// const servicesData = [
//     {
//         id: "01",
//         title: "Corporate Shows",
//         desc: "One Man Wonder Show is a high-impact entertainment experience designed especially for professional events and business gatherings.",
//         images: [
//             "/assets/img/saman_1.png",
//             "/assets/img/saman_2.png",
//             "/assets/img/saman_3.png",
//         ],
//     },
//     {
//         id: "02",
//         title: "Closeup Magic",
//         desc: "An interactive 2-hour close-up magic show with full entertainment and a powerful surprise twist.",
//         images: [
//             "/assets/img/saman_4.png",
//             "/assets/img/saman_3.png",
//             "/assets/img/saman_2.png",
//         ],
//     },
//     {
//         id: "03",
//         title: "Private Parties",
//         desc: "A 1-hour One Man Wonder Show with close-up and stage magic, full entertainment, and a surprise twist.",
//         images: [
//             "/assets/img/saman_3.png",
//             "/assets/img/saman_1.png",
//             "/assets/img/saman_2.png",
//         ],
//     },
//     {
//         id: "04",
//         title: "Special Events",
//         desc: "A 2-hour One Man Wonder Show featuring close-up and stage magic, full entertainment, and a powerful plot twist.",
//         images: [
//             "/assets/img/saman_3.png",
//             "/assets/img/saman_1.png",
//             "/assets/img/saman_2.png",
//         ],
//     },
// ];

// const Services = () => {

//     const previewRef = useRef<HTMLDivElement>(null);

//     const xTo = useRef<((value: number) => void) | null>(null);
//     const yTo = useRef<((value: number) => void) | null>(null);

//     const [activeImages, setActiveImages] = useState(
//         servicesData[0].images
//     );

//     useEffect(() => {
//         const preview = previewRef.current;
//         if (!preview) return;

//         xTo.current = gsap.quickTo(preview, "x", {
//             duration: 0.25,
//             ease: "power2.out",
//         });

//         yTo.current = gsap.quickTo(preview, "y", {
//             duration: 0.25,
//             ease: "power2.out",
//         });
//     }, []);

//     const handleMouseMove = (e: React.MouseEvent) => {
//         if (!xTo.current || !yTo.current) return;

//         xTo.current(e.clientX + 20);
//         yTo.current(e.clientY + 20);
//     };

//     const handleMouseEnter = (images: string[]) => {
//         const preview = previewRef.current;
//         if (!preview) return;

//         setActiveImages(images);

//         gsap.fromTo(
//             preview,
//             { scale: 0.8, opacity: 0 },
//             {
//                 scale: 1,
//                 opacity: 1,
//                 duration: 0.3,
//                 ease: "power3.out",
//             }
//         );
//     };

//     const handleMouseLeave = () => {
//         const preview = previewRef.current;
//         if (!preview) return;

//         gsap.to(preview, {
//             scale: 0.8,
//             opacity: 0,
//             duration: 0.3,
//             ease: "power3.out",
//         });
//     };

//     return (
//         <section className="relative w-full bg-black overflow-hidden text-white">
//             <div
//                 ref={previewRef}
//                 className="fixed top-0 left-0 flex gap-2 p-2 rounded-xl pointer-events-none z-50 opacity-0 scale-75"
//             >
//                 {activeImages.map((img, i) => (
//                     <div
//                         key={i}
//                         className="relative w-[300px] h-[150px] overflow-hidden rounded-md"
//                     >
//                         <Image
//                             src={img}
//                             alt="preview"
//                             fill
//                             className="object-cover"
//                         />
//                     </div>
//                 ))}
//             </div>

//             <div className="max-w-[1440px] mx-auto px-[80px] py-[100px]">
//                 <div>
//                     <h1 className="text-[87px] font-bold text-center big-shoulders text-[#F0EBE6]">
//                         What I Do
//                     </h1>
//                     <p className="max-w-2xl mx-auto geist text-center text-[18px] leading-6">
//                         Saman’s unique and artistic style has dazzled audiences everywhere
//                         from small private parties to large theatrical venues, and he’ll
//                         guarantee to keep you on the edge of your seat.
//                     </p>
//                 </div>

//                 <div>
//                     {servicesData.map((service) => (
//                         <div
//                             key={service.id}
//                             onMouseMove={handleMouseMove}
//                             onMouseEnter={() =>
//                                 handleMouseEnter(service.images)
//                             }
//                             onMouseLeave={handleMouseLeave}
//                             className="flex border-b border-[#CACACA] p-[20px] cursor-pointer"
//                         >
//                             <div className="flex-1">
//                                 <span className="big-shoulders text-[18px] font-bold text-[#F0EBE6]">{service.id}</span>
//                                 <h2 className="text-[47px] big-shoulders tracking-normal text-[#F0EBE6] font-bold">
//                                     {service.title}
//                                 </h2>
//                             </div>

//                             <div className="flex-1 flex items-center gap-[60px]">
//                                 <p className="text-end">{service.desc}</p>

//                                 <Link href="#">
//                                     <ArrowUpRight size={40} />
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Services;
