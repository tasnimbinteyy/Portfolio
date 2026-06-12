"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Trophy } from "lucide-react";
import { education, personalInfo } from "@/lib/data";

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    lines: [education.institution, education.degree, education.year, `CGPA: ${education.cgpa}`],
    highlight: 3,
  },
  {
    icon: Code2,
    title: "Competitive Programming",
    lines: ["100+ Problems Solved", "Codeforces", "Strong algorithmic thinking", "Data Structures & Algorithms"],
    highlight: 0,
  },
  {
    icon: Trophy,
    title: "Achievements",
    lines: ["Perfect CGPA — 4.00 / 4.00", "5 Projects Delivered", "AI & ML Applications", "Full Stack Development"],
    highlight: 0,
  },
  {
    icon: Briefcase,
    title: "Experience",
    lines: ["Full Stack Developer", "Machine Learning Projects", "Open Source Contributor", "Academic Research"],
    highlight: 0,
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-[#0e0e12]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#506464] text-sm font-semibold tracking-widest uppercase mb-3">
            Who I Am
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e8e4]">About Me</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#787878] text-lg leading-relaxed max-w-3xl mx-auto text-center mb-20"
        >
          {personalInfo.about}
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-[#141420] border border-[#3c3c50]/50 hover:border-[#506464]/60 transition-all"
              >
                <Icon className="w-9 h-9 mb-4 text-[#506464]" />
                <h3 className="text-[#c8c8c4] text-base font-semibold mb-3">{card.title}</h3>
                <ul className="space-y-1">
                  {card.lines.map((line, idx) => (
                    <li
                      key={idx}
                      className={
                        idx === card.highlight
                          ? "text-[#8a9a8a] font-semibold text-sm"
                          : "text-[#646464] text-sm"
                      }
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
