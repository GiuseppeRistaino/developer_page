import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import scantrakIcon from "../../PORTFOLIO/Scantrak/icon_scantrak.png";
import fableHearthIcon from "../../PORTFOLIO/FableHearth/FableHearth_Icon.png";
import plannerTimeIcon from "../../PORTFOLIO/PlannerTime/icon.png";
import subtrakIcon from "../../PORTFOLIO/Subtrak/icon_subtrak.svg";
import pianoMapsIcon from "../../PORTFOLIO/PianoMaps/icon_pianomaps.png";
import eatsNeedIcon from "../../PORTFOLIO/EatsNeed/icon_eatsneed.png";
import roamieIcon from "../../PORTFOLIO/Roamie/icon_roamie.png";
import theJourneyIcon from "../../PORTFOLIO/TheJourney/icon_thejourney.webp";
import zlotIcon from "../../PORTFOLIO/Zlot/icon_zlot.png";
import deckOfDorksIcon from "../../PORTFOLIO/DeckOfDorks/icon_deckofdorks.png";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  // Per le icone con molto margine trasparente attorno al disegno
  imageZoom?: number;
  status?: string;
  externalUrl?: string;
  // Sito statico pubblicato insieme al portfolio (public/), aperto nella stessa scheda
  siteUrl?: string;
}

const projects: Project[] = [
  {
    id: "deckofdorks",
    title: "Deck of Dorks",
    description: "Gioco di carte tattico a turni con 210 carte disegnate a mano: collezione, evoluzioni e duelli 1 vs 1 online. Sito animato con la wiki di tutte le carte generata dai dati del gioco.",
    tags: ["Unity", "C#", "Nakama", "TypeScript", "PostgreSQL"],
    image: deckOfDorksIcon,
    imageAlt: "Icona Deck of Dorks",
    status: "In sviluppo",
    siteUrl: `${import.meta.env.BASE_URL}deckofdorks/index.html`,
  },
  {
    id: "zlot",
    title: "ZLOT",
    description: "Agenda per barbieri, centri estetici e studi con più persone, cabine e attrezzature: orari liberi inviati su WhatsApp, prenotazione dal link e notifiche al team, senza doppie prenotazioni.",
    tags: ["Flutter", "Supabase", "PostgreSQL", "Riverpod", "FCM"],
    image: zlotIcon,
    imageAlt: "Icona ZLOT",
    status: "In test",
  },
  {
    id: "thejourney",
    title: "Jack Hollow – Il viaggio",
    description: "Avventura grafica punta-e-clicca comica a episodi per Android: quindici stanze dipinte, ruota dei verbi, inventario in valigia, enigmi assurdi ma giusti e animazioni fotogramma per fotogramma.",
    tags: ["Godot", "GDScript", "Popochiu", "Android", "Game Design"],
    image: theJourneyIcon,
    imageAlt: "Icona di Jack Hollow – Il viaggio",
    status: "In sviluppo",
  },
  {
    id: "roamie",
    title: "Roamie",
    description: "App mobile per i viaggi di gruppo: itinerario giorno per giorno sulla mappa, spese divise, chat del viaggio e, con Premium, tappe suggerite da Gemini AI e luoghi scelti dalla mappa.",
    tags: ["Flutter", "Firebase", "Google Maps", "Gemini AI", "AdMob"],
    image: roamieIcon,
    imageAlt: "Icona Roamie",
    status: "BETA",
  },
  {
    id: "eatsneed",
    title: "EatsNeed",
    description: "App mobile per gestire la dispensa senza sprechi: scadenze, lista della spesa e ricette personali, con scansione degli scontrini e idee di ricette tramite Gemini AI.",
    tags: ["Flutter", "SQLite", "Firebase", "Gemini AI", "AdMob"],
    image: eatsNeedIcon,
    imageAlt: "Icona EatsNeed",
    status: "Online",
  },
  {
    id: "pianomaps",
    title: "PianoMap",
    description: "App mobile per scoprire e segnalare pianoforti pubblici nelle città: mappa interattiva, geolocalizzazione, recensioni con rating a stelle, preferiti e moderazione degli inserimenti.",
    tags: ["Flutter", "Firebase", "Firestore", "Geolocation", "Dart"],
    image: pianoMapsIcon,
    imageAlt: "Icona PianoMap",
    imageZoom: 1.55,
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

  const chipClass = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
      active
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-6">
        <PageHeader eyebrow="I miei lavori" title="Portfolio">
          Una selezione dei progetti più significativi su cui ho lavorato e delle applicazioni che sto costruendo. Clicca su un progetto per leggere i dettagli.
        </PageHeader>

        {/* Tag filter */}
        <div className="mb-14 flex flex-wrap gap-2.5">
          <button onClick={() => setActiveTag(null)} aria-pressed={!activeTag} className={chipClass(!activeTag)}>
            Tutti
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
              className={chipClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div key={activeTag ?? "tutti"} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => {
            const Arrow = project.externalUrl ? ExternalLink : ArrowRight;

            const content = (
              <>
                <div className="flex items-start justify-between">
                  {project.image ? (
                    // Piastrina chiara: le icone scure o trasparenti restano leggibili sulla card
                    <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[hsl(40_35%_94%)] p-1.5 shadow-[0_14px_30px_-16px_hsl(var(--primary)/0.7)] transition-transform duration-700 ease-out group-hover:-rotate-3 group-hover:scale-110">
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        style={project.imageZoom ? { transform: `scale(${project.imageZoom})` } : undefined}
                        className="h-full w-full rounded-xl object-contain"
                      />
                    </span>
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary font-display text-3xl font-light text-primary"
                    >
                      {project.title.charAt(0)}
                    </span>
                  )}
                  <Arrow
                    size={20}
                    className="mt-1 flex-shrink-0 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary"
                  />
                </div>

                <h2 className="mt-7 font-display text-3xl font-normal leading-tight tracking-tight transition-colors group-hover:text-primary">
                  {project.title}
                </h2>
                {project.status && (
                  <p className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-tide">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tide" />
                    {project.status}
                  </p>
                )}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-foreground/60">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </>
            );

            const className = "spotlight lift group flex h-full flex-col rounded-2xl border border-border bg-card p-7";

            return (
              <Reveal key={project.id} delay={(i % 3) * 90}>
                {project.externalUrl ? (
                  <a href={project.externalUrl} target="_blank" rel="noreferrer" className={className}>
                    {content}
                  </a>
                ) : project.siteUrl ? (
                  <a href={project.siteUrl} className={className}>
                    {content}
                  </a>
                ) : (
                  <Link to={`/portfolio/${project.id}`} className={className}>
                    {content}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
