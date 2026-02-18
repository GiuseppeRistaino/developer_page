import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { loadBlogs } from "../lib/loadArticles";
import { useState } from "react";

const Blog = () => {
  const blogs = loadBlogs();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // 🔥 Ordine cronologico (più recenti prima)
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allTags = [...new Set(sortedBlogs.flatMap((b) => b.tags))];

  const filtered = activeTag
    ? sortedBlogs.filter((b) => b.tags.includes(activeTag))
    : sortedBlogs;

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="mb-16 animate-fade-up">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-3">
            La mia vita
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Se vuoi farti gli affari miei, sei nel posto giusto.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-3 mb-14">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
              !activeTag
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/20"
            }`}
          >
            Tutti
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* BLOG LIST */}
        <div className="space-y-16">
          {filtered.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className={`group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-2xl ${
                index === 0 ? "md:flex" : ""
              }`}
            >
              {/* IMAGE */}
              <div
                className={`overflow-hidden ${
                  index === 0 ? "md:w-1/2 h-96" : "h-72"
                }`}
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div
                className={`p-8 flex flex-col justify-center ${
                  index === 0 ? "md:w-1/2" : ""
                }`}
              >
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span>
                    {new Date(blog.date).toLocaleDateString("it-IT", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                {/* Title */}
                <h2
                  className={`font-heading font-bold mb-4 group-hover:text-primary transition-colors ${
                    index === 0 ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {blog.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center text-primary font-medium">
                  Leggi articolo
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
