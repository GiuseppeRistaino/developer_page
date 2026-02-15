import { Code2, GraduationCap, Briefcase, Mail, Linkedin, Github } from "lucide-react";
import profileImg from "@/assets/profile-placeholder.jpg";

const skills = [
  { category: "Backend", items: ["Java", "Spring Boot", "Spring MVC", "REST API", "Microservizi"] },
  { category: "E-Commerce", items: ["SAP Commerce Cloud", "Hybris", "WCMS", "Impex", "Solr"] },
  { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "JavaScript"] },
  { category: "DevOps & Tools", items: ["Git", "Docker", "Jenkins", "Maven", "Gradle"] },
  { category: "Database", items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB"] },
];

const experiences = [
  {
    role: "Software Developer",
    company: "La Tua Azienda",
    period: "2022 — Presente",
    description: "Sviluppo e manutenzione di piattaforme e-commerce su SAP Commerce Cloud. Integrazione di servizi backend con Spring Boot.",
  },
  {
    role: "Junior Developer",
    company: "Azienda Precedente",
    period: "2020 — 2022",
    description: "Sviluppo di applicazioni web full-stack, contributo a progetti Spring e integrazioni API REST.",
  },
];

const education = [
  {
    degree: "Laurea in Informatica",
    school: "Università degli Studi",
    year: "2020",
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
                  alt="Foto profilo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 h-56 w-56 md:h-72 md:w-72 rounded-2xl border border-primary/10 -z-10" />
            </div>

            {/* Intro */}
            <div className="flex-1 text-center md:text-left animate-fade-up">
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-2">
                Software Developer
              </p>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ciao, sono{" "}
                <span className="text-gradient-gold">Giuseppe Ristaino</span>
              </h1>

              <div className="text-lg text-muted-foreground max-w-2xl mb-8 space-y-6 leading-loose">
                <p>
                  In arte <strong>Vrexas</strong>. 
                  Se siete interessati al mio nome d'arte troverete su questo sito la storia sconvolente della sua nascita...
                </p>

                <p>
                  La mia passione per l’informatica è iniziata quando avevo 12 anni.
                  In casa arrivò un <strong>Commodore 64</strong> con un programma educativo
                  per bambini. Ricordo ancora quella voce elettronica che cercava di spiegarmi
                  cosa fosse una palla. 
                </p>

                <p>
                  Ovviamente essendo del settore sono molto appassionato di videogiochi.
                  Proprio dalla voglia di crearne uno mi ha spinto a capirci di più su cosa ci fosse dietro, 
                  come potesse funzionare.
                  È stato lì che ho capito che l’informatica non era solo una passione,
                  ma la strada che volevo percorrere.
                  Il mio gioco preferito? Monkey Island. Non si discute.
                </p>

                <p>
                  Oggi lavoro come consulente IT, con una specializzazione in
                  <strong> SAP Commerce Cloud</strong>.
                  Cerco sempre di costruire soluzioni che funzionano davvero,
                  mi piace non restare mai fermo e sono dell'idea che se si ha un sogno lo si può sempre realizzare.
                </p>
              </div>

              <div className="flex items-center gap-4 justify-center md:justify-start">
                <a
                  href="mailto:email@example.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                >
                  <Mail size={16} />
                  Contattami
                </a>

                <a
                  href="#"
                  className="inline-flex items-center justify-center rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:text-primary hover:border-primary"
                >
                  <Linkedin size={18} />
                </a>

                <a
                  href="#"
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
                <p className="text-sm font-medium text-muted-foreground mb-2">{exp.company}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
              </div>
            ))}
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
                <h3 className="font-heading text-lg font-semibold mb-1">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                <p className="text-xs text-primary font-medium mt-1">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
