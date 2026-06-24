"use client";
import Link from "next/link";
import Image from "next/image";
import { heroImagesArray } from "@/assets/assets";
import { useState, useEffect } from "react";

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => prev == heroImagesArray.length - 1 ? 0 : prev + 1);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen md:h-[60vh] px-3 py-2 gap-x-2 flex flex-col md:flex-row items-center border border-black/20 rounded-lg">

            <div className="w-full md:w-1/2 md:h-full px-2 py-4">
                <h1 className="text-2xl text-center md:text-start md:text-3xl lg:text-4xl xl:text-5xl md:leading-12 lg:leading-13 xl:leading-15 font-bold">Everything You Need, All in One Grocery Store</h1>
                <p className="text-center md:text-start my-2.5 lg:my-5 text-lg">From fresh farm products to household essentials — simple shopping, quick delivery, and trusted quality.</p>
                <Link href="/shop" className="mx-auto md:mx-0 mt-8 xl:mt-12 block px-4 py-1 rounded-full border border-black/50 w-max flex gap-x-2 group">
                    <span>Shop Now</span>
                    <span className="group-hover:translate-x-2 transition-all duration-300">--&gt;</span>
                </Link>
            </div>

            <div className="w-full md:w-1/2 h-full flex justify-center items-center" >
                <div className="relative w-full sm:w-1/2 md:w-full lg:w-2/3 h-[95%]">
                    {heroImagesArray.length > 0 &&
                        heroImagesArray.map((image, i) => (
                            <Image key={i} src={image} alt={image} loading="eager" className={`w-full h-full object-cover absolute ${currentImage === i ? "opacity-100" : "opacity-0"} transition duration-500`} width="auto" height="auto" />
                        ))}
                </div>
            </div>

        </div>
    )
};

export default HeroSection;