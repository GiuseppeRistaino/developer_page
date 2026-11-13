import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import iconWayfarer from "../../PORTFOLIO/WayfarersTale/icon_wayfarerstale.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const updated = "13 novembre 2026";

// Tenere allineato con public/wayfarerstale/privacy.html (la versione linkata
// su Google Play).
const sections = [
  {
    title: "Niente account, niente server",
    items: [
      "Wayfarer's Tale non richiede registrazione e non ha un server: il titolare non riceve né conserva i tuoi viaggi, le tue foto o la tua posizione.",
      "L'app non contiene pubblicità, strumenti di analisi o tracciamento.",
    ],
  },
  {
    title: "Cosa resta sul tuo telefono",
    items: [
      "I viaggi (titolo, date di inizio e fine) e, per ogni momento: la foto, la riga che scrivi, lo stato d'animo scelto, lo spunto del promemoria, data e ora, le coordinate e il nome del luogo.",
      "Le impostazioni (ritmo dei promemoria) e gli orari dei promemoria programmati.",
      "Tutto è salvato solo nella memoria privata dell'app sul dispositivo. Le foto vengono copiate lì a piena risoluzione.",
    ],
  },
  {
    title: "Fotocamera e galleria",
    items: [
      "La fotocamera si usa solo quando tocchi \"Cattura un momento\" o \"Scatta ora\"; la galleria solo se scegli di aggiungere una foto già scattata.",
      "Le foto non vengono caricate da nessuna parte: restano nell'app finché non le condividi tu.",
    ],
  },
  {
    title: "Posizione",
    items: [
      "La posizione viene letta solo mentre usi l'app, nel momento in cui salvi un momento, per indicare dove l'hai catturato e disegnare il percorso del viaggio. Non viene mai tracciata in background.",
      "Per trasformare le coordinate in un nome (es. \"Alfama, Lisbona\") l'app usa il servizio di geocodifica del dispositivo: su Android è fornito da Google, che riceve le coordinate (https://policies.google.com/privacy).",
      "Se neghi il permesso l'app funziona lo stesso, senza luoghi né percorso.",
    ],
  },
  {
    title: "Notifiche",
    items: [
      "I promemoria sono notifiche locali programmate sul telefono dal sistema operativo: non passano da nessun server e non usano identificativi di notifica push.",
      "Puoi cambiarne il ritmo nell'app o disattivarle dalle impostazioni del sistema. Chiudendo il racconto, tutti i promemoria vengono cancellati.",
      "Su Android l'app può suggerirti di togliere le restrizioni della batteria: apre solo le impostazioni dell'app, la scelta resta tua.",
    ],
  },
  {
    title: "Condivisione",
    items: [
      "Quando condividi un collage o le foto, l'app usa il menu di condivisione del sistema. I dati vanno solo all'app o alla persona che scegli, che li tratta secondo le proprie regole.",
    ],
  },
  {
    title: "Servizi di terze parti",
    items: [
      "Caratteri tipografici: al primo avvio l'app scarica i caratteri Fraunces e Inter da Google Fonts; i server di Google ricevono l'indirizzo IP del dispositivo (https://developers.google.com/fonts/faq/privacy).",
      "Geocodifica: vedi la sezione Posizione.",
      "Backup: se nel telefono è attivo il backup di Android o iCloud, il sistema può includere i dati dell'app nel tuo backup personale, gestito da Google o Apple e non dal titolare.",
    ],
  },
  {
    title: "Conservazione ed eliminazione",
    items: [
      "I dati restano sul telefono finché non li elimini. Disinstallando l'app, o cancellando i dati dell'app dalle impostazioni di sistema, vengono eliminati tutti i viaggi e tutte le foto salvate nell'app.",
      "Le foto che hai condiviso o salvato altrove non vengono toccate.",
    ],
  },
  {
    title: "Funzioni future",
    items: [
      "Funzioni come il link pubblico al libro o il diario stampato (Premium) non sono ancora attive. Se arriveranno e richiederanno di inviare dati a un servizio esterno, questa informativa verrà aggiornata prima e ti verrà chiesto il consenso dove necessario.",
    ],
  },
  {
    title: "Basi giuridiche, minori e diritti",
    items: [
      "Il trattamento sul dispositivo serve a fornirti il servizio che usi (art. 6.1.b GDPR); posizione, fotocamera e notifiche richiedono la tua autorizzazione esplicita dal sistema operativo, revocabile in qualsiasi momento.",
      "L'app non è destinata a minori di 14 anni.",
      "Per qualsiasi domanda o richiesta sui tuoi dati puoi scrivere a vrexas.developer@gmail.com. Puoi anche proporre reclamo al Garante per la protezione dei dati personali (https://www.garanteprivacy.it).",
    ],
  },
];

const WayfarersTalePrivacy = () => {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0E1626]">
      <section className="border-b border-[#2A3752] bg-[#0E1626] py-16 text-[#F3EEE4] md:py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio/wayfarerstale"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#F0B44C] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Torna a Wayfarer's Tale
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <img src={iconWayfarer} alt="Icona Wayfarer's Tale" className="h-14 w-14 rounded-2xl" />
                <div>
                  <p className="font-mono text-sm font-semibold uppercase tracking-widest text-[#F0B44C]">Wayfarer's Tale</p>
                  <p className="text-sm font-medium text-[#A9B3C6]">Ultimo aggiornamento: {updated}</p>
                </div>
              </div>
              <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Informativa Privacy</h1>
              <p className="mt-6 text-lg leading-8 text-[#C4CBD8]">
                Wayfarer's Tale ti ricorda di fotografare i momenti del viaggio e li raccoglie in un libro. Tutto resta sul tuo telefono: questa pagina spiega quali dati usa l'app e perché.
              </p>
            </div>

            <div className="rounded-lg border border-[#2A3752] bg-[#18233A] p-5 md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#F0B44C]">
                <ShieldCheck size={24} />
                <h2 className="font-display text-lg font-semibold">Titolare</h2>
              </div>
              <p className="text-sm font-semibold">{controller.name}</p>
              <p className="mt-1 text-sm text-[#A9B3C6]">{controller.country}</p>
              <a
                href={`mailto:${controller.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#F0B44C] transition-colors hover:text-white"
              >
                <Mail size={16} />
                {controller.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="py-14 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="h-fit rounded-lg border border-[#DCD5C7] bg-white p-6">
              <h2 className="font-display text-xl font-semibold">Sintesi</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#4A4438]">
                <p>Niente account, server, pubblicità o tracciamento.</p>
                <p>Viaggi, foto, righe e luoghi restano solo sul telefono.</p>
                <p>La posizione si legge solo mentre usi l'app, quando salvi un momento.</p>
                <p>I promemoria sono notifiche locali programmate dal telefono.</p>
                <p>Disinstallando l'app si cancella tutto.</p>
              </div>
            </aside>

            <div className="space-y-5">
              {sections.map((section) => (
                <section key={section.title} className="rounded-lg border border-[#DCD5C7] bg-white p-6">
                  <h2 className="font-display text-2xl font-semibold">{section.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#4A4438]">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F0B44C]" />
                        {/* I link scritti nel testo devono poter andare a capo sui telefoni. */}
                        <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section className="rounded-lg border border-[#F0B44C] bg-[#FFF6DC] p-6">
                <h2 className="font-display text-2xl font-semibold">Contatti</h2>
                <p className="mt-3 text-sm leading-6 text-[#4A4438]">
                  Per domande sulla privacy o per supporto puoi scrivere al titolare all'indirizzo email indicato in questa pagina.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0E1626] px-4 py-2.5 text-sm font-bold text-[#F0B44C] transition-transform hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  Scrivi una email
                </a>
                <Link
                  to="/portfolio/wayfarerstale/terms"
                  className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#E6CF84] px-4 py-2.5 text-sm font-bold text-[#8A5A14] transition-colors hover:border-[#0E1626]"
                >
                  Termini di utilizzo
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WayfarersTalePrivacy;
