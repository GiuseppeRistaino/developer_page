import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { loadBlogs, sortByDate, type BlogArticle } from "../lib/loadArticles";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const Meta = ({ blog }: { blog: BlogArticle }) => (
  <p className="font-mono text-xs text-muted-foreground">
    {formatDate(blog.date)} <span className="mx-1.5 text-primary">✦</span> {blog.readTime}
  </p>
);

const FeaturedCard = ({ blog }: { blog: BlogArticle }) => (
  <Link
    to={`/blog/${blog.slug}`}
    className="group relative block overflow-hidden rounded-3xl border border-border"
  >
    <div className="zoom-frame absolute inset-0">
      <img src={blog.coverImage} alt="" className="h-full w-full object-cover" />
    </div>
    <div className="candle-glow absolute inset-0" aria-hidden="true" />
    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/5" />

    <div className="relative flex min-h-[30rem] flex-col justify-end p-7 md:min-h-[38rem] md:p-12">
      <Meta blog={blog} />
      <h2 className="soft-optical mt-4 max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tight transition-colors group-hover:text-primary md:text-7xl">
        {blog.title}
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">{blog.excerpt}</p>
      <span className="mt-7 inline-flex items-center gap-2 font-medium text-primary">
        Leggi la storia
        <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
      </span>
    </div>
  </Link>
);

const BlogCard = ({ blog }: { blog: BlogArticle }) => (
  <Link to={`/blog/${blog.slug}`} className="group block">
    <div className="zoom-frame aspect-[16/10] rounded-2xl border border-border transition-colors duration-500 group-hover:border-primary/40">
      <img src={blog.coverImage} alt="" loading="lazy" className="h-full w-full object-cover" />
    </div>
    <div className="mt-5">
      <Meta blog={blog} />
      <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight transition-colors group-hover:text-primary">
        {blog.title}
      </h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{blog.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-primary/85">
        {blog.tags.map((tag) => (
          <span key={tag}>#{tag.replace(/\s+/g, "")}</span>
        ))}
      </div>
    </div>
  </Link>
);

const Blog = () => {
  const blogs = sortByDate(loadBlogs());
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");

  const allTags = [...new Set(blogs.flatMap((b) => b.tags))].sort((a, b) =>
    a.localeCompare(b, "it")
  );

  const filtered = activeTag ? blogs.filter((b) => b.tags.includes(activeTag)) : blogs;

  // Senza filtri la storia in evidenza apre la pagina
  const featured = activeTag ? undefined : filtered.find((b) => b.featured);
  const rest = filtered.filter((b) => b !== featured);

  const chipClass = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
    }`;

  const selectTag = (tag: string | null) => setSearchParams(tag ? { tag } : {}, { preventScrollReset: true });

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-6">
        <PageHeader eyebrow="La mia vita" title="Blog">
          Se vuoi farti gli affari miei, sei nel posto giusto.
        </PageHeader>

        {/* Tag Filter */}
        <div className="mb-14 flex flex-wrap gap-2.5">
          <button onClick={() => selectTag(null)} aria-pressed={!activeTag} className={chipClass(!activeTag)}>
            Tutti
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => selectTag(tag)}
              aria-pressed={activeTag === tag}
              className={chipClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* La key rimonta la griglia: il filtro riparte con la stessa animazione */}
        <div key={activeTag ?? "tutti"}>
          {featured && (
            <div className="animate-fade-up mb-16 md:mb-24">
              <FeaturedCard blog={featured} />
            </div>
          )}

          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {rest.map((blog, i) => (
              <Reveal key={blog.id} delay={(i % 2) * 100}>
                <BlogCard blog={blog} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
