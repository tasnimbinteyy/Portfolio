"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SocialIcon from "@/components/ui/SocialIcon";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-[#0e0e12]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#506464] text-sm font-semibold tracking-widest uppercase mb-3">
            What I&apos;ve Built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e8e4]">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="flex flex-col p-6 rounded-2xl bg-[#141420] border border-[#3c3c50]/50 hover:border-[#506464]/60 transition-all group"
            >
              <span className="text-xs font-mono text-[#3c3c50] mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-[#c8c8c4] text-base font-bold mb-3 group-hover:text-[#8a9a8a] transition-colors leading-snug">
                {project.title}
              </h3>

              <p className="text-[#646464] text-sm leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 text-xs rounded-full bg-[#28283c] text-[#787878] border border-[#3c3c50]/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    aria-label="GitHub"
                    className="text-[#505050] hover:text-[#8a9a8a] transition-colors"
                  >
                    <SocialIcon name="github" className="w-4 h-4" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    aria-label="Live Demo"
                    className="text-[#505050] hover:text-[#8a9a8a] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
