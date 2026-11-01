// src/lib/loadArticles.ts

import fm from "front-matter";

// ==============================
// Markdown raw
// ==============================
const blogModules = import.meta.glob("../content/blogs/*.md", {
  eager: true,
  as: "raw",
});

const docModules = import.meta.glob("../content/documentazione/**/*.md", {
  eager: true,
  as: "raw",
});

const iconModules = import.meta.glob("../assets/icons/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;



// ==============================
// Import immagini
// ==============================
const imageModules = import.meta.glob(
  "../assets/images/*.{png,jpg,jpeg,webp,svg}",
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
  featured: boolean;
  credits: PhotoCredit[];
}

// Crediti delle foto con licenza libera, dichiarati nel frontmatter
export interface PhotoCredit {
  subject: string;
  author: string;
  source: string;
  license: string;
  licenseUrl: string;
}

export interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: DocArticle[];
}

export interface DocArticle {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
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
    // Il titolo opzionale ![alt](file "titolo") diventa la didascalia
    const contentWithResolvedImages = content.replace(
      /!\[([^\]]*)\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g,
      (_, alt, src, title) => {
        const resolved = resolveImage(src);
        return `![${alt}](${resolved}${title})`;
      }
    );

    return {
      id: data.id || slug,
      category,
      slug,
      title: data.title || "",
      date: data.date || "",
      readTime: data.readTime || "",
      excerpt: data.excerpt || data.description || "",
      description: data.description || "",
      tags: data.tags || [],
      content: contentWithResolvedImages,
      coverImage,
      featured: Boolean(data.featured),
      credits: data.credits || [],
    };
  });
};

// Dal più recente al più vecchio
export const sortByDate = (articles: BlogArticle[]): BlogArticle[] =>
  [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export const TRAVEL_TAG = "Viaggio";

// ==============================
// Testi delle categorie documentazione
// ==============================
const docCategoryInfo: Record<string, { title: string; description: string }> = {
  flutter: {
    title: "Flutter",
    description: "Un corso a lezioni per imparare Flutter e Dart, un passo alla volta.",
  },
  "sap btp": {
    title: "SAP BTP",
    description: "Appunti su SAP Business Technology Platform: strategia, pilastri, modelli di servizio e di deployment.",
  },
  sap: {
    title: "SAP Commerce",
    description: "Note sulla piattaforma eCommerce con cui lavoro ogni giorno.",
  },
};

// ==============================
// Load Docs
// ==============================
export const loadDocs = (): DocCategory[] => {
  const categoriesMap: Record<string, DocCategory> = {};

  Object.entries(docModules).forEach(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw as string);

    const parts = path.split("/");
    const categoryFolder = parts[parts.length - 2];

    // slug dal frontmatter (fallback al nome file)
    const fileSlug = parts[parts.length - 1].replace(".md", "");
    const slug = data.slug || fileSlug;

    if (!categoriesMap[categoryFolder]) {
      const categoryId = categoryFolder.toLowerCase();

      // Cerca icona con stesso nome dell'id
      const iconEntry = Object.entries(iconModules).find(([path]) =>
        path.toLowerCase().includes(`${categoryId}.png`)
      );

      const iconPath = iconEntry ? iconEntry[1] : "";

      categoriesMap[categoryFolder] = {
        id: categoryId,
        title: docCategoryInfo[categoryId]?.title ?? categoryFolder,
        description: docCategoryInfo[categoryId]?.description ?? "",
        icon: iconPath,
        articles: [],
      };
    }

    const contentWithResolvedImages = content.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_, alt, src) => {
        const resolved = resolveImage(src);
        return `![${alt}](${resolved})`;
      }
    );

    const article: DocArticle = {
      slug,
      category: categoryFolder,
      title: data.title || "",
      date: data.date || "",
      readTime: data.readTime || "",
      excerpt: data.excerpt || "",
      content: contentWithResolvedImages,
    };

    categoriesMap[categoryFolder].articles.push(article);
  });

  return Object.values(categoriesMap);
};
