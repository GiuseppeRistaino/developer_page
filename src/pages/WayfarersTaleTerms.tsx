import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import iconWayfarer from "../../PORTFOLIO/WayfarersTale/icon_wayfarerstale.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const updated = "13 novembre 2026";

const sections = [
  {
    title: "Uso dell'app",
    items: [
      "Wayfarer's Tale ti ricorda, durante un viaggio, di fotografare dei momenti e li raccoglie in un racconto da sfogliare e condividere.",
      "L'app è gratuita e non richiede un account. Puoi usarla per scopi personali e non commerciali.",
    ],
  },
  {
    title: "I tuoi contenuti",
    items: [
      "Foto, righe e viaggi restano tuoi: l'app non acquisisce alcun diritto su ciò che crei e non lo carica su server del titolare.",
      "Sei responsabile di ciò che fotografi e condividi. Rispetta la privacy delle persone (chiedi prima di fotografarle), i luoghi dove fotografare è vietato e i diritti di altri.",
      "Dato che i contenuti sono salvati solo sul telefono, conservarne una copia è a tua cura: disinstallando l'app o perdendo il dispositivo potrebbero andare persi.",
    ],
  },
  {
    title: "Promemoria",
    items: [
      "I promemoria arrivano a orari casuali e sono programmati dal sistema operativo. La consegna può essere ritardata o impedita da impostazioni del telefono come il risparmio energetico, la modalità non disturbare o l'arresto forzato dell'app.",
      "Non usare l'app in situazioni pericolose: un promemoria non è mai un buon motivo per fotografare mentre guidi o in luoghi non sicuri.",
    ],
  },
  {
    title: "Luoghi e percorso",
    items: [
      "Luoghi e percorso dipendono dal GPS e dal servizio di geocodifica del dispositivo e possono essere imprecisi o mancanti. Servono a ricordare, non a orientarsi.",
    ],
  },
  {
    title: "Funzioni future",
    items: [
      "Funzioni come il link pubblico al libro o il diario stampato per gli abbonati non sono ancora disponibili. Quando lo saranno, condizioni, prezzi e modalità di pagamento verranno indicati nell'app e in questi termini prima dell'acquisto.",
    ],
  },
  {
    title: "Responsabilità e modifiche",
    items: [
      "L'app è fornita così com'è. Il titolare fa il possibile per mantenerla funzionante, ma non garantisce l'assenza di interruzioni, errori o perdite di dati.",
      "Questi termini possono essere aggiornati: le modifiche importanti verranno comunicate nell'app o su questa pagina.",
      "Si applica la legge italiana, fatti salvi i diritti inderogabili del consumatore.",
    ],
  },
];

const WayfarersTaleTerms = () => {
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
              <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Termini di utilizzo</h1>
              <p className="mt-6 text-lg leading-8 text-[#C4CBD8]">
                Le condizioni per usare Wayfarer's Tale: i tuoi contenuti, i promemoria e le funzioni che arriveranno.
              </p>
            </div>

            <div className="rounded-lg border border-[#2A3752] bg-[#18233A] p-5 md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#F0B44C]">
                <FileText size={24} />
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
                <p>Gratuita, senza account, per uso personale.</p>
                <p>Le foto e i racconti restano tuoi e restano sul telefono.</p>
                <p>Fotografa con rispetto: persone, luoghi e sicurezza prima di tutto.</p>
                <p>I promemoria dipendono anche dalle impostazioni del telefono.</p>
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
                        <span className="min-w-0 [overflow-wrap:anywhere]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section className="rounded-lg border border-[#F0B44C] bg-[#FFF6DC] p-6">
                <h2 className="font-display text-2xl font-semibold">Contatti</h2>
                <p className="mt-3 text-sm leading-6 text-[#4A4438]">
                  Per domande o supporto puoi scrivere al titolare all'indirizzo email indicato in questa pagina.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0E1626] px-4 py-2.5 text-sm font-bold text-[#F0B44C] transition-transform hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  Scrivi una email
                </a>
                <Link
                  to="/portfolio/wayfarerstale/privacy"
                  className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#E6CF84] px-4 py-2.5 text-sm font-bold text-[#8A5A14] transition-colors hover:border-[#0E1626]"
                >
                  Informativa Privacy
                </Link>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WayfarersTaleTerms;
