import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail } from "lucide-react";
import roamieIcon from "../../PORTFOLIO/Roamie/icon_roamie.png";

const controller = {
  name: "Giuseppe Ristaino",
  email: "vrexas.developer@gmail.com",
  country: "Italia",
};

const sections = [
  {
    title: "Dati dell'account",
    items: [
      "Per usare Roamie serve un account: nome, indirizzo email, foto del profilo (facoltativa) e, se accedi con Google, l'identificativo del tuo account Google.",
      "L'accesso è gestito da Firebase Authentication. Il titolare non vede né conserva la tua password.",
      "Nome, email e foto sono visibili agli altri utenti registrati, che possono cercarti per email per aggiungerti a un viaggio, e ai compagni dei viaggi che condividi.",
      "Vengono salvati anche i consensi a termini, privacy e pubblicità, con la data in cui li hai dati.",
    ],
  },
  {
    title: "Viaggi condivisi",
    items: [
      "Viaggi (nome, destinazione, date, foto di copertina), tappe dell'itinerario (nome, indirizzo, coordinate, orari, note), spese (importi, chi ha pagato e per chi) e messaggi della chat, comprese le foto inviate.",
      "Questi dati sono salvati su Google Firebase (Cloud Firestore e Cloud Storage) e sono visibili solo ai membri del viaggio.",
      "Quando il creatore elimina un viaggio, una Cloud Function cancella anche tappe, spese, chat, notifiche e foto collegate.",
    ],
  },
  {
    title: "Mappe, luoghi e posizione",
    items: [
      "Roamie non usa il GPS e non legge la posizione del dispositivo.",
      "Per riconoscere la destinazione e mostrare le tappe sulla mappa, gli indirizzi che scrivi vengono convertiti in coordinate dal servizio di geocodifica del dispositivo (su Android fornito da Google).",
      "La mappa usa Google Maps SDK. Per gli utenti Premium, la ricerca della destinazione e la scelta dei luoghi sulla mappa usano Google Places, che riceve il testo cercato o l'identificativo del luogo toccato.",
      "Google tratta questi dati secondo le proprie norme (https://policies.google.com/privacy).",
    ],
  },
  {
    title: "Suggerimenti con l'intelligenza artificiale",
    items: [
      "Solo per gli utenti Premium e solo quando lo richiedi: l'app invia alla Cloud Function di Roamie la destinazione, le date, le preferenze scelte e le tappe già presenti nel viaggio.",
      "La Cloud Function inoltra questi dati a Google Gemini API, che restituisce le tappe suggerite. Il titolare non conserva le richieste né le risposte: conserva solo il numero di richieste del mese (massimo 30) per il limite di utilizzo.",
      "Google tratta i dati secondo le condizioni della Gemini API (https://ai.google.dev/gemini-api/terms) e può elaborarli anche fuori dall'Unione Europea. I suggerimenti sono generati automaticamente e possono contenere errori.",
    ],
  },
  {
    title: "Notifiche",
    items: [
      "Per i messaggi della chat, il token di notifica di ogni tuo dispositivo viene salvato in un'area privata del profilo, leggibile solo da te e dalle Cloud Functions che inviano le notifiche tramite Firebase Cloud Messaging.",
      "I promemoria di partenza e delle tappe sono programmati sul telefono. Puoi disattivare ogni tipo di notifica dalle impostazioni dell'app o del sistema.",
    ],
  },
  {
    title: "Abbonamento Premium e acquisti",
    items: [
      "I pagamenti sono gestiti interamente da Google Play: il titolare non riceve i dati della carta o del tuo account di pagamento.",
      "Per attivare Premium o la rimozione della pubblicità, l'app invia il token d'acquisto a una Cloud Function che lo verifica con le API di Google Play. Viene conservata un'impronta del token legata al tuo account, per evitare che lo stesso acquisto sblocchi più account.",
    ],
  },
  {
    title: "Pubblicità",
    items: [
      "Il piano gratuito mostra annunci di Google AdMob (banner, interstitial e video con premio facoltativi).",
      "Dove richiesto dalla legge, il consenso viene raccolto con Google User Messaging Platform e si può modificare dall'app in Profilo > Privacy degli annunci.",
      "AdMob può raccogliere l'identificativo pubblicitario del dispositivo, l'indirizzo IP e dati sull'interazione con gli annunci. Con Premium o con l'acquisto \"Rimuovi pubblicità\" gli annunci vengono disattivati.",
    ],
  },
  {
    title: "Fornitori, luogo e sicurezza",
    items: [
      "I dati sono trattati da Google (Firebase, Google Cloud, Maps Platform, Gemini API, AdMob, Google Play) in qualità di responsabile o titolare autonomo, in data center nell'Unione Europea e negli Stati Uniti, con le garanzie previste dal GDPR.",
      "Le comunicazioni sono cifrate (HTTPS). L'accesso ai dati è limitato dalle regole di sicurezza di Firestore: ognuno vede solo il proprio profilo privato e i viaggi di cui fa parte.",
    ],
  },
  {
    title: "Basi giuridiche e conservazione",
    items: [
      "Account, viaggi condivisi, mappe, notifiche, acquisti e funzioni IA: esecuzione del servizio richiesto (art. 6.1.b GDPR).",
      "Limiti di utilizzo, verifica degli acquisti e prevenzione degli abusi: legittimo interesse del titolare (art. 6.1.f GDPR).",
      "Pubblicità personalizzata: consenso (art. 6.1.a GDPR), revocabile in qualsiasi momento.",
      "I dati restano finché l'account è attivo. Eliminando l'account vengono cancellati come descritto nella pagina di eliminazione account.",
      "Roamie non è destinata a minori di 14 anni.",
    ],
  },
  {
    title: "Eliminazione dell'account",
    items: [
      "Puoi eliminare l'account in qualsiasi momento dall'app, in Profilo > Elimina account, dopo aver confermato la password o l'account Google.",
      "Vengono eliminati profilo, foto, account di accesso, i viaggi creati da te con tutto il loro contenuto e il contatore dell'IA. Nei viaggi degli altri esci dal gruppo, i tuoi messaggi diventano anonimi e le tue foto in chat vengono cancellate.",
      "Le spese che hai registrato nei viaggi degli altri restano, senza profilo collegato, perché servono ai conti del gruppo.",
      "Eliminare l'account non annulla un abbonamento attivo: va annullato da Google Play.",
    ],
  },
  {
    title: "Diritti dell'utente",
    items: [
      "Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità od opposizione scrivendo a vrexas.developer@gmail.com.",
      "Puoi proporre reclamo al Garante per la protezione dei dati personali (https://www.garanteprivacy.it).",
    ],
  },
];

const RoamiePrivacy = () => {
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
                Informativa Privacy
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#c4c6cf]">
                Roamie serve a organizzare viaggi di gruppo: per farlo salva l'account, i viaggi condivisi e la chat su Google Firebase. Questa pagina spiega quali dati vengono trattati, da chi e perché.
              </p>
            </div>

            <div className="rounded-lg border border-[#2b2f36] bg-[#1c1f24] p-5 md:min-w-[280px]">
              <div className="mb-4 flex items-center gap-3 text-[#ffd27a]">
                <ShieldCheck size={24} />
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
                <p>Serve un account: nome, email e foto sono visibili a chi viaggia con te.</p>
                <p>Viaggi, tappe, spese e chat sono salvati su Firebase e visibili solo ai membri del viaggio.</p>
                <p>Niente GPS: le coordinate delle tappe arrivano dagli indirizzi che scrivi.</p>
                <p>Le funzioni IA Premium inviano destinazione e tappe a Google Gemini API, senza che il titolare le conservi.</p>
                <p>Puoi eliminare l'account e i dati dall'app in qualsiasi momento.</p>
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
                  to="/portfolio/roamie/terms"
                  className="ml-3 mt-5 inline-flex items-center gap-2 rounded-lg border border-[#e6cf84] px-4 py-2.5 text-sm font-bold text-[#c2410c] transition-colors hover:border-[#fe6a34]"
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

export default RoamiePrivacy;
