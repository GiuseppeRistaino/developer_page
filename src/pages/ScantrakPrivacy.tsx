import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import scantrakIcon from "../../PORTFOLIO/Scantrak/icon_scantrak.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Dati trattati",
    items: [
      "Dati account: email, nome visualizzato, identificativo utente Firebase, piano attuale e stato Premium.",
      "Dati degli scontrini: negozio, data, totale, metodo di pagamento, articoli, categorie e immagini dello scontrino.",
      "Uso AI: conteggio giornaliero delle scansioni e immagini inviate per l'analisi dello scontrino.",
      "Backup cloud: dati e immagini caricati su Firebase solo se l'utente Premium attiva volontariamente la funzione.",
      "Pubblicita: per gli utenti Free possono essere usati Google AdMob e Google UMP per annunci rewarded e consenso pubblicitario.",
    ],
  },
  {
    title: "Finalita del trattamento",
    items: [
      "Creare e gestire l'account utente.",
      "Estrarre automaticamente i dati dagli scontrini tramite AI.",
      "Mostrare archivio, dashboard e statistiche personali di spesa.",
      "Applicare limiti giornalieri, funzionalita del piano Free o Premium e verifica degli annunci rewarded.",
      "Eseguire backup cloud se attivato dall'utente Premium.",
      "Gestire esportazione, cancellazione dati ed eliminazione account.",
    ],
  },
  {
    title: "Cloud, AI e backup",
    items: [
      "Quando usi la scansione AI, le immagini selezionate vengono inviate alle Cloud Functions di ScanTrak per l'analisi e l'estrazione dati.",
      "Il risultato viene restituito all'app e salvato principalmente sul dispositivo dell'utente.",
      "Il backup cloud e separato dalla scansione AI: se attivato dagli utenti Premium, salva su Firebase scontrini, articoli, totali, categorie e immagini associate.",
      "La chiave API del servizio AI non viene distribuita nell'app, ma gestita lato server tramite Firebase.",
    ],
  },
  {
    title: "Conservazione e controllo",
    items: [
      "I dati locali restano sul dispositivo finche l'utente non li elimina dall'app.",
      "I dati presenti nel backup cloud possono essere rimossi tramite le funzioni di pulizia cloud disponibili nell'app.",
      "Gli utenti Premium possono esportare i dati locali in CSV, JSON o ZIP con immagini.",
      "Il contatore giornaliero delle scansioni AI viene usato per applicare le quote previste dal piano utente.",
    ],
  },
  {
    title: "Eliminazione account",
    items: [
      "Dalla pagina Config puoi eliminare l'account ScanTrak.",
      "L'operazione rimuove profilo Firebase, account Firebase Auth, scontrini e immagini presenti nel backup cloud, contatori AI collegati all'utente e dati locali sul dispositivo, incluse immagini e preferenze.",
      "Per sicurezza puo essere richiesta una nuova autenticazione tramite password o Google.",
    ],
  },
  {
    title: "Diritti dell'utente",
    items: [
      "Puoi gestire consensi, backup cloud, esportazione, cancellazione dati ed eliminazione account dalle sezioni Dati e Privacy e Config dell'app.",
      `Per richieste privacy puoi scrivere a ${controller.email}.`,
    ],
  },
];

const ScantrakPrivacy = () => {
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
                  <p className="text-sm font-medium text-[#52645f]">Ultimo aggiornamento: 28 maggio 2026</p>
                </div>
              </div>
              <h1 className="font-heading text-4xl font-bold leading-tight text-[#003826] md:text-6xl">
                Informativa Privacy
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#30443e]">
                ScanTrak è progettata con un approccio locale: scontrini, immagini e statistiche sono salvati prima di tutto sul dispositivo. Questa pagina descrive quali dati possono essere trattati e come l'utente mantiene il controllo.
              </p>
            </div>

            <div className="rounded-lg border border-[#cfe3dc] bg-white p-5 shadow-[0_24px_70px_-50px_rgba(0,84,60,0.35)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#00543c]">
                <ShieldCheck size={24} />
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
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="h-fit rounded-lg border border-[#dbe9e4] bg-white p-6">
              <h2 className="font-heading text-xl font-bold text-[#003826]">Sintesi</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#52645f]">
                <p>ScanTrak salva gli scontrini principalmente sul dispositivo.</p>
                <p>La scansione AI invia temporaneamente immagini e dati ai servizi cloud di ScanTrak per l'analisi.</p>
                <p>Il backup cloud e opzionale, disponibile solo per utenti Premium e basato su Firebase.</p>
                <p>Gli utenti Free devono completare una pubblicita rewarded prima della scansione AI.</p>
              </div>
            </aside>

            <div className="space-y-5">
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
                <h2 className="font-heading text-2xl font-bold text-[#003826]">Contatti privacy</h2>
                <p className="mt-3 text-sm leading-6 text-[#52645f]">
                  Per richieste relative a privacy, account, cancellazione o supporto puoi contattare il titolare del trattamento all'indirizzo email indicato in questa pagina.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#10b981] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
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

export default ScantrakPrivacy;
