"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export default function Header() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isMinimizedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Track scroll to minimize header
  // Uses a lock mechanism: after minimizing, ignore upward scroll caused by
  // the header height change until the user actively scrolls further down.
  useEffect(() => {
    const MINIMIZE_AT = 80;
    const RESTORE_AT = 20;
    let lockedUntilY: number | null = null; // prevents jitter after minimize

    const syncMinimized = () => {
      const y = window.scrollY;
      const prev = isMinimizedRef.current;

      if (prev) {
        // Currently minimized — only restore if user has scrolled near the top
        // and the lock has been cleared
        if (lockedUntilY !== null) {
          // User must scroll past the lock point (further down) to clear it
          if (y >= lockedUntilY) {
            lockedUntilY = null;
          } else {
            // Still locked — don't restore even if y < RESTORE_AT
            return;
          }
        }
        if (y <= RESTORE_AT) {
          isMinimizedRef.current = false;
          setIsMinimized(false);
          setMobileMenuOpen(false);
        }
      } else {
        // Currently expanded — minimize if scrolled past threshold
        if (y > MINIMIZE_AT) {
          isMinimizedRef.current = true;
          setIsMinimized(true);
          // Lock: the header shrink will shift scrollY, so ignore any
          // scroll-up that happens until user scrolls past current position
          lockedUntilY = y;
        }
      }
    };

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        syncMinimized();
      });
    };

    // Sync immediately on mount
    syncMinimized();
    // Also re-check after a short delay to catch browser scroll restoration
    const restoreTimer = setTimeout(syncMinimized, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(restoreTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    // Use setTimeout to avoid the opening click from immediately triggering close
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Scroll to anchor after header has minimized to avoid overshoot
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const scrollToTarget = () => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;
      const headerHeight = menuRef.current?.offsetHeight ?? 0;
      const offset = headerHeight + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (!isMinimizedRef.current) {
      // Header is expanded — it will shrink on scroll, so force minimize first
      isMinimizedRef.current = true;
      setIsMinimized(true);
      // Wait for the CSS transition to finish before calculating position
      setTimeout(scrollToTarget, 320);
    } else {
      scrollToTarget();
    }
  };

  return (
    <header
      ref={menuRef}
      style={{
        overflowAnchor: "none",
        paddingTop: `calc(env(safe-area-inset-top) + ${
          isMinimized ? "0.5rem" : "1.5rem"
        })`,
      }}
      className={`sticky top-0 left-0 right-0 z-50 w-full bg-gray-900 text-white shadow-lg transition-all duration-300 ease-in-out ${
        isMinimized ? "pb-2" : "pb-6 overflow-hidden"
      }`}
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-300 ${
          isMinimized ? "opacity-30" : "opacity-60"
        }`}
      >
        <Image
          src="/header-bg.png"
          alt="Header background"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          priority
        />
      </div>
      {/* Foreground content */}
      <div
        className={`relative z-10 container mx-auto px-4 flex transition-all duration-300 ease-in-out ${
          isMinimized
            ? "flex-row items-center gap-3 sm:gap-4"
            : "flex-col md:flex-row items-center md:items-start gap-4 md:gap-6"
        } group`}
      >
        <div
          className={`flex-shrink-0 flex transition-all duration-300 ease-in-out ${
            isMinimized
              ? "w-auto"
              : "justify-center md:justify-start w-full md:w-auto"
          }`}
        >
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
              className={`rounded-full border-4 border-gray-700 shadow-lg bg-white/80 transition-all duration-300 ease-in-out ${
                isMinimized
                  ? "!w-10 !h-10 sm:!w-12 sm:!h-12 border-2"
                  : "!w-24 !h-24 sm:!w-[120px] sm:!h-[120px]"
              }`}
              priority
            />
          </button>
        </div>
        <AnimatedSection
          className={`transition-all duration-300 ease-in-out ${
            isMinimized
              ? "text-left flex-1 min-w-0"
              : "text-center md:text-left w-full"
          }`}
        >
          <h1
            className={`font-bold transition-all duration-300 ease-in-out drop-shadow-md ${
              isMinimized
                ? "text-base sm:text-lg md:text-xl mb-0 leading-tight"
                : "text-4xl md:text-5xl mb-2"
            }`}
            itemProp="name"
          >
            Martin Poole
          </h1>
          <p
            className={`transition-all duration-300 ease-in-out drop-shadow-sm ${
              isMinimized
                ? "text-gray-200 text-xs sm:text-sm leading-tight"
                : "text-gray-300 text-xl md:text-2xl"
            }`}
            itemProp="jobTitle"
          >
            Lead Quality Engineer
          </p>
          {/* Desktop: compact inline nav pills when minimized */}
          {isMinimized && (
            <div className="hidden md:flex flex-wrap gap-1.5 sm:gap-2 mt-1 items-center">
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#personal-projects", label: "Personal" },
                { href: "#experience", label: "Experience" },
                { href: "#education", label: "Education" },
                { href: "#interests", label: "Interests" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          <div
            className={`text-gray-300 transition-all duration-300 ease-in-out ${
              isMinimized ? "hidden" : "mt-3 sm:mt-4 lg:mt-6"
            }`}
          >
            <ul
              className="mt-2 flex flex-row gap-2 sm:gap-4 justify-center md:justify-start items-center flex-wrap"
              aria-label="Contact links"
            >
              <li>
                <a
                  href="mailto:martin_poole@hotmail.com"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-800/90 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:bg-emerald-500/15 md:backdrop-blur-sm md:hover:bg-emerald-500/25"
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
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-800/90 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:bg-emerald-500/10 md:backdrop-blur-sm md:hover:bg-emerald-500/25"
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
                  className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-emerald-200 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-800/90 hover:text-emerald-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 md:bg-emerald-500/10 md:backdrop-blur-sm md:hover:bg-emerald-500/25"
                  itemProp="sameAs"
                  aria-label="Martin Poole on X"
                >
                  X
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/60 bg-amber-900/80 px-4 py-1.5 sm:px-5 sm:py-2 text-base sm:text-lg font-semibold text-amber-200 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-800/90 hover:text-amber-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 md:bg-amber-500/15 md:backdrop-blur-sm md:hover:bg-amber-500/25"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <nav
            className={`transition-all duration-300 ease-in-out ${
              isMinimized ? "hidden" : "mt-6 opacity-100 visible"
            }`}
            aria-label="CV section navigation"
          >
            <ul className="flex flex-wrap justify-center md:justify-start gap-2">
              {[
                { href: "#about", label: "About" },
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
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-900/80 px-3 py-1 text-sm font-semibold text-emerald-200 backdrop-blur-md transition-colors hover:bg-emerald-800/90 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:bg-emerald-500/10 md:backdrop-blur-sm md:hover:bg-emerald-500/20"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </AnimatedSection>
        {/* Desktop: contact links on right side when minimized */}
        {isMinimized && (
          <div className="hidden md:flex flex-row flex-shrink-0 items-center gap-2 ml-auto">
            <div className="flex items-center gap-2">
              <a
                href="mailto:martin_poole@hotmail.com"
                className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100"
                itemProp="email"
              >
                Contact
              </a>
              <a
                href="https://www.linkedin.com/in/martin-poole-6b9b762b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100"
                aria-label="Martin Poole on LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/_Martin_Poole"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100"
                aria-label="Martin Poole on X"
              >
                X
              </a>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-500/20 px-3.5 py-1.5 text-sm font-bold text-amber-100 shadow-sm transition-colors hover:bg-amber-500/30 hover:text-amber-50"
            >
              Blog
            </Link>
          </div>
        )}
        {/* Mobile hamburger button - only when minimized on small screens */}
        {isMinimized && (
          <div className="md:hidden flex-shrink-0 ml-auto flex items-center gap-2">
            <a
              href="mailto:martin_poole@hotmail.com"
              className="p-1.5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 transition-colors hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Email Martin Poole"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m22 8-10 6L2 8"
                />
              </svg>
            </a>
            <Link
              href="/blog"
              className="p-1.5 rounded-lg border border-amber-400/50 bg-amber-500/15 text-amber-100 transition-colors hover:bg-amber-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Open blog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 3v6h6"
                />
              </svg>
            </Link>
            <button
              type="button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              className="p-1.5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-200 transition-colors hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden relative z-20 transition-all duration-300 ease-in-out overflow-hidden ${
          isMinimized && mobileMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="container mx-auto px-4 pt-3 pb-4"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-wrap gap-2">
            {[
              { href: "#about", label: "About" },
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
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="inline-flex items-center rounded-full border border-emerald-400/50 bg-emerald-900/80 px-3 py-1 text-sm font-semibold text-emerald-200 backdrop-blur-md transition-colors hover:bg-emerald-800/90 hover:text-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-700/50 flex flex-wrap items-center gap-2">
            <a
              href="mailto:martin_poole@hotmail.com"
              className="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-100 shadow-sm backdrop-blur-md transition-colors hover:bg-emerald-800/90 hover:text-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Contact
            </a>
            <a
              href="https://www.linkedin.com/in/martin-poole-6b9b762b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-100 shadow-sm backdrop-blur-md transition-colors hover:bg-emerald-800/90 hover:text-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              aria-label="Martin Poole on LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/_Martin_Poole"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-emerald-400/60 bg-emerald-900/80 px-3 py-1 text-xs font-semibold text-emerald-100 shadow-sm backdrop-blur-md transition-colors hover:bg-emerald-800/90 hover:text-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              aria-label="Martin Poole on X"
            >
              X
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-900/90 px-3 py-1 text-xs font-bold text-amber-100 shadow-sm backdrop-blur-md transition-colors hover:bg-amber-800/95 hover:text-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              Blog
            </Link>
          </div>
        </nav>
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
