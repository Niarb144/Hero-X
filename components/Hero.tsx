"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Hero(){
    return (    
        <div
            className="relative md:h-[100dvh] md:w-full rounded-lg flex items-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/comics-bg.jpg')" }}
            >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 rounded-lg"></div>

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-40 md:mt-20 text-center md:text-left">
                <h1 className="text-2xl font-extrabold tracking-wide text-white">
                    Hero<span className="text-blue-400">-X</span>
                </h1>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
                Discover Your Favorite Superheroes and Villains
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 max-w-3xl">
                Explore an extensive database of iconic characters from comics, movies,
                and more. Find detailed information, stats, and images of your beloved
                heroes and villains all in one place.
                </p>

                <Link href="/search" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300">
                Start Your Search
                </Link>
            </div>
        </div>

    );
}