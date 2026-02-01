"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export default function Header() {
  const [isSticky, setIsSticky] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Disable sticky on all mobile devices (width < 640px)
    // ... logic ...
    const checkSticky = () => {
      const isMobile = window.innerWidth < 640;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
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
    const handleScrollActivity = () => {
      setShowNav(true);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      hideTimeoutRef.current = setTimeout(() => {
        setShowNav(false);
      }, 800);
    };

    // Listen to multiple events for cross-browser compatibility
    // Safari doesn't always fire 'scroll' events reliably during smooth scroll
    window.addEventListener("scroll", handleScrollActivity, { passive: true });
    window.addEventListener("wheel", handleScrollActivity, { passive: true });
    window.addEventListener("touchmove", handleScrollActivity, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      window.removeEventListener("wheel", handleScrollActivity);
      window.removeEventListener("touchmove", handleScrollActivity);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`${isSticky ? "sticky top-0" : "relative"} left-0 right-0 z-50 w-full bg-gray-900 text-white py-6 overflow-hidden shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-6 group">
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
          <div className="mt-3 sm:mt-4 lg:mt-6 text-gray-300">
            <ul
              className="mt-2 flex flex-row gap-2 sm:gap-4 justify-center md:justify-start items-center flex-wrap"
              aria-label="Contact links"
            >
              <li>
                <a
                  href="mailto:martin_poole@hotmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/15 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  itemProp="email"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/martin-poole-6b9b762b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  itemProp="sameAs"
                  aria-label="Martin Poole on LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/_Martin_Poole"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-500/25 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  itemProp="sameAs"
                  aria-label="Martin Poole on X"
                >
                  X
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/60 bg-amber-500/15 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-amber-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-500/25 hover:text-amber-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <nav
            className={`mt-6 transition-all duration-500 ease-out focus-within:opacity-100 focus-within:visible focus-within:pointer-events-auto opacity-100 visible pointer-events-auto 2xl:focus-within:opacity-100 2xl:focus-within:visible 2xl:focus-within:pointer-events-auto ${
              showNav || isHovered
                ? "2xl:opacity-100 2xl:visible 2xl:pointer-events-auto"
                : "2xl:opacity-0 2xl:invisible 2xl:pointer-events-none"
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
