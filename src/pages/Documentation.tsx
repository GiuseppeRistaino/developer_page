import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { loadDocs } from "../lib/loadArticles";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// ==============================
// DOCUMENTATION PAGE (Lista categorie con accordion)
// ==============================
const Documentation = () => {
  const docCategories = loadDocs();
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>([]);

  const toggleCategory = (id: string) => {
    setOpenCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
            Knowledge Base
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Documentazione
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Articoli tecnici, guide e best practice sulle tecnologie con cui lavoro quotidianamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docCategories.map((cat) => {
            const isOpen = openCategoryIds.includes(cat.id);
            return (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-gold"
              >
                {/* Header categoria */}
                <button
                  className="flex items-center justify-between w-full mb-4"
                  onClick={() => toggleCategory(cat.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="font-heading text-xl font-bold">{cat.title}</h2>
                  </div>
                  <span
                    className={`transition-transform text-primary ${isOpen ? "rotate-90" : "rotate-0"}`}
                  >
                    ▶
                  </span>
                </button>

                <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>

                {/* Lista articoli con scroll e max-height */}
                {isOpen && (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cat.articles.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/documentazione/${cat.id}/${article.slug}`}
                        className="
                          group flex items-center justify-between
                          rounded-lg border border-border bg-secondary/50
                          px-4 py-3 transition-all
                          hover:bg-secondary hover:border-primary/30 hover:shadow-gold
                        "
                      >
                        <div>
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {article.readTime}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==============================
// DOC ARTICLE PAGE
// ==============================
export const DocArticlePage = () => {
  const { categoryId, articleSlug } = useParams<{
    categoryId: string;
    articleSlug: string;
  }>();

  const docCategories = loadDocs();
  const category = docCategories.find((c) => c.id === categoryId);
  const article = category?.articles.find((a) => a.slug === articleSlug);

  if (!category || !article) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">
            Articolo non trovato
          </h1>
          <Link to="/documentazione" className="text-primary hover:underline">
            Torna alla Documentazione
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          to="/documentazione"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Torna alla Documentazione
        </Link>

        <article>
          <div className="flex items-center gap-2 text-xs text-primary font-medium mb-4">
            <span>{category.icon}</span>
            <span>{category.title}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>

          <div className="
            prose prose-invert max-w-none
            prose-headings:mt-8
            prose-p:mb-6
            prose-ul:list-disc
            prose-ul:pl-6
            prose-li:mb-2
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {article.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

// Export default solo su Documentation
export default Documentation;
