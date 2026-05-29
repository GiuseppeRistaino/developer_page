# Documentazione FableHearth

Ultimo aggiornamento: 29 maggio 2026

## 1. Panoramica

FableHearth è una web app per scrittori costruita con Next.js App Router e TypeScript. L'app permette di creare, organizzare e scrivere libri a capitoli con un editor avanzato basato su Tiptap, assistenza AI per riscrittura e revisione, salvataggio cloud su Firestore, autenticazione Firebase, piani con crediti mensili, pagamenti Stripe e un sistema di gamification con livelli e missioni.

La piattaforma è pensata per un flusso di scrittura completo:

1. Registrazione o login.
2. Creazione di uno o più libri.
3. Scrittura del contenuto capitolo per capitolo.
4. Gestione di personaggi, note e metadati.
5. Uso dell'AI per riscrivere passaggi selezionati o revisionare capitoli.
6. Esportazione del libro in PDF o Word.
7. Monitoraggio di crediti, limiti e progressi personali.

## 2. Stack tecnico

- Framework: Next.js 16 App Router.
- Linguaggio: TypeScript.
- UI: React 19.
- Editor: Tiptap 3 con StarterKit, underline, text-align, indent custom e note custom.
- Stili: CSS custom centralizzato in `app/globals.css`.
- Autenticazione: Firebase Auth.
- Database: Cloud Firestore.
- Server admin: Firebase Admin SDK.
- AI: OpenRouter API con fallback locale demo.
- Pagamenti: Stripe Checkout, Billing Portal e Webhook.
- Export: PDF tramite print browser e DOCX tramite libreria `docx`.
- Icone: `lucide-react`.
- Hosting previsto: Vercel.

## 3. Struttura principale del progetto

```text
app/
  page.tsx                         Homepage
  layout.tsx                       Root layout, AuthProvider, header e footer
  globals.css                      Stili globali e responsive
  login/page.tsx                   Login email/password e Google
  register/page.tsx                Registrazione e verifica email
  dashboard/page.tsx               Dashboard libri
  dashboard/[bookId]/page.tsx      Editor libro
  profile/page.tsx                 Profilo, crediti, abbonamento e sicurezza
  usage/page.tsx                   Monitor token per admin
  privacy/page.tsx                 Privacy policy
  sitemap.ts                       Sitemap
  api/                             Route server
components/
  app-header.tsx                   Header autenticato
  auth-guard.tsx                   Protezione route e verifica email
  dashboard-home.tsx               Dashboard libri e gamification
  editor-shell.tsx                 Editor principale
  editor-toolbar.tsx               Toolbar di formattazione Tiptap
  profile-shell.tsx                Profilo utente e piano
  level-badge.tsx                  Badge livello XP
  missions-panel.tsx               Missioni giornaliere/settimanali/mensili
lib/
  books.ts                         Modello libro e localStorage fallback
  firestore-books.ts               Persistenza libri Firestore
  credits.ts                       Configurazione piani e crediti
  firebase.ts                      Firebase client SDK
  firebase-admin.ts                Firebase Admin e verifica token
  token-usage.ts                   Storico locale consumi AI
  gamification.ts                  Config livelli, gradi e missioni
  firestore-gamification.ts        Sync gamification con Firestore
  export.ts                        Export PDF e Word
  stripe.ts                        Client Stripe server-side
```

## 4. Layout globale

Il layout principale è definito in `app/layout.tsx`.

Funzioni:

- Imposta metadata SEO, OpenGraph, Twitter card, canonical e verifica Google.
- Carica i font Playfair Display, Inter, Lora e Merriweather tramite `next/font/google`.
- Avvolge tutta l'app con `AuthProvider`.
- Mostra `AppHeader` quando l'utente è autenticato.
- Mostra footer globale con link alla Privacy Policy.

Header:

- Nasconde header su `/login` e `/register`.
- Mostra brand FableHearth.
- Link a Dashboard.
- Link a Monitor Token solo per admin.
- Link profilo con avatar o iniziali.
- Su mobile diventa compatto, con icone e avatar senza username.

## 5. Autenticazione e sicurezza

L'autenticazione è basata su Firebase Auth.

Metodi supportati:

- Email e password.
- Google OAuth tramite popup.

Il contesto auth è in `lib/auth-context.tsx`.

Funzioni principali:

- Ascolta lo stato sessione con `onAuthStateChanged`.
- Espone `user`, `loading`, `isAdmin` e `logout`.
- Recupera lo stato admin chiamando `/api/auth/me` con Firebase ID token.

Protezione route:

- `AuthGuard` protegge dashboard, editor, profilo e usage.
- Se l'utente non è loggato, redirect a `/login?next=...`.
- Se l'utente non ha verificato l'email, mostra schermata bloccante di verifica.
- Permette di reinviare email di verifica.
- Permette di ricaricare la sessione dopo aver verificato l'email.

Admin:

- Gli admin sono definiti tramite variabile ambiente `ADMIN_UIDS`.
- `/api/auth/me` verifica il token Firebase e restituisce `isAdmin`.
- Solo admin vedono `/usage` e la selezione manuale del modello AI nell'editor.

## 6. Piani, crediti e limiti

La configurazione è in `lib/credits.ts`.

Piano Gratuito:

- Prezzo: gratis.
- Crediti mensili: 100.000 token.
- Libri massimi: 2.
- Parole massime per libro: 100.000.
- Riscrittura AI disponibile.
- Revisione capitolo mostrata come feature Pro.

Piano Pro:

- Prezzo: 9,99 euro/mese.
- Crediti mensili: 1.000.000 token.
- Libri massimi: 20.
- Parole massime per libro: 200.000.
- Riscrittura AI disponibile.
- Revisione capitolo disponibile.
- Priorità modelli Pro quando configurati.

Gestione crediti:

- I crediti usati sono salvati sul documento Firestore `users/{uid}`.
- Il periodo viene resettato al primo giorno del mese.
- L'API AI controlla i crediti residui per utenti non admin.
- Se i crediti sono esauriti, `/api/ai` risponde con HTTP 402.
- Gli admin non subiscono deduzione crediti.

## 7. Modello dati

### Libro

Un libro (`BookRecord`) contiene:

- `id`: identificativo del libro.
- `title`: titolo.
- `genre`: genere.
- `synopsis`: sinossi, ancora nel modello dati e negli export.
- `chapters`: lista capitoli.
- `characters`: lista personaggi.
- `createdAt`: data creazione ISO.
- `updatedAt`: data aggiornamento ISO.

### Capitolo

Un capitolo contiene:

- `id`: identificativo.
- `title`: titolo del capitolo.
- `content`: HTML prodotto da Tiptap.
- `pages`: campo legacy o di compatibilità, normalizzato nel codice.

### Personaggio

Un personaggio contiene:

- `id`.
- `name`.
- `role`.
- `bio`.

La biografia è usata anche per la gamification: quando raggiunge almeno 50 parole, viene tracciata l'azione `character_created`.

### Persistenza

- In produzione con Firebase configurato: `users/{uid}/books/{bookId}` su Firestore.
- In fallback locale: `localStorage` con chiave `fablehearth-books-v1`.
- Il sistema include normalizzazione per migrare dati legacy.

Regole Firestore:

- Ogni utente può leggere e scrivere solo il proprio documento `users/{uid}`.
- Ogni utente può leggere, creare, aggiornare ed eliminare solo i propri libri.
- Il payload dei libri viene validato con campi ammessi e tipi base.

## 8. Pagine dell'app

### `/` - Homepage

File: `app/page.tsx`

Scopo:

- Presenta FableHearth ai visitatori non autenticati.
- Comunica il valore principale: scrittura libri, editor professionale e assistenza AI.
- Mostra una hero section con brand, icona e call-to-action.
- Mostra immagine fireplace con tagline.
- Presenta le feature principali.
- Presenta i prezzi dei piani Gratuito e Pro.

Azioni disponibili:

- `Inizia gratis` porta a `/register`.
- `Accedi` porta a `/login`.
- `Dashboard` porta a `/dashboard`.

Sezioni:

- Hero FableHearth.
- Sezione visuale fireplace.
- Feature grid: editor, AI, crediti, sicurezza, modelli AI, tema scuro.
- Pricing grid con limiti dei due piani.

### `/login` - Accesso

File: `app/login/page.tsx`

Scopo:

- Permette l'accesso a utenti già registrati.

Funzioni:

- Login con email e password tramite Firebase Auth.
- Login con Google tramite `signInWithGoogle()`.
- Gestione redirect `next` per tornare alla pagina protetta richiesta.
- Messaggi di errore se Firebase non è configurato o se login fallisce.
- Redirect automatico a destinazione se l'utente è già autenticato.

Campi:

- Email.
- Password.

Azioni:

- `Accedi`.
- `Continua con Google`.
- Link a `/register`.

### `/register` - Registrazione

File: `app/register/page.tsx`

Scopo:

- Permette la creazione di un account.

Funzioni:

- Registrazione con nome, email e password.
- Registrazione con Google.
- Invio email di verifica dopo registrazione email/password.
- Schermata dedicata `Controlla la tua email`.
- Possibilità di reinviare l'email di verifica.
- Redirect a `/dashboard` solo se l'email è verificata.

Campi:

- Nome completo.
- Email.
- Password.

Nota:

- La verifica email è obbligatoria per accedere alle route protette.
- Gli account Google risultano normalmente già verificati secondo Firebase.

### `/dashboard` - Dashboard libri

File: `app/dashboard/page.tsx`
Componente: `components/dashboard-home.tsx`

Scopo:

- Mostra la libreria personale dell'utente.
- Permette di creare, aprire ed eliminare libri.
- Mostra progressi di gamification.

Funzioni principali:

- Sincronizza libri da Firestore in tempo reale.
- Mostra stato caricamento.
- Ordina i libri per `updatedAt` decrescente.
- Crea un nuovo libro con titolo inserito dall'utente.
- Blocca creazione se il limite del piano è raggiunto.
- Mostra messaggio per passare al Piano Pro quando serve.
- Elimina libri.
- Mostra card per ogni libro con titolo, genere, sinossi, capitoli e ultima modifica.
- Mostra contatore parole per ogni libro con barra di avanzamento rispetto al limite del piano.
- Mostra banner di verifica email se necessario.
- Mostra link `Monitor token` solo per admin.
- Mostra sezione `Il tuo percorso` con livello e missioni.

Elementi UI:

- Hero dashboard.
- Form creazione libro.
- Griglia libri.
- Card libro.
- LevelBadge.
- MissionsPanel.

### `/dashboard/[bookId]` - Editor libro

File: `app/dashboard/[bookId]/page.tsx`
Componente: `components/editor-shell.tsx`

Scopo:

- È la schermata principale di scrittura.
- Permette gestione libro, capitoli, personaggi, note, AI, dettatura e export.

Struttura desktop:

- Sidebar sinistra: capitoli e personaggi.
- Centro: editor Tiptap.
- Sidebar destra: pannello AI e note.

Struttura mobile:

- Navigazione inferiore con tre tab: `Struttura`, `Scrivi`, `AI`.
- Mostra un pannello alla volta per massimizzare lo spazio di scrittura.
- Toolbar formattazione scorrevole orizzontalmente.
- Pulsante floating `Riscrivi` direttamente sopra il testo selezionato.

#### Editor Tiptap

Supporta:

- Paragrafi.
- Titoli H1, H2, H3.
- Grassetto.
- Corsivo.
- Sottolineato.
- Barrato.
- Allineamento a sinistra, centro, destra e giustificato.
- Rientro e riduzione rientro.
- Note su testo selezionato.
- Tema canvas: Notte, Bianco, Seppia.
- Font canvas: Georgia, Playfair Display, Lora, Merriweather, Inter, Courier New.

Il contenuto è salvato come HTML nel campo `chapter.content`.

#### Salvataggio

- Le modifiche locali aggiornano lo stato e il localStorage.
- Il pulsante `Salva` scrive su Firestore tramite `saveUserBook`.
- Dopo il salvataggio viene tracciata la gamification con `book_saved` e numero parole.
- Un puntino `●` accanto al titolo indica modifiche non salvate.
- La subscription Firestore evita rollback se ci sono modifiche locali sporche.

#### Capitoli

Funzioni:

- Lista capitoli.
- Creazione nuovo capitolo.
- Eliminazione capitolo, ma non se è l'unico.
- Selezione capitolo corrente.
- Modifica titolo capitolo dal pannello AI.

#### Personaggi

Funzioni:

- Lista personaggi.
- Creazione personaggio.
- Modifica nome.
- Modifica ruolo.
- Modifica biografia.
- Eliminazione personaggio.
- Contatore parole biografia: `x / 50 parole`.
- Quando la bio raggiunge 50 parole, viene tracciata la missione collegata.

#### Note

Funzioni:

- L'utente seleziona testo e usa il pulsante nota nella toolbar.
- La nota viene salvata come mark Tiptap `span[data-note]`.
- Il pannello note mostra tutte le note del capitolo.
- Ogni nota mostra estratto selezionato e testo nota.
- Cliccando l'estratto si torna al testo annotato.
- È possibile rimuovere una nota.

#### AI - Riscrittura selezione

Flusso:

1. L'utente seleziona un passaggio.
2. Sceglie tipo di miglioramento: più coinvolgente, più descrittivo, più conciso o tono formale.
3. Clicca `Riscrivi selezione` oppure su mobile usa il floating button `Riscrivi`.
4. L'app invia richiesta a `/api/ai` con `mode: rewrite`.
5. L'AI restituisce una proposta.
6. Si apre un modal di confronto.

Modal confronto:

- Mostra testo originale e proposta AI affiancati su desktop.
- Su mobile i pannelli si impilano.
- Evidenzia rimozioni e inserimenti tramite diff parola per parola.
- Azioni disponibili: `Accetta`, `Riprova`, `Rifiuta`.
- Mostra modello usato e se è stato usato fallback.

#### AI - Revisione capitolo

- Disponibile solo per Piano Pro.
- Analizza l'intero capitolo corrente.
- Invia richiesta a `/api/ai` con `mode: review`.
- Aggiunge feedback e suggerimenti al testo o mostra risultato secondo il flusso previsto dal componente.
- Per utenti free viene mostrato modal upgrade con confronto piani.

#### Dettatura vocale

- Pulsante microfono nella topbar dell'editor.
- Usa Web Speech API del browser.
- Lingua impostata su `it-IT`.
- Inserisce nel documento il testo finale riconosciuto.
- Mostra testo interim in una barra nell'editor mentre l'utente parla.
- Su mobile usa `continuous = false` e restart manuale con nuova istanza per evitare duplicati.
- Se il browser non supporta Web Speech API, mostra messaggio di errore.
- Se il permesso microfono viene negato, mostra istruzione per abilitarlo.

Compatibilità indicativa:

- Chrome e Edge: supporto buono.
- Safari: supporto variabile a seconda della versione.
- Firefox: Web Speech API non generalmente disponibile.

#### Export

Menu `Esporta`:

- PDF: apre una finestra stampabile con formattazione A4, pagina titolo e capitoli.
- Word `.docx`: usa `docx` lato client, converte HTML Tiptap in paragrafi e text run.

#### Contatori parole

Sidebar editor:

- Parole capitolo corrente.
- Parole totali libro.
- Limite parole in base al piano.
- Barra con stato normale, warning o over-limit.

### `/profile` - Profilo utente

File: `app/profile/page.tsx`
Componente: `components/profile-shell.tsx`

Scopo:

- Gestione profilo, piano, crediti, sicurezza e cancellazione account.

Funzioni profilo:

- Mostra email utente.
- Avatar con iniziali o immagine.
- Upload immagine avatar: ridimensionata client-side a JPEG data URL max 120x120.
- Modifica nome e cognome.
- Salvataggio su Firebase Auth `displayName` e `photoURL`.
- Logout.

Crediti e piano:

- Mostra piano attivo.
- Mostra token residui e token usati.
- Barra di consumo crediti.
- Mostra rinnovo mensile.
- Mostra LevelBadge.
- Mostra card Piano Gratuito e Piano Pro.
- Per Piano Pro inattivo: pulsante `Passa al Piano Pro`.
- Per Piano Pro attivo: dati attivazione/rinnovo e pulsante gestione abbonamento.

Stripe:

- Avvio checkout con `/api/stripe/checkout`.
- Checkout aperto in nuovo tab.
- Gestione abbonamento con `/api/stripe/portal`.
- Sincronizzazione periodo abbonamento con `/api/stripe/sync-subscription` se mancano date.
- Messaggio post-checkout tramite query `?success=1`.

Sicurezza:

- Mostra stato email verificata.
- Permette invio email di verifica se non verificata.
- Permette cambio password con password attuale, nuova password e conferma.
- La nuova password deve essere lunga almeno 8 caratteri.
- Usa reautenticazione Firebase prima di aggiornare password.

Zona pericolosa:

- Cancellazione account permanente.
- Richiede password.
- Usa reautenticazione Firebase prima di `deleteUser`.
- Dopo cancellazione redirect a `/login`.

### `/usage` - Monitor token admin

File: `app/usage/page.tsx`

Scopo:

- Monitorare consumi token AI.
- Accessibile solo agli admin.

Protezione:

- Usa `AuthGuard`.
- Se l'utente non è admin, redirect a `/dashboard`.

Funzioni:

- Legge storico locale dei consumi AI da `token-usage`.
- Carica modelli disponibili da `/api/ai/models`.
- Filtro per modello o tutti i modelli.
- Budget mensile personale modificabile.
- Pulsante aggiorna.
- Link torna dashboard.

Statistiche:

- Token oggi: input, output, totale.
- Token questo mese: input, output, totale.
- Token da sempre: input, output, totale.
- Budget mensile: budget, usati, rimanenti.

Grafici:

- Andamento consumi per modello.
- Modalità giornaliera: ultime 24 ore.
- Modalità mensile: ultimi 30 giorni.
- Legenda per modello.
- Grafico SVG polyline.

Tabella:

- Ultime 50 risposte AI.
- Data.
- Modello.
- Modalità.
- Token input.
- Token output.
- Totale.

### `/privacy` - Privacy Policy

File: `app/privacy/page.tsx`

Scopo:

- Mostra informativa privacy pubblica.

Contenuti principali:

- Titolare del trattamento.
- Dati raccolti.
- Finalità e base giuridica.
- Sub-processor: Firebase/Firestore, Stripe, OpenRouter.
- Conservazione dati.
- Diritti GDPR.
- Cookie e tracciamento.
- Aggiornamenti dell'informativa.

### `/sitemap.xml` - Sitemap

File: `app/sitemap.ts`

Scopo:

- Genera sitemap statica per motori di ricerca.

URL inclusi:

- `/`
- `/login`
- `/register`
- `/privacy`

## 9. API server

### `GET /api/auth/me`

File: `app/api/auth/me/route.ts`

Scopo:

- Verifica Firebase ID token.
- Restituisce `uid` e `isAdmin`.
- Se token assente o invalido, restituisce `{ isAdmin: false }`.

Usata da:

- `AuthProvider` per determinare se mostrare funzioni admin.

### `POST /api/ai`

File: `app/api/ai/route.ts`

Scopo:

- Endpoint principale per riscrittura e revisione AI.

Body:

```json
{
  "mode": "rewrite",
  "text": "testo da elaborare",
  "tone": "piu coinvolgente",
  "model": "opzionale"
}
```

Modalità:

- `rewrite`: riscrive un passaggio nello stesso linguaggio dell'input.
- `review`: analizza un capitolo e produce feedback su chiarezza, ritmo, coerenza e stile.

Funzioni:

- Valida presenza testo.
- Usa fallback demo se `OPENROUTER_API_KEY` non è configurata.
- Verifica token utente se presente.
- Carica crediti e piano utente.
- Blocca richiesta se crediti mensili esauriti.
- Seleziona modelli candidati:
  - Admin: modello richiesto + modelli Pro + modelli free.
  - Piano Pro: modelli Pro poi free.
  - Piano Free: solo modelli free.
- Tenta fallback su modello successivo in caso di 402, 404, 429 o errori server.
- Deduce token usati per utenti autenticati non admin.
- Restituisce output, sorgente, modello, fallback e usage.

### `GET /api/ai/models`

File: `app/api/ai/models/route.ts`

Scopo:

- Restituisce modelli OpenRouter configurati.

Accesso:

- Solo admin ricevono lista modelli.
- Utenti non admin ricevono lista vuota e default null.

### `GET /api/credits`

File: `app/api/credits/route.ts`

Scopo:

- Legge crediti utente autenticato.
- Inizializza documento crediti se mancante.
- Reset automatico se il periodo mensile è scaduto.

### `PATCH /api/credits`

Scopo:

- Aggiorna piano utente a `free` o `paid`.

Nota:

- Nel flusso reale di abbonamento il piano viene aggiornato dai webhook Stripe.

### `POST /api/credits`

Scopo:

- Incrementa `creditsUsed` dell'utente di un numero di token.

### `POST /api/gamification/track`

File: `app/api/gamification/track/route.ts`

Scopo:

- Traccia azioni utente e aggiorna missioni, XP e livello.

Azioni supportate:

- `book_saved`
- `chapter_created`
- `book_created`
- `words_written`
- `character_created`

Funzioni:

- Verifica token Firebase.
- Usa transazione Firestore.
- Calcola delta parole per salvataggi libro.
- Aggiorna progressi delle missioni giornaliere, settimanali e mensili.
- Aggiunge XP solo una volta per missione completata nel periodo corrente.
- Ricalcola livello fino al massimo 100.

### `POST /api/stripe/checkout`

File: `app/api/stripe/checkout/route.ts`

Scopo:

- Crea sessione Stripe Checkout per abbonamento Piano Pro.

Funzioni:

- Verifica token utente.
- Richiede `STRIPE_PRICE_ID`.
- Riusa `stripeCustomerId` se già presente.
- Altrimenti usa email utente.
- Aggiunge `uid` nei metadata della sessione.
- Usa `NEXT_PUBLIC_APP_URL` per success e cancel URL.

### `POST /api/stripe/portal`

File: `app/api/stripe/portal/route.ts`

Scopo:

- Crea sessione Stripe Billing Portal per gestire abbonamento.

Funzioni:

- Verifica token utente.
- Recupera `stripeCustomerId` da Firestore.
- Restituisce URL portale.

### `POST /api/stripe/sync-subscription`

File: `app/api/stripe/sync-subscription/route.ts`

Scopo:

- Sincronizza da Stripe la data di rinnovo dell'abbonamento dell'utente corrente.

Funzioni:

- Verifica token.
- Legge `stripeSubscriptionId` da Firestore.
- Usa `stripe.invoices.createPreview` per ricavare `next_payment_attempt`.
- Fallback su `billing_cycle_anchor` se preview fallisce.
- Salva `subscriptionCurrentPeriodEnd` in Firestore.

### `POST /api/stripe/webhook`

File: `app/api/stripe/webhook/route.ts`

Scopo:

- Riceve eventi Stripe e aggiorna Firestore.

Eventi gestiti:

- `checkout.session.completed`: attiva piano paid, salva customer e subscription.
- `customer.subscription.updated`: aggiorna data rinnovo e stato cancellazione a fine periodo.
- `customer.subscription.deleted`: riporta piano a free.
- `invoice.payment_failed`: riporta piano a free.

Sicurezza:

- Verifica firma Stripe con `STRIPE_WEBHOOK_SECRET`.
- Usa Firebase Admin Firestore.

## 10. Gamification

Configurazione in `lib/gamification.ts`.

Sistema livelli:

- Livello massimo: 100.
- XP per passare dal livello N al livello N+1: `50 * N`.
- Il livello viene calcolato dagli XP totali.

Gradi:

- Livello 1: Scribacchino.
- Livello 10: Esordiente.
- Livello 20: Narratore.
- Livello 30: Cronista.
- Livello 40: Bardo.
- Livello 50: Romanziere.
- Livello 60: Maestro della Penna.
- Livello 70: Arciscrittore.
- Livello 80: Leggendario.
- Livello 90: Guardiano delle Storie.

Missioni:

Giornaliere:

- `Penna in mano`: crea un personaggio con almeno 50 parole di descrizione, +75 XP.
- `Flusso di parole`: scrivi almeno 300 parole oggi, +100 XP.

Settimanali:

- `Flusso creativo`: scrivi 2.000 parole questa settimana, +300 XP.
- `Creatore di mondi`: crea 10 personaggi con almeno 50 parole di descrizione, +400 XP.

Mensili:

- `Grande opera`: scrivi 8.000 parole questo mese, +1500 XP.
- `Narratore prolifico`: crea 20 personaggi con almeno 50 parole di descrizione, +1000 XP.

Reset periodi:

- Giornaliere: chiave per data.
- Settimanali: chiave per settimana ISO.
- Mensili: chiave per mese.

## 11. AI e OpenRouter

Variabili principali:

- `OPENROUTER_API_KEY`: chiave API.
- `OPENROUTER_MODEL`: modello default.
- `OPENROUTER_MODELS`: lista modelli free/fallback separata da virgole.
- `OPENROUTER_MODELS_PRO`: lista modelli per Piano Pro.

Prompt rewrite:

- Imposta ruolo editor fiction professionale.
- Chiede di riscrivere mantenendo la stessa lingua.
- Preserva significato e voce narrativa.
- Richiede output senza spiegazioni.

Prompt review:

- Imposta ruolo editor letterario.
- Chiede feedback su chiarezza, ritmo, coerenza e stile.
- Richiede stessa lingua del capitolo.
- Chiude con 3 suggerimenti pratici.

Fallback:

- Se manca `OPENROUTER_API_KEY`, l'endpoint risponde con output demo locale.
- Utile per test UI senza credenziali AI.

Storico token:

- Il client registra uso token in `token-usage`.
- `/usage` usa questo storico per statistiche admin.

## 12. Pagamenti Stripe

Variabili richieste:

- `STRIPE_SECRET_KEY`: chiave segreta Stripe.
- `STRIPE_PRICE_ID`: price ID dell'abbonamento Pro.
- `STRIPE_WEBHOOK_SECRET`: secret webhook Stripe.
- `NEXT_PUBLIC_APP_URL`: URL pubblico app per redirect Stripe.

Flusso checkout:

1. Utente clicca `Passa al Piano Pro` in `/profile`.
2. Il client chiama `/api/stripe/checkout`.
3. Il server crea una sessione subscription.
4. Stripe redirige o apre checkout.
5. Il webhook `checkout.session.completed` aggiorna Firestore a `plan: paid`.
6. La pagina profilo mostra piano e date abbonamento.

Flusso gestione:

1. Utente Pro clicca `Gestisci abbonamento`.
2. Il client chiama `/api/stripe/portal`.
3. Stripe Billing Portal consente modifica/cancellazione.
4. Webhook aggiorna stato in Firestore.

## 13. Export

File: `lib/export.ts`

PDF:

- Crea una nuova finestra browser.
- Scrive HTML completo con CSS A4.
- Include pagina titolo, genere, sinossi e capitoli.
- Usa `window.print()` per salvataggio/stampa PDF.

Word:

- Import dinamico di `docx`.
- Converte HTML Tiptap in paragrafi Word.
- Supporta grassetto, corsivo, sottolineato, heading e separatori.
- Genera `.docx` scaricabile.
- Nome file derivato dal titolo libro.

## 14. Responsive e mobile

L'app include CSS responsive in `app/globals.css`.

Principi mobile:

- Header compatto.
- Dashboard e card a una colonna.
- Padding ridotti nelle pagine.
- Editor con layout a pannelli alternativi.
- Bottom nav editor: Struttura, Scrivi, AI.
- Floating button AI direttamente sul testo selezionato.
- Diff modal impilato verticalmente.
- Toolbar editor scorrevole orizzontalmente.
- Canvas di scrittura con padding ridotto.

## 15. Variabili ambiente

Client Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Firebase Admin:

```env
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
ADMIN_UIDS=
```

Nota:

- `FIREBASE_ADMIN_CLIENT_EMAIL` e `FIREBASE_ADMIN_PRIVATE_KEY` sono necessari per operazioni server-side Firestore admin, webhook Stripe e gamification route.
- Per sola verifica token può bastare il project ID, ma l'app usa anche Firestore Admin in alcune API.

OpenRouter:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
OPENROUTER_MODELS=
OPENROUTER_MODELS_PRO=
```

Stripe:

```env
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=
```

## 16. Avvio locale

Installazione:

```bash
npm install
```

Copia ambiente:

```bash
copy .env.example .env.local
```

Avvio sviluppo:

```bash
npm run dev
```

Build produzione:

```bash
npm run build
```

Avvio produzione locale:

```bash
npm run start
```

Lint:

```bash
npm run lint
```

## 17. Configurazione servizi esterni

Firebase:

1. Creare progetto Firebase.
2. Abilitare Authentication.
3. Abilitare provider Email/Password.
4. Abilitare provider Google.
5. Aggiungere dominio pubblico in Authorized Domains.
6. Configurare Firestore.
7. Pubblicare `firestore.rules`.
8. Inserire variabili `NEXT_PUBLIC_FIREBASE_*`.
9. Inserire eventuali credenziali admin.

OpenRouter:

1. Creare API key.
2. Configurare `OPENROUTER_API_KEY`.
3. Configurare modello default e fallback.
4. Configurare modelli Pro se desiderati.

Stripe:

1. Creare prodotto Piano Pro.
2. Creare price ricorrente mensile.
3. Inserire `STRIPE_PRICE_ID`.
4. Configurare webhook verso `/api/stripe/webhook`.
5. Inserire `STRIPE_WEBHOOK_SECRET`.
6. Inserire `STRIPE_SECRET_KEY`.

## 18. Note operative

- L'app è progettata per funzionare anche in modalità parziale senza Firebase configurato, usando localStorage per alcuni dati.
- Le route protette richiedono Firebase configurato per l'uso reale.
- Il salvataggio cloud dei libri è su Firestore.
- Il tracciamento crediti lato server usa REST Firestore e/o Admin SDK a seconda del flusso.
- L'AI ha fallback locale solo per test, non per produzione editoriale.
- La dettatura dipende dal supporto browser e dal permesso microfono.
- La revisione capitolo è una feature Pro nel frontend.
- Il Monitor Token è pensato per admin e usa storico locale lato client.

## 19. Flussi utente principali

### Nuovo utente email/password

1. Visita `/`.
2. Clicca `Inizia gratis`.
3. Compila registrazione.
4. Riceve email verifica.
5. Verifica email.
6. Accede alla dashboard.
7. Crea il primo libro.
8. Entra nell'editor.

### Scrittura libro

1. Crea o apre libro da dashboard.
2. Scrive nel capitolo corrente.
3. Crea nuovi capitoli se necessario.
4. Aggiunge personaggi.
5. Usa note per annotazioni interne.
6. Salva.
7. Esporta PDF o Word.

### Riscrittura AI

1. Seleziona testo.
2. Sceglie tipo miglioramento.
3. Avvia riscrittura.
4. Confronta originale e proposta.
5. Accetta, riprova o rifiuta.

### Upgrade Piano Pro

1. Entra in `/profile`.
2. Clicca `Passa al Piano Pro`.
3. Completa Stripe Checkout.
4. Webhook aggiorna piano a paid.
5. Profilo mostra crediti Pro e gestione abbonamento.

## 20. File chiave da conoscere

- `components/editor-shell.tsx`: cuore dell'editor e delle funzioni AI/dettatura/export.
- `components/dashboard-home.tsx`: creazione e gestione libri.
- `components/profile-shell.tsx`: profilo, piani, Stripe e sicurezza.
- `app/api/ai/route.ts`: orchestrazione AI, crediti e fallback modelli.
- `app/api/stripe/webhook/route.ts`: sincronizzazione pagamenti.
- `lib/credits.ts`: limiti dei piani.
- `lib/gamification.ts`: livelli e missioni.
- `lib/books.ts`: modello libro e normalizzazione.
- `app/globals.css`: layout, tema e responsive.


## DEPLOY
il deploy è stato fatto su Vercel
https://vercel.com/giuseppe-ristaino-s-projects
nella cartella "Vercel/Recovery Codes" trovi i recovery codes per la passkey