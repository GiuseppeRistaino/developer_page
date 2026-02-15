import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { loadBlogs } from "../lib/loadArticles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect } from "react";

export const ArticlePage = () => {
  const { slug } = useParams();
  const articles = loadBlogs();
  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Articolo non trovato</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-3xl">

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm mb-10 hover:text-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Torna al Blog
        </Link>

        {article.coverImage && (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-96 object-cover rounded-2xl mb-12"
          />
        )}

        <h1 className="text-4xl font-bold mb-6">
          {article.title}
        </h1>

        <div className="flex gap-6 text-sm text-muted-foreground mb-14">
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {new Date(article.date).toLocaleDateString("it-IT")}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {article.readTime}
          </span>
        </div>

        {/* 🔥 Markdown con stile serio */}
        <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </article>

      </div>
    </div>
  );
};
