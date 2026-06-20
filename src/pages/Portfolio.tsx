import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import scantrakIcon from "../../PORTFOLIO/Scantrak/icon_scantrak.png";
import fableHearthIcon from "../../PORTFOLIO/FableHearth/FableHearth_Icon.png";
import plannerTimeIcon from "../../PORTFOLIO/PlannerTime/icon.png";
import subtrakIcon from "../../PORTFOLIO/Subtrak/icon_subtrak.svg";
import pianoMapsIcon from "../../PORTFOLIO/PianoMaps/icon_pianomaps.png";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  status?: string;
  externalUrl?: string;
}

const projects: Project[] = [
  {
    id: "pianomaps",
    title: "PianoMap",
    description: "App mobile per scoprire e segnalare pianoforti pubblici nelle città: mappa interattiva, geolocalizzazione, recensioni con rating a stelle, preferiti e moderazione degli inserimenti.",
    tags: ["Flutter", "Firebase", "Firestore", "Geolocation", "Dart"],
    image: pianoMapsIcon,
    imageAlt: "Icona PianoMap",
    status: "In sviluppo",
  },
  {
    id: "subtrak",
    title: "SubTrak",
    description: "App mobile per tracciare automaticamente gli abbonamenti ricorrenti tramite Open Banking, notifiche bancarie e parsing email, con analytics sulle uscite mensili e Vampire Alert.",
    tags: ["Flutter", "Firebase", "Open Banking", "PSD2", "Dart"],
    image: subtrakIcon,
    imageAlt: "Icona SubTrak",
    status: "In sviluppo",
  },
  {
    id: "scantrak",
    title: "ScanTrak",
    description: "App mobile offline-first per scansionare scontrini, normalizzare gli acquisti con AI e trasformare la spesa quotidiana in statistiche leggibili.",
    tags: ["Flutter", "Firebase", "Gemini AI", "SQLite", "AdMob"],
    image: scantrakIcon,
    imageAlt: "Icona ScanTrak",
    status: "In sviluppo",
  },
  {
    id: "plannertime",
    title: "Planner Time",
    description: "App mobile Flutter per organizzare progetti, task e calendario in un unico flusso collaborativo con Kanban, allegati e notifiche.",
    tags: ["Flutter", "Firebase", "Firestore", "Riverpod", "FCM"],
    image: plannerTimeIcon,
    imageAlt: "Icona Planner Time",
    status: "BETA",
  },
  {
    id: "fablehearth",
    title: "FableHearth",
    description: "Web app per scrittori con editor avanzato, assistenza AI, gestione libri a capitoli, salvataggio cloud, piani con crediti e gamification.",
    tags: ["Next.js", "TypeScript", "Firebase", "Stripe", "AI"],
    image: fableHearthIcon,
    imageAlt: "Icona FableHearth",
    status: "Online",
    externalUrl: "https://fablehearth.it/",
  },
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
            Una selezione dei progetti più significativi su cui ho lavorato e delle applicazioni che sto costruendo. Clicca su un progetto per leggere i dettagli.
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
          {filtered.map((project) => {
            const content = (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        className="h-12 w-12 rounded-xl object-cover shadow-gold"
                      />
                    )}
                    <div>
                      <h3 className="font-heading text-lg font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.status && (
                        <span className="mt-1 inline-flex rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                          {project.status}
                        </span>
                      )}
                    </div>
                  </div>
                  {project.externalUrl ? (
                    <ExternalLink
                      size={18}
                      className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 flex-shrink-0 mt-1"
                    />
                  ) : (
                    <ArrowRight
                      size={18}
                      className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1 flex-shrink-0 mt-1"
                    />
                  )}
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
              </>
            );

            const className = "group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-gold";

            return project.externalUrl ? (
              <a key={project.id} href={project.externalUrl} target="_blank" rel="noreferrer" className={className}>
                {content}
              </a>
            ) : (
              <Link key={project.id} to={`/portfolio/${project.id}`} className={className}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
