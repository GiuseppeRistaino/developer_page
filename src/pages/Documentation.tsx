import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { loadDocs } from "../lib/loadArticles";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

// ==============================
// DOCUMENTATION PAGE (Accordion singolo, articoli con excerpt)
// ==============================
const Documentation = () => {
  const docCategories = loadDocs();
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategoryId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 animate-fade-up">
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

        <div className="flex flex-col gap-8">
          {docCategories.map((cat) => {
            const isOpen = openCategoryId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`
                  cursor-pointer rounded-xl border bg-card p-6 transition-all duration-300
                  ${isOpen ? "border-orange-500 shadow-gold" : "border-border"}
                  hover:border-primary/30
                `}
              >
                {/* Header categoria */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-heading text-xl font-bold">{cat.title}</h2>
                    {/* Icona piccola accanto al titolo */}
                    {cat.icon && (
                      <img
                        src={cat.icon}
                        alt={cat.title}
                        className="w-6 h-6 object-contain"
                      />
                    )}
                  </div>
                  <span
                    className={`transition-all duration-300 ${
                      isOpen
                        ? "rotate-90 text-orange-500"
                        : "rotate-0 text-muted-foreground"
                    }`}
                  >
                    ▶
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>

                {/* Lista articoli */}
                {isOpen && (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {cat.articles.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/documentazione/${cat.id}/${article.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="group flex flex-col border border-border rounded-lg
                                  bg-secondary/50 px-4 py-3 transition-all
                                  hover:bg-secondary hover:border-primary/30 hover:shadow-gold"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <ArrowRight
                            size={16}
                            className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{article.readTime}</p>
                        {/* Aggiunta dell'excerpt */}
                        {article.excerpt && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-3">
                            {article.excerpt}
                          </p>
                        )}
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
