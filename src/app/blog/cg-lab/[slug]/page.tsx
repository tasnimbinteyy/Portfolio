"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ChevronRight, BookOpen, Menu, X } from "lucide-react";
import { cgLabPosts, categoryMeta } from "@/lib/blog";
import { labContents } from "./labContents";
import { labImages } from "./labImages";
import ImagePanel from "./ImagePanel";

// ── Inline content renderer ───────────────────────────────────────────────────
function renderContent(content: string, slug: string) {
  if (!content) return null;
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let imagePanelCount = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("### ")) {
      const id = line.replace("### ", "").toLowerCase().replace(/\s+/g, "-");
      elements.push(
        <h3 key={i} id={id} className="text-lg font-semibold mt-8 mb-3 text-[#e8e8e4] scroll-mt-24">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      const heading = line.replace("## ", "");
      const id = heading.toLowerCase().replace(/\s+/g, "-");
      const imageEntry = labImages[slug]?.[id];
      const isFirstSection = elements.filter(e => e !== null).length === 0 ||
        !elements.some(el => el && (el as any)?.props?.id?.length > 0 &&
        labImages[slug]?.[(el as any)?.props?.id]);
      elements.push(
        <h2 key={i} id={id} className="text-xl font-bold mt-10 mb-4 text-[#e8e8e4] border-l-2 border-[#8a9a8a] pl-3 scroll-mt-24">
          {heading}
        </h2>
      );
      if (imageEntry) {
        imagePanelCount++;
        const entries = Array.isArray(imageEntry) ? imageEntry : [imageEntry];
        entries.forEach((e, ei) => {
          elements.push(
            <ImagePanel key={`img-${i}-${ei}`} entry={e} sectionTitle={heading} defaultOpen={true} />
          );
        });
      }
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-1.5 my-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[#b0b0aa]">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8a9a8a] flex-shrink-0" />
              <span>{inlineFormat(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={i} className="my-6">
          {lang && (
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1a20] border border-[#2a2a35] rounded-t-xl border-b-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#506464]" />
              <span className="text-xs text-[#506464] font-mono">{lang}</span>
            </div>
          )}
          <pre className={`bg-[#0a0a0f] border border-[#2a2a35] ${lang ? "rounded-b-xl rounded-tr-xl" : "rounded-xl"} p-4 overflow-x-auto text-sm text-[#a8c4a2] font-mono leading-relaxed`}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="my-4 px-4 py-3 border-l-4 border-[#8a9a8a] bg-[#8a9a8a]/5 rounded-r-lg text-[#a0a09a] italic">
          {inlineFormat(line.replace("> ", ""))}
        </blockquote>
      );
    } else if (line.startsWith("| ")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!lines[i].includes("---")) {
          rows.push(lines[i].split("|").filter((c) => c.trim()).map((c) => c.trim()));
        }
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#2a2a35]">
                {rows[0]?.map((cell, ci) => (
                  <th key={ci} className="py-2 px-4 text-left text-[#8a9a8a] font-semibold">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-[#1a1a20] hover:bg-white/[0.02]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-2 px-4 text-[#b0b0aa]">{inlineFormat(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="text-[#b0b0aa] leading-relaxed my-3">
          {inlineFormat(line)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-[#e8e8e4] font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`"))
      return <code key={i} className="px-1.5 py-0.5 rounded bg-[#1a1a20] border border-[#2a2a35] text-[#a8c4a2] text-sm font-mono">{part.slice(1, -1)}</code>;
    return part;
  });
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function CGLabSlugPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = cgLabPosts.find((p) => p.slug === slug);
  const [activeSection, setActiveSection] = useState<string>("");
  const [leftOpen, setLeftOpen] = useState(false);
  const meta = categoryMeta["cg-lab"];

  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    post.subtopics.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0e0e12] text-[#e8e8e4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#506464] text-lg mb-4">Lab not found</p>
          <Link href="/blog/cg-lab" className="text-[#8a9a8a] hover:text-[#e8e8e4] transition-colors">
            ← Back to CG Lab
          </Link>
        </div>
      </div>
    );
  }

  const content = labContents[post.slug] ?? "";

  return (
    <div className="min-h-screen bg-[#0e0e12] text-[#e8e8e4]">

      {/* Mobile left sidebar toggle */}
      <button
        onClick={() => setLeftOpen(!leftOpen)}
        className="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-lg bg-[#1a1a20] border border-[#2a2a35] text-[#8a9a8a]"
      >
        {leftOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      <div className="flex pt-16 min-h-screen">

        {/* ── LEFT SIDEBAR ── */}
        <aside className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#0e0e12] border-r border-[#1e1e28]
          overflow-y-auto z-40 transition-transform duration-300
          lg:translate-x-0 ${leftOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="p-5">
            <Link
              href="/blog/cg-lab"
              className="flex items-center gap-2 text-[#506464] hover:text-[#8a9a8a] transition-colors text-sm mb-6 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Lab Index
            </Link>

            <div className="mb-5 pb-4 border-b border-[#1e1e28]">
              <p className="text-[10px] text-[#506464] uppercase tracking-widest font-medium mb-1">Course</p>
              <p className="text-xs text-[#8a9a8a] leading-relaxed">Computer Graphics & Image Processing</p>
            </div>

            <Link
              href="/blog/cg-lab"
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-2 text-sm text-[#8a9a8a] hover:bg-[#1a1a20] hover:text-[#e8e8e4] transition-all"
            >
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span>Course Summary</span>
            </Link>

            <div className="my-3 border-t border-[#1e1e28]" />
            <p className="text-[10px] text-[#506464] uppercase tracking-widest font-medium mb-2 px-1">Lab Tasks</p>

            {cgLabPosts.map((lab) => {
              const isActive = lab.slug === slug;
              return (
                <Link
                  key={lab.slug}
                  href={`/blog/cg-lab/${lab.slug}`}
                  onClick={() => setLeftOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-all group ${
                    isActive
                      ? "bg-[#506464]/20 text-[#8a9a8a] border border-[#506464]/30"
                      : "text-[#606060] hover:bg-[#1a1a20] hover:text-[#a0a09a]"
                  }`}
                >
                  <span className={`flex-shrink-0 w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                    isActive ? "bg-[#506464] text-[#e8e8e4]" : "bg-[#1e1e28] text-[#506464] group-hover:bg-[#2a2a35]"
                  }`}>
                    {lab.labNumber}
                  </span>
                  <span className="leading-tight">{lab.title.replace(/^Lab \d+: /, "")}</span>
                  {isActive && <ChevronRight className="w-3 h-3 ml-auto flex-shrink-0" />}
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {leftOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setLeftOpen(false)}
          />
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 lg:ml-64 lg:mr-56 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-12">

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${meta.color} text-white`}>
                  {meta.emoji} Lab {post.labNumber}
                </span>
                <span className="text-[#506464] text-xs">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
                <span className="text-[#506464] text-xs">· {post.readTime} min read</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#e8e8e4] mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-[#8a9a8a] text-lg leading-relaxed border-l-2 border-[#506464] pl-4">
                {post.excerpt}
              </p>
            </div>

            <div className="h-px bg-[#1e1e28] mb-10" />

            {/* Blog content */}
            <article>
              {renderContent(content, post.slug)}
            </article>

            {/* Bottom navigation */}
            <div className="mt-16 pt-8 border-t border-[#1e1e28] flex items-center justify-between">
              {cgLabPosts[post.labNumber - 2] && (
                <Link
                  href={`/blog/cg-lab/${cgLabPosts[post.labNumber - 2].slug}`}
                  className="flex items-center gap-2 text-sm text-[#506464] hover:text-[#8a9a8a] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Lab {post.labNumber - 1}</span>
                </Link>
              )}
              <div className="flex-1" />
              {cgLabPosts[post.labNumber] && (
                <Link
                  href={`/blog/cg-lab/${cgLabPosts[post.labNumber].slug}`}
                  className="flex items-center gap-2 text-sm text-[#506464] hover:text-[#8a9a8a] transition-colors"
                >
                  <span>Lab {post.labNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="hidden lg:block fixed top-16 right-0 h-[calc(100vh-4rem)] w-56 bg-[#0e0e12] border-l border-[#1e1e28] overflow-y-auto">
          <div className="p-5">
            <p className="text-[10px] text-[#506464] uppercase tracking-widest font-medium mb-4">On This Page</p>
            <nav className="space-y-0.5">
              {post.subtopics.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block px-3 py-2 rounded-lg text-xs transition-all leading-snug ${
                    activeSection === id
                      ? "text-[#8a9a8a] bg-[#506464]/15 border-l-2 border-[#8a9a8a] pl-2.5"
                      : "text-[#505050] hover:text-[#8a9a8a] hover:bg-[#1a1a20]"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

      </div>
    </div>
  );
}
