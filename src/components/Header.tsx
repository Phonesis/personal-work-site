"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";

export default function Header() {
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    // Disable sticky on all mobile devices (width < 640px) and on any device in landscape with small height
    const checkSticky = () => {
      const isMobile = window.innerWidth < 640;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      // If mobile or (landscape and height is small), disable sticky
      if (isMobile || (isLandscape && window.innerHeight < 500)) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };
    checkSticky();
    window.addEventListener("resize", checkSticky);
    window.addEventListener("orientationchange", checkSticky);
    return () => {
      window.removeEventListener("resize", checkSticky);
      window.removeEventListener("orientationchange", checkSticky);
    };
  }, []);

  return (
    <header
      className={`${isSticky ? "sticky top-0" : "relative"} left-0 right-0 z-50 w-full bg-gray-900 text-white py-6 overflow-hidden shadow-lg`}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/header-bg.png"
          alt="Header background"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          className="opacity-60"
          priority
        />
      </div>
      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
          <Image
            src="/profile.jpeg"
            alt="Martin Poole profile photo"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-700 shadow-lg bg-white/80"
            priority
          />
        </div>
        <AnimatedSection className="text-center md:text-left w-full">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" itemProp="name">
            Martin Poole
          </h1>
          <p className="text-xl md:text-2xl text-gray-300" itemProp="jobTitle">
            Lead Quality Engineer
          </p>
          <br />
          <br />
          <div className="mt-4 text-gray-400">
            <ul
              className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start items-center"
              aria-label="Contact links"
            >
              <li>
                <a
                  href="mailto:martin_poole@hotmail.com"
                  className="text-2xl md:text-3xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline drop-shadow"
                  itemProp="email"
                >
                  Contact Me
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/martin-poole-6b9b762b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline drop-shadow"
                  itemProp="sameAs"
                  aria-label="Martin Poole on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </AnimatedSection>
      </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900/80 to-transparent z-0 pointer-events-none" />
    </header>
  );
}
