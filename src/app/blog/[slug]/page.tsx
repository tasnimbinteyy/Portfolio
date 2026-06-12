import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { blogPosts, categoryMeta, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Tasnim's Blog`,
    description: post.excerpt,
  };
}

// Minimal markdown renderer: handles ##, **bold**, ` code `, and paragraphs
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      // Collect consecutive list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-4 text-gray-300">
          {items.map((item, idx) => (
            <li key={idx}>{inlineFormat(item)}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("```")) {
      // Code block
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 my-6 overflow-x-auto text-sm text-gray-300 font-mono">
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="text-gray-300 leading-relaxed my-4">
          {inlineFormat(line)}
        </p>
      );
    }

    i++;
  }

  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  // Handle **bold**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const meta = categoryMeta[post.category];
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> All Posts
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-3xl mb-6`}>
            {post.coverEmoji}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${meta.color} text-white`}>
              <Tag className="w-3 h-3" />
              {meta.label}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-xs">
              <Clock className="w-3 h-3" />
              {post.readTime} min read
            </span>
            <span className="text-gray-500 text-xs">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-purple-500 pl-4">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-10" />

        {/* Content */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-16 mb-10" />

        {/* Related Posts */}
        {related.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">
              More in {meta.label}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all">
                    <span className="text-xl">{r.coverEmoji}</span>
                    <h3 className="text-sm font-semibold mt-2 group-hover:text-purple-400 transition-colors leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {r.readTime} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
