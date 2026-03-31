'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

import Image1 from "../../../public/assets/img/saman_1.png";
import Image2 from "../../../public/assets/img/saman_2.png";
import Image3 from "../../../public/assets/img/saman_3.png";
import Image4 from "../../../public/assets/img/saman_4.png";

const images = [
    Image1,
    Image2,
    Image3,
    Image4,
    Image2,
    Image2,
    Image2,
    Image2,
];

const gridAreas = [
    '1 / 1 / 3 / 2',
    '1 / 2 / 2 / 3',
    '2 / 2 / 4 / 3',
    '1 / 3 / 3 / 4',
    '3 / 1 / 4 / 2',
    '3 / 3 / 5 / 4',
    '4 / 1 / 5 / 2',
    '4 / 2 / 5 / 3',
];

export default function BentoGallery() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const flipCtxRef = useRef<gsap.Context | null>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, Flip);

        const createTween = () => {
            const galleryElement = galleryRef.current;
            if (!galleryElement) return;

            const galleryItems = galleryElement.querySelectorAll<HTMLElement>('.gallery__item');

            flipCtxRef.current?.revert();
            galleryElement.classList.remove('gallery--final');

            flipCtxRef.current = gsap.context(() => {
                galleryElement.classList.add('gallery--final');
                const flipState = Flip.getState(galleryItems);

                galleryElement.classList.remove('gallery--final');

                const flip = Flip.to(flipState, {
                    simple: true,
                    ease: 'expoScale(1, 5)',
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: galleryElement,
                        start: 'center center',
                        end: '+=100%',
                        scrub: true,
                        pin: galleryElement.parentElement ?? undefined,
                    },
                });

                tl.add(flip);

                return () => gsap.set(galleryItems, { clearProps: 'all' });
            });
        };

        createTween();
        window.addEventListener('resize', createTween);
        return () => {
            window.removeEventListener('resize', createTween);
            flipCtxRef.current?.revert();
        };
    }, []);

    return (
        <>
            <style>{`
        .gallery--bento {
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .gallery--final.gallery--bento {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }
      `}</style>

            <div
                ref={wrapRef}
                className="relative w-full h-screen flex items-center justify-center overflow-hidden"
            >
                <div
                    ref={galleryRef}
                    id="gallery-8"
                    className="gallery--bento relative w-full h-full flex-none"
                >
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="gallery__item bg-center bg-cover flex-none relative"
                            style={{ gridArea: gridAreas[i] }}
                        >
                            {typeof img === 'string' ? (
                                // External URL
                                <img
                                    src={img}
                                    alt={`Gallery image ${i + 1}`}
                                    className="object-cover w-full h-full block"
                                />
                            ) : (
                                // Local image
                                <Image
                                    src={img}
                                    alt={`Gallery image ${i + 1}`}
                                    className="object-cover"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-20 py-8">
                {/* <h2 className="text-2xl font-semibold mb-4">Here is some content</h2> */}
                {Array.from({ length: 1 }).map((_, i) => (
                    <p key={i} className="text-xl mb-4 leading-relaxed">
                        Saman has been enthralled by magic since 2010. He recalls what he was like as a child. He purchased a few tricks and started practicing them with his family and friends. After meeting a couple in Pokhara in 2013, Saman was asked to perform a stand-up act at their wedding. The reactions to his then-amateurish performance as a magician were astounding, and Saman understood he had the ability to develop his newfound pleasure into something considerably more professional. He has performed as a Magician in Kathmandu for a range of events including corporate events, private parties, weddings, formal dinners, celebrity appearances, trade fairs, and festivals. Elevate your next corporate event with a captivating and thought-provoking performance that blends magic and keynote speaking to inspire and encourage creativity with your audience.
                    </p>
                ))}
            </div>
        </>
    );
}