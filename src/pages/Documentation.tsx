import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import PageHeader from "@/components/PageHeader";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
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
    <div className="min-h-screen py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <PageHeader eyebrow="Knowledge base" title="Documentazione">
          Articoli tecnici, guide e best practice sulle tecnologie con cui lavoro quotidianamente.
        </PageHeader>

        <div className="border-t border-border">
          {docCategories.map((cat, i) => {
            const isOpen = openCategoryId === cat.id;
            return (
              <Reveal key={cat.id} delay={i * 70} className="border-b border-border">
                <button
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-5 py-8 text-left md:gap-8"
                >
                  <span className="hidden w-10 font-mono text-xs text-muted-foreground sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-display text-3xl font-light tracking-tight transition-colors md:text-5xl ${
                          isOpen ? "text-primary" : "group-hover:text-primary"
                        }`}
                      >
                        {cat.title}
                      </span>
                      {cat.icon && <img src={cat.icon} alt="" className="h-7 w-7 object-contain" />}
                    </span>
                    <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {cat.description}
                    </span>
                  </span>
                  <span className="hidden whitespace-nowrap font-mono text-xs text-muted-foreground md:block">
                    {cat.articles.length} {cat.articles.length === 1 ? "articolo" : "articoli"}
                  </span>
                  <ChevronDown
                    size={22}
                    className={`flex-shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                    }`}
                  />
                </button>

                {/* Lista articoli */}
                <div className="collapse-grid" data-open={isOpen}>
                  <div>
                    <div className="grid gap-3 pb-10 sm:pl-[4.5rem] md:grid-cols-2 md:pl-[4.75rem]">
                      {cat.articles.map((article) => (
                        <Link
                          key={article.slug}
                          to={`/documentazione/${cat.id}/${article.slug}`}
                          tabIndex={isOpen ? 0 : -1}
                          className="spotlight lift group flex flex-col rounded-xl border border-border bg-card px-5 py-4"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-medium leading-snug transition-colors group-hover:text-primary">
                              {article.title}
                            </span>
                            <ArrowRight
                              size={16}
                              className="mt-1 flex-shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary"
                            />
                          </span>
                          {article.excerpt && (
                            <span className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                              {article.excerpt}
                            </span>
                          )}
                          <span className="mt-2 font-mono text-xs text-muted-foreground">{article.readTime}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
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
  const index = category?.articles.findIndex((a) => a.slug === articleSlug) ?? -1;
  const article = category?.articles[index];

  if (!category || !article) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="mb-4 font-display text-3xl font-light">Articolo non trovato</h1>
          <Link to="/documentazione" className="text-primary hover:underline">
            Torna alla Documentazione
          </Link>
        </div>
      </div>
    );
  }

  const previous = category.articles[index - 1];
  const next = category.articles[index + 1];

  return (
    <div className="min-h-screen py-16 md:py-24">
      <ReadingProgress />

      <div className="container mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Indice della categoria */}
        <aside className="hidden lg:block">
          <nav aria-label={`Articoli di ${category.title}`} className="custom-scrollbar sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3">
            <p className="eyebrow mb-4">{category.title}</p>
            <ul className="space-y-1 border-l border-border">
              {category.articles.map((item) => {
                const current = item.slug === article.slug;
                return (
                  <li key={item.slug}>
                    <Link
                      to={`/documentazione/${category.id}/${item.slug}`}
                      aria-current={current ? "page" : undefined}
                      className={`-ml-px block border-l py-1.5 pl-3 text-sm leading-snug transition-colors ${
                        current
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0 max-w-3xl">
          <Link
            to="/documentazione"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Torna alla Documentazione
          </Link>

          <article>
            <p className="eyebrow">{category.title}</p>

            <h1 className="soft-optical mt-4 font-display text-4xl font-light leading-tight tracking-tight md:text-5xl">
              {article.title}
            </h1>

            <p className="mb-10 mt-5 font-mono text-xs text-muted-foreground">
              {article.date}
              <span className="mx-1.5 text-primary">✦</span>
              {article.readTime}
            </p>

            <div className="prose prose-docs max-w-none prose-headings:mt-8 prose-p:mb-6 prose-ul:list-disc prose-ul:pl-6 prose-li:mb-2">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Lezione precedente e successiva */}
          {(previous || next) && (
            <div className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {previous ? (
                <Link
                  to={`/documentazione/${category.id}/${previous.slug}`}
                  className="spotlight lift group rounded-xl border border-border bg-card p-5"
                >
                  <span className="font-mono text-xs text-muted-foreground">← Precedente</span>
                  <span className="mt-2 block font-medium leading-snug transition-colors group-hover:text-primary">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/documentazione/${category.id}/${next.slug}`}
                  className="spotlight lift group rounded-xl border border-border bg-card p-5 text-right"
                >
                  <span className="font-mono text-xs text-muted-foreground">Successiva →</span>
                  <span className="mt-2 block font-medium leading-snug transition-colors group-hover:text-primary">
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export default solo su Documentation
export default Documentation;
