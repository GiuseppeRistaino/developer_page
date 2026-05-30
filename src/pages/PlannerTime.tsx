import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Cloud,
  Columns3,
  Database,
  LockKeyhole,
  Paperclip,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react";
import plannerTimeIcon from "../../PORTFOLIO/PlannerTime/icon.png";
import calendarScreen from "../../PORTFOLIO/PlannerTime/FIGMA/calendario/screen.png";
import createEventScreen from "../../PORTFOLIO/PlannerTime/FIGMA/crea_evento/screen.png";
import dashboardScreen from "../../PORTFOLIO/PlannerTime/FIGMA/dashboard_progetti_con_task_esempio/screen.png";
import taskDetailScreen from "../../PORTFOLIO/PlannerTime/FIGMA/dettaglio_task/screen.png";
import loginScreen from "../../PORTFOLIO/PlannerTime/FIGMA/login/screen.png";

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

const playStorePrivacyUrl = `${import.meta.env.BASE_URL}plannertime/privacy.html`;

const screenshots = [
  {
    title: "Calendario",
    text: "Vista mensile, eventi colorati per progetto, giornata selezionata e lista attività con orari e durata.",
    image: calendarScreen,
    alt: "Calendario mensile di Planner Time con eventi del giorno",
  },
  {
    title: "Dashboard progetto",
    text: "Board Kanban mobile con colonne Da fare, In corso e Fatto, avatar membri e creazione rapida task.",
    image: dashboardScreen,
    alt: "Dashboard progetto Planner Time con colonne Kanban",
  },
  {
    title: "Dettaglio task",
    text: "Descrizione, allegati, commenti, stato, priorità, scadenza e assegnatari nello stesso flusso.",
    image: taskDetailScreen,
    alt: "Dettaglio task Planner Time con allegati e commenti",
  },
  {
    title: "Nuovo evento",
    text: "Creazione evento con progetto, colore, orari, collegamento opzionale a task e promemoria.",
    image: createEventScreen,
    alt: "Schermata creazione evento Planner Time",
  },
];

const features: FeatureCard[] = [
  {
    icon: Columns3,
    title: "Progetti in stile Kanban",
    text: "Ogni progetto ha colonne indipendenti, task ordinati per priorità e scadenza, spostamenti tra stati e gestione mobile ottimizzata.",
  },
  {
    icon: CalendarDays,
    title: "Calendario operativo",
    text: "Gli eventi possono essere autonomi o collegati ai task, con colore del progetto, orari di inizio/fine e lista giornaliera.",
  },
  {
    icon: Users,
    title: "Collaborazione controllata",
    text: "Progetti condivisi solo tra membri, avatar coerenti, aggiunta utenti via email e permessi separati per owner e collaboratori.",
  },
  {
    icon: ClipboardList,
    title: "Task completi",
    text: "Titolo, descrizione, stato, priorità, scadenza, assegnatari, commenti e completamento convivono nella scheda dettaglio.",
  },
  {
    icon: Paperclip,
    title: "Allegati su Firebase Storage",
    text: "Ogni task può contenere file caricati nel cloud, con limiti beta e regole Storage che ne proteggono l'accesso.",
  },
  {
    icon: BellRing,
    title: "Notifiche locali e FCM",
    text: "Reminder evento sul dispositivo e notifiche collaborative tramite Cloud Functions quando membri, commenti o assegnazioni cambiano.",
  },
];

const techPoints: TechPoint[] = [
  {
    icon: Smartphone,
    title: "Flutter e Material Design 3",
    text: "Interfaccia mobile ad alta leggibilità, palette Trust Blue, superfici tonali e layout progettati per pianificazione densa ma ordinata.",
  },
  {
    icon: Database,
    title: "Firestore real-time",
    text: "Progetti, colonne, task, commenti ed eventi sono sincronizzati su Cloud Firestore con struttura condivisa per membri del progetto.",
  },
  {
    icon: LockKeyhole,
    title: "Sicurezza Firebase",
    text: "Auth email/password e Google, verifica email, App Check, regole Firestore/Storage e Crashlytics per stabilità e controllo.",
  },
];

const betaLimits = [
  ["3", "progetti beta"],
  ["5", "membri per progetto"],
  ["80", "task per progetto"],
];

const workflow = [
  "Accesso con Firebase Auth, email verificata o Google Sign-In",
  "Creazione progetto con owner, membri e colonne iniziali",
  "Pianificazione task su Kanban con priorità, scadenze e assegnatari",
  "Aggancio degli eventi al calendario con promemoria locali",
  "Sincronizzazione cloud, allegati protetti e notifiche collaborative",
];

const dataModel = [
  "userProfiles: identità, email normalizzata, nome e avatar",
  "projects: owner, membri, descrizione e colore progetto",
  "tasks: stato, priorità, scadenza, allegati, commenti e assegnatari",
  "events: orari, reminder, progetto e task collegato opzionale",
];

const PlannerTime = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="bg-[#f4f7fb] py-20 text-[#111827] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#00478c] transition-colors hover:text-[#0b66c3]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={plannerTimeIcon}
                  alt="Icona Planner Time"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-24px_rgba(0,71,140,0.85)]"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#005fb7]">
                    Mobile app in BETA
                  </p>
                  <p className="text-sm font-medium text-[#4b5563]">Flutter, Firebase, Riverpod</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-[#08111f] md:text-7xl">
                Planner Time
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2f3b4d]">
                Un'app mobile per unire calendario, progetti e task in un flusso operativo unico: pianifichi il tempo, segui l'avanzamento Kanban e collabori con il team senza perdere il contesto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#005fb7] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(0,95,183,0.9)] transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={18} />
                  Vedi schermate
                </a>
                <a
                  href={playStorePrivacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#b9c7dc] bg-white px-5 py-3 text-sm font-bold text-[#00478c] transition-colors hover:border-[#005fb7] hover:text-[#005fb7]"
                >
                  <ShieldCheck size={18} />
                  Privacy Play Store
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {betaLimits.map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#d6dfed] bg-white/80 p-4">
                    <p className="font-heading text-2xl font-bold text-[#08111f]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#5c6478]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[640px]">
              <div className="absolute left-0 top-14 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneShot image={loginScreen} alt="Login Planner Time" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneShot image={calendarScreen} alt="Calendario Planner Time" />
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneShot image={taskDetailScreen} alt="Dettaglio task Planner Time" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalità</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Dal calendario alla board, ogni attività resta collegata al progetto giusto.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-blue-400/40">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
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
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Flusso operativo</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Un'app pensata per passare dalla pianificazione all'esecuzione.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Planner Time parte dall'identità dell'utente, costruisce progetti condivisi e mantiene allineati task, eventi e notifiche. Il risultato è una vista unica tra tempo, lavoro e collaborazione.
              </p>
            </div>

            <div className="space-y-3">
              {workflow.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-background/60 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="bg-[#faf9fd] py-20 text-[#1a1c1f]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#005fb7]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Layout Figma trasformati in un'esperienza produttiva e leggibile.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5c6478]">
              Superfici chiare, blu fiduciario, accenti progetto e componenti Material 3 per restituire calma anche quando i dati sono tanti.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {screenshots.map((shot) => (
              <div key={shot.title} className="rounded-lg border border-[#dfe4ee] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(0,71,140,0.35)]">
                <div className="mx-auto max-w-[235px]">
                  <PhoneShot image={shot.image} alt={shot.alt} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#08111f]">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5c6478]">{shot.text}</p>
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
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Mobile-first, cloud-first, ma con accessi strettamente legati ai membri.</h2>
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
                <Cloud className="text-primary" size={24} />
                <h3 className="font-heading text-2xl font-bold">Modello dati</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                La struttura Firestore separa identità, progetti, colonne, task, commenti ed eventi. Ogni progetto espone dati solo ai membri autorizzati.
              </p>
              <div className="mt-6 space-y-3">
                {dataModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-blue-300" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Green</p>
                  <p className="mt-1 text-sm text-emerald-50/90">Categorie progetto</p>
                </div>
                <div className="rounded-lg border border-orange-400/20 bg-orange-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-200">Orange</p>
                  <p className="mt-1 text-sm text-orange-50/90">Priorità e stato</p>
                </div>
                <div className="rounded-lg border border-purple-400/20 bg-purple-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-200">Purple</p>
                  <p className="mt-1 text-sm text-purple-50/90">Collaborazione</p>
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
              <h2 className="font-heading text-2xl font-bold">Pagina HTML pronta da collegare nella Play Console.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Include titolare, dati account, progetti, task, eventi, allegati, notifiche, Crashlytics, App Check, conservazione ed eliminazione account.
              </p>
            </div>
            <a
              href={playStorePrivacyUrl}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Apri informativa
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface PhoneShotProps {
  image: string;
  alt: string;
}

const PhoneShot = ({ image, alt }: PhoneShotProps) => (
  <div className="overflow-hidden rounded-[2rem] border-[7px] border-white bg-white shadow-[0_35px_80px_-50px_rgba(0,0,0,0.8)]">
    <img src={image} alt={alt} className="h-full w-full object-cover" />
  </div>
);

export default PlannerTime;