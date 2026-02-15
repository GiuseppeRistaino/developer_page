import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

interface DocCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  articles: DocArticle[];
}

interface DocArticle {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

const docCategories: DocCategory[] = [
  {
    id: "sap-commerce",
    title: "SAP Commerce Cloud",
    description: "Guide, tutorial e best practice per lo sviluppo su SAP Commerce Cloud (Hybris).",
    icon: "🛒",
    articles: [
      {
        slug: "introduzione-sap-commerce",
        title: "Introduzione a SAP Commerce Cloud",
        date: "10 Gen 2024",
        readTime: "6 min",
        excerpt: "Una panoramica completa della piattaforma SAP Commerce Cloud e dei suoi componenti principali.",
        content: [
          "SAP Commerce Cloud, precedentemente noto come SAP Hybris, è una piattaforma e-commerce enterprise leader nel settore. Offre una suite completa di strumenti per la gestione del commercio digitale.",
          "I componenti principali includono: Platform (il core del sistema), Accelerators (template pronti all'uso), Cockpits (interfacce di amministrazione) e le estensioni modulari che permettono di personalizzare ogni aspetto.",
          "L'architettura si basa su Spring Framework e utilizza un modello dati flessibile basato su type system e Impex per l'import/export dei dati.",
          "In questa serie di articoli esploreremo ogni componente in dettaglio, con esempi pratici e best practice accumulate in anni di esperienza sul campo.",
        ],
      },
      {
        slug: "impex-guida-completa",
        title: "Impex: Guida Completa",
        date: "20 Feb 2024",
        readTime: "8 min",
        excerpt: "Tutto quello che devi sapere su Impex: sintassi, best practice e pattern avanzati.",
        content: [
          "Impex è il linguaggio di import/export dati di SAP Commerce Cloud. È fondamentale per la configurazione iniziale, la migrazione dati e le operazioni di manutenzione.",
          "La sintassi base prevede un header che definisce il tipo e i campi, seguito dalle righe di dati. Gli operatori principali sono INSERT, UPDATE, INSERT_UPDATE e REMOVE.",
          "Best practice: utilizzare sempre INSERT_UPDATE per idempotenza, organizzare gli Impex per dominio funzionale, e utilizzare le macro per valori riutilizzabili.",
          "Pattern avanzati includono: script Impex con BeanShell, translator personalizzati per trasformazioni complesse, e l'uso di Impex distribuiti per grandi volumi di dati.",
        ],
      },
    ],
  },
  {
    id: "spring",
    title: "Spring Framework",
    description: "Articoli su Spring Boot, Spring MVC, Security e l'ecosistema Spring.",
    icon: "🌱",
    articles: [
      {
        slug: "spring-boot-microservizi",
        title: "Spring Boot per Microservizi",
        date: "5 Mar 2024",
        readTime: "7 min",
        excerpt: "Come strutturare microservizi production-ready con Spring Boot e Spring Cloud.",
        content: [
          "Spring Boot è il framework di riferimento per lo sviluppo di microservizi in Java. La sua filosofia 'convention over configuration' permette di creare servizi production-ready in tempi ridotti.",
          "Ogni microservizio dovrebbe essere autonomo, con il proprio database e la propria logica di business. Spring Boot semplifica questo approccio con auto-configuration, embedded server e starter dependencies.",
          "Spring Cloud aggiunge pattern enterprise come service discovery (Eureka), circuit breaker (Resilience4j), configuration server e API Gateway per orchestrare l'ecosistema.",
          "In questo articolo vedremo come strutturare un progetto multi-modulo, configurare la comunicazione inter-servizio e implementare pattern di resilienza.",
        ],
      },
      {
        slug: "spring-security-jwt",
        title: "Spring Security con JWT",
        date: "15 Apr 2024",
        readTime: "5 min",
        excerpt: "Implementare autenticazione stateless con JWT e Spring Security.",
        content: [
          "L'autenticazione basata su JWT (JSON Web Token) è lo standard per le API REST stateless. Spring Security fornisce un framework robusto per implementarla.",
          "L'architettura prevede: un endpoint di login che genera il token, un filtro che valida il token ad ogni request, e la configurazione della security chain.",
          "Best practice: utilizzare refresh token per sessioni lunghe, impostare scadenze brevi per gli access token, e firmare i token con algoritmi asimmetrici (RS256) in produzione.",
          "Vedremo anche come integrare Spring Security con un API Gateway per centralizzare l'autenticazione in un'architettura a microservizi.",
        ],
      },
    ],
  },
];

const Documentation = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 animate-fade-up">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
            Knowledge Base
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Documentazione</h1>
          <p className="text-muted-foreground max-w-2xl">
            Articoli tecnici, guide e best practice sulle tecnologie con cui lavoro quotidianamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docCategories.map((cat) => (
            <div
              key={cat.id}
              className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-gold"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="font-heading text-xl font-bold">{cat.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{cat.description}</p>

              <div className="space-y-3">
                {cat.articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/documentazione/${cat.id}/${article.slug}`}
                    className="group flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 transition-colors hover:bg-secondary"
                  >
                    <div>
                      <h3 className="text-sm font-medium group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{article.readTime}</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentation;

// Sub-page component for individual articles
export const DocArticlePage = () => {
  const { categoryId, articleSlug } = useParams<{ categoryId: string; articleSlug: string }>();

  const category = docCategories.find((c) => c.id === categoryId);
  const article = category?.articles.find((a) => a.slug === articleSlug);

  if (!category || !article) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Articolo non trovato</h1>
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

        <article className="animate-fade-up">
          <div className="flex items-center gap-2 text-xs text-primary font-medium mb-4">
            <span>{category.icon}</span>
            <span>{category.title}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
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

          <div className="space-y-6">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};
