"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Clock } from "lucide-react";
import { cgLabPosts, categoryMeta } from "@/lib/blog";

export default function CGLabIndexPage() {
  const meta = categoryMeta["cg-lab"];

  return (
    <div className="min-h-screen bg-[#0e0e12] text-[#e8e8e4] pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#506464] hover:text-[#8a9a8a] transition-colors text-sm mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${meta.color} text-white text-xs font-medium mb-5`}>
            {meta.emoji} {meta.label}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Computer Graphics &<br />Image Processing
          </h1>
          <p className="text-[#8a9a8a] text-lg leading-relaxed max-w-2xl">
            Lab experiments from my CG & IP course at USTC — covering OpenGL graphics programming, image transformations, segmentation, and edge detection using Gonzalez's Digital Image Processing as the primary reference.
          </p>
        </motion.div>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-12 p-6 rounded-2xl border border-[#1e1e28] bg-[#506464]/5"
        >
          <p className="text-[10px] text-[#506464] uppercase tracking-widest font-medium mb-4">Course Summary</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Labs",      value: "11" },
              { label: "Tools Used",      value: "Python · OpenGL" },
              { label: "Image Reference", value: "Gonzalez 4th Ed." },
              { label: "Topics",          value: "Graphics · CV · ML" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[#506464] text-xs mb-1">{label}</p>
                <p className="text-[#e8e8e4] text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#1e1e28]">
            <p className="text-[#8a9a8a] text-sm leading-relaxed">
              This course covers two major areas: <strong className="text-[#e8e8e4]">Computer Graphics</strong> (line drawing algorithms, geometric transformations using OpenGL/OpenCV) and <strong className="text-[#e8e8e4]">Digital Image Processing</strong> (intensity transformations, histogram analysis, segmentation, edge detection — following Gonzalez's textbook experiments).
            </p>
          </div>
        </motion.div>

        {/* Lab posts list */}
        <div className="space-y-3">
          {cgLabPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Link href={`/blog/cg-lab/${post.slug}`} className="group block">
                <div className="flex items-center gap-4 p-5 rounded-xl border border-[#1e1e28] hover:border-[#506464]/40 bg-[#0e0e12] hover:bg-[#1a1a20] transition-all duration-200">

                  {/* Lab number badge */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {post.labNumber}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#e8e8e4] group-hover:text-[#8a9a8a] transition-colors mb-1 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#506464] line-clamp-1">{post.excerpt}</p>
                  </div>

                  {/* Subtopics count + read time */}
                  <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs text-[#506464]">
                      {post.subtopics.length} topics
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#506464]">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-[#506464] group-hover:text-[#8a9a8a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
