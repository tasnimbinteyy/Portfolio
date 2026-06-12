"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import SocialIcon from "@/components/ui/SocialIcon";
import { personalInfo, socialLinks } from "@/lib/data";

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

const ROLES = ["Full Stack Developer", "ML Enthusiast", "Problem Solver", "Creative Coder"];

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/WhatsApp Image 2026-04-29 at 11.23.06 AM.jpeg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* left dark, right slightly lighter */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/70" />
        {/* bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#0e0e12] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-16 py-32 flex flex-col items-start text-left">

        {/* status pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#506464]/50 bg-[#506464]/10 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8a9a8a] animate-pulse" />
          <span className="text-[#a0b4a0] text-xs font-medium tracking-wide">
            Open to new opportunities
          </span>
        </motion.div>

        {/* name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-5"
        >
          <span className="text-[#e8e8e4]">Tasnim Bintey</span>
          <br />
          <span className="text-[#8a9a8a]">Naser</span>
        </motion.h1>

        {/* typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 mb-6 h-8"
        >
          <span className="text-[#9aaa9a] text-lg md:text-xl font-medium">
            {role}
            <span className="inline-block w-[2px] h-[1.1em] bg-[#8a9a8a] ml-[2px] align-middle animate-pulse" />
          </span>
        </motion.div>

        {/* bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#787878] text-sm md:text-base leading-relaxed max-w-xl mb-10"
        >
          CSE student at{" "}
          <span className="text-[#c8c8c4] font-medium">USTC</span> with a perfect{" "}
          <span className="text-[#8a9a8a] font-semibold">CGPA 4.00</span>. Building
          full-stack apps, exploring ML, and solving problems —{" "}
          <span className="text-[#c8c8c4] font-medium">100+ on Codeforces</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-start mb-12"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-[#506464] hover:bg-[#5e7474] text-[#e8e8e4] text-sm font-semibold transition-colors duration-200"
          >
            View My Work
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-7 py-3 rounded-full border border-[#506464]/50 text-[#9aaa9a] text-sm font-semibold hover:border-[#506464] hover:text-[#c8c8c4] transition-all duration-200 backdrop-blur-sm"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center gap-8 mb-10"
        >
          {[
            { value: "4.00", label: "CGPA" },
            { value: "100+", label: "CF Solves" },
            { value: "5+", label: "Projects" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-[#c8c8c4] font-bold text-lg leading-none">{s.value}</p>
                <p className="text-[#646464] text-xs mt-1">{s.label}</p>
              </div>
              {i < 2 && <div className="w-px h-8 bg-[#3c3c50]" />}
            </div>
          ))}
        </motion.div>

        {/* social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex gap-3"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full border border-[#3c3c50] bg-[#28283c]/40 backdrop-blur-sm text-[#787878] hover:text-[#c8c8c4] hover:border-[#506464] transition-all duration-200"
            >
              <SocialIcon name={link.icon} className="w-4 h-4" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#3c3c50]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
