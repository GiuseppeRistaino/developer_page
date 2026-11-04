import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Cloud,
  FileText,
  LockKeyhole,
  Map as MapIcon,
  MapPinned,
  MessagesSquare,
  Plane,
  ReceiptEuro,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import roamieIcon from "../../PORTFOLIO/Roamie/icon_roamie.png";
import homeScreen from "../../PORTFOLIO/Roamie/screen_home.png";
import itinerarioScreen from "../../PORTFOLIO/Roamie/screen_itinerario.png";
import iaScreen from "../../PORTFOLIO/Roamie/screen_ia.png";
import speseScreen from "../../PORTFOLIO/Roamie/screen_spese.png";
import chatScreen from "../../PORTFOLIO/Roamie/screen_chat.png";
import mappaScreen from "../../PORTFOLIO/Roamie/screen_mappa.png";

interface FeatureCard {
  icon: LucideIcon;
  title: string;
  text: string;
}

const privacyUrl = `${import.meta.env.BASE_URL}roamie/privacy.html`;
const accountDeletionUrl = `${import.meta.env.BASE_URL}roamie/account-deletion.html`;

const screenshots = [
  {
    title: "I miei viaggi",
    text: "Ogni viaggio è una carta d'imbarco: rotta, date, compagni e un tabellone delle partenze che conta i giorni al decollo.",
    image: homeScreen,
    alt: "Home di Roamie con i viaggi come carte d'imbarco",
  },
  {
    title: "Itinerario e mappa",
    text: "Linea del tempo del giorno, tappe da riordinare trascinandole e mappa con pin numerati e percorso tratteggiato.",
    image: itinerarioScreen,
    alt: "Itinerario giornaliero con la mappa delle tappe",
  },
  {
    title: "Suggerimenti IA",
    text: "Gemini propone un itinerario completo per la destinazione o riempie i buchi tra le tappe già inserite.",
    image: iaScreen,
    alt: "Tappe suggerite dall'intelligenza artificiale",
  },
  {
    title: "Spese e bilanci",
    text: "Scontrini del gruppo, quote divise tra i partecipanti e il minimo di passaggi per pareggiare i conti.",
    image: speseScreen,
    alt: "Spese del viaggio e bilanci del gruppo",
  },
  {
    title: "Chat del viaggio",
    text: "Una conversazione per ogni viaggio, con notifiche push inviate dal server a tutti i compagni.",
    image: chatScreen,
    alt: "Chat di gruppo del viaggio",
  },
  {
    title: "Scegli sulla mappa",
    text: "Tocca un locale o un'attrazione di Google Maps e diventa una tappa, con nome e indirizzo già compilati.",
    image: mappaScreen,
    alt: "Scelta di un luogo dalla mappa",
  },
];

const features: FeatureCard[] = [
  {
    icon: Plane,
    title: "Viaggi condivisi",
    text: "Destinazione reale riconosciuta dal geocoder, date, copertina e compagni invitati via email che vedono tutto in tempo reale.",
  },
  {
    icon: MapPinned,
    title: "Itinerario giorno per giorno",
    text: "Tappe con orari e note, riordinabili trascinandole: orari, numerazione e percorso sulla mappa si aggiornano da soli.",
  },
  {
    icon: ReceiptEuro,
    title: "Spese di gruppo",
    text: "Chi ha pagato, per chi, in quote eguali; bilanci con barre divergenti e saldi suggeriti biglietto per biglietto.",
  },
  {
    icon: MessagesSquare,
    title: "Chat e notifiche",
    text: "Chat per ogni viaggio e promemoria locali prima della partenza e di ogni tappa, per tutti i membri del gruppo.",
  },
  {
    icon: BrainCircuit,
    title: "Itinerari con l'IA",
    text: "Per i Premium: programma completo o tappe vicine a quelle esistenti, sempre nella città del viaggio e con il ritorno alla base.",
  },
  {
    icon: MapIcon,
    title: "Luoghi dalla mappa",
    text: "Per i Premium: locali e attrazioni toccabili sulla mappa, con anteprima economica e dettagli chiesti solo alla conferma.",
  },
];

const pipeline = [
  "La destinazione viene riconosciuta come luogo reale (coordinate e città)",
  "La Cloud Function verifica Premium e quota mensile di 30 richieste",
  "Gemini genera le tappe con uno schema JSON rigido",
  "Il server scarta tappe fuori città, orari incoerenti e giorni oltre il viaggio",
  "L'utente sceglie cosa aggiungere: le tappe arrivano con le coordinate per la mappa",
];

const techPoints: FeatureCard[] = [
  {
    icon: Cloud,
    title: "Firebase in tempo reale",
    text: "Firestore sincronizza viaggi, tappe, spese e chat tra i membri; le Cloud Functions inviano le notifiche e puliscono i dati dei viaggi eliminati.",
  },
  {
    icon: LockKeyhole,
    title: "Acquisti verificati dal server",
    text: "Premium e Rimuovi pubblicità si attivano solo dopo la verifica con le API di Google Play; le regole Firestore impediscono al client di scriverli.",
  },
  {
    icon: Sparkles,
    title: "Costi sotto controllo",
    text: "Mappa e geocoder gratuiti per tutti, Places solo per i Premium con limiti mensili, quote giornaliere sull'API e chiave limitata all'app.",
  },
];

const stack = [
  "Flutter con il design system \"Boarding Pass\" e animazioni a tema viaggio",
  "Firebase Auth, Firestore, Storage, Cloud Functions (Node 22) e FCM",
  "Google Maps SDK, Places SDK e geocoder del dispositivo",
  "Gemini API con risposte strutturate e validazione lato server",
  "Google Play Billing 9 con abbonamento e acquisto una tantum",
  "AdMob con consenso UMP per il piano gratuito",
];

const Roamie = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="bg-[#14161a] py-20 text-[#f3f1ec] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#ffd27a] transition-colors hover:text-[#fe6a34]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={roamieIcon}
                  alt="Icona Roamie"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]"
                />
                <div>
                  <p className="flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-widest text-[#ffd27a]">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#fe6a34]" />
                    In test su Google Play
                  </p>
                  <p className="text-sm font-medium text-[#8e9099]">Flutter, Firebase, Google Maps, Gemini AI</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">Roamie</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#c4c6cf]">
                L'app per i viaggi di gruppo: itinerario giorno per giorno sulla mappa, spese divise senza discussioni e una chat per ogni viaggio. Con Premium, l'IA suggerisce le tappe e i luoghi si scelgono direttamente sulla mappa.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#fe6a34] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(254,106,52,0.9)] transition-transform hover:scale-[1.02]"
                >
                  Vedi schermate
                </a>
                <a
                  href={privacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#43474e] px-5 py-3 text-sm font-bold text-[#ffd27a] transition-colors hover:border-[#ffd27a]"
                >
                  <ShieldCheck size={18} />
                  Privacy
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["4 in 1", "itinerario, mappa, spese, chat"],
                  ["30", "richieste IA al mese"],
                  ["0 €", "mappa per tutti"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#2b2f36] bg-[#1c1f24] p-4">
                    <p className="font-mono text-2xl font-bold text-[#ffd27a]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#8e9099]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[620px]">
              <div className="absolute left-0 top-12 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneShot image={speseScreen} alt="Spese di gruppo" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneShot image={homeScreen} alt="I miei viaggi" />
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneShot image={itinerarioScreen} alt="Itinerario e mappa" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalità</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">Tutto il viaggio, in un'unica carta d'imbarco.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-border bg-card p-6 transition-all hover:border-[#fe6a34]/40">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#fe6a34]/10 text-[#fe6a34]">
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
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Pipeline IA</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Un itinerario che ha senso, non una lista a caso.</h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                L'IA lavora sulla città reale del viaggio e rispetta le tappe già inserite: le nuove proposte stanno vicino a quelle prima e dopo, e le gite fuori porta riportano sempre alla base.
              </p>
            </div>

            <div className="space-y-3">
              {pipeline.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-background/60 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#fe6a34] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="bg-[#f3f1ec] py-20 text-[#1a365d]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-[#c2410c]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Un design da terminal d'aeroporto.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#43474e]">
              Tabellone delle partenze con le palette che girano, carte d'imbarco perforate e timbri del passaporto: ogni schermata parla di viaggio.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((shot) => (
              <div key={shot.title} className="rounded-lg border border-[#d9d5cc] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(26,54,93,0.35)]">
                <div className="mx-auto max-w-[235px]">
                  <PhoneShot image={shot.image} alt={shot.alt} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#1a365d]">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#43474e]">{shot.text}</p>
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
              <h2 className="font-heading text-3xl font-bold md:text-4xl">Il gruppo sempre allineato, i costi sempre contenuti.</h2>
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
                <Users className="text-primary" size={24} />
                <h3 className="font-heading text-2xl font-bold">Stack</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                Nata come gestore di viaggi, Roamie è stata ridisegnata con un'identità "Boarding Pass" e arricchita da mappa, IA e notifiche lato server.
              </p>
              <div className="mt-6 space-y-3">
                {stack.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-[#fe6a34]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-lg border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                <BellRing className="mt-0.5 flex-shrink-0 text-primary" size={18} />
                <span>Promemoria riprogrammati a ogni avvio, così li ricevono tutti i membri e non si perdono cambiando telefono.</span>
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
              <h2 className="font-heading text-2xl font-bold">I tuoi dati, sotto il tuo controllo.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                L'informativa descrive account, viaggi condivisi, mappe e luoghi di Google, funzioni IA con Gemini, notifiche, abbonamenti Google Play, pubblicità AdMob e l'eliminazione dell'account.
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
                to="/portfolio/roamie/terms"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText size={18} />
                Termini di utilizzo
              </Link>
              <a
                href={accountDeletionUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
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
  <div className="overflow-hidden rounded-[2rem] border-[7px] border-[#0b0c0e] bg-[#0b0c0e] shadow-[0_35px_80px_-50px_rgba(0,0,0,0.8)]">
    <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
  </div>
);

export default Roamie;
