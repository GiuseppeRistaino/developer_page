import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  BookOpen,
  Camera,
  CheckCircle2,
  FileText,
  HardDrive,
  Layers,
  MapPinned,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  WifiOff,
} from "lucide-react";
import iconWayfarer from "../../PORTFOLIO/WayfarersTale/icon_wayfarerstale.png";
import photoMountain from "../../PORTFOLIO/WayfarersTale/photos/montagna.jpg";
import photoTram from "../../PORTFOLIO/WayfarersTale/photos/tram.jpg";
import photoSunset from "../../PORTFOLIO/WayfarersTale/photos/porto-tramonto.jpg";
import photoAlley from "../../PORTFOLIO/WayfarersTale/photos/vicolo.jpg";
import photoCliff from "../../PORTFOLIO/WayfarersTale/photos/scogliera.jpg";
import photoNight from "../../PORTFOLIO/WayfarersTale/photos/citta-notte.jpg";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

// Colori dell'app: blu inchiostro e ambra della lanterna.
const ink = "#0E1626";
const amber = "#F0B44C";

const privacyUrl = `${import.meta.env.BASE_URL}wayfarerstale/privacy.html`;

// Gli screenshot dello store, se presenti, vengono mostrati in automatico:
// basta esportarli dal canvas di design in PORTFOLIO/WayfarersTale/screens/.
const storeScreens = Object.entries(
  import.meta.glob("../../PORTFOLIO/WayfarersTale/screens/*.{png,jpg,webp}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src);

const steps = [
  {
    title: "Premi il tasto",
    text: "Un solo grande tasto, quando stai per partire. Scegli il ritmo: calmo, curioso o intenso.",
  },
  {
    title: "Il racconto ti chiama",
    text: "Ogni tanto, a orari a sorpresa tra le 9 e le 21, arriva un promemoria con uno spunto: «Fotografa qualcosa che a casa non vedresti mai».",
  },
  {
    title: "Il viaggio diventa un libro",
    text: "Alla fine apri il libro: ogni giornata è un mazzetto di polaroid, con le tue righe, i luoghi e il percorso.",
  },
];

const features: FeatureCard[] = [
  {
    icon: BellRing,
    title: "Promemoria a sorpresa",
    text: "Notifiche locali a orari casuali, distanziate di almeno 45 minuti, con 30 spunti diversi. Rinvio di 30 minuti o un altro spunto con un tocco.",
  },
  {
    icon: Camera,
    title: "Un momento in un attimo",
    text: "La fotocamera si apre subito; dopo lo scatto una riga per ricordarlo e lo stato d'animo. Luogo e ora si salvano da soli.",
  },
  {
    icon: Layers,
    title: "Giornate come polaroid",
    text: "Ogni giorno è un mazzetto: toccandolo le polaroid si sparpagliano a zig-zag sul tavolo, una giornata alla volta.",
  },
  {
    icon: Sparkles,
    title: "La polaroid che si gira",
    text: "Toccata una polaroid, questa si stacca dal tavolo e ruota come una carta: sul retro c'è la foto a schermo intero, con zoom e scorrimento.",
  },
  {
    icon: BookOpen,
    title: "Il libro che si apre",
    text: "A fine viaggio la copertina gira sul dorso, mostra risguardo e frontespizio con l'indice dei capitoli e porta dentro al racconto.",
  },
  {
    icon: MapPinned,
    title: "Il percorso vero",
    text: "Le foto scattate entro 150 metri diventano una sola tappa e la mappa usa una scala reale: niente pallini fantasma dovuti al GPS.",
  },
];

const techPoints: FeatureCard[] = [
  {
    icon: WifiOff,
    title: "Local-first, anche offline",
    text: "Viaggi in un file JSON e foto originali nella cartella dell'app: niente account, niente server, funziona anche senza connessione.",
  },
  {
    icon: RefreshCcw,
    title: "Promemoria affidati al sistema",
    text: "Fino a 14 giorni programmati in AlarmManager (iOS: entro il limite di 64 notifiche), riprogrammati al riavvio e rinnovati a ogni apertura; un ultimo richiamo invita a riaprire l'app.",
  },
  {
    icon: HardDrive,
    title: "Foto nitide, memoria leggera",
    text: "L'originale della fotocamera resta a piena risoluzione (servirà per la stampa), ma ogni miniatura viene decodificata alla sua dimensione reale sullo schermo.",
  },
];

const stack = [
  "Flutter con un'identità \"lanterna nella notte\": blu inchiostro, ambra, Fraunces e Inter",
  "Animazioni su misura: flip 3D della polaroid, libro che si apre, mazzetti che si sparpagliano",
  "Splash animata con la lanterna disegnata in codice, lo stesso disegno che genera l'icona",
  "flutter_local_notifications + timezone per i promemoria a orari casuali",
  "geolocator e geocoding per luogo e percorso, image_picker per la fotocamera",
  "share_plus per collage e foto, provider e path_provider per lo stato e i file",
];

const polaroids = [
  { src: photoMountain, caption: "La prima sera in montagna", rotate: "-8deg", className: "left-0 top-6 w-[46%]" },
  { src: photoTram, caption: "Il tram 28", rotate: "6deg", className: "right-2 top-0 w-[44%]" },
  { src: photoSunset, caption: "Il tramonto sul lago", rotate: "-3deg", className: "bottom-0 left-[22%] w-[50%]" },
];

const WayfarersTale = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="relative py-20 text-[#F3EEE4] md:py-28" style={{ backgroundColor: ink }}>
        <Stars />
        <div className="container relative mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
            style={{ color: amber }}
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={iconWayfarer}
                  alt="Icona Wayfarer's Tale: una lanterna ambra"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-16px_rgba(240,180,76,0.45)]"
                />
                <div>
                  <p className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest" style={{ color: amber }}>
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: amber }} />
                    In arrivo su Google Play
                  </p>
                  <p className="text-sm font-medium text-[#A9B3C6]">Flutter, notifiche locali, animazioni 3D</p>
                </div>
              </div>

              <h1 className="font-display text-5xl font-semibold leading-tight md:text-7xl">Wayfarer's Tale</h1>
              <p className="mt-3 font-display text-2xl italic" style={{ color: amber }}>
                Ogni viaggio è un racconto.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#C4CBD8]">
                Premi un tasto quando parti: durante il viaggio l'app ti chiama a sorpresa per fermarti e fotografare un momento. Alla fine, tutte le foto diventano un libro da sfogliare, con le giornate raccolte in mazzetti di polaroid.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#come-funziona"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold text-[#1A1206] transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: amber }}
                >
                  Come funziona
                </a>
                <a
                  href={privacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2A3752] px-5 py-3 text-sm font-bold transition-colors hover:border-[#F0B44C]"
                  style={{ color: amber }}
                >
                  <ShieldCheck size={18} />
                  Privacy
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["1 tasto", "per iniziare il viaggio"],
                  ["14 giorni", "di promemoria programmati"],
                  ["0 server", "tutto resta sul telefono"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#2A3752] bg-[#18233A] p-4">
                    <p className="font-display text-2xl font-semibold" style={{ color: amber }}>{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#A9B3C6]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[520px] animate-fade-in lg:min-h-[600px]">
              {polaroids.map((p) => (
                <div key={p.caption} className={`absolute ${p.className}`}>
                  <Polaroid src={p.src} caption={p.caption} rotate={p.rotate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="come-funziona" className="scroll-mt-20 py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Come funziona</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Tre gesti, un racconto intero.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-border bg-card p-6">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full font-display text-lg font-semibold text-[#1A1206]"
                  style={{ backgroundColor: amber }}
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalità</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Pensata per non farti dimenticare niente.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-[#F0B44C]/50">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0B44C]/15 text-[#B9762A]">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 text-[#F3EEE4]" style={{ backgroundColor: ink }}>
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest" style={{ color: amber }}>
                Il tavolo delle polaroid
              </p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Un racconto, non una galleria.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#A9B3C6]">
              Una foto, una riga scritta a mano e uno stato d'animo: ogni momento diventa una polaroid inclinata sul tavolo della sua giornata.
            </p>
          </div>

          {storeScreens.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {storeScreens.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Schermata di Wayfarer's Tale ${i + 1}`}
                  loading="lazy"
                  className="w-full rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {[
                { src: photoAlley, caption: "I panni stesi cantando", rotate: "-4deg" },
                { src: photoCliff, caption: "Case sulla scogliera", rotate: "3deg" },
                { src: photoNight, caption: "Le luci sull'acqua", rotate: "-2deg" },
              ].map((p) => (
                <Polaroid key={p.caption} src={p.src} caption={p.caption} rotate={p.rotate} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Architettura</p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">Tutto sul telefono, anche le notifiche.</h2>
              <div className="mt-8 space-y-4">
                {techPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.title} className="rounded-lg border border-border bg-card p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-semibold">{point.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles className="text-primary" size={24} />
                <h3 className="font-display text-2xl font-semibold">Stack</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                Nata come diario di viaggio con spese e login, Wayfarer's Tale è stata ripensata da zero attorno a un'idea sola: ricordarti di vivere e fermare i momenti mentre viaggi.
              </p>
              <div className="mt-6 space-y-3">
                {stack.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-[#B9762A]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-gradient-card p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Privacy</p>
              <h2 className="font-display text-2xl font-semibold">I tuoi ricordi restano tuoi.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Niente account, niente server, niente pubblicità: foto, righe e luoghi restano sul telefono. L'informativa spiega fotocamera, posizione, notifiche e condivisione.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={privacyUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShieldCheck size={18} />
                Apri informativa
                <ArrowRight size={18} />
              </a>
              <Link
                to="/portfolio/wayfarerstale/terms"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText size={18} />
                Termini di utilizzo
              </Link>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Foto di esempio da Unsplash (Licenza Unsplash): John Lee, Aayush Gupta, Haeden Kolb, Kael Bloom, Amy Vosters, Viacheslav Volodin.
          </p>
        </div>
      </section>
    </div>
  );
};

const Polaroid = ({ src, caption, rotate }: { src: string; caption: string; rotate: string }) => (
  // L'inclinazione sta sul contenitore, così l'hover (scala) non la sovrascrive.
  <div style={{ transform: `rotate(${rotate})` }}>
    <figure className="rounded-[4px] bg-[#F3EEE4] p-2.5 pb-4 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.75)] transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.03]">
      <img src={src} alt={caption} loading="lazy" className="aspect-square w-full object-cover" />
      <figcaption className="mt-2.5 font-display text-sm italic text-[#2A2A2A]">{caption}</figcaption>
    </figure>
  </div>
);

/** Cielo stellato leggero, come nella splash dell'app. */
const Stars = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
    {[
      [6, 12], [18, 70], [32, 22], [44, 88], [57, 8], [66, 54], [78, 18], [88, 76], [94, 40], [24, 46],
    ].map(([x, y], i) => (
      <span
        key={i}
        className="absolute h-[3px] w-[3px] animate-pulse rounded-full bg-[#F3EEE4]"
        style={{ left: `${x}%`, top: `${y}%`, opacity: 0.35 + (i % 3) * 0.2, animationDelay: `${i * 0.4}s` }}
      />
    ))}
  </div>
);

export default WayfarersTale;
