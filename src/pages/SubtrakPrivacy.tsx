import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import subtrakIcon from "../../PORTFOLIO/Subtrak/icon_subtrak.svg";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const lastUpdate = "31 maggio 2026";

const sections = [
  {
    title: "Dati trattati",
    items: [
      "SubTrak non richiede autenticazione. L'app è utilizzabile senza account, senza email e senza nome utente.",
      "Abbonamenti: nome del servizio, importo, valuta, ciclo di fatturazione, data di rinnovo e stato — inseriti manualmente dall'utente e salvati esclusivamente nel database locale del dispositivo.",
      "Dati di staging: transazioni candidate non ancora confermate come abbonamenti ricorrenti, conservate temporaneamente nel database locale in attesa della seconda occorrenza.",
      "Storico pagamenti: cronologia dei pagamenti inseriti, salvata localmente per analytics e confronti tra periodi.",
    ],
  },
  {
    title: "Cosa SubTrak NON fa",
    items: [
      "Non richiede registrazione, account, email o dati personali per essere utilizzata.",
      "Non si connette a servizi bancari (Open Banking, PSD2 o equivalenti).",
      "Non accede a email, account Gmail, Outlook o altri provider di posta.",
      "Non usa Firebase, server cloud o database remoti di alcun tipo.",
      "Non trasmette dati personali o finanziari a terze parti.",
      "Non effettua operazioni bancarie di alcun tipo (nessun bonifico, nessun addebito).",
    ],
  },
  {
    title: "Finalità del trattamento",
    items: [
      "Consentire l'inserimento e la gestione manuale degli abbonamenti ricorrenti.",
      "Mostrare dashboard, analytics e storico dei pagamenti calcolati localmente.",
      "Inviare notifiche push locali di avviso prima dei rinnovi imminenti.",
    ],
  },
  {
    title: "Base giuridica del trattamento",
    items: [
      "Esecuzione del servizio: dashboard, analytics e notifiche locali sono necessarie per erogare le funzioni richieste dall'utente.",
      "Poiché l'app non raccoglie dati personali identificativi, non è richiesta una base giuridica specifica ai sensi del GDPR per i dati di abbonamento inseriti dall'utente.",
    ],
  },
  {
    title: "Conservazione e controllo",
    items: [
      "Tutti i dati sono conservati nel database locale del dispositivo e rimangono sotto il controllo esclusivo dell'utente.",
      "I dati di staging vengono eliminati automaticamente dopo 90 giorni senza nuove occorrenze.",
      "L'utente può eliminare singoli abbonamenti, lo storico o tutti i dati dall'app in qualsiasi momento dalla sezione Impostazioni.",
      "La disinstallazione dell'app rimuove completamente tutti i dati salvati localmente.",
    ],
  },
  {
    title: "Eliminazione dei dati",
    items: [
      "L'utente può eliminare tutti i dati in qualsiasi momento dalla sezione Impostazioni dell'app.",
      "La disinstallazione dell'app rimuove tutti i dati salvati localmente sul dispositivo.",
      "Non esistono dati in cloud da eliminare: tutto risiede esclusivamente sul dispositivo.",
    ],
  },
  {
    title: "Diritti dell'utente",
    items: [
      "Accesso ai dati trattati (disponibili direttamente nell'app).",
      "Rettifica o cancellazione dei dati tramite le funzioni dell'app.",
      `Per richieste scrivi a ${controller.email}.`,
      "Reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
    ],
  },
];

const SubtrakPrivacy = () => {
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
                Informativa Privacy
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#94a3b8]">
                SubTrak non richiede account né dati personali. Tutti i dati vengono trattati esclusivamente in locale sul dispositivo. Nessun server, nessun cloud, nessuna connessione esterna.
              </p>
            </div>

            <div className="rounded-xl border border-[#464554] bg-[#131b2e] p-5 shadow-[0_24px_70px_-50px_rgba(99,102,241,0.3)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#c0c1ff]">
                <ShieldCheck size={24} />
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
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            {/* Sidebar */}
            <aside className="h-fit rounded-xl border border-[#464554] bg-[#131b2e] p-6">
              <h2 className="font-heading text-xl font-bold text-[#dae2fd]">In sintesi</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#94a3b8]">
                <p>Nessuna registrazione, nessun account, nessuna email richiesta.</p>
                <p>Tutti i dati rimangono esclusivamente sul dispositivo dell'utente.</p>
                <p>Nessun server, nessun database cloud, nessun servizio esterno.</p>
                <p>La disinstallazione dell'app rimuove tutti i dati.</p>
              </div>

              <div className="mt-6 rounded-lg border border-[#6366f1]/20 bg-[#6366f1]/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#c0c1ff]">100% Locale</p>
                <p className="mt-2 text-sm leading-5 text-[#94a3b8]">
                  SubTrak non si connette a Open Banking, email o Firebase. Tutti i calcoli e i dati vivono solo sul tuo dispositivo.
                </p>
              </div>
            </aside>

            {/* Sections */}
            <div className="space-y-5">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-xl border border-[#464554] bg-[#131b2e] p-6"
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
                <h2 className="font-heading text-2xl font-bold text-[#dae2fd]">Contatti privacy</h2>
                <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                  Per richieste di accesso, rettifica o cancellazione dei dati contatta il titolare.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#6366f1] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  Scrivi una email
                </a>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubtrakPrivacy;
