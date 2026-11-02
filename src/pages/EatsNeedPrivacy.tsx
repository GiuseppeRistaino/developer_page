import { Link } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import eatsNeedIcon from "../../PORTFOLIO/EatsNeed/icon_eatsneed.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Dati salvati solo sul dispositivo",
    items: [
      "Prodotti della dispensa: nome, codice a barre, data di scadenza, foto scattate dall'utente, valori nutrizionali e pareri dell'IA.",
      "Lista della spesa, ricette personali con le relative foto e abbinamenti tra ingredienti e prodotti.",
      "Preferenze dell'app, come lingua e giorni di preavviso per le notifiche.",
      "Le notifiche di scadenza sono programmate localmente e la lettura delle date dalla fotocamera avviene sul dispositivo tramite Google ML Kit.",
      "Questi dati non vengono caricati su server del titolare e restano sul telefono finché l'utente non li elimina o disinstalla l'app.",
    ],
  },
  {
    title: "Codice a barre e Open Food Facts",
    items: [
      "Quando scansioni un codice a barre, l'app lo invia al database pubblico Open Food Facts (https://world.openfoodfacts.org) per ottenere nome, immagine e valori nutrizionali.",
      "Open Food Facts riceve il codice e l'indirizzo IP della richiesta, secondo la propria informativa privacy.",
    ],
  },
  {
    title: "Abbonamento Premium",
    items: [
      "Il pagamento è gestito interamente da Google Play: il titolare non riceve i dati della carta o dell'account Google.",
      "Per verificare l'abbonamento, l'app invia il token d'acquisto alle Cloud Functions di EatsNeed (Google Firebase, regione europe-west1), che lo controllano con le API di Google Play.",
      "Per il limite di 3 richieste IA al giorno viene salvata in Firestore (europe-west1) solo un'impronta SHA-256 del token, con la data dell'ultimo utilizzo e il numero di richieste del giorno: nessun nome, email o identificativo dell'account.",
    ],
  },
  {
    title: "Funzioni con l'intelligenza artificiale",
    items: [
      "Idee con l'IA: l'app invia i nomi dei prodotti in dispensa, i giorni che mancano alla scadenza e la lingua dell'app per ricevere proposte di ricette.",
      "Scontrino con l'IA: l'app invia le foto dello scontrino (fino a 3 pagine, ridimensionate) per riconoscere i prodotti, stimarne qualità e scadenza e scrivere un breve parere.",
      "I dati passano dalle Cloud Functions di EatsNeed a Google Gemini API. Il titolare non conserva foto, nomi dei prodotti né risposte: il risultato viene salvato solo sul dispositivo.",
      "Google tratta questi dati secondo le condizioni della Gemini API (https://ai.google.dev/gemini-api/terms): può conservarli per un periodo limitato per prevenire abusi e può elaborarli anche fuori dall'Unione Europea.",
      "Gli scontrini possono contenere dati personali: evita di fotografare parti che non vuoi condividere. Le risposte dell'IA sono stime e possono contenere errori.",
    ],
  },
  {
    title: "Pubblicità",
    items: [
      "La versione gratuita mostra banner di Google AdMob. Dove richiesto, il consenso viene raccolto con Google User Messaging Platform e si può modificare da Impostazioni > Privacy e consenso annunci.",
      "AdMob può raccogliere l'identificativo pubblicitario, l'indirizzo IP e dati sull'interazione con gli annunci. Con Premium la pubblicità viene disattivata.",
    ],
  },
  {
    title: "Basi giuridiche e conservazione",
    items: [
      "Funzioni dell'app, verifica dell'abbonamento e funzioni IA: esecuzione del servizio richiesto (art. 6.1.b GDPR).",
      "Limite giornaliero e prevenzione degli abusi: legittimo interesse del titolare (art. 6.1.f GDPR).",
      "Pubblicità personalizzata: consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento.",
      "L'impronta del token resta in Firestore finché il servizio è attivo; la cancellazione può essere richiesta al titolare.",
      "EatsNeed non è destinata a minori di 14 anni.",
    ],
  },
  {
    title: "Diritti dell'utente",
    items: [
      `Puoi chiedere accesso, rettifica, cancellazione, limitazione od opposizione scrivendo a ${controller.email}.`,
      "Puoi eliminare in ogni momento i dati locali dall'app o disinstallandola, e proporre reclamo al Garante per la protezione dei dati personali.",
    ],
  },
];

const EatsNeedPrivacy = () => {
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
                Informativa Privacy
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#30443e]">
                EatsNeed non richiede la creazione di un account: dispensa, lista della spesa e ricette sono salvate sul tuo dispositivo. Questa pagina spiega quali dati lasciano il telefono, quando e perché.
              </p>
            </div>

            <div className="rounded-lg border border-[#dde6d4] bg-white p-5 shadow-[0_24px_70px_-50px_rgba(18,53,42,0.4)] md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#14741e]">
                <ShieldCheck size={24} />
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
        <div className="container mx-auto px-6">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <aside className="h-fit rounded-lg border border-[#dde6d4] bg-white p-6">
              <h2 className="font-heading text-xl font-bold text-[#12352a]">Sintesi</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[#54675c]">
                <p>Nessun account: dispensa, spesa e ricette restano sul dispositivo.</p>
                <p>Il codice a barre viene cercato su Open Food Facts.</p>
                <p>Le funzioni IA Premium inviano nomi dei prodotti o foto dello scontrino a Google Gemini API, senza che il titolare li conservi.</p>
                <p>Per l'abbonamento viene salvata solo un'impronta anonima del token d'acquisto.</p>
              </div>
            </aside>

            <div className="space-y-5">
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
                <h2 className="font-heading text-2xl font-bold text-[#12352a]">Contatti privacy</h2>
                <p className="mt-3 text-sm leading-6 text-[#54675c]">
                  Per richieste su privacy, abbonamento o supporto puoi contattare il titolare del trattamento all'indirizzo email indicato in questa pagina.
                </p>
                <a
                  href={`mailto:${controller.email}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1fa62b] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Mail size={16} />
                  Scrivi una email
                </a>
                <Link
                  to="/portfolio/eatsneed/terms"
                  className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#e6cf84] px-4 py-2.5 text-sm font-bold text-[#14741e] transition-colors hover:border-[#1fa62b]"
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

export default EatsNeedPrivacy;
