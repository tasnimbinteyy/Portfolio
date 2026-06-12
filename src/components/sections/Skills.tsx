"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const categoryLabel: Record<string, string> = {
  frontend: "Frontend & Web",
  language: "Programming Languages",
  ml: "Machine Learning",
  other: "Other",
};

export default function Skills() {
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-32 px-6 bg-[#0a0a0e]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#506464] text-sm font-semibold tracking-widest uppercase mb-3">
            What I Know
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e8e8e4]">Skills</h2>
        </motion.div>

        <div className="space-y-14">
          {Object.entries(grouped).map(([category, items], groupIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-[#506464] uppercase tracking-widest mb-6">
                {categoryLabel[category]}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {items.map((skill, i) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-[#c8c8c4]">{skill.name}</span>
                      <span className="text-[#505050]">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-[#28283c] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full rounded-full bg-[#506464]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
