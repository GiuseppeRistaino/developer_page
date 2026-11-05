import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Music2, Pause, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";
import "./TheJourney.css";

import patrickHand from "../../PORTFOLIO/TheJourney/PatrickHand-Regular.ttf";
import introTheme from "../../PORTFOLIO/TheJourney/intro_theme.ogg";
import skyImg from "../../PORTFOLIO/TheJourney/hero/sky.webp";
import cloudsImg from "../../PORTFOLIO/TheJourney/hero/clouds.webp";
import rooftopsImg from "../../PORTFOLIO/TheJourney/hero/rooftops.webp";
import houseImg from "../../PORTFOLIO/TheJourney/hero/house.webp";
import windowImg from "../../PORTFOLIO/TheJourney/hero/window.webp";
import titleImg from "../../PORTFOLIO/TheJourney/hero/title_name.webp";
import subtitleImg from "../../PORTFOLIO/TheJourney/hero/title_subtitle_it.webp";
import chapterImg from "../../PORTFOLIO/TheJourney/hero/title_chapter_it.webp";
import menuImg from "../../PORTFOLIO/TheJourney/hero/menu.webp";

import jackRoomImg from "../../PORTFOLIO/TheJourney/rooms/jack_room.webp";
import hallwayImg from "../../PORTFOLIO/TheJourney/rooms/hallway.webp";
import arianneRoomImg from "../../PORTFOLIO/TheJourney/rooms/arianne_room.webp";
import parentsRoomImg from "../../PORTFOLIO/TheJourney/rooms/parents_room.webp";
import bathroomImg from "../../PORTFOLIO/TheJourney/rooms/bathroom.webp";
import atticImg from "../../PORTFOLIO/TheJourney/rooms/attic.webp";
import entranceImg from "../../PORTFOLIO/TheJourney/rooms/entrance.webp";
import kitchenImg from "../../PORTFOLIO/TheJourney/rooms/kitchen.webp";
import livingRoomImg from "../../PORTFOLIO/TheJourney/rooms/living_room.webp";
import closetImg from "../../PORTFOLIO/TheJourney/rooms/closet.webp";
import laundryImg from "../../PORTFOLIO/TheJourney/rooms/laundry.webp";
import cellarImg from "../../PORTFOLIO/TheJourney/rooms/cellar.webp";
import garageImg from "../../PORTFOLIO/TheJourney/rooms/garage.webp";
import yardImg from "../../PORTFOLIO/TheJourney/rooms/yard.webp";
import yardDemoImg from "../../PORTFOLIO/TheJourney/rooms/yard_demo.webp";

import jackWalk from "../../PORTFOLIO/TheJourney/sprites/jack_walk.webp";
import jackIdle from "../../PORTFOLIO/TheJourney/sprites/jack_idle.webp";
import jackShrug from "../../PORTFOLIO/TheJourney/sprites/jack_shrug.webp";
import jackSurprised from "../../PORTFOLIO/TheJourney/sprites/jack_surprised.webp";
import arianneIdle from "../../PORTFOLIO/TheJourney/sprites/arianne_idle.webp";
import arianneSarcastic from "../../PORTFOLIO/TheJourney/sprites/arianne_sarcastic.webp";
import arianneshPhone from "../../PORTFOLIO/TheJourney/sprites/arianne_phone.webp";
import leoIdle from "../../PORTFOLIO/TheJourney/sprites/leo_idle.webp";
import leoLook from "../../PORTFOLIO/TheJourney/sprites/leo_look.webp";
import squirrelGrip from "../../PORTFOLIO/TheJourney/sprites/squirrel_grip.webp";
import mirrorDress from "../../PORTFOLIO/TheJourney/sprites/mirror_dress.webp";
import clothFall from "../../PORTFOLIO/TheJourney/sprites/cloth_fall.webp";

import wheelImg from "../../PORTFOLIO/TheJourney/ui/wheel.webp";
import caseImg from "../../PORTFOLIO/TheJourney/ui/case.webp";
import revealImg from "../../PORTFOLIO/TheJourney/ui/reveal.webp";

import letterIcon from "../../PORTFOLIO/TheJourney/items/letter.webp";
import phoneIcon from "../../PORTFOLIO/TheJourney/items/phone.webp";
import whistleIcon from "../../PORTFOLIO/TheJourney/items/whistle.webp";
import potionIcon from "../../PORTFOLIO/TheJourney/items/potion.webp";
import scissorsIcon from "../../PORTFOLIO/TheJourney/items/scissors.webp";
import pyjamasIcon from "../../PORTFOLIO/TheJourney/items/pyjamas.webp";
import mapIcon from "../../PORTFOLIO/TheJourney/items/map.webp";
import glueIcon from "../../PORTFOLIO/TheJourney/items/glue.webp";
import ticketsIcon from "../../PORTFOLIO/TheJourney/items/final_tickets.webp";
import feathersIcon from "../../PORTFOLIO/TheJourney/items/feathers.webp";
import redStoneIcon from "../../PORTFOLIO/TheJourney/items/red_stone.webp";
import toothbrushIcon from "../../PORTFOLIO/TheJourney/items/clean_toothbrush.webp";

import dialogShot from "../../PORTFOLIO/TheJourney/shots/dialog.webp";
import chatShot from "../../PORTFOLIO/TheJourney/shots/chat.webp";
import mapShot from "../../PORTFOLIO/TheJourney/shots/map.webp";
import hoodShot from "../../PORTFOLIO/TheJourney/shots/hood.webp";
import mirrorShot from "../../PORTFOLIO/TheJourney/shots/mirror.webp";
import leoSitShot from "../../PORTFOLIO/TheJourney/shots/leo_sit.webp";

/* ------------------------------------------------------------------------------------------------
 * Dati
 * ---------------------------------------------------------------------------------------------- */

type Verb = "look" | "talk" | "use";
type Speaker = "jack" | "arianne";

interface Line {
  who: Speaker;
  text: string;
}

interface Hotspot {
  id: string;
  name: string;
  // Centro e dimensioni della zona toccabile, in percentuale del fondale
  x: number;
  y: number;
  w: number;
  h: number;
  lines: Record<Verb, Line[]>;
}

const jack = (text: string): Line => ({ who: "jack", text });
const arianne = (text: string): Line => ({ who: "arianne", text });
const knock = jack("Se mi senti batti un colpo.");

// Battute vere del gioco (texts.csv), con poche aggiunte dove la demo non ha l'azione completa
const hotspots: Hotspot[] = [
  {
    id: "door",
    name: "Porta di casa",
    x: 15.2, y: 41, w: 6, h: 26,
    lines: {
      look: [jack("Casa. Dentro c'è ancora tutto da fare.")],
      talk: [knock],
      use: [jack("Rientro dopo. Prima voglio capire perché Arianne non muove un dito.")],
    },
  },
  {
    id: "tree",
    name: "Buco nell'albero",
    x: 48.2, y: 45, w: 4.5, h: 12,
    lines: {
      look: [jack("Un buco nell'albero. È buio... non riesco a vedere cosa c'è dentro.")],
      talk: [knock, jack("...Ho sentito un colpo? Ho sentito un colpo.")],
      use: [jack("Infilare la mano in un buco buio? Neanche per sogno.")],
    },
  },
  {
    id: "kennel",
    name: "Cuccia di Leo",
    x: 51, y: 56.5, w: 6.5, h: 10,
    lines: {
      look: [jack("La cuccia di Leo. Ufficialmente una casetta. In realtà un deposito di refurtiva.")],
      talk: [knock],
      use: [jack("Calzini di Arianne, il telecomando, mezzo panino..."), jack("Il resto lo lascio a lui. Ognuno ha i suoi tesori.")],
    },
  },
  {
    id: "car",
    name: "Cofano della macchina",
    x: 64.5, y: 54, w: 14, h: 18,
    lines: {
      look: [jack("La macchina di famiglia. Arianne dice che non parte. Arianne dice tante cose.")],
      talk: [knock],
      use: [
        jack("Vediamo perché non parte... cofano aperto. Fili staccati ovunque!"),
        arianne("Io ci sono stata appoggiata tutto il tempo. Non ho visto niente."),
      ],
    },
  },
  {
    id: "leo",
    name: "Leo",
    x: 40.6, y: 68, w: 8, h: 23,
    lines: {
      look: [jack("Il cane del nonno. Ha l'aria di chi sa qualcosa che io non so.")],
      talk: [jack("Leo, bello, vieni qui..."), jack("Lo prendo come un no.")],
      use: [jack("Leo non si fa prendere. Leo si fa inseguire.")],
    },
  },
  {
    id: "arianne",
    name: "Arianne",
    x: 73, y: 52, w: 8, h: 36,
    lines: {
      look: [jack("Mia sorella. Pronta da quaranta minuti, dice lei.")],
      talk: [arianne("Oh, guarda chi si vede. Il Signore dei Calzini Spaiati.")],
      use: [arianne("Prova a toccarmi e lo dico alla mamma.")],
    },
  },
];

const verbs: { id: Verb; label: string; x: number; y: number; labelX: number; labelY: number }[] = [
  { id: "talk", label: "Parla", x: 49.7, y: 18.8, labelX: 50, labelY: 44.5 },
  { id: "look", label: "Osserva", x: 24.2, y: 74.2, labelX: 23.7, labelY: 92.4 },
  { id: "use", label: "Prendi/Usa", x: 76.6, y: 74.2, labelX: 76, labelY: 92.4 },
];

const rooms = [
  { name: "Camera di Jack", text: "Il punto di partenza: una valigia vuota e una lista che nessuno trova.", image: jackRoomImg },
  { name: "Corridoio", text: "Due ritratti di famiglia e una scala per la soffitta che non c'è. Per ora.", image: hallwayImg },
  { name: "Camera di Arianne", text: "Ingresso vietato. Poster di lana compreso.", image: arianneRoomImg },
  { name: "Camera dei genitori", text: "Uno specchio che vuole vedere le smorfie giuste.", image: parentsRoomImg },
  { name: "Bagno", text: "Uno spazzolino masticato da riportare a uno stato civile.", image: bathroomImg },
  { name: "Soffitta", text: "Il baule dei ricordi del nonno e una finestra perfetta per volare via.", image: atticImg },
  { name: "Ingresso", text: "Lo snodo del piano terra, con un ombrello che ha visto giorni migliori.", image: entranceImg },
  { name: "Cucina", text: "La lista della mamma sul frigo e una torta bruciata nel forno.", image: kitchenImg },
  { name: "Soggiorno", text: "Foto di famiglia piene di indizi, se le guardi bene.", image: livingRoomImg },
  { name: "Ripostiglio", text: "Scope e cianfrusaglie: niente è mai lungo abbastanza.", image: closetImg },
  { name: "Lavanderia", text: "Dove un poster di lana diventa formato biglietto.", image: laundryImg },
  { name: "Cantina", text: "Il tavolo di Draghi & Dadi, con le statuette degli amici in posa.", image: cellarImg },
  { name: "Garage", text: "La mappa del papà per rimettere in moto la macchina.", image: garageImg },
  { name: "Cortile", text: "Arianne, una macchina che non parte e un albero che fa scambi.", image: yardImg },
];

const items = [
  { name: "Lettera del nonno", text: "Che bella calligrafia che ha il nonno. Non lo sapevo...", icon: letterIcon },
  { name: "Telefono", text: "La chat con Theo, Kiko, Milo e Bruno. Bruno non risponde mai.", icon: phoneIcon },
  { name: "Fischietto del nonno", text: "Il fischietto del nonno. Pulito e pronto all'uso.", icon: whistleIcon },
  { name: "Pozione «Mai una gioia»", text: "«Mai una gioia». Il nonno ha un senso dell'umorismo tutto suo.", icon: potionIcon },
  { name: "Forbici", text: "Tagliano tutto. Soprattutto le cose che non dovrei tagliare.", icon: scissorsIcon },
  { name: "Pigiama di Jack", text: "Il mio pigiama con i draghi. Ha visto il mondo dall'alto.", icon: pyjamasIcon },
  { name: "Mappa del papà", text: "Quattro colori, quattro X. Ma dov'è il tesoro?", icon: mapIcon },
  { name: "Colla", text: "Colla extraforte. \"Non usare sulle dita.\" Troppo tardi, di solito.", icon: glueIcon },
  { name: "Biglietti con ologramma", text: "Indistinguibili da quelli veri. Se li guardi da lontano. Al buio.", icon: ticketsIcon },
  { name: "Piume", text: "Una manciata di piume. Starnutisco solo a guardarle.", icon: feathersIcon },
  { name: "Pietra rossa", text: "Liscia, pesante e calda, come se qualcuno l'avesse appena tenuta in mano.", icon: redStoneIcon },
  { name: "Spazzolino pulito", text: "Pulito. Quasi profumato.", icon: toothbrushIcon },
];

const interfaces = [
  { title: "Risposte", text: "Le scelte di dialogo su una cartella di tela con cinghie e borchie.", image: dialogShot },
  { title: "Chat del telefono", text: "Jack apre le conversazioni con frasi buffe; gli amici scrivono con i puntini animati.", image: chatShot },
  { title: "La mappa del papà", text: "Uno schema a matita su carta macchiata di caffè: l'indizio per i fili del motore.", image: mapShot },
  { title: "Sotto il cofano", text: "Il minigioco dei fili: si collega ogni attacco al suo morsetto trascinando.", image: hoodShot },
];

const stats = [
  { value: 15, suffix: "", label: "stanze dipinte" },
  { value: 34, suffix: "", label: "oggetti illustrati" },
  { value: 20, suffix: "", label: "enigmi nell'episodio 1" },
  { value: 2, suffix: "", label: "lingue, IT e EN" },
];

const pipeline = [
  { title: "Motore", text: "Godot 4.7 con GDScript, renderer GL Compatibility per i telefoni Android." },
  { title: "Avventura", text: "Popochiu per stanze, personaggi, inventario e dialoghi, esteso con ruota dei verbi, valigia e salvataggi." },
  { title: "Grafica", text: "Fondali e personaggi generati e ritoccati su una bibbia visiva fissa: stessa linea, stessa palette, stessa scala." },
  { title: "Animazione", text: "Fotogramma per fotogramma: camminata, sorpresa, fischietto, smorfie allo specchio e lo scambio nella tana." },
  { title: "Musica e voci", text: "Tema dell'intro composto nota per nota, prove musicali in locale e voci di Jack con toni diversi per ogni battuta." },
  { title: "Qualità", text: "18 prove di integrazione che giocano le catene di enigmi con clic veri e salvano le schermate." },
];

/* ------------------------------------------------------------------------------------------------
 * Componenti di supporto
 * ---------------------------------------------------------------------------------------------- */

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
};

// Animazione a fotogrammi da una striscia orizzontale (frames fotogrammi, fps al secondo)
const Sprite = ({
  src,
  frames,
  fps,
  ratio,
  className = "",
  flip = false,
  label,
}: {
  src: string;
  frames: number;
  fps: number;
  ratio: number;
  className?: string;
  flip?: boolean;
  label?: string;
}) => (
  <div
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
    className={`tj-sprite ${className}`}
    style={
      {
        backgroundImage: `url(${src})`,
        backgroundSize: `${frames * 100}% 100%`,
        aspectRatio: `${ratio}`,
        "--tj-steps": frames,
        "--tj-duration": `${frames / fps}s`,
        transform: flip ? "scaleX(-1)" : undefined,
      } as CSSProperties
    }
  />
);

// Testo che compare lettera per lettera, come nei fumetti del gioco
const Typewriter = ({ text, speed = 26 }: { text: string; speed?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return (
    <>
      <span>{text.slice(0, count)}</span>
      <span className="tj-ghost" aria-hidden="true">{text.slice(count)}</span>
    </>
  );
};

// Numero che sale quando entra nello schermo
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return <span ref={ref}>{shown}</span>;
};

// Inclinazione 3D seguendo il puntatore
const tilt = (event: ReactPointerEvent<HTMLElement>) => {
  const el = event.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (event.clientX - r.left) / r.width - 0.5;
  const y = (event.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
  el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
};
const untilt = (event: ReactPointerEvent<HTMLElement>) => {
  const el = event.currentTarget;
  el.style.setProperty("--rx", "0deg");
  el.style.setProperty("--ry", "0deg");
};

/* ------------------------------------------------------------------------------------------------
 * Discesa dell'intro, guidata dallo scroll
 * ---------------------------------------------------------------------------------------------- */

const captions = [
  { from: 0.2, to: 0.42, eyebrow: "Il mondo", text: "Un paese da libro illustrato, vagamente europeo, con città storte e tetti sbilenchi." },
  { from: 0.46, to: 0.68, eyebrow: "La casa", text: "Casa Hollow: quindici stanze piene di gag, oggetti utili e cani che non si fanno prendere." },
  { from: 0.72, to: 0.88, eyebrow: "La camera", text: "Dietro questa finestra, Jack deve solo fare la valigia. Cosa ci vorrà mai, dieci minuti?" },
];

const DescentHero = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="tj-descent" aria-label="Introduzione: la discesa dal cielo alla camera di Jack">
      <div className="tj-descent-stage">
        <img src={skyImg} alt="" className="tj-layer tj-sky" />
        <img src={cloudsImg} alt="" className="tj-layer tj-clouds tj-clouds-back" />
        <img src={rooftopsImg} alt="" className="tj-layer tj-rooftops" />
        <img src={houseImg} alt="" className="tj-layer tj-house" />
        <img src={windowImg} alt="" className="tj-layer tj-window" />
        <img src={jackRoomImg} alt="La camera di Jack" className="tj-layer tj-room" />
        <div className="tj-room-jack">
          <Sprite src={jackIdle} frames={6} fps={6} ratio={320 / 440} label="Jack" />
        </div>
        <img src={cloudsImg} alt="" className="tj-layer tj-clouds tj-clouds-front" />
        <div className="tj-vignette" />

        <Link to="/portfolio" className="tj-back">
          <ArrowLeft size={16} />
          Portfolio
        </Link>

        <div className="tj-title">
          <img src={titleImg} alt="Jack Hollow" className="tj-title-name" />
          <img src={subtitleImg} alt="Il viaggio" className="tj-title-sub" />
          <img src={chapterImg} alt="Capitolo 1 – Il libro" className="tj-title-chapter" />
          <p className="tj-title-tagline">
            Un'avventura grafica punta-e-clicca comica per Android, a episodi. Fatta a mano, una stanza alla volta.
          </p>
        </div>

        {captions.map((c) => (
          <div
            key={c.eyebrow}
            className="tj-caption"
            style={{ "--a": c.from, "--b": c.to } as CSSProperties}
          >
            <p className="tj-caption-eyebrow">{c.eyebrow}</p>
            <p>{c.text}</p>
          </div>
        ))}

        <div className="tj-final-bubble tj-bubble">Bene. Oggi si parte per andare dal nonno.</div>

        <div className="tj-scroll-hint" aria-hidden="true">
          <span>Scorri per scendere</span>
          <span className="tj-scroll-mouse" />
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Demo della ruota dei verbi
 * ---------------------------------------------------------------------------------------------- */

const VerbWheelDemo = () => {
  const [target, setTarget] = useState<Hotspot | null>(null);
  const [wheelPos, setWheelPos] = useState({ x: 50, y: 50 });
  const [script, setScript] = useState<Line[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [revealing, setRevealing] = useState(false);
  const [jackMood, setJackMood] = useState<"idle" | "shrug" | "surprised">("idle");
  const sceneRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  // Su telefono il cortile scorre di lato: si parte inquadrando Jack e Leo
  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) * 0.3;
    }
  }, []);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const openWheel = (spot: Hotspot) => {
    clearTimers();
    setScript([]);
    setTarget(spot);
    // La ruota si apre sopra l'oggetto, senza uscire dalla scena
    setWheelPos({ x: Math.min(82, Math.max(18, spot.x)), y: Math.min(62, Math.max(30, spot.y - 6)) });
  };

  const choose = (verb: Verb) => {
    if (!target) return;
    const lines = target.lines[verb];
    setTarget(null);
    setScript(lines);
    setLineIndex(0);
    setJackMood(verb === "use" && target.id === "leo" ? "shrug" : verb === "look" && target.id === "tree" ? "surprised" : "idle");
    let delay = 0;
    lines.forEach((line, i) => {
      if (i === 0) return;
      delay += 900 + lines[i - 1].text.length * 32;
      timers.current.push(window.setTimeout(() => setLineIndex(i), delay));
    });
    delay += 2600 + lines[lines.length - 1].text.length * 32;
    timers.current.push(
      window.setTimeout(() => {
        setScript([]);
        setJackMood("idle");
      }, delay)
    );
  };

  const reveal = () => {
    setRevealing(true);
    timers.current.push(window.setTimeout(() => setRevealing(false), 2200));
  };

  const line = script[lineIndex];

  // Se il cortile scorre (telefono), porta in vista chi parla
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!line || !viewport || viewport.scrollWidth <= viewport.clientWidth) return;
    const x = line.who === "jack" ? 0.258 : 0.69;
    viewport.scrollTo({ left: x * viewport.scrollWidth - viewport.clientWidth / 2, behavior: "smooth" });
  }, [line]);

  const jackSprite =
    jackMood === "shrug"
      ? { src: jackShrug, frames: 5, fps: 8 }
      : jackMood === "surprised"
        ? { src: jackSurprised, frames: 4, fps: 6 }
        : { src: jackIdle, frames: 6, fps: 6 };

  return (
    <div className="tj-demo">
      <div ref={viewportRef} className="tj-demo-viewport">
      <div
        ref={sceneRef}
        className="tj-demo-scene"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setTarget(null);
          }
        }}
      >
        <img src={yardDemoImg} alt="Il cortile di casa Hollow" className="tj-demo-bg" draggable={false} />

        <div className="tj-demo-char" style={{ left: "25.8%", top: "81.5%", height: "40%" }}>
          <Sprite key={jackMood} src={jackSprite.src} frames={jackSprite.frames} fps={jackSprite.fps} ratio={320 / 440} label="Jack" />
          {line?.who === "jack" && (
            <div className="tj-bubble tj-demo-bubble" key={`${lineIndex}-${line.text}`}>
              <Typewriter text={line.text} />
            </div>
          )}
        </div>
        <div className="tj-demo-char" style={{ left: "40.6%", top: "79.6%", height: "25.5%" }}>
          <Sprite src={leoLook} frames={4} fps={2.5} ratio={320 / 280} label="Leo" flip />
        </div>
        <div className="tj-demo-char" style={{ left: "73%", top: "70%", height: "38%" }}>
          <Sprite
            src={line?.who === "arianne" ? arianneSarcastic : arianneIdle}
            frames={line?.who === "arianne" ? 4 : 1}
            fps={6}
            ratio={320 / 440}
            label="Arianne"
            flip
          />
          {line?.who === "arianne" && (
            <div className="tj-bubble tj-demo-bubble tj-demo-bubble-left" key={`${lineIndex}-${line.text}`}>
              <Typewriter text={line.text} />
            </div>
          )}
        </div>

        {hotspots.map((spot) => (
          <button
            key={spot.id}
            type="button"
            className={`tj-hotspot ${revealing ? "is-revealed" : ""}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.w}%`, height: `${spot.h}%` }}
            onClick={() => openWheel(spot)}
            aria-label={spot.name}
          >
            <span className="tj-hotspot-ring" />
          </button>
        ))}

        {target && (
          <div className="tj-wheel" style={{ left: `${wheelPos.x}%`, top: `${wheelPos.y}%` }} role="menu" aria-label={`Azioni su ${target.name}`}>
            <p className="tj-wheel-name">{target.name}</p>
            <div className="tj-wheel-art">
              <img src={wheelImg} alt="" draggable={false} />
              {verbs.map((verb, i) => (
                <button
                  key={verb.id}
                  type="button"
                  role="menuitem"
                  className="tj-wheel-verb"
                  style={{ left: `${verb.x}%`, top: `${verb.y}%`, "--i": i } as CSSProperties}
                  onClick={() => choose(verb.id)}
                  aria-label={verb.label}
                />
              ))}
              {verbs.map((verb) => (
                <span key={verb.id} className="tj-wheel-label" style={{ left: `${verb.labelX}%`, top: `${verb.labelY}%` }}>
                  {verb.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <button type="button" className="tj-reveal-btn" onClick={reveal} aria-label="Mostra i punti interattivi">
          <img src={revealImg} alt="" />
        </button>
      </div>
      </div>
      <p className="tj-demo-hint">
        Tocca un oggetto o un personaggio per aprire la ruota: <strong>Osserva</strong>, <strong>Parla</strong> o <strong>Prendi/Usa</strong>. La lente in basso mostra i punti interattivi.
        <span className="tj-demo-hint-mobile"> Il cortile scorre di lato.</span>
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Galleria delle stanze
 * ---------------------------------------------------------------------------------------------- */

const RoomGallery = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const scrollBy = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="tj-gallery">
      <div
        ref={trackRef}
        className="tj-gallery-track"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
          e.currentTarget.classList.add("is-dragging");
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          e.currentTarget.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("is-dragging");
        }}
        onPointerLeave={(e) => {
          drag.current = null;
          e.currentTarget.classList.remove("is-dragging");
        }}
      >
        {rooms.map((room, i) => (
          <figure key={room.name} className="tj-room-card" onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="tj-room-frame">
              <img src={room.image} alt={room.name} loading="lazy" draggable={false} />
              <span className="tj-room-number">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption>
              <h3>{room.name}</h3>
              <p>{room.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="tj-gallery-nav">
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Stanze precedenti">
          <ChevronLeft size={22} />
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Stanze successive">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Valigia (inventario)
 * ---------------------------------------------------------------------------------------------- */

const Suitcase = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const item = selected === null ? null : items[selected];

  return (
    <div ref={ref} className={`tj-case ${open ? "is-open" : ""}`}>
      <div className="tj-case-body">
      <img src={caseImg} alt="La valigia dell'inventario" className="tj-case-art" draggable={false} />
      <div className="tj-case-grid">
        {items.map((it, i) => (
          <button
            key={it.name}
            type="button"
            className={`tj-case-pocket ${selected === i ? "is-selected" : ""}`}
            style={{ "--i": i } as CSSProperties}
            onClick={() => setSelected(i)}
            aria-label={it.name}
            aria-pressed={selected === i}
          >
            <img src={it.icon} alt="" draggable={false} />
          </button>
        ))}
      </div>
      <div className="tj-case-plate">
        {item ? <strong key={item.name}>{item.name}</strong> : <span className="tj-case-placeholder">Tocca un oggetto</span>}
      </div>
      </div>
      <div className="tj-bubble tj-case-text" aria-live="polite">
        {item ? <Typewriter key={item.name} text={item.text} speed={18} /> : "Ogni oggetto ha la sua battuta. Anche quelli inutili."}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Pagina
 * ---------------------------------------------------------------------------------------------- */

const MusicButton = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const audio = new Audio(introTheme);
    audio.preload = "none";
    audio.volume = 0.55;
    audio.addEventListener("ended", () => setPlaying(false));
    audioRef.current = audio;
    setSupported(audio.canPlayType("audio/ogg; codecs=vorbis") !== "");
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, [playing]);

  if (!supported) return null;
  return (
    <button type="button" className={`tj-music ${playing ? "is-playing" : ""}`} onClick={toggle} aria-pressed={playing}>
      {playing ? <Pause size={18} /> : <Music2 size={18} />}
      <span>{playing ? "In pausa il tema" : "Ascolta il tema dell'intro"}</span>
      <span className="tj-music-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
};

const SectionTitle = ({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) => (
  <Reveal className="tj-section-title">
    <p className="tj-eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    {children && <p className="tj-lead">{children}</p>}
  </Reveal>
);

const TheJourney = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`tj-page ${reduced ? "tj-reduced" : ""}`}>
      <style>{`@font-face { font-family: "Patrick Hand"; src: url(${patrickHand}) format("truetype"); font-display: swap; }`}</style>

      <DescentHero />

      {/* Concept */}
      <section className="tj-section tj-concept">
        <div className="tj-container tj-concept-grid">
          <Reveal>
            <p className="tj-eyebrow">Il gioco</p>
            <h2 className="tj-h2">Portare un libro al nonno. Che problema c'è?</h2>
            <p className="tj-lead">
              <em>Jack Hollow – Il viaggio</em> è un'avventura grafica comica a episodi per telefoni Android. Jack e sua sorella
              Arianne attraversano un mondo inventato per portare al nonno il libro che ha dimenticato in soffitta. Ogni episodio è una
              tappa del viaggio: il primo, <em>Il libro</em>, si svolge tutto dentro casa Hollow.
            </p>
            <ul className="tj-pillars">
              <li><span>🎲</span> L'umorismo sta ovunque: ogni "osserva" è una battuta, anche sugli oggetti inutili.</li>
              <li><span>🧩</span> Enigmi assurdi ma giusti: la soluzione fa ridere e, a posteriori, sembra logica.</li>
              <li><span>👆</span> Si gioca con un dito solo, in orizzontale, con la ruota dei verbi.</li>
              <li><span>🌍</span> Mai crudele, mai volgare: pensato per tutte le età e per molte lingue.</li>
            </ul>
          </Reveal>
          <Reveal delay={120} className="tj-concept-art">
            <div className="tj-polaroid tj-polaroid-a" onPointerMove={tilt} onPointerLeave={untilt}>
              <img src={menuImg} alt="Il menu iniziale illustrato" loading="lazy" />
            </div>
            <div className="tj-polaroid tj-polaroid-b" onPointerMove={tilt} onPointerLeave={untilt}>
              <img src={leoSitShot} alt="Leo seduto in cortile dopo il fischio" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Personaggi */}
      <section className="tj-section tj-cast">
        <div className="tj-container">
          <SectionTitle eyebrow="I personaggi" title="Una famiglia, un cane, nessun piano." />
          <div className="tj-cast-grid">
            <Reveal className="tj-cast-card" delay={0}>
              <div className="tj-cast-stage">
                <Sprite src={jackIdle} frames={6} fps={6} ratio={320 / 440} className="tj-cast-sprite" label="Jack" />
              </div>
              <h3>Jack</h3>
              <p className="tj-cast-role">Il comico involontario</p>
              <p>Ingenuo, pieno di buona volontà, ragiona storto ma con una sua logica. Giocatore di <em>Draghi &amp; Dadi</em> fino al midollo.</p>
            </Reveal>
            <Reveal className="tj-cast-card" delay={120}>
              <div className="tj-cast-stage">
                <Sprite src={arianneshPhone} frames={5} fps={3} ratio={320 / 440} className="tj-cast-sprite" label="Arianne" />
              </div>
              <h3>Arianne</h3>
              <p className="tj-cast-role">La voce sarcastica</p>
              <p>Appoggiata alla macchina dal primo minuto. Non muove un dito, commenta tutto e dà gli aiuti a modo suo.</p>
            </Reveal>
            <Reveal className="tj-cast-card" delay={240}>
              <div className="tj-cast-stage tj-cast-stage-dog">
                <Sprite src={leoLook} frames={4} fps={2.5} ratio={320 / 280} className="tj-cast-sprite" label="Leo" />
              </div>
              <h3>Leo</h3>
              <p className="tj-cast-role">La gag ricorrente</p>
              <p>Il cane del nonno. Ha una pietra al collare, una statuetta in bocca e nessuna intenzione di farsi prendere.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="tj-section tj-play">
        <div className="tj-container">
          <SectionTitle eyebrow="Prova la ruota" title="Osserva, Parla, Prendi.">
            Il cuore dell'interfaccia: un tocco su un oggetto apre tre azioni. Qui sotto c'è il cortile vero del gioco, con le battute vere.
          </SectionTitle>
          <Reveal>
            <VerbWheelDemo />
          </Reveal>
        </div>
      </section>

      {/* Stanze */}
      <section className="tj-section tj-rooms">
        <div className="tj-walker" aria-hidden="true">
          <Sprite src={jackWalk} frames={8} fps={12} ratio={320 / 440} className="tj-walker-sprite" />
        </div>
        <div className="tj-container">
          <SectionTitle eyebrow="Episodio 1 – La casa" title="Quindici stanze da frugare. Una è segreta.">
            Ogni fondale è dipinto con la stessa linea scura e la stessa palette fredda con accenti caldi. Trascina per girare per casa.
          </SectionTitle>
        </div>
        <RoomGallery />
      </section>

      {/* Inventario */}
      <section className="tj-section tj-inventory">
        <div className="tj-container tj-inventory-grid">
          <div>
            <SectionTitle eyebrow="La valigia" title="L'inventario è una valigia di cuoio.">
              Dodici tasche per pagina, oggetti dipinti a mano e una targhetta che li descrive. Gli oggetti si trascinano sulla scena,
              sui personaggi o su altri oggetti per combinarli.
            </SectionTitle>
          </div>
          <Reveal delay={100}>
            <Suitcase />
          </Reveal>
        </div>
      </section>

      {/* Animazioni */}
      <section className="tj-section tj-frames">
        <div className="tj-container">
          <SectionTitle eyebrow="Fotogramma per fotogramma" title="Le gag si muovono.">
            Le scene chiave sono animate a mano, un fotogramma alla volta.
          </SectionTitle>
          <div className="tj-frames-grid">
            <Reveal className="tj-frame-card">
              <div className="tj-frame-stage tj-frame-stage-paw">
                <Sprite src={squirrelGrip} frames={6} fps={5} ratio={1} className="tj-frame-sprite" />
                <Sprite src={clothFall} frames={6} fps={5} ratio={256 / 256} className="tj-frame-sprite tj-frame-cloth" />
              </div>
              <h3>Lo scambio nella tana</h3>
              <p>Una zampa enorme esce dall'albero, afferra un pigiama e ne lascia cadere un altro.</p>
            </Reveal>
            <Reveal className="tj-frame-card" delay={120}>
              <div className="tj-frame-stage">
                <Sprite src={mirrorDress} frames={4} fps={2.5} ratio={300 / 300} className="tj-frame-sprite tj-frame-dress" />
              </div>
              <h3>Ali e aureola</h3>
              <p>Davanti allo specchio Jack si traveste e prova le smorfie che gli amici gli hanno insegnato in chat.</p>
            </Reveal>
            <Reveal className="tj-frame-card" delay={240}>
              <div className="tj-frame-stage">
                <img src={mirrorShot} alt="Il pannello delle smorfie davanti allo specchio" loading="lazy" className="tj-frame-shot" />
              </div>
              <h3>Sette smorfie</h3>
              <p>Bocca da pesce, guance gonfie, naso da maialino: la sequenza giusta si scopre solo parlando con gli amici.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interfacce */}
      <section className="tj-section tj-ui">
        <div className="tj-container">
          <SectionTitle eyebrow="Interfacce" title="Cuoio, ottone e tela indaco.">
            Ogni pannello riprende i materiali della valigia, così il gioco sembra un unico oggetto da viaggio.
          </SectionTitle>
          <div className="tj-ui-grid">
            {interfaces.map((ui, i) => (
              <Reveal key={ui.title} delay={(i % 2) * 120}>
                <figure className="tj-ui-card" onPointerMove={tilt} onPointerLeave={untilt}>
                  <img src={ui.image} alt={ui.title} loading="lazy" />
                  <figcaption>
                    <h3>{ui.title}</h3>
                    <p>{ui.text}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numeri e tecnica */}
      <section className="tj-section tj-tech">
        <div className="tj-container">
          <div className="tj-stats">
            {stats.map((s) => (
              <Reveal key={s.label} className="tj-stat">
                <p className="tj-stat-value">
                  <Counter value={s.value} />
                  {s.suffix}
                </p>
                <p className="tj-stat-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <SectionTitle eyebrow="Dietro le quinte" title="Come è fatto." />
          <div className="tj-pipeline">
            {pipeline.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) * 100} className="tj-pipeline-card">
                <span className="tj-pipeline-index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
          <div className="tj-stack">
            {["Godot 4.7", "GDScript", "Popochiu", "Android", "GL Compatibility", "IT / EN", "Prove di integrazione"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Chiusura */}
      <section className="tj-outro">
        <img src={houseImg} alt="" className="tj-outro-bg" loading="lazy" />
        <div className="tj-outro-content">
          <Reveal>
            <img src={titleImg} alt="Jack Hollow" className="tj-outro-title" />
            <p className="tj-outro-text">
              L'episodio 1 è in sviluppo per Android. Il viaggio verso il nonno è appena cominciato: ogni tappa sarà un nuovo episodio.
            </p>
            <div className="tj-outro-actions">
              <span className="tj-badge">
                <Smartphone size={16} />
                In sviluppo · Android
              </span>
              <Link to="/portfolio" className="tj-outro-link">
                <ArrowLeft size={16} />
                Torna al portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <MusicButton />
    </div>
  );
};

export default TheJourney;
