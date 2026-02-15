import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Piattaforma E-Commerce Enterprise",
    description: "Sviluppo di una piattaforma e-commerce su SAP Commerce Cloud con integrazione PIM, gestione catalogo multi-country e checkout personalizzato.",
    tags: ["SAP Commerce", "Java", "Spring", "Solr"],
  },
  {
    id: "microservizi-api",
    title: "Architettura Microservizi",
    description: "Progettazione e implementazione di un'architettura a microservizi con Spring Boot, API Gateway e service discovery.",
    tags: ["Spring Boot", "Docker", "REST API", "PostgreSQL"],
  },
  {
    id: "dashboard-analytics",
    title: "Dashboard Analytics",
    description: "Dashboard real-time per il monitoraggio delle performance e-commerce con grafici interattivi e reportistica avanzata.",
    tags: ["React", "TypeScript", "Recharts", "REST API"],
  },
];

const Portfolio = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(projects.flatMap((p) => p.tags))];
  const filtered = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
            I Miei Lavori
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-muted-foreground max-w-2xl">
            Una selezione dei progetti più significativi su cui ho lavorato. Clicca su un progetto per leggere i dettagli nel blog dedicato.
          </p>
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
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
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <Link
              key={project.id}
              to={`/portfolio/${project.id}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-gold"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ArrowRight
                  size={18}
                  className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 flex-shrink-0 mt-1"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
