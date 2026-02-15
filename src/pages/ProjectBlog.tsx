import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  content: string[];
}

const blogPosts: Record<string, BlogPost> = {
  "ecommerce-platform": {
    slug: "ecommerce-platform",
    title: "Piattaforma E-Commerce Enterprise",
    date: "15 Gennaio 2024",
    readTime: "5 min",
    content: [
      "Questo progetto ha coinvolto la realizzazione di una piattaforma e-commerce enterprise basata su SAP Commerce Cloud (ex Hybris). L'obiettivo principale era creare un'esperienza d'acquisto fluida per un mercato multi-country.",
      "L'architettura è stata progettata per supportare cataloghi con milioni di prodotti, integrando un PIM esterno per la gestione centralizzata dei dati. La ricerca è stata potenziata con Apache Solr per garantire risultati rapidi e pertinenti.",
      "Il checkout è stato completamente personalizzato per supportare diversi metodi di pagamento e logiche di spedizione per paese. Ogni fase del processo è stata ottimizzata per massimizzare il tasso di conversione.",
      "Tecnologie utilizzate: SAP Commerce Cloud, Java, Spring MVC, Solr, Impex, WCMS Cockpit.",
    ],
  },
  "microservizi-api": {
    slug: "microservizi-api",
    title: "Architettura Microservizi",
    date: "10 Marzo 2024",
    readTime: "4 min",
    content: [
      "Il progetto prevedeva la migrazione da un'architettura monolitica a microservizi per migliorare la scalabilità e la manutenibilità del sistema.",
      "Ogni servizio è stato sviluppato con Spring Boot e containerizzato con Docker. L'orchestrazione avviene tramite un API Gateway che gestisce routing, autenticazione e rate limiting.",
      "La comunicazione tra servizi utilizza sia REST sincrono che messaging asincrono con RabbitMQ per le operazioni non bloccanti.",
      "Tecnologie utilizzate: Spring Boot, Docker, PostgreSQL, RabbitMQ, Spring Cloud Gateway.",
    ],
  },
  "dashboard-analytics": {
    slug: "dashboard-analytics",
    title: "Dashboard Analytics",
    date: "5 Giugno 2024",
    readTime: "3 min",
    content: [
      "Dashboard interattiva per il monitoraggio in tempo reale delle performance di vendita e-commerce.",
      "L'interfaccia utente è stata sviluppata con React e TypeScript, utilizzando Recharts per i grafici interattivi. I dati vengono aggiornati in real-time tramite WebSocket.",
      "Le metriche chiave includono: tasso di conversione, valore medio ordine, prodotti più venduti, analisi del traffico per canale e performance per paese.",
      "Tecnologie utilizzate: React, TypeScript, Recharts, WebSocket, REST API.",
    ],
  },
};

const ProjectBlog = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const post = projectId ? blogPosts[projectId] : null;

  if (!post) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-heading text-2xl font-bold mb-4">Progetto non trovato</h1>
          <Link to="/portfolio" className="text-primary hover:underline">
            Torna al Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Torna al Portfolio
        </Link>

        <article className="animate-fade-up">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
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

export default ProjectBlog;
