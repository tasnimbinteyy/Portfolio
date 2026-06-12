"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { personalInfo, socialLinks } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0a0e]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-[#506464] text-sm font-semibold tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e8e4] mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-[#646464] text-lg leading-relaxed mb-12">
            I&apos;m currently open to new opportunities — whether it&apos;s a full-time role,
            freelance project, or just a conversation. My inbox is always open.
          </p>

          <motion.a
            href={`mailto:${personalInfo.email}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#506464] hover:bg-[#5e7474] text-[#e8e8e4] font-semibold text-base transition-all mb-12"
          >
            <Mail className="w-4 h-4" />
            Say Hello
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>

          <div className="flex justify-center gap-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 text-[#505050] hover:text-[#8a9a8a] transition-colors text-sm"
              >
                <SocialIcon name={link.icon} className="w-4 h-4" />
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
