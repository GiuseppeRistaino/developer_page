// src/lib/loadArticles.ts

import fm from "front-matter";

// ==============================
// Markdown raw
// ==============================
const blogModules = import.meta.glob("../content/blogs/*.md", {
  eager: true,
  as: "raw",
});

// ==============================
// Import immagini
// ==============================
const imageModules = import.meta.glob(
  "../content/blogs/**/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    import: "default",
  }
);

// ==============================
// Interfaccia articolo
// ==============================
export interface BlogArticle {
  id: string;
  category: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  description: string;
  tags: string[];
  content: string;
  coverImage: string;
}

// ==============================
// Parser frontmatter
// ==============================
function parseFrontmatter(raw: string) {
  const { attributes, body } = fm(raw);
  return {
    data: attributes as Record<string, any>,
    content: body,
  };
}

// ==============================
// Risoluzione immagine
// ==============================
function resolveImage(src: string): string {
  if (!src) return "";
  const match = Object.entries(imageModules).find(([path]) =>
    path.endsWith(src)
  );
  return match ? (match[1] as string) : src;
}

// ==============================
// Load Blogs
// ==============================
export const loadBlogs = (): BlogArticle[] => {
  return Object.entries(blogModules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw as string);

    const parts = path.split("/");
    const slug = parts[parts.length - 1].replace(".md", "");
    const category = "blogs";

    // Cover image
    const coverImage = resolveImage(data.coverImage);

    // Sostituire eventuali immagini nel contenuto markdown
    let contentWithResolvedImages = content.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_, alt, src) => {
        const resolved = resolveImage(src);
        return `![${alt}](${resolved})`;
      }
    );

    return {
      id: data.id || slug,
      category,
      slug,
      title: data.title || "",
      date: data.date || "",
      readTime: data.readTime || "",
      excerpt: data.excerpt || "",
      description: data.description || "",
      tags: data.tags || [],
      content: contentWithResolvedImages,
      coverImage,
    };
  });
};
