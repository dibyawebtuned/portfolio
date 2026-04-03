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
        question: "How long has Saman been performing magic?",
        answer:
            "Saman has been passionate about magic since 2010. He began practicing as a child and has performed professionally since 2013.",
    },
    {
        question: "What types of events does Saman perform at?",
        answer: "Saman has performed at a variety of events, including birthday parties, weddings, formal dinners, celebrity appearances, trade fairs, and festivals.",
    },
    {
        question: "What is Saman’s specialty in magic?",
        answer: "Saman excels in close-up magic, performing tricks right at the tables where guests can see items vanish and reappear in unexpected places.",
    },
    {
        question: "Does Saman perform mentalism?",
        answer: "Yes, Saman performs mentalism tricks as well. His focus is on entertaining and surprising the audience.",
    },
    {
        question: "What makes Saman’s magic unique?",
        answer: "Saman’s magic combines technical skill with personal interaction, creating unforgettable moments.",
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

            <div className="relative max-w-4xl mx-auto px-6 py-20 flex flex-col gap-12">

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
                                    <span className="big-shoulders text-lg md:text-xl font-medium group-hover:text-red-400 transition">
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