import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import eatsNeedIcon from "../../PORTFOLIO/EatsNeed/icon_eatsneed.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Uso dell'app",
    items: [
      "EatsNeed aiuta a tenere traccia della dispensa, delle scadenze, della lista della spesa e delle ricette personali.",
      "L'app è gratuita con pubblicità. Non serve un account: i dati restano sul dispositivo e vanno persi se l'app viene disinstallata.",
      "Le informazioni sui prodotti provengono da Open Food Facts, un database collaborativo che può contenere dati incompleti o non aggiornati.",
    ],
  },
  {
    title: "Scadenze e indicazioni nutrizionali",
    items: [
      "Avvisi, colori di freschezza e valutazioni nutrizionali sono un aiuto pratico e non sostituiscono la data e le indicazioni riportate sulla confezione.",
      "Prima di consumare un prodotto, controllane sempre lo stato e la data di scadenza originale.",
    ],
  },
  {
    title: "Premium",
    items: [
      "Premium è un abbonamento mensile o annuale acquistato tramite Google Play, che si rinnova automaticamente fino alla disdetta.",
      "Puoi disdirlo in qualsiasi momento da Google Play > Pagamenti e abbonamenti; resta attivo fino alla fine del periodo già pagato.",
      "Premium rimuove la pubblicità e sblocca le funzioni IA, con un limite di 3 richieste al giorno condiviso tra idee di ricette e scontrini.",
    ],
  },
  {
    title: "Funzioni con l'IA",
    items: [
      "Le idee di ricette e la lettura degli scontrini usano Google Gemini API, come descritto nell'Informativa Privacy.",
      "Ricette, qualità stimate, pareri e scadenze proposte dall'IA possono contenere errori: verifica sempre ingredienti, allergeni, cotture e date prima dell'uso.",
      "Le funzioni IA richiedono una connessione internet e possono essere temporaneamente non disponibili.",
    ],
  },
  {
    title: "Responsabilità",
    items: [
      "L'app è fornita così com'è. Nei limiti consentiti dalla legge, il titolare non risponde di danni derivanti da dati errati, prodotti scaduti o indicazioni generate dall'IA.",
    ],
  },
  {
    title: "Aggiornamenti",
    items: [
      "Termini e Informativa Privacy possono essere aggiornati quando l'app cambia. La data in alto indica l'ultima versione.",
    ],
  },
];

const EatsNeedTerms = () => {
  return (
    <div className="min-h-screen bg-[#f3f7ec] text-[#12352a]">
      <section className="border-b border-[#dde6d4] bg-[#e7f3dd] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio/eatsneed"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#14741e] transition-colors hover:text-[#1fa62b]"
          >
            <ArrowLeft size={16} />
            Torna a EatsNeed
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <img src={eatsNeedIcon} alt="Icona EatsNeed" className="h-14 w-14 rounded-2xl bg-white p-1" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#14741e]">EatsNeed</p>
                  <p className="text-sm font-medium text-[#54675c]">Ultimo aggiornamento: 2 novembre 2026</p>
                </div>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-[#12352a] md:text-6xl">
                Termini di utilizzo
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#30443e]">
                Questi termini regolano l'uso di EatsNeed e dell'abbonamento Premium.
              </p>
            </div>

            <div className="rounded-lg border border-[#dde6d4] bg-white p-5 shadow-[0_24px_70px_-50px_rgba(18,53,42,0.4)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#14741e]">
                <FileText size={24} />
                <h2 className="font-heading text-lg font-bold">Titolare</h2>
              </div>
              <p className="text-sm font-semibold text-[#12352a]">{controller.name}</p>
              <p className="mt-1 text-sm text-[#54675c]">{controller.country}</p>
              <a
                href={`mailto:${controller.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#14741e] transition-colors hover:text-[#1fa62b]"
              >
                <Mail size={16} />
                {controller.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="py-14 md:py-20">
        <div className="container mx-auto max-w-4xl space-y-5 px-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-lg border border-[#dde6d4] bg-white p-6">
              <h2 className="font-heading text-2xl font-bold text-[#12352a]">{section.title}</h2>
              <ul className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#54675c]">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#1fa62b]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rounded-lg border border-[#f3dfa0] bg-[#fff6dc] p-6">
            <h2 className="font-heading text-2xl font-bold text-[#12352a]">Contatti</h2>
            <p className="mt-3 text-sm leading-6 text-[#54675c]">
              Per richieste su abbonamento, privacy o supporto puoi scrivere al titolare.
            </p>
            <a
              href={`mailto:${controller.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1fa62b] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              <Mail size={16} />
              Scrivi una email
            </a>
            <Link
              to="/portfolio/eatsneed/privacy"
              className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#e6cf84] px-4 py-2.5 text-sm font-bold text-[#14741e] transition-colors hover:border-[#1fa62b]"
            >
              Informativa Privacy
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EatsNeedTerms;
