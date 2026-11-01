import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Mail } from "lucide-react";
import scantrakIcon from "../../PORTFOLIO/Scantrak/icon_scantrak.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Uso dell'app",
    items: [
      "ScanTrak aiuta a digitalizzare scontrini, leggere dati tramite AI e consultare statistiche personali di spesa.",
      "L'utente è responsabile della correttezza dei dati salvati e può modificarli prima del salvataggio.",
      "Gli utenti Free hanno limiti giornalieri e devono completare un annuncio rewarded prima della scansione AI.",
      "Gli utenti Premium hanno funzionalità aggiuntive come assenza di pubblicità, export e backup cloud opzionale.",
    ],
  },
  {
    title: "Scansione AI",
    items: [
      "La scansione AI invia le immagini degli scontrini a Google Gemini API, come descritto nell'Informativa Privacy.",
      "L'analisi AI può commettere errori: i risultati vanno verificati prima dell'uso.",
    ],
  },
  {
    title: "Backup cloud",
    items: [
      "Il backup cloud è facoltativo e riservato al piano Premium. Quando viene attivato, salva su Firebase gli scontrini e le immagini associate.",
      "Disattivarlo blocca nuovi upload; per rimuovere dati già caricati serve usare la pulizia cloud.",
    ],
  },
  {
    title: "Disponibilità",
    items: [
      "Alcune funzioni dipendono da Firebase, Google Sign-In, AdMob, connessione internet e Google Gemini API. In caso di indisponibilità temporanea, l'app può limitare alcune operazioni.",
    ],
  },
  {
    title: "Eliminazione account",
    items: [
      "L'utente può eliminare l'account dalla pagina Config. La cancellazione rimuove account, profilo e dati Firebase associati, oltre ai dati locali sul dispositivo.",
      "L'operazione è definitiva e può richiedere una nuova autenticazione.",
    ],
  },
  {
    title: "Aggiornamenti",
    items: [
      "Termini, Informativa Privacy e consensi possono essere aggiornati. In caso di nuova versione rilevante, l'app può richiedere una nuova accettazione.",
    ],
  },
];

const ScantrakTerms = () => {
  return (
    <div className="min-h-screen bg-[#f5faf8] text-[#07131f]">
      <section className="border-b border-[#dbe9e4] bg-[#eef8f4] py-16 md:py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/portfolio/scantrak"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#00543c] transition-colors hover:text-[#10b981]"
          >
            <ArrowLeft size={16} />
            Torna a ScanTrak
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-5 flex items-center gap-4">
                <img src={scantrakIcon} alt="Icona ScanTrak" className="h-14 w-14 rounded-2xl" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#10b981]">ScanTrak</p>
                  <p className="text-sm font-medium text-[#52645f]">Ultimo aggiornamento: 1 novembre 2026</p>
                </div>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-[#003826] md:text-6xl">
                Termini di utilizzo
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#30443e]">
                Questi termini regolano l'uso di ScanTrak e corrispondono a quelli accettati nell'app.
              </p>
            </div>

            <div className="rounded-lg border border-[#cfe3dc] bg-white p-5 shadow-[0_24px_70px_-50px_rgba(0,84,60,0.35)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#00543c]">
                <FileText size={24} />
                <h2 className="font-heading text-lg font-bold">Titolare</h2>
              </div>
              <p className="text-sm font-semibold text-[#07131f]">{controller.name}</p>
              <p className="mt-1 text-sm text-[#52645f]">{controller.country}</p>
              <a
                href={`mailto:${controller.email}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#00543c] transition-colors hover:text-[#10b981]"
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
            <section key={section.title} className="rounded-lg border border-[#dbe9e4] bg-white p-6">
              <h2 className="font-heading text-2xl font-bold text-[#003826]">{section.title}</h2>
              <ul className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#52645f]">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#10b981]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section className="rounded-lg border border-[#b7ded0] bg-[#e8f8f2] p-6">
            <h2 className="font-heading text-2xl font-bold text-[#003826]">Contatti</h2>
            <p className="mt-3 text-sm leading-6 text-[#52645f]">
              Per richieste su account, privacy o supporto puoi scrivere al titolare.
            </p>
            <a
              href={`mailto:${controller.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            >
              <Mail size={16} />
              Scrivi una email
            </a>
            <Link
              to="/portfolio/scantrak/privacy"
              className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#b7ded0] px-4 py-2.5 text-sm font-bold text-[#00543c] transition-colors hover:border-[#10b981]"
            >
              Informativa Privacy
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ScantrakTerms;
