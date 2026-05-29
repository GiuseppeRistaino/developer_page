import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Camera,
  CheckCircle2,
  Cloud,
  Database,
  Download,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserX,
  WifiOff,
} from "lucide-react";
import scantrakIcon from "../../PORTFOLIO/Scantrak/icon_scantrak.png";
import homeScreen from "../../PORTFOLIO/Scantrak/home_screen.png";
import loginScreen from "../../PORTFOLIO/Scantrak/login_screen.png";
import scannerScreen from "../../PORTFOLIO/Scantrak/scanner_screen.png";
import statsScreen from "../../PORTFOLIO/Scantrak/stats_screen.png";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface TechPoint {
  icon: LucideIcon;
  title: string;
  text: string;
}

const screenshots = [
  {
    title: "Accesso",
    text: "Login con identita visiva pulita, accesso Google e Apple e microcopy diretto.",
    image: loginScreen,
    alt: "Schermata login di ScanTrak",
  },
  {
    title: "Dashboard",
    text: "Budget mensile, categorie, alert e feed degli ultimi scontrini in un'unica vista.",
    image: homeScreen,
    alt: "Dashboard di ScanTrak con spesa mensile e grafico categorie",
  },
  {
    title: "Scanner",
    text: "Modalita smart e long receipt con overlay scuro, mirino verde e acquisizione guidata.",
    image: scannerScreen,
    alt: "Scanner documenti di ScanTrak",
  },
  {
    title: "Statistiche",
    text: "Trend, spesa media per negozio, top prodotti e confronto store consultabili offline.",
    image: statsScreen,
    alt: "Schermata statistiche di ScanTrak",
  },
];

const features: FeatureCard[] = [
  {
    icon: Camera,
    title: "Scansione scontrini",
    text: "Acquisizione smart, manuale o multi-pagina per scontrini lunghi, con crop e correzione prospettica.",
  },
  {
    icon: BrainCircuit,
    title: "AI per normalizzare i dati",
    text: "Gemini estrae prodotti, prezzi, quantita, categorie e traduce descrizioni POS criptiche in nomi leggibili.",
  },
  {
    icon: Database,
    title: "Archivio offline-first",
    text: "Scontrini, articoli, immagini e statistiche vivono prima di tutto nel database locale del dispositivo.",
  },
  {
    icon: BarChart3,
    title: "Analytics personali",
    text: "Dashboard, trend mensili, confronti tra negozi e classifica dei prodotti acquistati piu spesso.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    text: "Backup cloud separato dalla scansione, opzionale e riservato agli utenti Premium che lo attivano.",
  },
  {
    icon: Download,
    title: "Export Premium",
    text: "Esportazione locale in CSV, JSON o archivio ZIP con immagini, senza passare da Firebase.",
  },
];

const pipeline = [
  "Fotografia dello scontrino dal telefono",
  "Pre-elaborazione locale dell'immagine",
  "Invio temporaneo alla Cloud Function ScanTrak",
  "Analisi OCR e semantica tramite Gemini",
  "Validazione utente e salvataggio locale",
];

const techPoints: TechPoint[] = [
  {
    icon: WifiOff,
    title: "Offline-first reale",
    text: "L'app resta utile anche senza rete: archivio, dashboard e statistiche leggono dal database locale.",
  },
  {
    icon: Cloud,
    title: "Firebase come proxy sicuro",
    text: "La chiave Gemini resta in Firebase Secret Manager e il client Flutter non la distribuisce nel binario.",
  },
  {
    icon: LockKeyhole,
    title: "Quote e monetizzazione protette",
    text: "Utenti Free con 3 scansioni AI al giorno e annuncio rewarded verificato lato server; Premium fino a 10 scansioni.",
  },
];

const dataModel = [
  "Scontrini: negozio, data, totale, metodo di pagamento",
  "Elementi: descrizione grezza, nome pulito, quantita, prezzo e categoria",
  "Relazione uno-a-molti pronta per grafici, filtri e insight",
];

const playStorePrivacyUrl = `${import.meta.env.BASE_URL}scantrak/privacy.html`;
const accountDeletionUrl = `${import.meta.env.BASE_URL}scantrak/account-deletion.html`;

const Scantrak = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="bg-[#eef8f4] py-20 text-[#07131f] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#00543c] transition-colors hover:text-[#10b981]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={scantrakIcon}
                  alt="Icona ScanTrak"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-24px_rgba(0,84,60,0.7)]"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981]">
                    Mobile app in sviluppo
                  </p>
                  <p className="text-sm font-medium text-[#35544b]">Flutter, Firebase, Gemini AI</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-[#003826] md:text-7xl">
                ScanTrak
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#30443e]">
                Un'app mobile per digitalizzare gli scontrini, archiviare la spesa in locale e trasformare righe illeggibili in statistiche chiare su budget, categorie, negozi e prodotti.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#10b981] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(16,185,129,0.9)] transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={18} />
                  Vedi schermate
                </a>
                <a
                  href={playStorePrivacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#aac4ba] bg-white px-5 py-3 text-sm font-bold text-[#00543c] transition-colors hover:border-[#10b981] hover:text-[#10b981]"
                >
                  <ShieldCheck size={18} />
                  Privacy Play Store
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["3", "scan free al giorno"],
                  ["10", "scan premium al giorno"],
                  ["200 MB", "quota cloud premium"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#cfe3dc] bg-white/70 p-4">
                    <p className="font-heading text-2xl font-bold text-[#003826]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#5d756d]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[620px]">
              <div className="absolute left-0 top-12 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneShot image={loginScreen} alt="Login ScanTrak" tone="light" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneShot image={homeScreen} alt="Dashboard ScanTrak" tone="light" />
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneShot image={scannerScreen} alt="Scanner ScanTrak" tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalita</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Dallo scontrino cartaceo a una memoria di spesa consultabile.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-emerald-400/40">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
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
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Un flusso pensato per tenere l'utente in controllo.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                L'AI accelera la lettura, ma la schermata di revisione resta centrale: l'utente puo correggere negozio, data, totale, categorie e singoli articoli prima del salvataggio nel database.
              </p>
            </div>

            <div className="space-y-3">
              {pipeline.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-background/60 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="bg-[#f5faf8] py-20 text-[#07131f]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#10b981]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Schermate con la stessa grammatica visiva dell'app.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#52645f]">
              Card chiare, verde brand, tipografia netta e una modalita scanner scura per concentrare l'attenzione sull'acquisizione.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {screenshots.map((shot) => (
              <div key={shot.title} className="rounded-lg border border-[#dbe9e4] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(0,84,60,0.35)]">
                <div className="mx-auto max-w-[235px]">
                  <PhoneShot image={shot.image} alt={shot.alt} tone={shot.title === "Scanner" ? "dark" : "light"} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#003826]">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#52645f]">{shot.text}</p>
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
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Locale quando serve, cloud solo quando aggiunge valore.</h2>
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
                <ReceiptText className="text-primary" size={24} />
                <h3 className="font-heading text-2xl font-bold">Modello dati</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                La struttura e pensata per separare il documento fiscale dai singoli elementi acquistati, cosi ogni prodotto puo essere categorizzato, corretto e analizzato nel tempo.
              </p>
              <div className="mt-6 space-y-3">
                {dataModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-emerald-300" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 flex-shrink-0 text-emerald-300" size={20} />
                  <p className="text-sm leading-6 text-emerald-50/90">
                    Il prompt AI restituisce un JSON rigido con merchant, date, total, payment_method e items. L'app valida tutto prima di salvare in locale.
                  </p>
                </div>
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
              <h2 className="font-heading text-2xl font-bold">Pagina pronta da collegare nella scheda Play Store.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Include titolare, dati trattati, uso AI, backup cloud opzionale, annunci rewarded, conservazione, cancellazione account e contatti privacy.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={playStorePrivacyUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Apri informativa
                <ArrowRight size={18} />
              </a>
              <a
                href={accountDeletionUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <UserX size={18} />
                Eliminazione account
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface PhoneShotProps {
  image: string;
  alt: string;
  tone: "light" | "dark";
}

const PhoneShot = ({ image, alt, tone }: PhoneShotProps) => (
  <div
    className={`overflow-hidden rounded-[2rem] border-[7px] shadow-[0_35px_80px_-50px_rgba(0,0,0,0.8)] ${
      tone === "dark" ? "border-[#101816] bg-black" : "border-white bg-white"
    }`}
  >
    <img src={image} alt={alt} className="h-full w-full object-cover" />
  </div>
);

export default Scantrak;
