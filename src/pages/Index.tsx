import { Code2, GraduationCap, Briefcase, Mail, Linkedin, Github, Download, Languages, Users, Building2 } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const EMAIL = "giuseppe.ristaino@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/giuseppe-ristaino/";
const GITHUB_URL = "https://github.com/GiuseppeRistaino";
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
    degree: "Laurea Magistrale in Ingegneria Informatica — 110 e Lode",
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

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Photo */}
            <div className="relative flex-shrink-0 animate-fade-in">
              <div className="h-56 w-56 md:h-72 md:w-72 rounded-2xl overflow-hidden border-2 border-primary/30 shadow-gold">
                <img
                  src={profileImg}
                  alt="Giuseppe Ristaino"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 h-56 w-56 md:h-72 md:w-72 rounded-2xl border border-primary/10 -z-10" />
            </div>

            {/* Intro */}
            <div className="flex-1 text-center md:text-left animate-fade-up">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
                Solution Building Software Engineer
              </p>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ciao, sono{" "}
                <span className="text-gradient-gold">Giuseppe Ristaino</span>
              </h1>

              <div className="text-lg text-muted-foreground max-w-2xl mb-8 space-y-6 leading-loose">
                <p>
                  Software Engineer con <strong>6 anni di esperienza</strong> nello sviluppo
                  e nella manutenzione di piattaforme <strong>eCommerce enterprise</strong> per
                  brand del lusso e retail, specializzato in <strong>Java, Spring e SAP Commerce Cloud</strong>.
                </p>

                <p>
                  In arte <strong>Vrexas</strong>.
                  Se siete interessati al mio nome d'arte troverete su questo sito la storia sconvolente della sua nascita...
                </p>

                <p>
                  La mia passione per l'informatica è iniziata quando avevo 12 anni.
                  In casa arrivò un <strong>Commodore 64</strong> con un programma educativo
                  per bambini. Ricordo ancora quella voce elettronica che cercava di spiegarmi
                  cosa fosse una palla.
                </p>

                <p>
                  Ovviamente essendo del settore sono molto appassionato di videogiochi.
                  Proprio dalla voglia di crearne uno mi ha spinto a capirci di più su cosa ci fosse dietro,
                  come potesse funzionare.
                  È stato lì che ho capito che l'informatica non era solo una passione,
                  ma la strada che volevo percorrere.
                  Il mio gioco preferito? Monkey Island. Non si discute.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Mail size={16} />
                  Contattami
                </a>

                <a
                  href={CV_URL}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                >
                  <Download size={16} />
                  Scarica il CV
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Code2 className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-bold">Competenze Tecniche</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-gold"
              >
                <h3 className="font-heading text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <Briefcase className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-bold">Esperienza Lavorativa</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
                  <span className="text-xs font-medium text-primary">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-3">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Brands */}
          <div className="mt-10 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-primary" size={20} />
              <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider">
                Brand & Clienti
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-md bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <GraduationCap className="text-primary" size={24} />
            <h2 className="font-heading text-2xl font-bold">Formazione</h2>
          </div>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                  <h3 className="font-heading text-lg font-semibold">{edu.degree}</h3>
                  <span className="text-xs font-medium text-primary">{edu.year}</span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{edu.thesis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages & Soft Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Languages className="text-primary" size={24} />
                <h2 className="font-heading text-2xl font-bold">Lingue</h2>
              </div>
              <div className="space-y-4">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-primary font-medium">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-primary" size={24} />
                <h2 className="font-heading text-2xl font-bold">Capacità Relazionali</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill) => (
                  <div
                    key={skill.title}
                    className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30"
                  >
                    <h3 className="font-heading text-sm font-semibold text-primary mb-2">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
