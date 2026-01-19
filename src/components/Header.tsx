"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./AnimatedSection";

export default function Header() {
  const [isSticky, setIsSticky] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const updateTouch = () => setIsTouch(media.matches);
    updateTouch();
    media.addEventListener("change", updateTouch);
    return () => {
      media.removeEventListener("change", updateTouch);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setShowNav(false);
      }, 800);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`${isSticky ? "sticky top-0" : "relative"} group left-0 right-0 z-50 w-full bg-gray-900 text-white py-6 overflow-hidden shadow-lg`}
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
          <button
            type="button"
            aria-label="Enlarge profile picture"
            className="focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
            onClick={() => setShowProfileModal(true)}
            style={{ background: "none", border: "none", padding: 0 }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowProfileModal(true);
              }
            }}
          >
            <Image
              src="/profile.jpeg"
              alt="Martin Poole profile photo"
              width={120}
              height={120}
              className="rounded-full border-4 border-gray-700 shadow-lg bg-white/80"
              priority
            />
          </button>
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
          <nav
            className={`mt-6 transition-opacity duration-500 ease-out md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:group-focus-within:opacity-100 md:group-focus-within:pointer-events-auto ${
              isTouch || showNav
                ? "opacity-100 pointer-events-auto md:opacity-100 md:pointer-events-auto"
                : "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none"
            }`}
            aria-label="CV section navigation"
          >
            <ul className="flex flex-wrap justify-center md:justify-start gap-2">
              {[
                { href: "#about", label: "About" },
                { href: "#linkedin", label: "LinkedIn" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#personal-projects", label: "Personal" },
                { href: "#experience", label: "Experience" },
                { href: "#education", label: "Education" },
                { href: "#interests", label: "Interests" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AnimatedSection>
      </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-900/80 to-transparent z-0 pointer-events-none" />
      {/* Modal overlay for enlarged profile picture */}
      {showProfileModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 cursor-zoom-out transition-opacity duration-200"
          onClick={() => setShowProfileModal(false)}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          aria-label="Enlarged profile picture. Click anywhere to close."
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowProfileModal(false);
          }}
        >
          <Image
            src="/profile.jpeg"
            alt="Enlarged profile picture. Click anywhere to close."
            width={400}
            height={400}
            className="rounded-lg border-4 border-white shadow-2xl max-w-full max-h-[80vh] object-contain"
            priority
          />
          <span className="sr-only">
            Click anywhere to close the enlarged image.
          </span>
        </div>
      )}
    </header>
  );
}
