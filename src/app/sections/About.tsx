import React from 'react'

const About = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden font-sans text-white">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_#4a0d0d_0%,_transparent_70%)] opacity-80 pointer-events-none" />

            {/* CONTENT CONTAINER */}
            <div className='relative max-w-[1440px] mx-auto px-[80px] py-[100px]'>
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='flex-1'>
                        <h1 className={`heading text-5xl font-bold mb-6 big-shoulders text-[#F0EBE6]`}>
                            About
                        </h1>
                    </div>

                    <div className='flex-1'>
                        <p className='geist text-end text-[16px] text-[#F5F5F5]'>
                            Saman Maharjan was born and raised in Kathmandu, Nepal,
                            where he began learning magic at the age of eleven.
                            Saman’s unique and artistic style has dazzled audiences
                            everywhere from small private parties to large theatrical
                            venues, and he’ll guarantee to keep you on the edge of your
                            seat.
                        </p>
                    </div>
                </div>

                {/* ================ VIDEO SECTION ================ */}
                <div className='mt-16 flex justify-center'>
                    <video
                        src="/videos/showreel.mp4" // replace with your video path
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full h-[480px] rounded-xl shadow-lg"
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Alternatively, for YouTube embed: */}
                    {/*
                    <iframe
                        width="100%"
                        height="500"
                        className="max-w-4xl rounded-xl shadow-lg"
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        title="Showreel Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                    */}
                </div>
            </div>
        </section>
    )
}

export default About