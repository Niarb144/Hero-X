"use client";

import { useState } from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-white text-sm">
                <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} Hero-X. All rights reserved.</p>
                <div className="flex gap-4">
                    <a href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
                    <a href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}