"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

import Logo_img from "../../../../public/assets/img/Logo icon SM-01 (1).png";

interface PreloaderProps {
  onComplete: () => void; // Callback when preloader finishes
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const interval = setInterval(() => {
      value += Math.random() * 12;

      if (value >= 100) {
        value = 100;
        clearInterval(interval);

        // End preloader after a short delay
        setTimeout(() => {
          setLoading(false);
          onComplete(); // Notify parent
        }, 600);
      }

      setProgress(Math.floor(value));
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle at center, #111 0%, #070707 70%)",
            color: "#F0EBE6",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Background Ambient Glow */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[140px]"
            style={{
              background: "radial-gradient(circle, #F13333 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Logo with 3D Flip */}
          <motion.div
            className="relative z-10 mb-6 perspective-[1000px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: "radial-gradient(circle, #F13333 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* 3D Flip */}
            <motion.div
              className="relative w-[90px] h-[90px] md:w-[110px] md:h-[110px]"
              animate={{
                rotateY: [0, 180, 360],
                rotateX: [0, 10, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={Logo_img}
                alt="logo"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="big-shoulders text-3xl md:text-5xl font-semibold tracking-widest z-10 text-[#F0EBE6]"
            initial={{
              opacity: 0,
              y: 60,
              letterSpacing: "0.5em",
            }}
            animate={{
              opacity: 1,
              y: 0,
              letterSpacing: "0.12em",
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            SAMAN MAHARJAN
          </motion.h1>

          {/* Progress Bar */}
          <div className="w-[220px] h-[2px] bg-[#F0EBE6]/20 mt-6 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-[#F13333]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-sm text-[#F0EBE6]/70"
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}