'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

const images = [
  'https://assets.codepen.io/16327/portrait-pattern-1.jpg',
  'https://assets.codepen.io/16327/portrait-image-12.jpg',
  'https://assets.codepen.io/16327/portrait-image-8.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-2.jpg',
  'https://assets.codepen.io/16327/portrait-image-4.jpg',
  'https://assets.codepen.io/16327/portrait-image-3.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-3.jpg',
  'https://assets.codepen.io/16327/portrait-image-1.jpg',
];

// Grid areas can't be expressed in Tailwind — inline styles are the correct approach
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

      // Tear down previous context
      flipCtxRef.current?.revert();
      galleryElement.classList.remove('gallery--final');

      flipCtxRef.current = gsap.context(() => {
        // 1. Snap to final layout to capture positions
        galleryElement.classList.add('gallery--final');
        const flipState = Flip.getState(galleryItems);

        // 2. Snap back to initial layout
        galleryElement.classList.remove('gallery--final');

        // 3. Animate FROM initial TO final
        const flip = Flip.to(flipState, {
          simple: true,
          ease: 'expoScale(1, 5)',
        });

        // 4. Attach to scrubbed ScrollTrigger
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
      {/* ── Gallery section ── */}
      <div
        ref={wrapRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          ref={galleryRef}
          id="gallery-8"
          className="gallery--bento relative w-full h-full flex-none"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="gallery__item bg-center bg-cover flex-none relative"
              style={{ gridArea: gridAreas[i] }}
            >
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="object-cover w-full h-full block"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Content section ── */}
      <div className="px-20 py-8">
        <h2 className="text-2xl font-semibold mb-4">Here is some content</h2>
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i} className="text-xl mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </>
  );
}