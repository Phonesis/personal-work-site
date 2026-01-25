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
                return null;
              })}
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
