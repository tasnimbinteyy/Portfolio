import type { Project, Skill, Education, SocialLink } from "@/types";

export const personalInfo = {
  name: "Tasnim Bintey Naser",
  role: "Full Stack Developer",
  tagline: "Building elegant solutions to complex problems.",
  about:
    "I'm a passionate Computer Science student at USTC with a perfect CGPA of 4.00, specializing in full-stack web development and machine learning. I love turning ideas into real-world applications — from AI-powered systems to responsive web interfaces. With 100+ problems solved on Codeforces, I bring strong algorithmic thinking to every project I build.",
  email: "tasnimbinteynaser@gmail.com",
  cvUrl: "#", // Replace with actual CV link when available
} as const;

export const education: Education = {
  institution: "University of Science and Technology, Chittagong (USTC)",
  degree: "B.Sc in Computer Science & Engineering",
  year: "4th Year (Ongoing)",
  cgpa: "4.00",
};

export const socialLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: "mail" },
  { label: "GitHub", href: "#", icon: "github" },       // TODO: add real URL
  { label: "LinkedIn", href: "#", icon: "linkedin" },   // TODO: add real URL
];

export const skills: Skill[] = [
  { name: "Next.js", level: 90, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "JavaScript", level: 88, category: "frontend" },
  { name: "HTML / CSS", level: 92, category: "frontend" },
  { name: "C++", level: 82, category: "language" },
  { name: "Machine Learning", level: 75, category: "ml" },
];

export const projects: Project[] = [
  {
    title: "AI Powered Job Recommendation System",
    description:
      "Intelligent job-matching platform that uses machine learning to recommend personalized opportunities based on a candidate's skills, experience, and preferences.",
    tech: ["Next.js", "React", "Machine Learning", "Python"],
    github: "#",
    live: "#",
  },
  {
    title: "Heart Risk Prediction",
    description:
      "ML-based healthcare application that predicts cardiovascular disease risk by analyzing patient data through trained classification models.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    github: "#",
    live: "#",
  },
  {
    title: "Amazon Frontend Clone",
    description:
      "Pixel-perfect, fully responsive e-commerce UI replicating Amazon's interface, built with semantic HTML and modern CSS techniques.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "#",
    live: "#",
  },
  {
    title: "Calculator (Java)",
    description:
      "Feature-rich desktop calculator application built in Java with a clean GUI, supporting standard and scientific operations.",
    tech: ["Java", "OOP", "Swing"],
    github: "#",
  },
  {
    title: "Student Welfare Portal",
    description:
      "University management system for student services, welfare programs, and administrative operations — built for USTC students.",
    tech: ["React", "Next.js", "CSS"],
    github: "#",
    live: "#",
  },
];
