"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogPosts";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-white">My Blog</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Recent Work & Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts, insights, and updates on my latest work projects and
            things I&apos;ve been working on. Usually around Quality
            Engineering, Test Automation, and AI.
          </p>
        </AnimatedSection>

        {/* Blog posts grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <AnimatedSection
              key={post.slug}
              className="group"
              delay={index * 0.1}
            >
              <Link href={`/blog/${post.slug}`}>
                <article className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  {post.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <time dateTime={post.date}>{post.formattedDate}</time>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400">
                            {post.tags[0]}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 flex-1">{post.excerpt}</p>
                    <div className="mt-4 flex items-center text-emerald-400 font-semibold">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No blog posts yet. Check back soon!
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Martin Poole. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
