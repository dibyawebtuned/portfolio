"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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

    // Images for each container
    const items = [
        {
            title: "Hover me for 3 images",
            images: [
                "https://assets.codepen.io/16327/portrait-image-8.jpg",
                "https://assets.codepen.io/16327/portrait-image-3.jpg",
                "https://assets.codepen.io/16327/portrait-image-1.jpg",
            ],
        },
        {
            title: "Another hover container",
            images: [
                "https://assets.codepen.io/16327/portrait-image-14.jpg",
                "https://assets.codepen.io/16327/portrait-image-6.jpg",
                "https://assets.codepen.io/16327/portrait-image-3.jpg",
            ],
        },
    ];

    return (
        <ul className="m-0 p-0 list-none">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="relative border-b border-gray-300 p-8 cursor-pointer"
                    ref={(el) => el && (containerRefs.current[index] = el)}
                >
                    {/* Swipe Images Wrapper */}
                    <div className="swipeimage fixed top-0 left-0 flex gap-3 pointer-events-none z-50 opacity-0 invisible transform -translate-x-1/2 -translate-y-1/2">
                        {item.images.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                className="w-44 h-44 object-cover rounded-lg shadow-lg"
                                alt={`hover-${i}`}
                            />
                        ))}
                    </div>

                    {/* Text */}
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                </li>
            ))}
        </ul>
    );
};

export default HoverFollowImages;