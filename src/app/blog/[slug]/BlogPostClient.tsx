"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/blogPosts";
import { AnimatedSection } from "@/components/AnimatedSection";
import Comments from "@/components/Comments";

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [modalImage, setModalImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Calculate reading time based on word count
  const calculateReadingTime = () => {
    const wordsPerMinute = 200;
    let wordCount = 0;

    post.content.forEach((block) => {
      if (block.text) {
        wordCount += block.text.split(/\s+/).filter(Boolean).length;
      }
      if (block.items) {
        block.items.forEach((item) => {
          wordCount += item.split(/\s+/).filter(Boolean).length;
        });
      }
    });

    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const readingTime = calculateReadingTime();

  // Helper to render text with basic markdown (bold and links) support
  const renderTextWithMarkdown = (text: string) => {
    if (!text) return null;

    // First handle links: [text](url)
    // Then handle bold: **text**

    // Split by links first
    const linkParts = text.split(/(\[.*?\]\(.*?\))/g);

    return linkParts.map((linkPart, li) => {
      const linkMatch = linkPart.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={`l-${li}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 font-medium transition-colors"
          >
            {renderBoldOnly(linkMatch[1])}
          </a>
        );
      }
      return renderBoldOnly(linkPart);
    });
  };

  const renderBoldOnly = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="font-semibold hidden sm:inline">Home</span>
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href="/blog"
              className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              Blog
            </Link>
          </div>
          <div className="flex items-center">
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2 7 7 0 017 7 2 2 0 002 2h2a2 2 0 002-2A11 11 0 005 3z" />
                <path d="M4 12a1 1 0 100 2 4 4 0 014 4 1 1 0 102 0 6 6 0 00-6-6z" />
                <path d="M5 19a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              Subscribe via RSS
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <AnimatedSection>
          <article>
            {/* Post header */}
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <time dateTime={post.date}>{post.formattedDate}</time>
                  <span>•</span>
                  <span>{readingTime}</span>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-gray-400">{post.excerpt}</p>
            </header>

            {/* Cover image */}
            {post.coverImage &&
              (isMobile ? (
                <button
                  type="button"
                  onClick={() =>
                    setModalImage({ src: post.coverImage!, alt: post.title })
                  }
                  className="relative h-48 rounded-xl overflow-hidden mb-8 w-full bg-gray-800 cursor-zoom-in"
                  aria-label="Tap to view larger"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-contain"
                    priority
                  />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white/80 text-xs px-2 py-1 rounded">
                    Tap to expand
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setModalImage({ src: post.coverImage!, alt: post.title })
                  }
                  className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 w-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
                  aria-label="Click to enlarge image"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </button>
              ))}
            {post.coverImageCaption && (
              <p className="text-center text-gray-400 mb-8 text-base border-t border-gray-700 pt-4">
                {post.coverImageCaption}
              </p>
            )}

            {/* Post content */}
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content.map((block, index) => {
                if (block.type === "paragraph") {
                  return (
                    <p
                      key={index}
                      className="text-gray-300 mb-6 leading-relaxed"
                    >
                      {renderTextWithMarkdown(block.text || "")}
                    </p>
                  );
                }
                if (block.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold mt-10 mb-4 text-white"
                    >
                      {renderTextWithMarkdown(block.text || "")}
                    </h2>
                  );
                }
                if (block.type === "image") {
                  return (
                    <figure key={index} className="my-8">
                      {isMobile ? (
                        <button
                          type="button"
                          onClick={() =>
                            setModalImage({
                              src: block.src!,
                              alt: block.alt || "",
                            })
                          }
                          className="relative h-48 rounded-lg overflow-hidden w-full bg-gray-800 cursor-zoom-in"
                          aria-label="Tap to view larger"
                        >
                          <Image
                            src={block.src!}
                            alt={block.alt || ""}
                            fill
                            className="object-contain"
                          />
                          <span className="absolute bottom-2 right-2 bg-black/60 text-white/80 text-xs px-2 py-1 rounded">
                            Tap to expand
                          </span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            setModalImage({
                              src: block.src!,
                              alt: block.alt || "",
                            })
                          }
                          className="relative h-64 md:h-80 rounded-lg overflow-hidden w-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
                          aria-label="Click to enlarge image"
                        >
                          <Image
                            src={block.src!}
                            alt={block.alt || ""}
                            fill
                            className="object-cover"
                          />
                        </button>
                      )}
                      {block.caption && (
                        <figcaption className="text-center text-gray-400 mt-3 text-sm">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                if (block.type === "code") {
                  return (
                    <pre
                      key={index}
                      className="bg-gray-800 rounded-lg p-4 overflow-x-auto my-6 max-w-full"
                    >
                      <code className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                        {block.text}
                      </code>
                    </pre>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="list-disc list-inside text-gray-300 mb-6 space-y-2"
                    >
                      {block.items?.map((item, i) => (
                        <li key={i}>{renderTextWithMarkdown(item)}</li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "embed" && block.embedType === "linkedin") {
                  return (
                    <figure key={index} className="my-8">
                      <div className="flex justify-center">
                        <iframe
                          src={block.embedUrl}
                          height={block.height ?? 582}
                          width="504"
                          frameBorder="0"
                          allowFullScreen
                          title="Embedded LinkedIn post"
                          className="max-w-full rounded-lg"
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="text-center text-gray-400 mt-3 text-sm">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <blockquote
                      key={index}
                      className="my-8 pl-6 border-l-4 border-emerald-500 bg-emerald-500/5 py-4 pr-6 rounded-r-lg"
                    >
                      <p className="text-lg text-gray-200 italic leading-relaxed">
                        {renderTextWithMarkdown(block.text || "")}
                      </p>
                    </blockquote>
                  );
                }
                return null;
              })}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">
                Share this post
              </h3>
              <div className="flex flex-wrap gap-3">
                {/* Copy Link */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                      </svg>
                      <span>Copy link</span>
                    </>
                  )}
                </button>

                {/* Share on X/Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Share on X</span>
                </a>

                {/* Share on LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>Share on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Comments Section */}
            <Comments />
          </article>
        </AnimatedSection>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to all posts
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Martin Poole. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 cursor-zoom-out p-4"
          onClick={() => setModalImage(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setModalImage(null);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image. Tap anywhere to close."
          tabIndex={0}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <Image
              src={modalImage.src}
              alt={modalImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1536px) 100vw, 1536px"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => setModalImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {isMobile ? "Tap anywhere to close" : "Click anywhere to close"}
          </span>
        </div>
      )}

      {/* Back to top button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 rounded-full bg-emerald-600 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${
          showBackToTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}
