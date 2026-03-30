"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
        answer: "Saman excels in close-up magic, performing tricks right at the tables where guests can see items vanish and reappear in unexpected places. He often works with cards, cash, jewelry, strings, and even borrowed phones.",
    },

    {
        question: "Does Saman perform mentalism?",
        answer: "Yes, Saman performs mentalism tricks as well. His focus is on entertaining and surprising the audience rather than influencing or persuading them.",
    },

    {
        question: "What makes Saman’s magic unique?",
        answer: "Saman’s magic combines technical skill with personal interaction, creating moments of wonder that happen right in the hands of the audience. His performances are engaging, entertaining, and unforgettable.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />

            <div className='relative max-w-[1440px] mx-auto px-[80px] py-[100px] flex flex-col gap-[40px]'>
                {/* ========== HEADER ========== */}
                <div className='flex flex-col items-center text-center px-4'>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[87px] text-[#F0EBE6] big-shoulders big-shoulders-bold tracking-wide">
                        FAQ
                    </h1>

                    <p className="mt-4 max-w-md sm:max-w-xl lg:max-w-2xl text-sm sm:text-base text-center opacity-80">
                        All Your Questions About Saman’s Magic, Answered
                    </p>
                </div>

                {/* ========== FAQ CONTENT ==========  */}
                <div className='flex flex-col gap-[20px]'>
                    {faqData.map((item, index) => (
                        <div key={index} className="rounded-lg overflow-hidden">
                            <button className="w-full text-left bg-gradient-to-r from-black via-[#2b0000] to-[#F13333] text-white px-6 py-4 flex justify-between items-center focus:outline-none hover:opacity-90 transition shadow-[0_0_20px_rgba(122,0,0,0.35)]" onClick={() => toggle(index)}>
                                <span>{item.question}</span>
                                <span className="text-xl">
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white text-gray-900 px-6 py-4 border border-t-0 border-gray-300"
                                    >
                                        {item.answer}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Faq