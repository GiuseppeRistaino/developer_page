import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import { loadBlogs, sortByDate } from "../lib/loadArticles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ArticlePage = () => {
  const { slug } = useParams();
  const articles = sortByDate(loadBlogs());
  const index = articles.findIndex((a) => a.slug === slug);
  const article = articles[index];

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="font-display text-3xl font-light">Articolo non trovato</h2>
        <Link to="/blog" className="text-primary hover:underline">
          Torna al Blog
        </Link>
      </div>
    );
  }

  const next = articles[index + 1] ?? articles[0];

  return (
    <div className="-mt-16 min-h-screen">
      <ReadingProgress />

      {/* Copertina */}
      <header className="relative flex min-h-[78svh] items-end overflow-hidden">
        {article.coverImage && (
          <img
            src={article.coverImage}
            alt=""
            className="ken-burns absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/20" />

        <div className="container relative mx-auto max-w-4xl px-6 pb-12 pt-28">
          <Link
            to="/blog"
            className="animate-fade-up mb-8 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            Torna al Blog
          </Link>

          <h1 className="soft-optical font-display text-5xl font-light leading-[1.03] tracking-tight md:text-7xl">
            <span className="title-line">
              <span>{article.title}</span>
            </span>
          </h1>

          {article.description && (
            <p
              className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85"
              style={{ animationDelay: "250ms" }}
            >
              {article.description}
            </p>
          )}

          <p
            className="animate-fade-up mt-6 font-mono text-xs text-foreground/70"
            style={{ animationDelay: "350ms" }}
          >
            {new Date(article.date).toLocaleDateString("it-IT", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
            <span className="mx-1.5 text-primary">✦</span>
            {article.readTime}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-[44rem] px-6 pb-24 pt-14">
        <article className="prose-log">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // span e non figure: react-markdown mette le immagini dentro un <p>
              img: ({ src, alt, title }) => (
                <span className="log-figure">
                  <img src={src} alt={alt ?? ""} loading="lazy" />
                  {title && <span className="log-caption">{title}</span>}
                </span>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        {article.credits.length > 0 && (
          <footer className="mt-16 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            <p className="font-mono uppercase tracking-[0.14em]">Crediti fotografici</p>
            <p className="mt-2">Immagini da Wikimedia Commons, ridimensionate per il sito.</p>
            <ul className="mt-3 space-y-1.5">
              {article.credits.map((credit) => (
                <li key={credit.source}>
                  <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-primary">
                    {credit.subject}
                  </a>
                  {" — "}
                  {credit.author},{" "}
                  <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-primary">
                    {credit.license}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}

        {/* Prossima lettura */}
        {next && next.slug !== article.slug && (
          <Link
            to={`/blog/${next.slug}`}
            className="spotlight lift group mt-20 block rounded-2xl border border-border bg-card p-7"
          >
            <p className="eyebrow">Prossima lettura</p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <h2 className="font-display text-2xl font-normal leading-tight transition-colors group-hover:text-primary md:text-3xl">
                {next.title}
              </h2>
              <ArrowRight
                size={22}
                className="flex-shrink-0 text-primary transition-transform duration-500 group-hover:translate-x-2"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
