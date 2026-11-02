import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  ChefHat,
  Cloud,
  Database,
  LockKeyhole,
  ReceiptText,
  ScanBarcode,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  FileText,
} from "lucide-react";
import eatsNeedIcon from "../../PORTFOLIO/EatsNeed/icon_eatsneed.png";
import dispensaScreen from "../../PORTFOLIO/EatsNeed/dispensa_screen.png";
import scontrinoScreen from "../../PORTFOLIO/EatsNeed/scontrino_screen.png";
import ideeScreen from "../../PORTFOLIO/EatsNeed/idee_ia_screen.png";
import prodottoScreen from "../../PORTFOLIO/EatsNeed/prodotto_screen.png";
import ricettaScreen from "../../PORTFOLIO/EatsNeed/ricetta_screen.png";
import spesaScreen from "../../PORTFOLIO/EatsNeed/spesa_screen.png";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

const playStoreUrl = "https://play.google.com/store/apps/details?id=com.miscorex.eatsneed";
const privacyUrl = `${import.meta.env.BASE_URL}eatsneed/privacy.html`;

const screenshots = [
  {
    title: "Dispensa",
    text: "Anelli di freschezza, prodotti ordinati per scadenza e un avviso in evidenza per ciò che va consumato oggi.",
    image: dispensaScreen,
    alt: "Dispensa di EatsNeed con i prodotti in scadenza",
  },
  {
    title: "Scontrino con l'IA",
    text: "Lo scontrino diventa una lista da rivedere: qualità stimata A-E, scadenza proposta e un parere per ogni prodotto.",
    image: scontrinoScreen,
    alt: "Revisione dei prodotti letti dallo scontrino",
  },
  {
    title: "Idee con l'IA",
    text: "Ricette costruite intorno a ciò che scade prima, con il riepilogo dei prodotti da usare subito.",
    image: ideeScreen,
    alt: "Ricette proposte dall'IA con i prodotti in scadenza",
  },
  {
    title: "Prodotto",
    text: "Dal codice a barre a Nutri-Score e valori nutrizionali, con i giorni rimasti al centro della scheda.",
    image: prodottoScreen,
    alt: "Scheda prodotto con Nutri-Score e valori nutrizionali",
  },
  {
    title: "Ricette personali",
    text: "Ogni ingrediente viene confrontato con la dispensa: già presente, forse presente o da comprare.",
    image: ricettaScreen,
    alt: "Ricetta personale con ingredienti abbinati alla dispensa",
  },
  {
    title: "Lista della spesa",
    text: "Spunta i prodotti nel carrello e spostali in dispensa con un tocco.",
    image: spesaScreen,
    alt: "Lista della spesa di EatsNeed",
  },
];

const features: FeatureCard[] = [
  {
    icon: BellRing,
    title: "Scadenze sotto controllo",
    text: "Notifiche locali con preavviso configurabile e un colpo d'occhio su ciò che sta per scadere.",
  },
  {
    icon: ScanBarcode,
    title: "Codice a barre e date",
    text: "Nome, foto e valori nutrizionali da Open Food Facts; la data di scadenza si legge con la fotocamera tramite ML Kit sul dispositivo.",
  },
  {
    icon: ReceiptText,
    title: "Scontrino con l'IA",
    text: "Scansione stile documento fino a 3 pagine: Gemini riconosce i prodotti, stima qualità e scadenza e li aggiunge alla dispensa.",
  },
  {
    icon: BrainCircuit,
    title: "Idee di ricette",
    text: "L'IA propone piatti che usano per primi i prodotti con meno giorni rimasti, per ridurre lo spreco.",
  },
  {
    icon: ChefHat,
    title: "Ricette personali",
    text: "Ingredienti scelti dalla dispensa o scritti a mano, con abbinamento automatico e conferma dei casi incerti.",
  },
  {
    icon: ShoppingCart,
    title: "Spesa collegata",
    text: "I prodotti finiti passano alla lista della spesa e, una volta comprati, tornano in dispensa.",
  },
];

const pipeline = [
  "Scansione dello scontrino con il document scanner di ML Kit",
  "Ridimensionamento locale delle pagine in JPEG",
  "Verifica dell'abbonamento e della quota giornaliera sulla Cloud Function",
  "Analisi con Gemini: prodotti, quantità, qualità, conservazione e parere",
  "Revisione dell'utente e salvataggio nella dispensa locale",
];

const techPoints: FeatureCard[] = [
  {
    icon: Database,
    title: "Nessun account, dati locali",
    text: "Dispensa, spesa e ricette vivono in SQLite sul dispositivo; le vecchie ricette incluse sono state rimosse per alleggerire l'app.",
  },
  {
    icon: Cloud,
    title: "Firebase come proxy",
    text: "Le Cloud Functions in europe-west1 tengono la chiave Gemini in Secret Manager e verificano l'abbonamento con le API di Google Play.",
  },
  {
    icon: LockKeyhole,
    title: "Quote anonime",
    text: "Firestore conserva solo l'hash SHA-256 del token d'acquisto e il conteggio giornaliero: 3 richieste IA al giorno, condivise tra le funzioni.",
  },
];

const stack = [
  "Flutter con tema e animazioni personalizzate",
  "SQLite con migrazioni per prodotti, ricette e abbinamenti",
  "Google ML Kit per codici, date e scansione documenti",
  "Firebase Cloud Functions, Firestore e Gemini API",
  "Google Play Billing con abbonamento mensile e annuale",
  "AdMob con consenso UMP per la versione gratuita",
];

const EatsNeed = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="bg-[#f3f7ec] py-20 text-[#12352a] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#14741e] transition-colors hover:text-[#1fa62b]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={eatsNeedIcon}
                  alt="Icona EatsNeed"
                  className="h-16 w-16 rounded-2xl bg-white p-1.5 shadow-[0_18px_40px_-24px_rgba(18,53,42,0.7)]"
                />
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#14741e]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#1fa62b]" />
                    Online su Google Play
                  </p>
                  <p className="text-sm font-medium text-[#54675c]">Flutter, SQLite, Firebase, Gemini AI</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-[#12352a] md:text-7xl">EatsNeed</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#30443e]">
                L'app per gestire la dispensa senza sprechi: tiene d'occhio le scadenze, organizza la spesa e, con Premium, trasforma scontrini e prodotti in scadenza in idee di ricette grazie all'IA.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1fa62b] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(31,166,43,0.9)] transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={18} />
                  Scarica su Google Play
                </a>
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c9d9bf] bg-white px-5 py-3 text-sm font-bold text-[#14741e] transition-colors hover:border-[#1fa62b] hover:text-[#1fa62b]"
                >
                  Vedi schermate
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["0", "account richiesti"],
                  ["3", "richieste IA al giorno"],
                  ["A-E", "qualità stimata"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#dde6d4] bg-white/70 p-4">
                    <p className="font-heading text-2xl font-bold text-[#12352a]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#54675c]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[620px]">
              <div className="absolute left-0 top-12 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneShot image={ideeScreen} alt="Idee con l'IA" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneShot image={dispensaScreen} alt="Dispensa EatsNeed" />
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneShot image={scontrinoScreen} alt="Scontrino con l'IA" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalità</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Meno cibo buttato, più idee in cucina.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-[#1fa62b]/40">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#1fa62b]/10 text-[#5fd36a]">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Pipeline</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Dallo scontrino alla dispensa in pochi secondi.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                L'IA fa il lavoro noioso, ma l'ultima parola resta all'utente: ogni prodotto si può modificare o escludere prima del salvataggio, e le scadenze stimate sono segnate come tali.
              </p>
            </div>

            <div className="space-y-3">
              {pipeline.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-background/60 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1fa62b] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="bg-[#f3f7ec] py-20 text-[#12352a]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#14741e]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Un'interfaccia fresca, come quello che c'è in frigo.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#54675c]">
              Verde mela, giallo miele e card morbide: i colori raccontano la freschezza di ogni prodotto a colpo d'occhio.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((shot) => (
              <div key={shot.title} className="rounded-lg border border-[#dde6d4] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(18,53,42,0.35)]">
                <div className="mx-auto max-w-[235px]">
                  <PhoneShot image={shot.image} alt={shot.alt} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#12352a]">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#54675c]">{shot.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Architettura</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Tutto sul telefono, il cloud solo per l'IA.</h2>
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
                          <h3 className="font-heading text-lg font-semibold">{point.title}</h3>
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
                <h3 className="font-heading text-2xl font-bold">Stack</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                Nata come app per la dispensa, EatsNeed è stata ridisegnata da zero con un'identità visiva propria e arricchita da funzioni IA che restano facoltative.
              </p>
              <div className="mt-6 space-y-3">
                {stack.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-[#5fd36a]" size={18} />
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
              <h2 className="font-heading text-2xl font-bold">Nessun account e dati sul dispositivo.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                L'informativa descrive Open Food Facts, l'abbonamento Google Play, l'invio a Google Gemini API per le funzioni IA, la pubblicità AdMob e i diritti dell'utente.
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
                to="/portfolio/eatsneed/terms"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText size={18} />
                Termini di utilizzo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PhoneShot = ({ image, alt }: { image: string; alt: string }) => (
  <div className="overflow-hidden rounded-[2rem] border-[7px] border-[#0b1f18] bg-[#0b1f18] shadow-[0_35px_80px_-50px_rgba(0,0,0,0.8)]">
    <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
  </div>
);

export default EatsNeed;
