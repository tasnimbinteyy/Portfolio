import type { BlogPost, BlogCategory, CGLabPost } from "@/types";

export const categoryMeta: Record<
  BlogCategory,
  { label: string; emoji: string; color: string; description: string }
> = {
  coding: {
    label: "Coding",
    emoji: "💻",
    color: "from-purple-500 to-blue-500",
    description: "Thoughts on algorithms, web dev, and problem solving.",
  },
  painting: {
    label: "Painting",
    emoji: "🎨",
    color: "from-pink-500 to-rose-500",
    description: "My journey with colors, brushes, and blank canvases.",
  },
  books: {
    label: "Books",
    emoji: "📚",
    color: "from-amber-500 to-orange-500",
    description: "Reviews, notes, and lessons from books I've read.",
  },
  gardening: {
    label: "Gardening",
    emoji: "🌿",
    color: "from-emerald-500 to-green-500",
    description: "Growing plants on my balcony — one pot at a time.",
  },
  photography: {
    label: "Photography",
    emoji: "📷",
    color: "from-sky-500 to-cyan-500",
    description: "Moments I captured while traveling.",
  },
  "cg-lab": {
    label: "CG & Image Processing",
    emoji: "🖼️",
    color: "from-[#506464] to-[#8a9a8a]",
    description: "Lab experiments from my Computer Graphics & Image Processing course.",
  },
};

export const blogPosts: BlogPost[] = [
  // ── CODING ──────────────────────────────────────────────
  {
    slug: "how-i-solved-my-first-100-codeforces-problems",
    title: "How I Solved My First 100 Codeforces Problems",
    excerpt:
      "The journey from being completely lost on Div. 2 A problems to finally hitting 100 solves — what I learned, what broke me, and what kept me going.",
    content: `When I first opened Codeforces, I stared at a problem for 45 minutes and wrote nothing. That was my starting point.

## The First 20 Problems

The first 20 were pure brute force. I didn't know about time complexity, I didn't care about edge cases. I just wanted the green "Accepted" verdict. Looking back, that was the right mindset — just start.

The key insight that changed everything: **read the constraints first**. If n ≤ 10⁶, you need O(n log n) or better. That single habit saved me from writing O(n²) solutions that would TLE.

## Problems 21–60: Where It Gets Real

This is where I hit my first real wall — greedy algorithms. They feel like magic until you understand the underlying proof. My approach: for every greedy problem I solved, I tried to break my own solution with a counterexample.

Some problems that shaped my thinking:
- Two-pointer technique for subarray problems
- Prefix sums for range queries
- Binary search on the answer (not just on sorted arrays)

## Problems 61–100: Building Intuition

By this point, I stopped panicking when I saw a new problem type. I started recognizing patterns. A problem about intervals? Probably sorting + greedy. A problem asking for minimum/maximum over a range? Probably segment tree or sparse table.

## What I'd Tell Myself at Problem 1

Don't skip the editorial after you're stuck for more than an hour. Reading how others think is not cheating — it's learning. The goal is to build a mental library of patterns, not to suffer alone.

Keep going. Problem 100 feels very different from problem 1.`,
    category: "coding",
    date: "2024-11-15",
    readTime: 6,
    coverEmoji: "🧩",
  },
  {
    slug: "why-i-chose-nextjs-for-my-portfolio",
    title: "Why I Chose Next.js for My Portfolio",
    excerpt:
      "React was familiar, but Next.js felt like the right tool. Here's my reasoning — App Router, file-based routing, and why it matters for a developer portfolio.",
    content: `I could have built this portfolio in plain React. I've done it before. But this time I wanted something that felt production-grade from day one.

## The App Router Changed Everything

Next.js 13+ App Router is genuinely different from what came before. Layouts, nested routing, server components — it maps to how I think about UI structure. Each section of my portfolio is a component, each page is a folder.

\`\`\`
src/app/
├── page.tsx        ← home
├── blog/
│   ├── page.tsx    ← blog listing
│   └── [slug]/
│       └── page.tsx ← individual post
\`\`\`

This structure is self-documenting. Any developer can open the folder and immediately understand the routing.

## Server Components by Default

The blog listing page doesn't need any client-side JavaScript. It's just data + markup. With Next.js, that's the default — components are server-rendered unless you explicitly opt into the client with \`"use client"\`. This means faster page loads and better SEO without any extra configuration.

## The Decision

For a portfolio that I want to grow over time — adding blog posts, maybe a projects API, maybe a contact form — Next.js gives me the right foundation. It's not over-engineering; it's choosing a tool that won't limit me later.`,
    category: "coding",
    date: "2024-12-01",
    readTime: 5,
    coverEmoji: "⚡",
  },

  // ── PAINTING ─────────────────────────────────────────────
  {
    slug: "finding-calm-in-watercolors",
    title: "Finding Calm in Watercolors",
    excerpt:
      "I picked up a brush during exam season as a way to decompress. What started as stress relief turned into something I genuinely love.",
    content: `I bought my first watercolor set from a small art supply shop near campus. It was cheap — 12 colors, a basic brush, and a pad of paper that was definitely not watercolor paper. None of that mattered.

## Why Watercolor

I tried acrylic first. It felt too permanent, too demanding. Watercolor is forgiving in a different way — you can't fully control it, and that's the point. The water does things you didn't plan. You learn to work with accidents instead of against them.

## What I Paint

Mostly small things. A cup of tea. The view from my window. Flowers I find interesting. I'm not trying to make masterpieces — I'm trying to make something that feels like a moment captured.

There's a particular joy in painting something you see every day and suddenly noticing details you'd always ignored. The way light hits a glass of water. The exact shade of green on a leaf.

## The Unexpected Benefit

Painting made me a better programmer. That sounds strange, but hear me out — both require you to break a complex thing into smaller steps, to hold the whole picture in your head while working on one small part, and to accept that the first version is never the final version.

If you've been thinking about picking up painting, start with watercolor. Buy the cheap set. Use the wrong paper. Just start.`,
    category: "painting",
    date: "2024-10-20",
    readTime: 4,
    coverEmoji: "🎨",
  },

  // ── BOOKS ────────────────────────────────────────────────
  {
    slug: "atomic-habits-what-actually-stuck",
    title: "Atomic Habits — What Actually Stuck",
    excerpt:
      "Everyone recommends this book. I finally read it. Here's what I actually changed in my life after finishing it — and what I think is overhyped.",
    content: `I resisted reading Atomic Habits for a long time because it felt like every productivity influencer was quoting it. Eventually I gave in. Here's my honest take.

## What's Actually Good

The concept of **identity-based habits** is genuinely useful. Instead of "I want to solve 100 Codeforces problems," the reframe is "I am someone who solves problems every day." The goal becomes a byproduct of the identity, not the other way around.

The **habit stacking** technique is simple and it works. I attached my daily coding practice to something I already did — right after morning tea, before opening any social media. It's been consistent for months now.

## The Two-Minute Rule

Start with a version of the habit that takes two minutes. Want to read more? Open the book and read one page. Want to paint? Just set up your brushes. The starting is the hardest part; the rest follows naturally.

I used this to build my painting habit. "Just mix one color" became an hour of painting more times than I can count.

## What I Think Is Overhyped

The book sometimes feels like it's padding a blog post into 300 pages. The core ideas could be communicated in 50 pages. But the repetition might be intentional — the ideas need to sink in.

## My Rating

4/5. Read it once, take notes on the parts that apply to your specific situation, and don't feel obligated to implement everything at once.`,
    category: "books",
    date: "2024-09-10",
    readTime: 5,
    coverEmoji: "📖",
  },
  {
    slug: "deep-work-a-student-perspective",
    title: "Deep Work — A Student's Perspective",
    excerpt:
      "Cal Newport wrote this for knowledge workers, but it applies to university students just as much. My notes and how I applied it during finals.",
    content: `Cal Newport's Deep Work argues that the ability to focus without distraction is becoming increasingly rare and increasingly valuable. As a CSE student, this hit close to home.

## The Core Argument

Shallow work — emails, social media, quick tasks — feels productive but produces little of real value. Deep work — focused, cognitively demanding tasks — is where real learning and creation happen.

For a student, shallow work looks like: re-reading notes, highlighting textbooks, watching lecture recordings at 2x speed. Deep work looks like: solving problems from scratch, writing code without looking at solutions, explaining concepts out loud to yourself.

## What I Changed

I started blocking 2-hour deep work sessions in the morning. Phone in another room. No music with lyrics. One task only.

The first week was uncomfortable. My brain kept reaching for distraction. By the third week, I could sustain focus for the full two hours and the quality of my work was noticeably different.

## Applied to Competitive Programming

Deep work and competitive programming are a natural fit. You can't solve a hard algorithmic problem while checking notifications. The problem requires your full attention, and giving it that attention is exactly what builds the skill.

## Recommended For

Anyone who feels busy but not productive. Anyone who wants to learn hard things faster. Anyone in a technical field.`,
    category: "books",
    date: "2024-08-25",
    readTime: 6,
    coverEmoji: "🧠",
  },

  // ── GARDENING ────────────────────────────────────────────
  {
    slug: "my-balcony-garden-beginners-mistakes",
    title: "My Balcony Garden — Beginner's Mistakes",
    excerpt:
      "I killed three plants before I grew one successfully. Here's everything I did wrong and what finally worked on my small university balcony.",
    content: `My balcony is small — maybe 6 feet wide. I thought that meant I couldn't have a real garden. I was wrong.

## Mistake #1: Overwatering

I killed my first two plants by watering them every single day because I thought more water = more growth. Plants need to breathe. The soil needs to dry out between waterings. Now I check the soil with my finger — if the top inch is dry, I water. If not, I wait.

## Mistake #2: Wrong Pots

I used decorative pots with no drainage holes. The roots sat in water and rotted. Every pot needs a drainage hole. This is non-negotiable.

## What's Growing Now

After those early failures, I started with plants that are hard to kill:
- **Pothos** — thrives in indirect light, forgives irregular watering
- **Mint** — grows aggressively, smells wonderful, great for tea
- **Marigolds** — bright orange flowers, keeps insects away
- **Tomatoes** — my most ambitious project, currently in progress

## The Unexpected Joy

There's something deeply satisfying about watching something grow that you planted. It's slow, it's patient, it's the opposite of the instant feedback loop of coding. I think that's why I love it.

My balcony is now the place I go when I need to think. The plants don't care about deadlines or CGPA. They just grow.`,
    category: "gardening",
    date: "2024-07-14",
    readTime: 4,
    coverEmoji: "🌱",
  },

  // ── PHOTOGRAPHY ──────────────────────────────────────────
  {
    slug: "what-travel-photography-taught-me-about-seeing",
    title: "What Travel Photography Taught Me About Seeing",
    excerpt:
      "I started taking photos to remember places. I ended up learning how to actually look at the world around me.",
    content: `I don't own a professional camera. I shoot on my phone. And I've learned more about observation from photography than from any other hobby.

## The Shift in How I See

Before I started taking photos seriously, I would visit a place and experience it passively. After picking up photography, I started asking: what is the most interesting thing about this moment? What angle shows it best? What would I want to remember?

That question — *what is the most interesting thing here?* — changed how I experience travel entirely.

## What I Look For

I'm not drawn to the obvious tourist shots. I'm more interested in:
- **People going about their day** — a vendor arranging fruit, a child watching something off-camera
- **Light and shadow** — the way afternoon light falls through a narrow street
- **Small details** — a weathered door, a pattern in tiles, a reflection in a puddle

## The Phone Camera Constraint

Shooting on a phone forces you to think about composition because you can't compensate with expensive glass. You have to get closer, find better light, choose a more interesting angle. The constraint is a teacher.

## Photography and Coding

Both photography and coding are about solving a problem with constraints. In photography: how do I capture this moment with the tools I have? In coding: how do I solve this problem within the time and memory limits?

The creative thinking transfers. I'm convinced that having multiple creative outlets makes you better at each one.`,
    category: "photography",
    date: "2024-06-05",
    readTime: 5,
    coverEmoji: "🌄",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}

// ── CG Lab Posts ──────────────────────────────────────────────────────────────
export const cgLabPosts: CGLabPost[] = [
  {
    slug: "cg-lab-1-opengl-installation",
    title: "Lab 1: Setting Up OpenGL in CodeBlocks",
    excerpt: "Step-by-step guide to installing and configuring OpenGL with freeglut in CodeBlocks IDE on Windows.",
    content: "",
    category: "cg-lab",
    date: "2025-01-10",
    readTime: 4,
    coverEmoji: "⚙️",
    labNumber: 1,
    subtopics: [
      { id: "what-is-opengl", label: "What is OpenGL?" },
      { id: "prerequisites", label: "Prerequisites" },
      { id: "installation-steps", label: "Installation Steps" },
      { id: "first-window", label: "First OpenGL Window" },
      { id: "troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    slug: "cg-lab-2-image-basics",
    title: "Lab 2: Image Basics with Python",
    excerpt: "Reading, displaying, and analyzing images in Python — dimensions, pixel access, bulk loading, and working with audio/video.",
    content: "",
    category: "cg-lab",
    date: "2025-01-17",
    readTime: 7,
    coverEmoji: "🖼️",
    labNumber: 2,
    subtopics: [
      { id: "read-display", label: "Read & Display Image" },
      { id: "dimensions", label: "Image Dimensions (RGB)" },
      { id: "from-storage", label: "Load from PC Storage" },
      { id: "bulk-load", label: "Read 1000 Images" },
      { id: "audio-video", label: "Read Audio & Video" },
    ],
  },
  {
    slug: "cg-lab-3-intensity-transformations",
    title: "Lab 3: Intensity Transformations",
    excerpt: "Exploring image complement, gamma correction, log transformation, and detecting differences between two images.",
    content: "",
    category: "cg-lab",
    date: "2025-01-24",
    readTime: 9,
    coverEmoji: "🌓",
    labNumber: 3,
    subtopics: [
      { id: "complement", label: "Image Complement" },
      { id: "gamma", label: "Gamma Correction" },
      { id: "log", label: "Log Transformation" },
      { id: "subtraction", label: "Image Subtraction" },
    ],
  },
  {
    slug: "cg-lab-4-histogram",
    title: "Lab 4: Histogram & Equalization",
    excerpt: "Understanding pixel intensity distributions with histograms and improving image contrast through histogram equalization.",
    content: "",
    category: "cg-lab",
    date: "2025-01-31",
    readTime: 7,
    coverEmoji: "📊",
    labNumber: 4,
    subtopics: [
      { id: "what-is-histogram", label: "What is a Histogram?" },
      { id: "plot-histogram", label: "Plotting the Histogram" },
      { id: "equalization", label: "Histogram Equalization" },
      { id: "comparison", label: "Before vs After" },
    ],
  },
  {
    slug: "cg-lab-5-line-drawing",
    title: "Lab 5: Line Drawing Algorithms",
    excerpt: "Implementing DDA and Bresenham's line drawing algorithms from scratch using OpenGL in CodeBlocks.",
    content: "",
    category: "cg-lab",
    date: "2025-02-07",
    readTime: 10,
    coverEmoji: "📐",
    labNumber: 5,
    subtopics: [
      { id: "dda", label: "DDA Algorithm" },
      { id: "bresenham", label: "Bresenham Algorithm" },
      { id: "comparison", label: "DDA vs Bresenham" },
      { id: "opengl-impl", label: "OpenGL Implementation" },
    ],
  },
  {
    slug: "cg-lab-6-geometric-transformations",
    title: "Lab 6: Geometric Transformations",
    excerpt: "Applying translation, rotation, and scaling transformations to images using OpenCV and transformation matrices.",
    content: "",
    category: "cg-lab",
    date: "2025-02-14",
    readTime: 8,
    coverEmoji: "🔄",
    labNumber: 6,
    subtopics: [
      { id: "translation", label: "Translation" },
      { id: "rotation", label: "Rotation" },
      { id: "scaling", label: "Scaling" },
      { id: "matrix", label: "Transformation Matrix" },
    ],
  },
  {
    slug: "cg-lab-7-otsu-thresholding",
    title: "Lab 7: Otsu's Thresholding Method",
    excerpt: "Automatic global thresholding using Otsu's method — finding the optimal threshold by maximizing inter-class variance.",
    content: "",
    category: "cg-lab",
    date: "2025-02-21",
    readTime: 8,
    coverEmoji: "⬛",
    labNumber: 7,
    subtopics: [
      { id: "what-is-thresholding", label: "What is Thresholding?" },
      { id: "otsu-theory", label: "Otsu's Theory" },
      { id: "algorithm", label: "Algorithm Steps" },
      { id: "implementation", label: "Implementation" },
      { id: "figure-10.36", label: "Fig 10.36 — Septagon" },
      { id: "figure-10.37", label: "Fig 10.37 — Otsu Results" },
      { id: "figure-10.38", label: "Fig 10.38 — Fingerprint" },
      { id: "figure-10.39", label: "Fig 10.39 — Polymersomes" },
      { id: "figure-10.40", label: "Fig 10.40 — High Noise" },
      { id: "figure-10.41", label: "Fig 10.41 — Low Noise" },
    ],
  },
  {
    slug: "cg-lab-8-cohen-sutherland",
    title: "Lab 8: Cohen-Sutherland Line Clipping",
    excerpt: "Implementing the Cohen-Sutherland line clipping algorithm to clip line segments against a rectangular viewport using region outcodes.",
    content: "",
    category: "cg-lab",
    date: "2025-02-28",
    readTime: 9,
    coverEmoji: "✂️",
    labNumber: 8,
    subtopics: [
      { id: "what-is-line-clipping", label: "What is Line Clipping?" },
      { id: "algorithm", label: "Algorithm Steps" },
      { id: "implementation", label: "Implementation" },
    ],
  },
  {
    slug: "cg-lab-9-kmeans-clustering",
    title: "Lab 9: K-Means Clustering",
    excerpt: "Segmenting images using K-Means clustering — grouping pixels by color similarity to identify regions in an image.",
    content: "",
    category: "cg-lab",
    date: "2025-03-07",
    readTime: 10,
    coverEmoji: "🎯",
    labNumber: 9,
    subtopics: [
      { id: "what-is-clustering", label: "What is Clustering?" },
      { id: "k-means-algorithm", label: "K-Means Algorithm" },
      { id: "implementation", label: "Implementation" },
      { id: "effect-of-k-values", label: "Effect of K Values" },
    ],
  },
  {
    slug: "cg-lab-10-flood-fill",
    title: "Lab 10: Boundary & Flood Fill Algorithm",
    excerpt: "Implementing Boundary Fill and Flood Fill algorithms for object detection and region coloring in OpenGL.",
    content: "",
    category: "cg-lab",
    date: "2025-03-14",
    readTime: 9,
    coverEmoji: "🪣",
    labNumber: 10,
    subtopics: [
      { id: "what-is-fill", label: "What is Fill Algorithm?" },
      { id: "boundary-fill", label: "Boundary Fill" },
      { id: "flood-fill", label: "Flood Fill" },
      { id: "comparison", label: "Comparison" },
    ],
  },
  {
    slug: "cg-lab-11-edge-detection",
    title: "Lab 11: Edge Detection",
    excerpt: "Exploring Roberts, Prewitt, Sobel, LoG, and Canny edge detectors from Gonzalez's Digital Image Processing.",
    content: "",
    category: "cg-lab",
    date: "2025-03-21",
    readTime: 12,
    coverEmoji: "🔍",
    labNumber: 11,
    subtopics: [
      { id: "what-is-an-edge", label: "What is an Edge?" },
      { id: "laplacian-of-gaussian", label: "Laplacian of Gaussian" },
      { id: "canny-detector", label: "Canny Detector" },
      { id: "comparison", label: "Comparison" },
    ],
  },
];

export function getCGLabPost(slug: string): CGLabPost | undefined {
  return cgLabPosts.find((p) => p.slug === slug);
}
