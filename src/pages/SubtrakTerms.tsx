import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import subtrakIcon from "../../PORTFOLIO/Subtrak/icon_subtrak.svg";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const lastUpdate = "31 maggio 2026";

const sections = [
  {
    title: "1. Descrizione del servizio",
    items: [
      "SubTrak è un'applicazione mobile per Android che consente agli utenti di monitorare e gestire i propri abbonamenti a servizi digitali ricorrenti (es. Netflix, Spotify, Amazon Prime).",
      "L'inserimento degli abbonamenti avviene manualmente da parte dell'utente tramite l'apposita funzione nell'app.",
      "Tutti i dati vengono salvati esclusivamente nel database locale del dispositivo. SubTrak non usa server cloud, Firebase o servizi di terze parti.",
      "Il servizio è in fase di sviluppo attivo. Alcune funzionalità potrebbero essere modificate o temporaneamente non disponibili senza preavviso.",
    ],
  },
  {
    title: "2. Accesso all'app",
    items: [
      "SubTrak non richiede registrazione, account, email o dati personali per essere utilizzata.",
      "L'app è accessibile direttamente dopo l'installazione, senza alcuna procedura di autenticazione.",
      "L'utente deve avere almeno 13 anni per installare e utilizzare l'app.",
    ],
  },
  {
    title: "3. Uso accettabile",
    items: [
      "SubTrak è progettato per uso personale. È vietato utilizzarlo per finalità commerciali o a beneficio di terzi non autorizzati.",
      "È vietato tentare di decompilare o fare reverse engineering dell'applicazione.",
      "L'utente si impegna a fornire informazioni accurate durante la registrazione.",
    ],
  },
  {
    title: "5. Piani e funzionalità",
    items: [
      "SubTrak è disponibile in versione gratuita con funzionalità base di tracciamento e dashboard.",
      "Un piano Premium, quando disponibile, potrà includere funzionalità avanzate come export dei dati e analytics estese.",
      "I prezzi e le condizioni del piano Premium sono soggetti a modifica con preavviso di almeno 30 giorni agli utenti attivi.",
    ],
  },
  {
    title: "6. Limitazioni di responsabilità",
    items: [
      "SubTrak è uno strumento di monitoraggio e non costituisce consulenza finanziaria, fiscale o legale.",
      "I dati rilevati tramite il Notification Listener potrebbero contenere errori o discrepanze. L'utente è sempre responsabile della verifica delle informazioni.",
      "SubTrak non è responsabile per mancati avvisi di rinnovo derivanti da interruzioni del servizio, mancata ricezione delle notifiche bancarie o variazioni nei sistemi dei fornitori.",
      "SubTrak non garantisce la disponibilità continua del servizio e si riserva il diritto di sospenderlo temporaneamente per manutenzione.",
    ],
  },
  {
    title: "7. Proprietà intellettuale",
    items: [
      "Il nome SubTrak, il logo, il design dell'interfaccia e il codice sorgente sono di proprietà esclusiva di Giuseppe Ristaino.",
      "L'utilizzo dell'app non trasferisce all'utente alcun diritto di proprietà intellettuale.",
      "È vietato riprodurre o distribuire l'app o i suoi componenti senza autorizzazione scritta.",
    ],
  },
  {
    title: "8. Modifiche ai termini",
    items: [
      "Il titolare si riserva il diritto di modificare questi termini in qualsiasi momento.",
      "Le modifiche sostanziali saranno comunicate tramite notifica nell'app con almeno 14 giorni di preavviso.",
      "L'uso continuato del servizio dopo la notifica costituisce accettazione dei nuovi termini.",
    ],
  },
  {
    title: "9. Legge applicabile e foro competente",
    items: [
      "Questi termini sono regolati dalla legge italiana.",
      "Per qualsiasi controversia, le parti si impegnano a tentare una risoluzione amichevole prima di ricorrere alle vie legali.",
      "In mancanza di accordo, è competente il Tribunale del luogo di residenza del consumatore, salvo diversa previsione normativa.",
    ],
  },
];

const SubtrakTerms = () => {
  return (
    <div className="min-h-screen bg-[#060e20] text-[#dae2fd]">
      {/* Header */}
      <section className="border-b border-[#464554] bg-[#0b1326] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio/subtrak"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
          >
            <ArrowLeft size={16} />
            Torna a SubTrak
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={subtrakIcon}
                  alt="Icona SubTrak"
                  className="h-14 w-14 rounded-2xl shadow-[0_12px_30px_-16px_rgba(99,102,241,0.7)]"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#c0c1ff]">SubTrak</p>
                  <p className="text-sm font-medium text-[#94a3b8]">Ultimo aggiornamento: {lastUpdate}</p>
                </div>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
                Termini e Condizioni
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#94a3b8]">
                Questi termini regolano l'uso di SubTrak. L'app non richiede registrazione e tutti i dati vengono trattati esclusivamente sul dispositivo — nessun server, nessun cloud.
              </p>
            </div>

            <div className="rounded-xl border border-[#464554] bg-[#131b2e] p-5 shadow-[0_24px_70px_-50px_rgba(99,102,241,0.3)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#c0c1ff]">
                <FileText size={24} />
                <h2 className="font-heading text-lg font-bold">Titolare</h2>
              </div>
              <p className="text-sm font-semibold text-[#dae2fd]">{controller.name}</p>
              <p className="mt-1 text-sm text-[#94a3b8]">{controller.country}</p>
              <a
                href={`mailto:${controller.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
              >
                <Mail size={16} />
                {controller.email}
              </a>

              <div className="mt-5 border-t border-[#464554] pt-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                  Pagine collegate
                </p>
                <Link
                  to="/portfolio/subtrak/privacy"
                  className="mt-3 flex items-center gap-2 text-sm font-medium text-[#c0c1ff] transition-colors hover:text-[#8083ff]"
                >
                  Informativa Privacy →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Index sidebar */}
            <aside className="h-fit rounded-xl border border-[#464554] bg-[#131b2e] p-6">
              <h2 className="font-heading text-xl font-bold text-[#dae2fd]">Indice</h2>
              <nav className="mt-5 space-y-2">
                {sections.map((s) => (
                  <a
                    key={s.title}
                    href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="block text-sm leading-6 text-[#94a3b8] transition-colors hover:text-[#c0c1ff]"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              <div className="mt-6 rounded-lg border border-[#464554] bg-[#0b1326] p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">
                  Nota importante
                </p>
                <p className="mt-2 text-sm leading-5 text-[#94a3b8]">
                  SubTrak non richiede account, non si connette a banche, email o cloud di alcun tipo e non è un servizio di consulenza finanziaria.
                </p>
              </div>
            </aside>

            {/* Sections */}
            <div className="space-y-5">
              {sections.map((section) => (
                <section
                  key={section.title}
                  id={section.title.replace(/\s+/g, "-").toLowerCase()}
                  className="rounded-xl border border-[#464554] bg-[#131b2e] p-6 scroll-mt-24"
                >
                  <h2 className="font-heading text-2xl font-bold text-[#dae2fd]">{section.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#94a3b8]">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#6366f1]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {/* Contact */}
              <section className="rounded-xl border border-[#6366f1]/30 bg-[#6366f1]/10 p-6">
                <h2 className="font-heading text-2xl font-bold text-[#dae2fd]">Contatti</h2>
                <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                  Per domande sui presenti termini o per segnalare violazioni, contatta il titolare.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${controller.email}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                  >
                    <Mail size={16} />
                    Scrivi una email
                  </a>
                  <Link
                    to="/portfolio/subtrak/privacy"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#464554] px-4 py-2.5 text-sm font-bold text-[#c0c1ff] transition-colors hover:border-[#6366f1]"
                  >
                    Informativa Privacy →
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubtrakTerms;
