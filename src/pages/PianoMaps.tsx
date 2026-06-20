import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Camera,
  CheckCircle2,
  Database,
  Heart,
  LockKeyhole,
  Map as MapIcon,
  MapPin,
  Music2,
  Navigation,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import pianoMapsIcon from "../../PORTFOLIO/PianoMaps/icon_pianomaps.png";
import loginScreen from "../../PORTFOLIO/PianoMaps/screen_login.png";
import homeScreen from "../../PORTFOLIO/PianoMaps/screen_home.png";
import mapScreen from "../../PORTFOLIO/PianoMaps/screen_map.png";
import detailScreen from "../../PORTFOLIO/PianoMaps/screen_detail.png";
import profileScreen from "../../PORTFOLIO/PianoMaps/screen_profile.png";

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
    text: "Login ed registrazione con email e password, identità visiva «Ivory & Amethyst» e logo dedicato.",
    image: loginScreen,
    alt: "Schermata di login di PianoMap",
  },
  {
    title: "Esplora",
    text: "Lista dei pianoforti approvati con foto, luogo, distanza e valutazione media a stelle. Tab «Tutti» e «Vicino a te».",
    image: homeScreen,
    alt: "Homepage di PianoMap con la lista dei pianoforti",
  },
  {
    title: "Mappa",
    text: "Marker dei pianoforti su mappa OpenStreetMap, ricerca e card di dettaglio al tocco del marker.",
    image: mapScreen,
    alt: "Mappa interattiva di PianoMap",
  },
  {
    title: "Dettaglio",
    text: "Foto, rating, recensioni della community, pulsante «Apri in Google Maps» e form per scrivere la propria recensione.",
    image: detailScreen,
    alt: "Pagina di dettaglio e recensioni di PianoMap",
  },
  {
    title: "Profilo",
    text: "I pianoforti inseriti dall'utente, le statistiche e i preferiti salvati con il cuore.",
    image: profileScreen,
    alt: "Pagina profilo di PianoMap",
  },
];

const features: FeatureCard[] = [
  {
    icon: MapIcon,
    title: "Mappa interattiva",
    text: "Tutti i pianoforti pubblici su una mappa OpenStreetMap, con marker tappabili e ricerca per luogo — senza dipendere da una API key a pagamento.",
  },
  {
    icon: Navigation,
    title: "Vicino a te",
    text: "La geolocalizzazione mostra i pianoforti entro 10 km dalla posizione dell'utente, ordinati per distanza crescente.",
  },
  {
    icon: Camera,
    title: "Segnala un pianoforte",
    text: "Scatta una foto, indica il luogo e una descrizione: la posizione GPS viene acquisita in automatico e la segnalazione entra in coda di approvazione.",
  },
  {
    icon: Star,
    title: "Recensioni & rating",
    text: "Ogni pianoforte ha una valutazione media a stelle calcolata dalle recensioni della community. Una recensione per utente, modificabile in qualsiasi momento.",
  },
  {
    icon: Heart,
    title: "Preferiti",
    text: "Salva i pianoforti che vuoi visitare o hai già provato con un tocco sul cuore; restano sincronizzati nel tuo profilo.",
  },
  {
    icon: ShieldCheck,
    title: "Moderazione",
    text: "Gli inserimenti vengono approvati da un amministratore prima di diventare pubblici, con notifica push istantanea a ogni nuova segnalazione.",
  },
];

const pipeline = [
  "L'utente scatta una foto del pianoforte",
  "L'app acquisisce automaticamente la posizione GPS",
  "La segnalazione viene salvata in attesa di approvazione",
  "L'amministratore riceve una notifica e la approva",
  "Il pianoforte appare nella lista e sulla mappa",
];

const techPoints: TechPoint[] = [
  {
    icon: Database,
    title: "Backend Firebase",
    text: "Autenticazione email/password, Cloud Firestore per pianoforti, recensioni e preferiti, Firebase Storage per le immagini e Cloud Functions per le notifiche.",
  },
  {
    icon: LockKeyhole,
    title: "Security Rules",
    text: "Regole Firestore e Storage che riservano l'approvazione agli amministratori e consentono a ogni utente di gestire solo la propria recensione e i propri preferiti.",
  },
  {
    icon: Bell,
    title: "Notifiche server-side",
    text: "L'invio FCM è gestito da una Cloud Function: nessuna credenziale sensibile risiede nell'app, eliminando i rischi di estrazione dal binario.",
  },
];

const dataModel = [
  "Pianoforti: autore, foto, luogo, coordinate, stato di approvazione e geohash per le query geografiche",
  "Recensioni: sotto-collezione con voto 1-5 e testo; i contatori del rating sono aggiornati in transazione",
  "Preferiti: collezione per-utente con i pianoforti salvati",
];

const pianoMapsPrivacyUrl = `${import.meta.env.BASE_URL}pianomaps/privacy.html`;
const pianoMapsTermsUrl = `${import.meta.env.BASE_URL}pianomaps/terms.html`;

const PianoMaps = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* ── Hero ── */}
      <section className="bg-[#f4f0ff] py-20 text-[#1a1a1a] md:py-28">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#5300cd] transition-colors hover:text-[#6200ee]"
          >
            <ArrowLeft size={16} />
            Torna al Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up">
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={pianoMapsIcon}
                  alt="Icona PianoMap"
                  className="h-16 w-16 rounded-2xl shadow-[0_18px_40px_-24px_rgba(72,0,178,0.8)]"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#6200ee]">
                    Mobile app · in sviluppo
                  </p>
                  <p className="text-sm font-medium text-[#5b5170]">Flutter, Firebase, OpenStreetMap</p>
                </div>
              </div>

              <h1 className="font-heading text-5xl font-bold leading-tight text-[#2e0a6b] md:text-7xl">
                PianoMap
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4b4060]">
                Scopri e segnala i pianoforti pubblici della tua città. Mappa interattiva, geolocalizzazione, recensioni della community e preferiti — il tutto con un design pulito ispirato a una sala da concerto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#screens"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6200ee] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_35px_-22px_rgba(98,0,238,0.9)] transition-transform hover:scale-[1.02]"
                >
                  <Smartphone size={18} />
                  Vedi schermate
                </a>
                <a
                  href={pianoMapsPrivacyUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#cbbff0] bg-white px-5 py-3 text-sm font-bold text-[#5300cd] transition-colors hover:border-[#6200ee] hover:text-[#6200ee]"
                >
                  <ShieldCheck size={18} />
                  Privacy Play Store
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  ["10 km", "ricerca vicino a te"],
                  ["★ 1-5", "rating community"],
                  ["Realtime", "Cloud Firestore"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-[#e3d9ff] bg-white/70 p-4">
                    <p className="font-heading text-2xl font-bold text-[#2e0a6b]">{value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6b5b8a]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup cluster */}
            <div className="relative min-h-[560px] animate-fade-in lg:min-h-[620px]">
              <div className="absolute left-0 top-12 hidden w-[36%] rotate-[-8deg] md:block lg:left-6">
                <PhoneShot image={loginScreen} alt="Login PianoMap" />
              </div>
              <div className="absolute right-0 top-0 w-[54%] max-w-[330px] rotate-[5deg] md:right-8 lg:right-14">
                <PhoneShot image={homeScreen} alt="Lista pianoforti PianoMap" />
              </div>
              <div className="absolute bottom-0 left-[18%] w-[56%] max-w-[350px] rotate-[-3deg] md:left-[30%]">
                <PhoneShot image={mapScreen} alt="Mappa PianoMap" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Funzionalità</p>
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Dalla strada alla mappa: ogni pianoforte pubblico a portata di mano.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-lg border border-border bg-card p-6 transition-all hover:border-violet-400/40"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
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

      {/* ── How it works ── */}
      <section className="bg-gradient-card py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Come funziona</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Una segnalazione affidabile, validata prima di diventare pubblica.
              </h2>
              <p className="mt-5 leading-7 text-muted-foreground">
                Chiunque può contribuire alla mappa, ma ogni nuovo pianoforte passa da una coda di approvazione: così la community resta affidabile e le posizioni accurate. L'amministratore riceve una notifica push a ogni segnalazione.
              </p>
            </div>

            <div className="space-y-3">
              {pipeline.map((step, index) => (
                <div key={step} className="flex gap-4 rounded-lg border border-border bg-background/60 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#6200ee] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Screens ── */}
      <section id="screens" className="bg-[#faf7ff] py-20 text-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#6200ee]">Esperienza mobile</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Design system «Ivory & Amethyst»: minimalismo e accenti viola.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#5b5170]">
              Sfondo chiaro come carta, viola Amethyst per le azioni, card morbide con ombre ambient e tipografia Inter su tutta l'app.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {screenshots.map((shot) => (
              <div
                key={shot.title}
                className="rounded-lg border border-[#e7ddff] bg-white p-5 shadow-[0_24px_70px_-45px_rgba(72,0,178,0.35)]"
              >
                <div className="mx-auto max-w-[235px]">
                  <PhoneShot image={shot.image} alt={shot.alt} />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#2e0a6b]">{shot.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b5170]">{shot.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architecture ── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Architettura</p>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Community-driven, con un backend cloud sicuro.
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
                <Music2 className="text-primary" size={24} />
                <h3 className="font-heading text-2xl font-bold">Modello dati</h3>
              </div>
              <p className="leading-7 text-muted-foreground">
                La struttura separa il pianoforte dalle recensioni e dai preferiti, così rating e contenuti della community possono essere calcolati, moderati e interrogati geograficamente in tempo reale.
              </p>
              <div className="mt-6 space-y-3">
                {dataModel.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 text-violet-400" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-lg border border-violet-400/20 bg-violet-500/10 p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-1 flex-shrink-0 text-violet-400" size={20} />
                  <p className="text-sm leading-6 text-violet-50/90">
                    Le query «Vicino a te» usano GeoFlutterFire+ con un geohash salvato su ogni pianoforte, per filtrare i risultati entro un raggio di 10 km direttamente da Firestore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community highlight ── */}
      <section className="bg-[#f4f0ff] py-16 text-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: MapPin, title: "Scopri", text: "Trova i pianoforti pubblici intorno a te e aprili in Google Maps per raggiungerli." },
              { icon: Users, title: "Contribuisci", text: "Aggiungi nuovi pianoforti con foto e posizione, arricchendo la mappa per tutti." },
              { icon: Star, title: "Valuta", text: "Lascia recensioni e stelle per aiutare gli altri a scegliere dove suonare." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg border border-[#e3d9ff] bg-white/70 p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#6200ee]/10 text-[#6200ee]">
                  <Icon size={22} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#2e0a6b]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5b5170]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Legal / CTA ── */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-gradient-card p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary">Documenti legali</p>
              <h2 className="font-heading text-2xl font-bold">Informativa Privacy e Termini pronti per il Play Store.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Includono titolare, dati trattati (account, posizione, foto, contenuti della community), servizi Firebase utilizzati, conservazione, cancellazione dell'account e contatti.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={pianoMapsPrivacyUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <ShieldCheck size={18} />
                Informativa Privacy
              </a>
              <a
                href={pianoMapsTermsUrl}
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

interface PhoneShotProps {
  image: string;
  alt: string;
}

const PhoneShot = ({ image, alt }: PhoneShotProps) => (
  <div className="overflow-hidden rounded-[2rem] border-[7px] border-white bg-white shadow-[0_35px_80px_-50px_rgba(46,10,107,0.7)]">
    <img src={image} alt={alt} className="h-full w-full object-cover" />
  </div>
);

export default PianoMaps;
