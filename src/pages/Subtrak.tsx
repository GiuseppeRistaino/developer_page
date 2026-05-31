import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  Eye,
  HardDrive,
  LockKeyhole,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingDown,
  Wallet,
  Zap,
} from "lucide-react";
import subtrakIcon from "../../PORTFOLIO/Subtrak/icon_subtrak.svg";

const subtrakPrivacyUrl = `${import.meta.env.BASE_URL}subtrak/privacy.html`;
const subtrakTermsUrl = `${import.meta.env.BASE_URL}subtrak/terms.html`;

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

const features: FeatureCard[] = [
  {
    icon: Zap,
    title: "Rilevamento automatico",
    text: "Intercetta i pagamenti ricorrenti direttamente dalle notifiche push delle app bancarie sul dispositivo — senza inserimento manuale e senza connessioni esterne.",
  },
  {
    icon: BrainCircuit,
    title: "Algoritmo di staging",
    text: "Un sistema a due fasi distingue gli abbonamenti veri dagli acquisti singoli: solo dopo 2 occorrenze nell'arco corretto di giorni il servizio viene promosso a dashboard.",
  },
  {
    icon: BarChart3,
    title: "Analytics avanzate",
    text: "Grafico torta per categoria, storico annuale a barre, confronto mese su mese e previsione della spesa del mese successivo — tutto calcolato in locale.",
  },
  {
    icon: Eye,
    title: "Vampire Alert",
    text: "L'app rileva abbonamenti inutilizzati, rincari nascosti o duplicati di categoria e suggerisce disdette con link diretto alla pagina del fornitore.",
  },
  {
    icon: Bell,
    title: "Smart Alerts predittivi",
    text: "Notifiche push locali configurabili da 1 a 7 giorni prima del rinnovo, con un secondo avviso a 24 ore.",
  },
  {
    icon: HardDrive,
    title: "Dati 100% locali",
    text: "Nessun account, nessun cloud. Tutti i dati risiedono esclusivamente nel database locale del dispositivo e scompaiono con la disinstallazione dell'app.",
  },
];

const syncMethods = [
  {
    icon: Bell,
    label: "Notification Listener",
    desc: "Servizio background che intercetta le push delle app bancarie direttamente sul dispositivo",
  },
  {
    icon: HardDrive,
    label: "Database locale",
    desc: "Abbonamenti, storico e staging salvati in SQLite sul dispositivo — nessun dato inviato a server",
  },
  {
    icon: Zap,
    label: "Inserimento manuale",
    desc: "Aggiungi o correggi abbonamenti in qualsiasi momento tramite il FAB nella dashboard",
  },
];

const techPoints: TechPoint[] = [
  {
    icon: Zap,
    title: "Staging a due fasi",
    text: "I candidati entrano in pending_subscriptions e vengono promossi solo se la ricorrenza cade tra 20 e 45 giorni con un importo entro ±10%. Zero falsi positivi.",
  },
  {
    icon: LockKeyhole,
    title: "100% locale, zero cloud",
    text: "Nessun dato lascia il dispositivo. Il Notification Listener elabora le push in locale e salva solo le corrispondenze a pattern di abbonamenti noti nel database SQLite.",
  },
  {
    icon: ShieldCheck,
    title: "30+ servizi supportati",
    text: "Netflix, Spotify, Amazon Prime, Disney+, Apple, Google One, Microsoft 365, Adobe CC, PlayStation Plus, Xbox Game Pass, DAZN, Notion, Canva e molti altri con alias multipli.",
  },
];

const dataModel = [
  "Abbonamenti: nome, prezzo, valuta, ciclo, prossima data di rinnovo, stato",
  "Transaction log: sorgente (notification), timestamp — elaborato e salvato solo in locale",
  "Staging: serviceKey, importo, prima e ultima occorrenza, contatore",
];

const screens = [
  {
    id: "dashboard",
    title: "Dashboard",
    text: "KPI mensile in evidenza, Outflow Pulse con countdown al prossimo picco, lista abbonamenti ordinata per scadenza e Vampire Alert in primo piano.",
  },
  {
    id: "sync",
    title: "Notification Hub",
    text: "Gestione del Notification Listener: app bancarie abilitate, log on-device degli eventi intercettati e candidati in staging pronti per essere confermati.",
  },
  {
    id: "analytics",
    title: "Analytics",
    text: "Grafico torta per categoria, storico annuale a barre con evidenziazione picchi e sezione Vampire Alert con suggerimenti di risparmio calcolati.",
  },
  {
    id: "detail",
    title: "Dettaglio abbonamento",
    text: "Header dinamico con colori del brand, cronologia completa dei pagamenti intercettati, metodo di pagamento e link diretto alla pagina di disdetta.",
  },
];

const Subtrak = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* ── Hero ── */}
      <section className="bg-[#060e20] py-20 text-[#dae2fd] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={subtrakIcon}
                  alt="Icona SubTrak"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-24px_rgba(99,102,241,0.8)]"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#c0c1ff]">
                    Mobile app in sviluppo
                  </p>
                  <p className="text-sm font-medium text-[#c7c4d7]">Flutter, SQLite, offline-first</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-[#dae2fd] md:text-7xl">
                SubTrak
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#94a3b8]">
                Tracker intelligente di abbonamenti ricorrenti con rilevamento automatico in tempo reale, analytics sulle uscite mensili e alert predittivi prima di ogni rinnovo.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6366f1] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(99,102,241,0.9)] transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={18} />
                  Vedi schermate
                </a>
                <a
                  href="#architettura"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#464554] bg-white/5 px-5 py-3 text-sm font-bold text-[#c0c1ff] backdrop-blur transition-colors hover:border-[#6366f1] hover:text-[#8083ff]"
                >
                  <Zap size={18} />
                  Architettura
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["30+", "servizi supportati"],
                  ["100%", "dati in locale"],
                  ["10+", "app bancarie"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[#464554] bg-white/5 p-4 backdrop-blur"
                  >
                    <p className="font-heading text-2xl font-bold text-[#c0c1ff]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup cluster */}
            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[620px]">
              <div className="absolute left-0 top-12 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneFrame>
                  <ScreenLogin />
                </PhoneFrame>
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneFrame>
                  <ScreenDashboard />
                </PhoneFrame>
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneFrame>
                  <ScreenAnalytics />
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalita</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Dal pagamento bancario all'abbonamento tracciato, in automatico.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:border-indigo-400/40"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
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

      {/* ── Sync Methods ── */}
      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                Automazione
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Tutto locale, nessun servizio esterno necessario.
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                SubTrak rileva i pagamenti ricorrenti intercettando le notifiche push delle app bancarie direttamente sul dispositivo. Nessun dato viene inviato a server cloud. L'algoritmo di staging elimina i falsi positivi prima che un servizio appaia in dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {syncMethods.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex gap-4 rounded-lg border border-border bg-background/60 p-5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold">{m.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                );
              })}

              {/* Staging pipeline */}
              <div className="mt-2 rounded-lg border border-indigo-400/20 bg-indigo-500/5 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 flex-shrink-0 text-indigo-400" size={20} />
                  <p className="text-sm leading-6 text-[#c0c1ff]/80">
                    L'algoritmo di staging accetta una transazione come abbonamento solo se si ripete tra 20 e 45 giorni con importo entro ±10%. Prima di allora resta in <span className="font-mono text-[#c0c1ff]">pending_subscriptions</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Screens ── */}
      <section id="screens" className="bg-[#060e20] py-20 text-[#dae2fd]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c0c1ff]">
                Esperienza mobile
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Design system dark-first con glassmorphism e accenti luminosi.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#94a3b8]">
              Navy profondo come canvas, indigo per azioni ad alta intenzione, emerald per i risparmi e rose per le uscite critiche.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {screens.map((s) => (
              <div
                key={s.id}
                className="rounded-lg border border-[#464554] bg-[#0b1326] p-5 shadow-[0_24px_70px_-45px_rgba(99,102,241,0.3)]"
              >
                <div className="mx-auto max-w-[235px]">
                  <PhoneFrame compact>
                    {s.id === "dashboard" && <ScreenDashboard />}
                    {s.id === "sync" && <ScreenSync />}
                    {s.id === "analytics" && <ScreenAnalytics />}
                    {s.id === "detail" && <ScreenDetail />}
                  </PhoneFrame>
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#dae2fd]">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#94a3b8]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section id="architettura" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                Architettura
              </p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Offline-first per scelta, non per necessita.
              </h2>
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
                <Wallet className="text-primary" size={24} />
                <h3 className="font-heading text-2xl font-bold">Modello dati</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                La struttura separa nettamente gli abbonamenti attivi dal log delle transazioni grezze, cosi ogni rinnovo puo essere verificato, corretto e confrontato nel tempo per rilevare rincari nascosti.
              </p>
              <div className="mt-6 space-y-3">
                {dataModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-indigo-400" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-indigo-400/20 bg-indigo-500/10 p-5">
                <div className="flex items-start gap-3">
                  <TrendingDown className="mt-1 flex-shrink-0 text-[#4edea3]" size={20} />
                  <p className="text-sm leading-6 text-indigo-100/80">
                    Il campo <span className="font-mono text-[#c0c1ff]">auto_detected</span> distingue gli abbonamenti rilevati automaticamente da quelli inseriti manualmente, consentendo statistiche sull'affidabilita del rilevamento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Legal / CTA ── */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-gradient-card p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">
                In sviluppo
              </p>
              <h2 className="font-heading text-2xl font-bold">
                SubTrak e in fase di sviluppo attivo.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                L'app e progettata per iOS e Android con Flutter. Tutti i dati vengono trattati e conservati esclusivamente in locale sul dispositivo dell'utente — nessun server, nessun cloud.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={subtrakPrivacyUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShieldCheck size={18} />
                Informativa Privacy
              </a>
              <a
                href={subtrakTermsUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Termini e Condizioni
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── Phone frame wrapper ── */
interface PhoneFrameProps {
  children: React.ReactNode;
  compact?: boolean;
}

const PhoneFrame = ({ children, compact }: PhoneFrameProps) => (
  <div
    className={`overflow-hidden rounded-[2rem] border-[7px] border-[#0b1326] bg-[#060e20] shadow-[0_35px_80px_-50px_rgba(0,0,0,0.9)]`}
    style={{ aspectRatio: "9/19" }}
  >
    {children}
  </div>
);

/* ── Inline SVG screen mockups ── */

const ScreenDashboard = () => (
  <svg viewBox="0 0 270 570" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="270" height="570" fill="#0b1326" />
    {/* Status bar */}
    <rect x="0" y="0" width="270" height="28" fill="#060e20" />
    <text x="20" y="18" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">9:41</text>
    <text x="230" y="18" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">●●●</text>
    {/* Header */}
    <rect x="0" y="28" width="270" height="44" fill="#0b1326" fillOpacity="0.9" />
    <circle cx="42" cy="50" r="14" fill="#6366f1" fillOpacity="0.3" />
    <text x="66" y="55" fill="#c0c1ff" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">SubTrak</text>
    <circle cx="244" cy="50" r="14" fill="#ffffff" fillOpacity="0.05" />
    <text x="238" y="55" fill="#94a3b8" fontSize="14" fontFamily="sans-serif">🔔</text>
    {/* KPI Card */}
    <rect x="16" y="84" width="238" height="80" rx="12" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="102" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" letterSpacing="1">TOTAL MONTHLY SPEND</text>
    <text x="28" y="128" fill="#c0c1ff" fontSize="28" fontWeight="700" fontFamily="Inter,sans-serif">47,90 €</text>
    <rect x="190" y="94" width="52" height="20" rx="6" fill="rgba(78,222,163,0.15)" />
    <text x="198" y="108" fill="#4edea3" fontSize="9" fontFamily="monospace">▼ 12.5%</text>
    <line x1="28" y1="144" x2="242" y2="144" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="158" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Projected next month</text>
    <text x="190" y="158" fill="#dae2fd" fontSize="9" fontFamily="monospace">52,40 €</text>
    {/* Outflow Pulse */}
    <rect x="16" y="176" width="112" height="110" rx="12" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="72" y="194" fill="#dae2fd" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif" textAnchor="middle">Outflow Pulse</text>
    <circle cx="72" cy="236" r="28" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
    <circle cx="72" cy="236" r="28" fill="none" stroke="url(#grad1)" strokeWidth="5" strokeDasharray="176" strokeDashoffset="50" strokeLinecap="round" transform="rotate(-90 72 236)" />
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c0c1ff" />
        <stop offset="100%" stopColor="#4edea3" />
      </linearGradient>
    </defs>
    <text x="72" y="232" fill="#c0c1ff" fontSize="16" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">3</text>
    <text x="72" y="244" fill="#94a3b8" fontSize="7" fontFamily="Inter,sans-serif" textAnchor="middle">DAYS LEFT</text>
    <text x="72" y="276" fill="#94a3b8" fontSize="7" fontFamily="Inter,sans-serif" textAnchor="middle">Next billing peak</text>
    {/* Vampire Alert */}
    <rect x="142" y="176" width="112" height="110" rx="12" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
    <rect x="142" y="176" width="4" height="110" rx="2" fill="#F59E0B" />
    <text x="156" y="198" fill="#F59E0B" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">⚠ Vampire Alert</text>
    <text x="150" y="216" fill="#94a3b8" fontSize="7.5" fontFamily="Inter,sans-serif">
      <tspan x="150" dy="0">"Prime Video"</tspan>
      <tspan x="150" dy="12">+2.00 € senza avviso.</tspan>
      <tspan x="150" dy="12">Revisione?</tspan>
    </text>
    <rect x="150" y="263" width="96" height="16" rx="4" fill="rgba(245,158,11,0.2)" />
    <text x="198" y="274" fill="#F59E0B" fontSize="7" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="600">INVESTIGATE</text>
    {/* Subscription list */}
    <text x="20" y="304" fill="#dae2fd" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">Active Subscriptions</text>
    {/* Netflix row */}
    <rect x="16" y="312" width="238" height="42" rx="8" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="26" y="322" width="22" height="22" rx="4" fill="#e50914" />
    <text x="37" y="337" fill="white" fontSize="10" fontFamily="sans-serif" textAnchor="middle">N</text>
    <text x="58" y="328" fill="#dae2fd" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Netflix</text>
    <text x="58" y="341" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Premium • Tra 3 giorni</text>
    <text x="220" y="336" fill="#c0c1ff" fontSize="9" fontFamily="monospace" textAnchor="end">17,99 €</text>
    {/* Spotify row */}
    <rect x="16" y="360" width="238" height="42" rx="8" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="26" y="370" width="22" height="22" rx="4" fill="#1db954" />
    <text x="37" y="385" fill="white" fontSize="9" fontFamily="sans-serif" textAnchor="middle">♪</text>
    <text x="58" y="376" fill="#dae2fd" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Spotify</text>
    <text x="58" y="389" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Premium • Tra 12 giorni</text>
    <text x="220" y="384" fill="#c0c1ff" fontSize="9" fontFamily="monospace" textAnchor="end">10,99 €</text>
    {/* Amazon row */}
    <rect x="16" y="408" width="238" height="42" rx="8" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <rect x="26" y="418" width="22" height="22" rx="4" fill="#ff9900" />
    <text x="37" y="433" fill="white" fontSize="9" fontFamily="sans-serif" textAnchor="middle">a</text>
    <text x="58" y="424" fill="#dae2fd" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">Amazon Prime</text>
    <text x="58" y="437" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Annuale • Tra 45 giorni</text>
    <text x="220" y="432" fill="#c0c1ff" fontSize="9" fontFamily="monospace" textAnchor="end">4,99 €</text>
    {/* FAB */}
    <circle cx="230" cy="520" r="22" fill="#6366f1" />
    <text x="230" y="526" fill="white" fontSize="18" fontFamily="sans-serif" textAnchor="middle">+</text>
    {/* Bottom nav */}
    <rect x="0" y="545" width="270" height="25" fill="#060e20" />
    <text x="34" y="560" fill="#c0c1ff" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Home</text>
    <text x="90" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Sync</text>
    <text x="180" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Analytics</text>
    <text x="236" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Settings</text>
  </svg>
);

const ScreenLogin = () => (
  <svg viewBox="0 0 270 570" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="270" height="570" fill="#0b1326" />
    {/* Top glow */}
    <ellipse cx="135" cy="100" rx="100" ry="80" fill="#6366f1" fillOpacity="0.12" />
    {/* Icon */}
    <rect x="103" y="90" width="64" height="64" rx="16" fill="#0b1326" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.4" />
    <rect x="115" y="108" width="40" height="30" rx="5" fill="#6366f1" fillOpacity="0.15" />
    <rect x="115" y="118" width="40" height="10" rx="3" fill="#6366f1" />
    <rect x="122" y="108" width="12" height="10" rx="3" fill="none" stroke="#6366f1" strokeWidth="2" />
    <text x="135" y="175" fill="#c0c1ff" fontSize="20" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">SubTrak</text>
    <text x="135" y="193" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Smart Subscription Tracker</text>
    {/* Google button */}
    <rect x="36" y="240" width="198" height="38" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <circle cx="60" cy="259" r="10" fill="white" fillOpacity="0.9" />
    <text x="60" y="263" fill="#4285f4" fontSize="10" fontFamily="sans-serif" textAnchor="middle">G</text>
    <text x="135" y="263" fill="#dae2fd" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle">Accedi con Google</text>
    {/* Apple button */}
    <rect x="36" y="288" width="198" height="38" rx="10" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="135" y="312" fill="#dae2fd" fontSize="11" fontFamily="Inter,sans-serif" textAnchor="middle"> Accedi con Apple</text>
    {/* Divider */}
    <line x1="36" y1="342" x2="110" y2="342" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="135" y="346" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">oppure</text>
    <line x1="160" y1="342" x2="234" y2="342" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Email input */}
    <rect x="36" y="356" width="198" height="36" rx="8" fill="#131b2e" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="52" y="378" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">Email</text>
    {/* Password input */}
    <rect x="36" y="400" width="198" height="36" rx="8" fill="#131b2e" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="52" y="422" fill="#94a3b8" fontSize="10" fontFamily="Inter,sans-serif">Password</text>
    {/* Login button */}
    <rect x="36" y="448" width="198" height="40" rx="10" fill="#6366f1" />
    <text x="135" y="473" fill="white" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">Accedi</text>
    <text x="135" y="510" fill="#6366f1" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">Non hai un account? Registrati</text>
  </svg>
);

const ScreenSync = () => (
  <svg viewBox="0 0 270 570" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="270" height="570" fill="#0b1326" />
    <rect x="0" y="0" width="270" height="28" fill="#060e20" />
    <text x="20" y="18" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">9:41</text>
    <rect x="0" y="28" width="270" height="44" fill="#060e20" />
    <text x="135" y="55" fill="#dae2fd" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">Sync Center</text>
    {/* Open Banking */}
    <rect x="16" y="84" width="238" height="72" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <rect x="26" y="96" width="28" height="28" rx="7" fill="#6366f1" fillOpacity="0.2" />
    <text x="40" y="115" fill="#c0c1ff" fontSize="14" textAnchor="middle">🏦</text>
    <text x="66" y="103" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Open Banking (PSD2)</text>
    <text x="66" y="116" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Intesa Sanpaolo connesso</text>
    <text x="66" y="128" fill="#4edea3" fontSize="8" fontFamily="Inter,sans-serif">● Sincronizzato 10m fa</text>
    <rect x="212" y="106" width="32" height="16" rx="8" fill="#4edea3" />
    <circle cx="236" cy="114" r="5" fill="white" />
    {/* Gmail */}
    <rect x="16" y="164" width="238" height="64" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <rect x="26" y="176" width="28" height="28" rx="7" fill="#ea4335" fillOpacity="0.2" />
    <text x="40" y="195" fill="#ea4335" fontSize="14" textAnchor="middle">✉</text>
    <text x="66" y="185" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Email Parsing</text>
    <text x="66" y="198" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Gmail connesso • 3 ricevute oggi</text>
    <rect x="176" y="190" width="68" height="18" rx="6" fill="rgba(192,193,255,0.1)" stroke="rgba(192,193,255,0.3)" strokeWidth="1" />
    <text x="210" y="202" fill="#c0c1ff" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">+ Outlook</text>
    {/* Notification Listener */}
    <rect x="16" y="236" width="238" height="78" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="254" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Notification Listener</text>
    <rect x="26" y="262" width="110" height="14" rx="4" fill="rgba(78,222,163,0.1)" />
    <circle cx="34" cy="269" r="3" fill="#4edea3" />
    <text x="42" y="273" fill="#4edea3" fontSize="8" fontFamily="Inter,sans-serif">Revolut</text>
    <rect x="142" y="262" width="100" height="14" rx="4" fill="rgba(99,102,241,0.1)" />
    <circle cx="150" cy="269" r="3" fill="#94a3b8" />
    <text x="158" y="273" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Amazon Shopping</text>
    <rect x="26" y="282" width="96" height="14" rx="4" fill="rgba(78,222,163,0.1)" />
    <circle cx="34" cy="289" r="3" fill="#4edea3" />
    <text x="42" y="293" fill="#4edea3" fontSize="8" fontFamily="Inter,sans-serif">N26</text>
    {/* Activity Feed */}
    <text x="20" y="332" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Activity Feed</text>
    {[
      { time: "11:15", dot: "#4edea3", msg: "Revolut → Netflix 17.99€ registrati" },
      { time: "10:42", dot: "#4edea3", msg: "Gmail → Spotify ricevuta rilevata" },
      { time: "09:30", dot: "#94a3b8", msg: "Staging → Amazon candidato" },
      { time: "08:15", dot: "#ff516a", msg: "Errore → Banca timeout retry" },
    ].map((entry, i) => (
      <g key={i}>
        <text x="26" y={352 + i * 32} fill="#94a3b8" fontSize="7.5" fontFamily="monospace">{entry.time}</text>
        <circle cx="68" cy={348 + i * 32} r="3" fill={entry.dot} />
        <text x="78" y={352 + i * 32} fill="#dae2fd" fontSize="7.5" fontFamily="monospace">{entry.msg}</text>
      </g>
    ))}
    {/* Bottom nav */}
    <rect x="0" y="545" width="270" height="25" fill="#060e20" />
    <text x="34" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Home</text>
    <text x="90" y="560" fill="#c0c1ff" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Sync</text>
    <text x="180" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Analytics</text>
    <text x="236" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Settings</text>
  </svg>
);

const ScreenAnalytics = () => (
  <svg viewBox="0 0 270 570" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="270" height="570" fill="#0b1326" />
    <rect x="0" y="0" width="270" height="28" fill="#060e20" />
    <text x="20" y="18" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">9:41</text>
    <rect x="0" y="28" width="270" height="44" fill="#060e20" />
    <text x="135" y="55" fill="#dae2fd" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">Analytics</text>
    {/* Pie chart placeholder */}
    <rect x="16" y="84" width="238" height="140" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="102" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Breakdown Categorie</text>
    {/* Donut chart */}
    <circle cx="105" cy="172" r="44" fill="none" stroke="#6366f1" strokeWidth="18" strokeDasharray="138 138" strokeDashoffset="0" transform="rotate(-90 105 172)" />
    <circle cx="105" cy="172" r="44" fill="none" stroke="#4edea3" strokeWidth="18" strokeDasharray="83 193" strokeDashoffset="-138" transform="rotate(-90 105 172)" />
    <circle cx="105" cy="172" r="44" fill="none" stroke="#ff516a" strokeWidth="18" strokeDasharray="55 221" strokeDashoffset="-221" transform="rotate(-90 105 172)" />
    <circle cx="105" cy="172" r="26" fill="#0b1326" />
    <text x="105" y="168" fill="#c0c1ff" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">47,90</text>
    <text x="105" y="180" fill="#94a3b8" fontSize="7" fontFamily="Inter,sans-serif" textAnchor="middle">€/mese</text>
    {/* Legend */}
    <circle cx="165" cy="148" r="4" fill="#6366f1" />
    <text x="174" y="152" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Intrattenimento 40%</text>
    <circle cx="165" cy="166" r="4" fill="#4edea3" />
    <text x="174" y="170" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Produttivita 30%</text>
    <circle cx="165" cy="184" r="4" fill="#ff516a" />
    <text x="174" y="188" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Software 20%</text>
    <circle cx="165" cy="202" r="4" fill="#94a3b8" />
    <text x="174" y="206" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Altro 10%</text>
    {/* Bar chart */}
    <rect x="16" y="234" width="238" height="130" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="252" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Storico Annuale</text>
    {/* Bars */}
    {[
      { x: 30, h: 40, color: "#6366f1" },
      { x: 50, h: 52, color: "#6366f1" },
      { x: 70, h: 38, color: "#6366f1" },
      { x: 90, h: 44, color: "#6366f1" },
      { x: 110, h: 60, color: "#ff516a" },
      { x: 130, h: 42, color: "#6366f1" },
      { x: 150, h: 46, color: "#6366f1" },
      { x: 170, h: 39, color: "#6366f1" },
      { x: 190, h: 48, color: "#6366f1" },
      { x: 210, h: 56, color: "#ff516a" },
      { x: 230, h: 50, color: "#6366f1" },
      { x: 250, h: 47, color: "#c0c1ff" },
    ].map((bar, i) => (
      <rect
        key={i}
        x={bar.x - 8}
        y={350 - bar.h}
        width="14"
        height={bar.h}
        rx="3"
        fill={bar.color}
        fillOpacity={bar.color === "#c0c1ff" ? 0.6 : 0.8}
      />
    ))}
    <line x1="20" y1="350" x2="260" y2="350" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    {/* Vampire Alert */}
    <rect x="16" y="374" width="238" height="74" rx="10" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.3)" strokeWidth="1" />
    <rect x="16" y="374" width="4" height="74" rx="2" fill="#F59E0B" />
    <text x="30" y="391" fill="#F59E0B" fontSize="9" fontWeight="700" fontFamily="Inter,sans-serif">⚠ Vampire Alert</text>
    <text x="30" y="405" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Hai 3 servizi streaming attivi.</text>
    <text x="30" y="418" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif">Risparmio potenziale: 12,99 €/mese</text>
    <rect x="30" y="428" width="90" height="14" rx="5" fill="rgba(245,158,11,0.2)" />
    <text x="75" y="438" fill="#F59E0B" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle" fontWeight="600">VEDI DETTAGLI</text>
    {/* Bottom nav */}
    <rect x="0" y="545" width="270" height="25" fill="#060e20" />
    <text x="34" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Home</text>
    <text x="90" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Sync</text>
    <text x="180" y="560" fill="#c0c1ff" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Analytics</text>
    <text x="236" y="560" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Settings</text>
  </svg>
);

const ScreenDetail = () => (
  <svg viewBox="0 0 270 570" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="270" height="570" fill="#0b1326" />
    {/* Netflix brand header */}
    <rect x="0" y="0" width="270" height="160" fill="#e50914" fillOpacity="0.15" />
    <rect x="0" y="0" width="270" height="28" fill="rgba(0,0,0,0.2)" />
    <text x="20" y="18" fill="#ffdddd" fontSize="9" fontFamily="Inter,sans-serif">9:41</text>
    <text x="26" y="50" fill="#ffaaaa" fontSize="10" fontFamily="Inter,sans-serif">← Abbonamenti</text>
    <rect x="111" y="60" width="48" height="48" rx="10" fill="#e50914" />
    <text x="135" y="92" fill="white" fontSize="22" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">N</text>
    <text x="135" y="126" fill="#dae2fd" fontSize="24" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">17,99 €</text>
    <text x="135" y="144" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="middle">al mese</text>
    {/* Billing info */}
    <rect x="16" y="170" width="238" height="90" rx="10" fill="rgba(30,41,59,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <text x="28" y="190" fill="#94a3b8" fontSize="8" fontFamily="Inter,sans-serif" letterSpacing="1">DATI DI FATTURAZIONE</text>
    <text x="28" y="210" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Ciclo</text>
    <text x="200" y="210" fill="#dae2fd" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="end">Mensile</text>
    <line x1="28" y1="216" x2="242" y2="216" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    <text x="28" y="232" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Prossimo rinnovo</text>
    <text x="200" y="232" fill="#dae2fd" fontSize="9" fontFamily="Inter,sans-serif" textAnchor="end">3 giu 2026</text>
    <line x1="28" y1="238" x2="242" y2="238" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
    <text x="28" y="254" fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">Rilevato via</text>
    <rect x="156" y="244" width="52" height="14" rx="4" fill="rgba(192,193,255,0.1)" />
    <text x="182" y="254" fill="#c0c1ff" fontSize="8" fontFamily="Inter,sans-serif" textAnchor="middle">Bank 🏦</text>
    {/* Payment history */}
    <text x="20" y="282" fill="#dae2fd" fontSize="10" fontWeight="600" fontFamily="Inter,sans-serif">Cronologia pagamenti</text>
    {[
      { date: "03 mag 2026", amt: "17,99 €" },
      { date: "03 apr 2026", amt: "17,99 €" },
      { date: "03 mar 2026", amt: "15,99 €" },
      { date: "03 feb 2026", amt: "15,99 €" },
    ].map((p, i) => (
      <g key={i}>
        <rect x="16" y={292 + i * 36} width="238" height="30" rx="6" fill="rgba(30,41,59,0.5)" />
        <circle cx="30" cy={307 + i * 36} r="4" fill="#4edea3" />
        <text x="44" y={311 + i * 36} fill="#94a3b8" fontSize="9" fontFamily="Inter,sans-serif">{p.date}</text>
        <text x="226" y={311 + i * 36} fill="#c0c1ff" fontSize="9" fontFamily="monospace" textAnchor="end">{p.amt}</text>
      </g>
    ))}
    {/* Cancel button */}
    <rect x="16" y="445" width="238" height="40" rx="10" fill="rgba(255,81,106,0.15)" stroke="rgba(255,81,106,0.4)" strokeWidth="1" />
    <text x="135" y="470" fill="#ff516a" fontSize="11" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">Disdici abbonamento →</text>
  </svg>
);

export default Subtrak;
