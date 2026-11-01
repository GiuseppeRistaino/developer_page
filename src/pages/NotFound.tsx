import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow animate-fade-up">Errore 404 — fuori rotta</p>
        <h1 className="soft-optical mt-5 font-display text-7xl font-light tracking-tight md:text-9xl">
          <span className="title-line">
            <span>Terra?</span>
          </span>
        </h1>
        <p className="animate-fade-up mt-6 text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "160ms" }}>
          Questa pagina non è segnata su nessuna mappa di Nimenia. O non è mai esistita, o qualcuno l'ha fatta sparire
          ed è meglio non fare domande.
        </p>
        <Link
          to="/"
          className="animate-fade-up mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          style={{ animationDelay: "280ms" }}
        >
          <ArrowLeft size={16} />
          Torna in porto
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
