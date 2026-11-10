import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Columns3,
  DatabaseZap,
  FileText,
  Link2,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Trash2,
  UsersRound,
  Workflow,
} from "lucide-react";
import zlotIcon from "../../PORTFOLIO/Zlot/icon_zlot.png";
import calendarioScreen from "../../PORTFOLIO/Zlot/screen_calendario.png";
import appuntamentoScreen from "../../PORTFOLIO/Zlot/screen_appuntamento.png";
import abbonamentoScreen from "../../PORTFOLIO/Zlot/screen_abbonamento.png";
import configurazioneScreen from "../../PORTFOLIO/Zlot/screen_configurazione.png";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

const base = import.meta.env.BASE_URL;
const privacyUrl = `${base}zlot/privacy.html`;
const termsUrl = `${base}zlot/terms.html`;
const accountDeletionUrl = `${base}zlot/account-deletion.html`;

// Colori del marchio ZLOT (gli stessi dell'app).
const ink = "#0f0e19";
const violet = "#6c5ce7";
const lilac = "#a06cf5";
const coral = "#ff5a5f";
const green = "#22c55e";

const features: FeatureCard[] = [
  {
    icon: Columns3,
    title: "Agenda a colonne",
    text: "Ogni persona, cabina o attrezzatura è una colonna. Giorno, settimana, mese e agenda, con trascinamento e scorrimento fluidi.",
  },
  {
    icon: CalendarClock,
    title: "Disponibilità vere",
    text: "Orari settimanali, pause, ferie, festività e patrono. Preparazione e pulizia del servizio stanno sempre dentro l'apertura.",
  },
  {
    icon: UsersRound,
    title: "Risorse intercambiabili",
    text: "\"Una cabina qualsiasi\" o \"un'estetista del gruppo\": ZLOT sceglie da solo la risorsa libera, in ordine di preferenza.",
  },
  {
    icon: MessageCircle,
    title: "Orari liberi su WhatsApp",
    text: "Scegli gli slot, ZLOT scrive il messaggio e apre WhatsApp sul tuo telefono. Nessun sistema non ufficiale, nessun invio automatico.",
  },
  {
    icon: Link2,
    title: "Prenotazione dal link",
    text: "Il cliente apre il link, sceglie l'orario e la richiesta arriva in agenda: confermata subito o in attesa, come preferisci.",
  },
  {
    icon: BellRing,
    title: "Notifiche al team",
    text: "Nuove richieste, conferme e annullamenti arrivano come notifica al titolare e allo staff della risorsa interessata.",
  },
];

const steps = [
  {
    title: "Scegli gli orari",
    text: "Dal cliente o dal ＋ tocchi \"Invia disponibilità\": ZLOT propone solo gli slot davvero liberi per quel servizio.",
  },
  {
    title: "Mandali su WhatsApp",
    text: "Il messaggio è già scritto con i tuoi modelli. Lo invii tu, dal tuo numero, come sempre.",
  },
  {
    title: "Il cliente prenota",
    text: "Un link personale, valido per poche ore e usabile una volta sola. L'appuntamento compare in agenda e ti arriva la notifica.",
  },
];

const screenshots = [
  {
    title: "Il calendario",
    text: "Le colonne sono le risorse dell'attività. La parte già passata della giornata è ombreggiata, la linea rossa segna l'ora.",
    image: calendarioScreen,
    alt: "Vista giorno del calendario di ZLOT con due colonne",
  },
  {
    title: "Nuovo appuntamento",
    text: "Cliente, servizio e orario in tre tocchi: gli orari proposti tengono già conto di durata, preparazione e pulizia.",
    image: appuntamentoScreen,
    alt: "Pannello di creazione di un appuntamento",
  },
  {
    title: "Configurazione",
    text: "Risorse, gruppi, orari, ferie, servizi, modelli dei messaggi e regole del link, con una configurazione guidata.",
    image: configurazioneScreen,
    alt: "Schermata di configurazione dell'attività",
  },
  {
    title: "Abbonamento",
    text: "Piano attuale, risorse usate e giorni di prova rimasti. In tema chiaro e scuro, come tutta l'app.",
    image: abbonamentoScreen,
    alt: "Schermata Abbonamento in tema chiaro",
  },
];

const plans = [
  { name: "Solo", resources: "1 risorsa", text: "Per chi lavora da solo: barbiere, estetista, personal trainer." },
  { name: "Studio", resources: "Fino a 5 risorse", text: "Persone, cabine e attrezzature di un piccolo studio." },
  { name: "Centro", resources: "Senza limite", text: "Per centri con più persone, stanze e macchinari." },
];

const techPoints: FeatureCard[] = [
  {
    icon: DatabaseZap,
    title: "Niente doppie prenotazioni",
    text: "Il database Postgres rifiuta due appuntamenti sovrapposti sulla stessa risorsa con un vincolo di esclusione: vale anche se due persone prenotano nello stesso istante.",
  },
  {
    icon: LockKeyhole,
    title: "Ogni attività vede solo i suoi dati",
    text: "Row Level Security su ogni tabella, ruoli titolare e staff, operazioni critiche in funzioni del server. I limiti del piano li applica il database, non solo l'app.",
  },
  {
    icon: Workflow,
    title: "Link sicuri",
    text: "Il token del link sta solo nel frammento dell'indirizzo; sul server ne resta l'impronta SHA-256. Scadenza, uso singolo e limiti di frequenza contro gli abusi.",
  },
];

const stack = [
  "Flutter con Riverpod e go_router, tema chiaro e scuro con contrasto verificato dai test",
  "Supabase: Postgres con RLS, funzioni SQL, pg_cron e pg_net, server a Francoforte",
  "Edge Functions in Deno per disponibilità, notifiche e pagina di prenotazione",
  "Firebase Cloud Messaging per le notifiche, Firebase Hosting per la pagina del link",
  "Oltre 130 test sul database (pgTAP) e oltre 100 test dell'app",
];

const Zlot = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* Hero */}
      <section className="relative py-20 text-[#f2f0ff] md:py-28" style={{ backgroundColor: ink }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
          style={{ background: `radial-gradient(circle, ${lilac}, transparent 65%)` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${violet}, transparent 65%)` }}
        />

        <div className="container relative mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#c9c2ff] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={zlotIcon}
                  alt="Icona ZLOT"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-16px_rgba(108,92,231,0.9)]"
                />
                <div>
                  <p className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-[#c9c2ff]">
                    <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: green }} />
                    In test su Google Play
                  </p>
                  <p className="text-sm font-medium text-[#9a96b3]">Flutter, Supabase, Firebase</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-[1.05] md:text-7xl">
                L'agenda che
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(90deg, ${violet}, ${lilac})` }}
                >
                  si prenota da sola.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#c4c0dc]">
                ZLOT è l'agenda per barbieri, centri estetici, studi e piccole attività con più persone, cabine e attrezzature. Mandi gli orari liberi su WhatsApp, il cliente sceglie dal link e l'appuntamento è già in calendario.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#come-funziona"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                  style={{ backgroundImage: `linear-gradient(90deg, ${violet}, ${lilac})` }}
                >
                  Come funziona
                  <ArrowRight size={18} />
                </a>
                <a
                  href={privacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2a2840] px-5 py-3 text-sm font-bold text-[#c9c2ff] transition-colors hover:border-[#c9c2ff]"
                >
                  <ShieldCheck size={18} />
                  Privacy
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["3 tocchi", "per un appuntamento"],
                  ["0", "doppie prenotazioni"],
                  ["30 giorni", "di prova gratuita"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-[#2a2840] bg-[#191726] p-4">
                    <p className="font-mono text-2xl font-bold text-white">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#9a96b3]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[640px]">
              <div className="absolute left-0 top-16 hidden w-[40%] max-w-[250px] rotate-[-7deg] md:block lg:left-4">
                <PhoneShot image={configurazioneScreen} alt="Configurazione dell'attività" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[300px] rotate-[5deg] md:right-6">
                <PhoneShot image={appuntamentoScreen} alt="Nuovo appuntamento" />
              </div>
              <div className="absolute bottom-0 left-[16%] w-[54%] max-w-[300px] rotate-[-2deg] md:left-[28%]">
                <PhoneShot image={calendarioScreen} alt="Calendario a colonne" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section id="come-funziona" className="scroll-mt-20 py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest" style={{ color: violet }}>Come funziona</p>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">Dal messaggio all'agenda, senza telefonate.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundImage: `linear-gradient(135deg, ${violet}, ${lilac})` }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{step.text}</p>
                <div className="mt-6 flex flex-1 items-end">{[<SlotsMock key="s" />, <WhatsAppMock key="w" />, <BookedMock key="b" />][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funzionalità */}
      <section className="py-20" style={{ backgroundColor: "#f7f6fc" }}>
        <div className="container mx-auto px-6 text-[#17142b]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest" style={{ color: violet }}>Funzionalità</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Pensata per chi lavora con più risorse insieme.</h2>
            </div>
            <p className="text-sm leading-6 text-[#7c7891] lg:max-w-md lg:justify-self-end">
              Un trattamento viso può richiedere un'estetista e una cabina, un solarium solo la macchina. ZLOT ragiona così: ogni servizio dice di cosa ha bisogno, l'agenda trova chi è libero.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#e9e7f3] bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(108,92,231,0.55)]"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#efecff]" style={{ color: violet }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#7c7891]">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Schermate */}
      <section id="screens" className="py-20 text-[#f2f0ff]" style={{ backgroundColor: ink }}>
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-[#c9c2ff]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Pulita, veloce, leggibile anche tra un cliente e l'altro.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#9a96b3]">
              Schermate reali dell'app. Caratteri grandi, contrasti verificati e un pulsante Salva sempre a portata di pollice.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {screenshots.map((shot) => (
              <div key={shot.title} className="rounded-2xl border border-[#2a2840] bg-[#191726] p-5">
                <div className="mx-auto max-w-[230px]">
                  <PhoneShot image={shot.image} alt={shot.alt} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#9a96b3]">{shot.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Piani */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest" style={{ color: violet }}>Piani</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Paghi per le risorse che usi, non per gli appuntamenti.</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Ogni attività parte con 30 giorni di prova con tutto incluso, senza carta. Alla fine della prova i dati restano consultabili: niente viene cancellato. I prezzi sono in definizione con le attività del pilota.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 ${i === 1 ? "border-transparent text-white" : "border-border bg-card"}`}
                style={i === 1 ? { backgroundImage: `linear-gradient(150deg, ${violet}, ${lilac})` } : undefined}
              >
                <h3 className="font-heading text-2xl font-bold">{plan.name}</h3>
                <p className={`mt-1 font-mono text-sm font-semibold ${i === 1 ? "text-white/85" : ""}`} style={i === 1 ? undefined : { color: violet }}>
                  {plan.resources}
                </p>
                <p className={`mt-4 text-sm leading-6 ${i === 1 ? "text-white/85" : "text-muted-foreground"}`}>{plan.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architettura */}
      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest" style={{ color: violet }}>Architettura</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Le regole importanti le fa rispettare il database.</h2>
              <div className="mt-8 space-y-4">
                {techPoints.map((point) => {
                  const Icon = point.icon;
                  return (
                    <div key={point.title} className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-secondary" style={{ color: violet }}>
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

            <div className="h-fit rounded-2xl border border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <Sparkles size={24} style={{ color: violet }} />
                <h3 className="font-heading text-2xl font-bold">Stack</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                Costruita per milestone, con un criterio di completamento verificabile per ogni passo: test verdi o funzione provata sul database vero.
              </p>
              <div className="mt-6 space-y-3">
                {stack.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0" size={18} style={{ color: violet }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-xl border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                <CalendarRange className="mt-0.5 flex-shrink-0" size={18} style={{ color: coral }} />
                <span>Nessun invio automatico su WhatsApp: ogni messaggio parte dal telefono dell'attività, nel rispetto delle regole di WhatsApp.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-gradient-card p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest" style={{ color: violet }}>Privacy</p>
              <h2 className="font-heading text-2xl font-bold">Dati delle attività e dei loro clienti, trattati con cura.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                L'informativa spiega quali dati tratta ZLOT per gli account delle attività e per conto delle attività sui loro clienti, dove sono conservati (Unione Europea), la pagina di prenotazione, le notifiche e come chiedere l'eliminazione.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={privacyUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: violet }}
              >
                <ShieldCheck size={18} />
                Informativa
              </a>
              <a
                href={termsUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText size={18} />
                Termini di servizio
              </a>
              <a
                href={accountDeletionUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Trash2 size={18} />
                Elimina account
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PhoneShot = ({ image, alt }: { image: string; alt: string }) => (
  <div className="overflow-hidden rounded-[2rem] border-[7px] border-[#08070f] bg-[#08070f] shadow-[0_35px_80px_-45px_rgba(108,92,231,0.9)]">
    <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
  </div>
);

// Illustrazioni dei tre passaggi, in HTML: leggibili anche senza immagini.
const SlotsMock = () => (
  <div className="w-full rounded-xl border border-border bg-background/60 p-4">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Capelli · 30 min · lunedì</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {["09:00", "09:30", "11:00", "15:30", "16:00"].map((t, i) => (
        <span
          key={t}
          className={`rounded-full border px-3 py-1 font-mono text-xs font-semibold ${i === 1 || i === 3 ? "border-transparent text-white" : "border-border text-foreground/70"}`}
          style={i === 1 || i === 3 ? { backgroundColor: violet } : undefined}
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const WhatsAppMock = () => (
  <div className="w-full rounded-xl p-4" style={{ backgroundColor: "#e7f9ee" }}>
    <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-white p-3 text-sm leading-6 text-[#17142b] shadow-sm">
      Ciao Maria! Per Capelli ho libero lunedì alle 09:30 o alle 15:30. Scegli qui:
      <span className="block truncate font-medium" style={{ color: violet }}>zlot-916f3.web.app/p/#…</span>
      <span className="mt-1 block text-right text-[11px] text-[#7c7891]">10:42 ✓✓</span>
    </div>
  </div>
);

const BookedMock = () => (
  <div className="w-full space-y-3">
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">
      <img src={zlotIcon} alt="" className="h-9 w-9 rounded-lg" />
      <div className="min-w-0">
        <p className="text-sm font-semibold">Nuova richiesta dal link</p>
        <p className="truncate text-xs text-muted-foreground">Maria Rossi · Capelli · lun 15:30</p>
      </div>
    </div>
    <div className="border-l-4 bg-[#efecff] p-3 text-[#17142b]" style={{ borderColor: violet }}>
      <p className="font-mono text-xs font-semibold" style={{ color: violet }}>15:30 – 16:00</p>
      <p className="text-sm font-semibold">Maria Rossi · Capelli</p>
    </div>
  </div>
);

export default Zlot;
