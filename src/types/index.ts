export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "language" | "ml" | "other";
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  cgpa: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export type IconName = "github" | "linkedin" | "mail";

export type BlogCategory =
  | "coding"
  | "painting"
  | "books"
  | "gardening"
  | "photography"
  | "cg-lab";

export interface CGLabPost extends BlogPost {
  labNumber: number;
  subtopics: { id: string; label: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  date: string;
  readTime: number; // minutes
  coverEmoji: string;
}
