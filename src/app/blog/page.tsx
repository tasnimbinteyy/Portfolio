"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts, cgLabPosts, categoryMeta } from "@/lib/blog";
import type { BlogCategory } from "@/types";

const ALL = "all" as const;
type Filter = BlogCategory | typeof ALL;

export default function BlogPage() {
  const [active, setActive] = useState<Filter>(ALL);

  const filtered =
    active === ALL
      ? blogPosts
      : active === "cg-lab"
      ? []
      : blogPosts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            My Writing
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            I write about the things I love — coding, painting, books, my balcony garden, and travel photography.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActive(ALL)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === ALL
                ? "bg-white text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            All Posts
          </button>
          {(Object.keys(categoryMeta) as BlogCategory[]).map((cat) => {
            const meta = categoryMeta[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? `bg-gradient-to-r ${meta.color} text-white`
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {meta.emoji} {meta.label}
              </button>
            );
          })}
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* CG Lab special card — shown when all or cg-lab filter active */}
            {(active === ALL || active === "cg-lab") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link href="/blog/cg-lab" className="group block h-full">
                  <article className="h-full flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#8a9a8a]/40 transition-all group-hover:-translate-y-1 duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#506464] to-[#8a9a8a] flex items-center justify-center text-2xl mb-5">
                      🖼️
                    </div>
                    <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#506464] to-[#8a9a8a] text-white mb-3">
                      🖼️ CG &amp; Image Processing
                    </span>
                    <h2 className="text-lg font-bold mb-2 group-hover:text-[#8a9a8a] transition-colors leading-snug">
                      Computer Graphics &amp; Image Processing Labs
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                      9 lab experiments covering OpenGL line drawing, geometric transformations, intensity processing, histogram equalization, Otsu thresholding, K-Means clustering, and edge detection.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                      <span>9 labs · {cgLabPosts.reduce((a, p) => a + p.readTime, 0)} min total</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#8a9a8a] text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      View all labs <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            )}
            {filtered.map((post, i) => {
              const meta = categoryMeta[post.category];
              return (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article className="h-full flex flex-col p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all group-hover:-translate-y-1 duration-300">
                      {/* Emoji cover */}
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-2xl mb-5`}>
                        {post.coverEmoji}
                      </div>

                      {/* Category badge */}
                      <span className={`inline-block self-start px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${meta.color} text-white mb-3`}>
                        {meta.emoji} {meta.label}
                      </span>

                      <h2 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                        </div>
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-purple-400 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read post <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
