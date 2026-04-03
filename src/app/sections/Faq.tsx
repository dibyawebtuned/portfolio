"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from "lucide-react"

type FAQItem = {
    question: string;
    answer: string;
};

const faqData: FAQItem[] = [
    {
        question: "What types of events do you perform at?",
        answer:
            "I specialize in delivering high-impact magic experiences across a wide range of events, including corporate functions, private parties, weddings, formal dinners, and special occasions. Each performance is carefully tailored to suit the audience, venue, and event objectives. Whether it’s an intimate gathering or a large-scale production, my goal is to create unforgettable moments that engage and captivate every guest.",
    },
    {
        question: "What kind of magic performance can we expect?",
        answer: "My performances combine close-up magic, stage illusions, and mentalism to create a dynamic and immersive experience. Close-up magic happens right in front of your guests, often in their own hands, while stage performances are designed to entertain larger audiences with powerful visual storytelling. Every show includes audience interaction, psychological elements, and unexpected twists to ensure a memorable and unique experience.",
    },
    {
        question: "Can the show be customized for our event or brand?",
        answer: "Absolutely. Every show is fully customizable to align with your event theme, audience type, and specific goals. For corporate clients, I can incorporate branding, messaging, or product elements into performance. For private events, I tailor the tone and style to match the occasion. This ensures the experience feels personal, relevant, and seamlessly integrated into your event.",
    },
    {
        question: "How long is the performance, and what setup is required?",
        answer: "Performance duration typically ranges from 30 minutes to 2 hours, depending on the type of show (close-up, stage, or combination). Setup requirements are minimal for close-up magic, making it ideal for walk-around entertainment. For stage performances, I may require basic sound equipment and a small performance area. All technical requirements will be discussed and planned in advance to ensure a smooth experience.",
    },
    {
        question: "What makes your show different from other magicians?",
        answer: "My performances are designed as immersive experiences, not just a series of tricks. I combine psychology, storytelling, and audience interaction to create moments that feel personal and unforgettable. Each show is fully customized to suit your event, ensuring a refined, high-impact experience that goes beyond traditional magic.",
    },
    {
        question: "How do we book you, and how far in advance should we reserve?",
        answer: "Booking is simple, just use the contact form on the website or reach out directly with your event details. I recommend booking at least 2–4 weeks in advance to secure availability, especially during peak seasons. Once your inquiry is received, I’ll provide a tailored proposal and guide you through the booking process to ensure everything is handled professionally and efficiently.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative w-full bg-black text-white overflow-hidden">

            {/* Soft background glow */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[700px] h-[700px] bg-red-600/20 blur-[180px] rounded-full" />
            </div>

            <div className="relative max-w-[1440px] mx-auto px-[20px] sm:px-[80px] py-20 flex flex-col gap-12">

                {/* HEADER */}
                <div className="text-center">
                    <h1 className="big-shoulders text-[#F0EBE6] font-bold mb-4 sm:mb-5 md:mb-6 leading-tight tracking-[0.02em] text-[48px] lg:text-[64px] xl:text-[87px]">
                        FAQ
                    </h1>
                    <p className="mt-4 text-white/60 max-w-xl mx-auto geist ">
                        Everything you need to know about Saman’s magic
                    </p>
                </div>

                {/* FAQ LIST */}
                <div className="flex flex-col gap-4">
                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={index}
                                layout
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
                            >
                                {/* QUESTION */}
                                <button
                                    onClick={() => toggle(index)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                >
                                    <span className="big-shoulders text-lg md:text-xl font-medium group-hover:text-red-400 transition cursor-pointer">
                                        {item.question}
                                    </span>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-white/60 group-hover:text-red-400"
                                    >
                                        <ChevronDown size={22} />
                                    </motion.div>
                                </button>

                                {/* ANSWER */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            className="geist px-6 pb-5 text-white/70 leading-relaxed"
                                        >
                                            {item.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Faq;