import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import roamieIcon from "../../PORTFOLIO/Roamie/icon_roamie.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Uso dell'app",
    items: [
      "Roamie aiuta a organizzare viaggi di gruppo: itinerari, mappa delle tappe, spese condivise e chat.",
      "Per usarla serve un account. Sei responsabile dei contenuti che inserisci e condividi con i compagni di viaggio (testi, foto, spese).",
      "Non usare l'app per contenuti illeciti, offensivi o che violano i diritti di altri. Gli account che lo fanno possono essere sospesi.",
    ],
  },
  {
    title: "Piano gratuito",
    items: [
      "Il piano gratuito include la pubblicità e alcuni limiti, ad esempio sul numero di viaggi e di tappe. Alcuni contenuti si sbloccano guardando un video con premio.",
      "I limiti possono cambiare nel tempo: quelli in vigore sono indicati nell'app.",
    ],
  },
  {
    title: "Premium",
    items: [
      "Premium è un abbonamento mensile acquistato tramite Google Play, che si rinnova automaticamente fino alla disdetta.",
      "Puoi disdirlo in qualsiasi momento da Google Play > Pagamenti e abbonamenti; resta attivo fino alla fine del periodo già pagato.",
      "Premium sblocca i suggerimenti IA (fino a 30 richieste al mese), la scelta dei luoghi sulla mappa, viaggi e tappe illimitati, la chat di gruppo e rimuove la pubblicità. La chat è disponibile anche ai compagni dei viaggi creati da un utente Premium.",
      "\"Rimuovi pubblicità\" è un acquisto una tantum che disattiva gli annunci per sempre sull'account, senza sbloccare le funzioni Premium.",
      "Rimborsi e pagamenti seguono le regole di Google Play.",
    ],
  },
  {
    title: "Mappe, luoghi e IA",
    items: [
      "Mappe, indirizzi e informazioni sui luoghi provengono da servizi Google e possono essere incompleti o non aggiornati.",
      "Gli itinerari suggeriti dall'IA sono proposte automatiche: verifica sempre orari di apertura, distanze, prenotazioni e sicurezza prima di partire.",
      "Alcune funzioni hanno limiti di utilizzo mensili e richiedono una connessione internet.",
    ],
  },
  {
    title: "Spese",
    items: [
      "Totali, quote e bilanci sono calcolati sui dati inseriti dagli utenti e servono a orientarsi: non hanno valore contabile o fiscale.",
    ],
  },
  {
    title: "Responsabilità e modifiche",
    items: [
      "L'app è fornita così com'è. Il titolare fa il possibile per mantenerla funzionante, ma non garantisce l'assenza di interruzioni o errori.",
      "Questi termini possono essere aggiornati: le modifiche importanti verranno comunicate nell'app o su questa pagina.",
      "Si applica la legge italiana, fatti salvi i diritti inderogabili del consumatore.",
    ],
  },
];

const RoamieTerms = () => {
  return (
    <div className="min-h-screen bg-[#f3f1ec] text-[#1a365d]">
      <section className="border-b border-[#2b2f36] bg-[#14161a] py-16 text-[#f3f1ec] md:py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio/roamie"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#ffd27a] transition-colors hover:text-[#fe6a34]"
          >
            <ArrowLeft size={16} />
            Torna a Roamie
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <img src={roamieIcon} alt="Icona Roamie" className="h-14 w-14 rounded-2xl" />
                <div>
                  <p className="font-mono text-sm font-semibold uppercase tracking-widest text-[#ffd27a]">Roamie</p>
                  <p className="text-sm font-medium text-[#8e9099]">Ultimo aggiornamento: 4 novembre 2026</p>
                </div>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
                Termini di utilizzo
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#c4c6cf]">
                Le condizioni per usare Roamie, il piano gratuito, l'abbonamento Premium e l'acquisto “Rimuovi pubblicità”.
              </p>
            </div>

            <div className="rounded-lg border border-[#2b2f36] bg-[#1c1f24] p-5 md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#ffd27a]">
                <FileText size={24} />
                <h2 className="font-heading text-lg font-bold">Titolare</h2>
              </div>
              <p className="text-sm font-semibold">{controller.name}</p>
              <p className="mt-1 text-sm text-[#8e9099]">{controller.country}</p>
              <a
                href={`mailto:${controller.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#ffd27a] transition-colors hover:text-[#fe6a34]"
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
            <aside className="h-fit rounded-lg border border-[#d9d5cc] bg-white p-6">
              <h2 className="font-heading text-xl font-bold">Sintesi</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#43474e]">
                <p>Serve un account e sei responsabile dei contenuti che condividi.</p>
                <p>Il piano gratuito ha pubblicità e alcuni limiti.</p>
                <p>Premium è un abbonamento mensile Google Play, disdicibile in qualsiasi momento.</p>
                <p>Mappe e suggerimenti IA sono un aiuto: verifica sempre prima di partire.</p>
              </div>
            </aside>

            <div className="space-y-5">
              {sections.map((section) => (
                <section key={section.title} className="rounded-lg border border-[#d9d5cc] bg-white p-6">
                  <h2 className="font-heading text-2xl font-bold">{section.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#43474e]">
                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#fe6a34]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              <section className="rounded-lg border border-[#ffd27a] bg-[#fff6dc] p-6">
                <h2 className="font-heading text-2xl font-bold">Contatti</h2>
                <p className="mt-3 text-sm leading-6 text-[#43474e]">
                  Per richieste su privacy, abbonamento o supporto puoi scrivere al titolare all'indirizzo email indicato in questa pagina.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#fe6a34] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  Scrivi una email
                </a>
                <Link
                  to="/portfolio/roamie/privacy"
                  className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#e6cf84] px-4 py-2.5 text-sm font-bold text-[#c2410c] transition-colors hover:border-[#fe6a34]"
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

export default RoamieTerms;
