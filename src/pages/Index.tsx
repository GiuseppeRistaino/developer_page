import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import vrexasCover from "@/assets/images/vrexas_story.jpg";
import C64Terminal from "@/components/C64Terminal";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/components/Layout";
import Reveal from "@/components/Reveal";
import SeaScene from "@/components/SeaScene";
import { loadBlogs, loadDocs, sortByDate, TRAVEL_TAG } from "@/lib/loadArticles";

const CV_URL = "/CV_Giuseppe_Ristaino.pdf";

const skills = [
  { category: "Linguaggi & Backend", items: ["Java", "Spring", "JUnit", "Python", "PHP", "C", "C#", "Matlab"] },
  { category: "E-Commerce", items: ["SAP Commerce Cloud", "Hybris", "Algolia", "Adyen", "CyberSource", "OMS"] },
  { category: "Frontend & Web", items: ["HTML5", "CSS", "JavaScript", "React", "XML", "JSON", "Bitrix"] },
  { category: "Database", items: ["SQL", "Oracle", "Oracle OAF"] },
  { category: "Tools & DevOps", items: ["Git", "Maven", "Gradle", "SAP Commerce"] },
];

const experiences = [
  {
    role: "Solution Building Engineer",
    company: "Sopra Steria Group S.p.A.",
    period: "Set. 2019 — Presente",
    description:
      "Sviluppo e manutenzione di piattaforme eCommerce enterprise per brand del lusso e retail, con un focus su SAP Commerce, integrazioni OMS e storefront.",
    highlights: [
      "Tod's: piattaforme eCommerce multi-brand su SAP Commerce con integrazione OMS e storefront (Java, Spring, Git, Hybris).",
      "Integrazione di Algolia per la ricerca prodotti e dei provider di pagamento Adyen e CyberSource.",
      "MediaMarkt: sviluppo e manutenzione di un sistema OMS su Oracle (Oracle Application Framework, Java, SQL).",
      "Moncler: manutenzione di un social network aziendale in PHP e Bitrix, con attività di frontend e contatto diretto con il cliente.",
    ],
  },
];

const brands = ["Tod's", "Roger Vivier", "Hogan", "Fay", "MediaMarkt", "Moncler"];

const education = [
  {
    degree: "Laurea Magistrale in Ingegneria Informatica",
    grade: "110 e Lode",
    school: "Università degli Studi del Sannio, Benevento",
    year: "2016 — 2019",
    thesis:
      "Tesi: un sistema per il riconoscimento e la predizione di emozioni mediante Machine Learning e Deep Learning.",
  },
  {
    degree: "Laurea Triennale in Ingegneria Informatica",
    school: "Università degli Studi del Sannio, Benevento",
    year: "2009 — 2015",
    thesis:
      "Tesi: evoluzione di un'applicazione mobile cross-platform per il supporto domotico ad utenti non udenti (IoT).",
  },
];

const languages = [
  { name: "Italiano", level: "Madrelingua" },
  { name: "Inglese", level: "B2" },
];

const softSkills = [
  {
    title: "Teamwork & Collaboration",
    description: "Lavoro efficace in team multidisciplinari, anche in contesti complessi o sotto pressione.",
  },
  {
    title: "Leadership & Team Management",
    description: "Gestione di gruppi di lavoro: assegnazione dei compiti, coordinamento e motivazione del team.",
  },
  {
    title: "Problem Solving & Adaptability",
    description: "Soluzioni efficaci in situazioni difficili, con rapido adattamento a cambiamenti e nuove sfide.",
  },
  {
    title: "Communication Skills",
    description: "Comunicazione chiara con colleghi e stakeholder, a garanzia di collaborazione e allineamento.",
  },
];

const SectionTitle = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <Reveal>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="soft-optical mt-4 font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
      {title}
    </h2>
  </Reveal>
);

const Index = () => {
  const blogs = sortByDate(loadBlogs());
  const travels = blogs.filter((blog) => blog.tags.includes(TRAVEL_TAG));
  const docs = loadDocs();
  const lessons = docs.reduce((total, category) => total + category.articles.length, 0);

  const routes = [
    {
      to: "/blog",
      title: "Blog",
      count: `${blogs.length} storie`,
      text: "Pirati, viaggi e l'idea (pessima) di diventare ricco con un bot.",
    },
    {
      to: "/portfolio",
      title: "Portfolio",
      count: "App & progetti",
      text: "Le applicazioni che costruisco di notte e i progetti su cui lavoro di giorno.",
    },
    {
      to: "/documentazione",
      title: "Documentazione",
      count: `${lessons} guide`,
      text: "Flutter, SAP BTP e SAP Commerce: gli appunti che avrei voluto trovare.",
    },
  ];

  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <SeaScene />

        <div className="container relative z-10 mx-auto px-6 pb-44 pt-28 md:pb-40">
          <div className="max-w-4xl">
            <p className="eyebrow animate-fade-up">Solution Building Software Engineer</p>

            <h1 className="soft-optical mt-6 font-display text-[clamp(3.2rem,10.5vw,8.5rem)] font-light leading-[0.95] tracking-tight">
              <span className="title-line">
                <span style={{ "--line-delay": "80ms" } as React.CSSProperties}>Giuseppe</span>
              </span>
              <span className="title-line">
                <span style={{ "--line-delay": "190ms" } as React.CSSProperties}>Ristaino</span>
              </span>
            </h1>

            <p
              className="animate-fade-up mt-5 font-display text-2xl font-light italic text-primary md:text-4xl"
              style={{ animationDelay: "450ms" }}
            >
              in arte Vrexas.
            </p>

            <p
              className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-foreground/80 md:text-lg"
              style={{ animationDelay: "560ms" }}
            >
              Di giorno costruisco piattaforme eCommerce per i brand del lusso. Di notte scrivo app, racconti e
              appunti di viaggio. Questo è il mio diario di bordo.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "680ms" }}
            >
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold"
              >
                <Mail size={16} />
                Contattami
              </a>
              <a
                href={CV_URL}
                download
                className="inline-flex items-center gap-2 rounded-full border border-foreground/25 bg-background/20 px-6 py-3 text-sm font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Download size={16} />
                Scarica il CV
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-foreground/25 bg-background/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-full border border-foreground/25 bg-background/20 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <Github size={17} />
              </a>
            </div>
          </div>
        </div>

        <a
          href="#origini"
          aria-label="Scorri verso il basso"
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-foreground/70 transition-colors hover:text-primary"
        >
          <ArrowDown size={20} className="scroll-cue" />
        </a>
      </section>

      {/* Origini */}
      <section id="origini" className="scroll-mt-16 py-24 md:py-36">
        <div className="container mx-auto grid gap-14 px-6 lg:grid-cols-[0.82fr_1fr] lg:gap-24">
          <Reveal>
            <figure className="relative mx-auto max-w-sm lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-border shadow-[0_40px_80px_-50px_hsl(var(--primary)/0.65)]">
                <img
                  src={profileImg}
                  alt="Giuseppe Ristaino seduto sul bordo di un canyon di roccia rossa"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
                Horseshoe Bend, Arizona — sì, ero davvero sul bordo.
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <SectionTitle eyebrow="Le origini" title="Tutto è iniziato con una voce elettronica." />

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
              <Reveal>
                <p>
                  La mia passione per l'informatica è iniziata quando avevo 12 anni. In casa arrivò un{" "}
                  <strong className="font-medium text-foreground">Commodore 64</strong> con un programma educativo
                  per bambini. Ricordo ancora quella voce elettronica che cercava di spiegarmi cosa fosse una palla.
                </p>
              </Reveal>
              <Reveal>
                <C64Terminal />
              </Reveal>
              <Reveal>
                <p>
                  Essendo del settore, ovviamente sono molto appassionato di videogiochi. È stata proprio la voglia
                  di crearne uno a spingermi a capire cosa ci fosse dietro e come potesse funzionare. È stato lì che
                  ho capito che l'informatica non era solo una passione, ma la strada che volevo percorrere. Il mio
                  gioco preferito? <em className="text-foreground">Monkey Island</em>. Non si discute.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Oggi sono un Software Engineer: dal 2019 sviluppo e mantengo piattaforme{" "}
                  <strong className="font-medium text-foreground">eCommerce enterprise</strong> per brand del lusso e
                  retail, specializzato in{" "}
                  <strong className="font-medium text-foreground">Java, Spring e SAP Commerce Cloud</strong>.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vrexas */}
      <section className="px-4 md:px-6">
        <Reveal>
          <Link
            to="/blog/vrexas_story"
            className="group relative mx-auto block max-w-[1400px] overflow-hidden rounded-3xl border border-border"
          >
            <div className="zoom-frame absolute inset-0">
              <img src={vrexasCover} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="candle-glow absolute inset-0" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10 md:bg-gradient-to-r md:from-background/95 md:via-background/65 md:to-transparent" />

            <div className="relative flex min-h-[34rem] max-w-2xl flex-col justify-end p-7 md:min-h-[42rem] md:p-16">
              <p className="eyebrow">Il racconto</p>
              <h2 className="soft-optical mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
                Chi era davvero Vrexas?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-foreground/85">
                Un avatar senza nome, un'osteria sotto la pioggia, un uomo senza dita e il tradimento che consegnò
                la Luna Nera, la nave più temuta di Nimenia, a un giocatore alle prime armi.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-medium text-primary">
                Leggi la storia, se ne hai il coraggio
                <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Viaggi */}
      <section className="overflow-hidden py-24 md:py-36">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle eyebrow="Diario di viaggio" title="Il mondo, una tappa alla volta." />
            <Reveal>
              <Link
                to={`/blog?tag=${TRAVEL_TAG}`}
                className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-primary"
              >
                Tutti i viaggi <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {travels.map((travel, i) => (
              <Reveal key={travel.id} delay={i * 90}>
                <Link
                  to={`/blog/${travel.slug}`}
                  className="lift group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-border"
                >
                  <div className="zoom-frame absolute inset-0">
                    <img
                      src={travel.coverImage}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                      {travel.readTime}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-normal leading-tight">{travel.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rotte del sito */}
      <section className="border-y border-border">
        <div className="container mx-auto grid px-0 md:grid-cols-3 md:divide-x md:divide-border">
          {routes.map((route, i) => (
            <Reveal key={route.to} delay={i * 90}>
              <Link
                to={route.to}
                className="spotlight group block h-full border-b border-border p-8 transition-colors last:border-b-0 md:border-b-0 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <p className="font-mono text-xs text-muted-foreground">{route.count}</p>
                  <ArrowUpRight
                    size={20}
                    className="text-muted-foreground transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary"
                  />
                </div>
                <h3 className="mt-14 font-display text-3xl font-light transition-colors group-hover:text-primary md:text-4xl">
                  {route.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{route.text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Competenze */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6">
          <SectionTitle eyebrow="La cassetta degli attrezzi" title="Competenze tecniche" />
        </div>

        <div className="marquee mt-12 border-y border-border py-5" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track">
              {["Java", "Spring", "SAP Commerce Cloud", "Hybris", "Flutter", "Firebase", "React", "Python", "Oracle", "Algolia"].map(
                (item) => (
                  <span
                    key={item}
                    className="soft-optical whitespace-nowrap px-7 font-display text-3xl font-light italic text-foreground/70 md:text-5xl"
                  >
                    {item}
                    <span className="ml-14 text-lg not-italic text-primary/70">✦</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>

        <div className="container mx-auto mt-14 px-6">
          <div className="divide-y divide-border border-b border-border">
            {skills.map((group, i) => (
              <Reveal key={group.category} delay={i * 50}>
                <div className="grid gap-4 py-6 md:grid-cols-[17rem_1fr] md:items-baseline">
                  <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-primary">{group.category}</h3>
                  <p className="text-lg leading-relaxed text-foreground/85">{group.items.join("  ·  ")}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Esperienza e formazione */}
      <section className="bg-card/40 py-24 md:py-36">
        <div className="container mx-auto grid gap-20 px-6 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionTitle eyebrow="La rotta" title="Esperienza" />
            {experiences.map((exp) => (
              <Reveal key={exp.company} className="mt-10">
                <p className="font-mono text-xs text-primary">{exp.period}</p>
                <h3 className="mt-3 font-display text-2xl font-normal">{exp.role}</h3>
                <p className="mt-1 text-muted-foreground">{exp.company}</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{exp.description}</p>
                <ul className="mt-5 space-y-3">
                  {exp.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <Reveal className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Brand & clienti</p>
              <p className="soft-optical mt-3 font-display text-2xl font-light leading-snug md:text-3xl">
                {brands.join(" · ")}
              </p>
            </Reveal>
          </div>

          <div>
            <SectionTitle eyebrow="Il porto di partenza" title="Formazione" />
            <div className="mt-10 space-y-10 border-l border-border pl-6">
              {education.map((edu) => (
                <Reveal key={edu.degree} className="relative">
                  <span className="absolute -left-[1.72rem] top-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                  <p className="font-mono text-xs text-primary">{edu.year}</p>
                  <h3 className="mt-3 font-display text-2xl font-normal leading-snug">{edu.degree}</h3>
                  {edu.grade && <p className="mt-1 font-medium text-primary">{edu.grade}</p>}
                  <p className="mt-1 text-muted-foreground">{edu.school}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{edu.thesis}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">Lingue</p>
              <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
                {languages.map((lang) => (
                  <p key={lang.name} className="font-display text-xl">
                    {lang.name} <span className="ml-1 font-body text-sm text-primary">{lang.level}</span>
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capacità relazionali */}
      <section className="py-24 md:py-36">
        <div className="container mx-auto px-6">
          <SectionTitle eyebrow="A bordo con gli altri" title="Capacità relazionali" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((skill, i) => (
              <Reveal key={skill.title} delay={i * 80}>
                <div className="spotlight lift h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-xl font-normal leading-snug">{skill.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{skill.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
