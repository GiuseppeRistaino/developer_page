# Software Requirement Specification (SRS)
## Progetto: SmartReceipt - App Mobile per l'Analisi delle Spese tramite Scontrini

---

## 1. INTRODUZIONE E OBIETTIVI DEL PROGETTO
L'applicazione **SmartReceipt** è una soluzione mobile "Offline-First" progettata per consentire agli utenti di digitalizzare, archiviare e analizzare gli scontrini fiscali cartacei. 

### Obiettivi chiave:
* **Digitalizzazione Avanzata**: Estrarre dati granulari (singoli prodotti, prezzi, quantità, sconti, dati del negozio) anche da scontrini molto lunghi o deteriorati.
* **Normalizzazione dei Dati**: Utilizzare l'Intelligenza Artificiale per tradurre le abbreviazioni criptiche dei POS dei supermercati in nomi di prodotti comprensibili.
* **Business Intelligence Personale**: Fornire grafici, trend di spesa e statistiche avanzate (es. spesa media per negozio, prodotti più acquistati).
* **Privacy by Design**: Archiviare tutti i dati sensibili e storici localmente sul dispositivo dell'utente.
* **Identità visiva**: L'app usa la nuova icona `icon_scantrak` e mostra uno splash screen brandizzato all'avvio prima del flusso di autenticazione.

---

## 2. ARCHITETTURA DI SISTEMA E FLUSSO DEI DATI

L'architettura segue una pipeline sequenziale divisa tra elaborazione on-device (sul telefono) ed elaborazione cloud leggera (AI):

1. **Acquisizione**: L'utente fotografa lo scontrino (singolo o in modalità continua per scontrini lunghi).
2. **Pre-elaborazione locale**: L'app converte l'immagine in scala di grigi, aumenta il contrasto e corregge la prospettiva.
3. **Analisi AI Cloud**: L'immagine ottimizzata viene inviata alle API di Gemini (es. Gemini 1.5 Flash). L'AI esegue l'OCR e la strutturazione semantica contemporaneamente, restituendo un payload JSON.
4. **Storage locale**: Il motore dell'app valida il JSON e lo inserisce nel database relazionale locale (SQLite/Realm).
5. **Visualizzazione**: La UI interroga il DB locale per aggiornare grafici e statistiche in tempo reale e offline.

---

## 3. ARCHITETTURA DEI DATI (DATABASE SCHEMA)

Per consentire analisi statistiche, i dati vengono strutturati in una relazione **1-a-Molti** tra la tabella dello scontrino e la tabella dei singoli articoli.

### Tabella: `Scontrini`
| Campo | Tipo di Dato | Vincoli | Descrizione / Esempio |
| :--- | :--- | :--- | :--- |
| `id_scontrino` | INTEGER | PRIMARY KEY AUTOINCREMENT | Identificativo univoco della spesa |
| `negozio` | VARCHAR(255) | NOT NULL | Nome dell'insegna (es. "Esselunga") |
| `data_spesa` | DATE | NOT NULL | Data del documento (YYYY-MM-DD) |
| `totale_pagato` | DECIMAL(10,2) | NOT NULL | Importo totale (es. 54.20) |
| `metodo_pagamento`| VARCHAR(50) | NULLABLE | Carta, Contanti, Satispay, Bancomat |

### Tabella: `Elementi_Scontrino`
| Campo | Tipo di Dato | Vincoli | Descrizione / Esempio |
| :--- | :--- | :--- | :--- |
| `id_elemento` | INTEGER | PRIMARY KEY AUTOINCREMENT | Identificativo della singola riga |
| `id_scontrino` | INTEGER | FOREIGN KEY -> Scontrini | Collegamento allo scontrino padre |
| `prodotto_grezzo` | VARCHAR(255) | NOT NULL | Testo originale (es. "FOCACC.NE PUG") |
| `prodotto_pulito` | VARCHAR(255) | NOT NULL | Nome normalizzato dall'AI (es. "Focaccia Pugliese") |
| `quantita` | INTEGER | NOT NULL DEFAULT 1 | Numero di pezzi acquistati |
| `prezzo_unitario` | DECIMAL(10,2) | NOT NULL | Prezzo del singolo pezzo |
| `prezzo_totale` | DECIMAL(10,2) | NOT NULL | Quantità * Prezzo Unitario |
| `categoria` | VARCHAR(100) | NOT NULL | Tag assegnato dall'AI (es. "Alimentari") |

---

## 4. SPECIFICHE DELLE SCHERMATE (MAPPA DELLE PAGINE)

L'applicazione si compone di 6 schermate principali. Di seguito viene dettagliato lo scopo di ciascuna pagina, cosa mostra a schermo e come viene strutturata visivamente l'interfaccia utente.

### PAGINA 1: Dashboard / Home Screen
* **Scopo**: Offrire una panoramica immediata delle spese correnti e l'accesso rapido allo scanner.
* **Visualizzazione e Interfaccia**:
    * **KPI Generali (Card in alto)**: Una card dal design moderno posizionata nella parte superiore dello schermo. Mostra in grassetto la spesa totale del mese corrente (es. "342,50 €"), affiancata da piccoli indicatori che segnalano il numero di scontrini scansionati e una barra di progresso lineare per il budget mensile. Il budget è modificabile dalla card e viene salvato localmente.
    * **Andamento mese**: Card sintetica che confronta la spesa del mese corrente con quella del mese precedente, così l'utente capisce se sta spendendo di più o di meno rispetto al periodo precedente.
    * **Grafico Quick View**: Sotto le card dei KPI, un widget circolare mostra un grafico a ciambella (Donut Chart) interattivo. Questo grafico rappresenta la ripartizione percentuale delle spese del mese per Macro-Categoria (es. Fette colorate: 60% Alimentari, 20% Casa, 10% Salute). Al centro della ciambella viene mostrato il testo della categoria principale.
    * **Feed Ultime Attività**: Nella metà inferiore della pagina, una lista verticale a scorrimento (Scroll View) elenca gli ultimi 3 o 4 scontrini scansionati. Ogni riga dell'elenco mostra l'icona o il logo stilizzato del negozio, il nome del supermercato, la data di acquisto e il prezzo totale sulla destra in colore contrastante.
    * **Pulsante Flottante (FAB)**: Un grande pulsante circolare colorato con l'icona di una fotocamera è posizionato nell'angolo in basso a destra o al centro della barra di navigazione inferiore.
* **Azioni dell'utente**:
    * Tap sul pulsante flottante (FAB) -> Attiva istantaneamente la **Pagina 2 (Scanner)**.
    * Tap su uno scontrino recente nel feed -> Sotto-apertura del dettaglio dello scontrino in modalità consultazione.
    * Tap sul grafico circolare -> Reindirizzamento automatico alla **Pagina 5 (Statistiche)**.

### PAGINA 2: Fotocamera / Scanner Documenti
* **Scopo**: Gestire l'acquisizione dell'immagine dello scontrino garantendo la massima qualità per l'AI.
* **Visualizzazione e Interfaccia**:
    * **Inquadratura Live**: L'anteprima video della fotocamera occupa il 100% dello schermo (Full Screen).
    * **Overlay Intelligente**: Un mirino rettangolare semi-trasparente dai bordi illuminati è sovrapposto al centro dello schermo. In modalità Smart viene avviato lo scanner documentale nativo basato su Google ML Kit, con rilevamento automatico dei bordi, crop prospettico, rotazione e miglioramento dell'immagine.
    * **Barra dei Controlli Inferiore**: Posizionata sopra il fondo della pagina, contiene:
        * A sinistra: Il pulsante per attivare/disattivare il flash della fotocamera (Icona fulmine).
        * Al centro: Il grande pulsante circolare di scatto.
        * A destra: Il selettore di modalità tramite uno "Slider" orizzontale di testo.
    * **Selettore Modalità**: 
        * *Smart*: Impostazione predefinita per scontrini di lunghezza normale. Usa lo scanner documentale nativo e restituisce un'immagine già ritagliata e raddrizzata.
        * *Manuale*: Fallback con scatto diretto dalla fotocamera dell'app, utile se lo scanner smart non è disponibile sul dispositivo.
        * *Lungo*: Usa lo scanner documentale multi-pagina per acquisire fino a 3 sezioni consecutive dello stesso scontrino dall'alto verso il basso. Le immagini vengono inviate all'AI come un unico documento, con istruzioni per eliminare doppioni nelle zone sovrapposte.
* **Azioni dell'utente**:
    * Tap sul pulsante di scatto manuale (se non si desidera lo scatto automatico al rilevamento dei bordi).
    * Tap sul pulsante "X" o "Annulla" in alto a sinistra per interrompere la fotocamera e tornare alla Dashboard.

### PAGINA 3: Schermata di Validazione e Revisione Dati
* **Scopo**: Permettere l'interazione umana per correggere eventuali errori dell'AI prima di salvare i dati nel database.
* **Visualizzazione e Interfaccia**:
    * **Layout Split-Screen (Doppio Blocco)**:
        * *Blocco Superiore (Riducibile)*: Mostra l'immagine reale dello scontrino appena scansionato all'interno di un box interattivo che supporta lo zoom "Pinch-to-zoom". Questo permette all'utente di verificare visivamente i dati originali in caso di dubbi.
        * *Blocco Inferiore (Scorrevole)*: Un modulo a scorrimento verticale contenente tutti i campi di testo compilati dall'AI in formato modificabile.
    * **Campi di Testata**: Nella parte alta del modulo ci sono i dati generali della spesa organizzati in griglia: un campo di testo per il nome del "Negozio", un selettore di data ("Data Spesa") che apre un calendario a comparsa, un campo numerico per il "Totale" e un menu a tendina (Dropdown) per il "Metodo di Pagamento".
    * **Tabella Lista Articoli**: Sotto i campi di testata, una lista mostra ogni singolo prodotto rilevato dall'AI. Ogni riga è organizzata in tre colonne:
        * Colonna 1: Nome originale affiancato dal campo di testo modificabile con il "Nome Pulito".
        * Colonna 2: Campi numerici con pulsanti "+" e "-" per regolare al volo "Quantità" e "Prezzo".
        * Colonna 3: Un chip colorato cliccabile che indica la "Categoria" assegnata (es. Chip Verde per Alimentari, Chip Blu per Casa).
* **Azioni dell'utente**:
    * Tap su qualsiasi campo di testo per correggere manualmente errori di lettura dell'AI.
    * Tap sul chip della categoria per aprire un menu popup con l'elenco di tutte le categorie disponibili e riclassificare il prodotto.
    * Scorrimento verso destra su una riga per mostrare un pulsante rosso "Elimina" per cancellare righe indesiderate (es. scritte promozionali lette come prodotti).
    * Tap sul pulsante fisso in basso a schermo intero **"Conferma e Salva nel Database"**.

### PAGINA 4: Archivio Storico / Lista Scontrini
* **Scopo**: Permettere la consultazione, il filtraggio e la ricerca di scontrini passati.
* **Visualizzazione e Interfaccia**:
    * **Header di Ricerca**: La parte superiore della pagina ospita una barra di ricerca testuale permanente con un'icona a lente d'ingrandimento. Consente di digitare parole chiave (es. "Pasta", "Coop").
    * **Fila dei Filtri (Chips Orizzontali)**: Subito sotto la barra di ricerca, una riga scorrevole in orizzontale contiene dei filtri rapidi sotto forma di pulsanti a capsula (Chips). Esempi: *"Questo mese"*, *"Esselunga"*, *"Alimentari"*, *"Spesa > 50€"*. I chip cambiano colore quando vengono attivati.
    * **Lista Cronologica**: Il corpo principale della pagina è una lista a scorrimento infinito. Gli scontrini sono raggruppati visivamente per mese o per settimana (es. un'intestazione grigia che dice *"Maggio 2026"*). Ogni scontrino è rappresentato da una card pulita che mostra il giorno del mese in grande sulla sinistra, il nome del supermercato al centro con il numero di articoli sotto, e l'importo totale in grassetto sulla destra.
* **Azioni dell'utente**:
    * Digitazione nella barra per filtrare istantaneamente la lista in base al testo inserito.
    * Tap su una card scontrino per aprire la schermata di visualizzazione dei dettagli (analoga alla pagina 3, ma in modalità di sola lettura).
    * Scorrimento deciso (Swipe) verso sinistra su una card per attivare l'azione rapida di eliminazione, che mostra un popup di conferma: *"Vuoi eliminare definitivamente questo scontrino?"*.

### PAGINA 5: Statistiche ed Analytics Avanzate
* **Scopo**: Estrarre valore dai dati accumulati rispondendo alle domande di spesa dell'utente tramite grafici complessi.
* **Visualizzazione e Interfaccia**:
    * **Selettore Temporale Superiore**: Un controllo segmentato (Tab Bar) all'inizio della pagina permette di cambiare l'orizzonte temporale dei grafici con un solo tocco: *"1 Mese"*, *"3 Mesi"*, *"6 Mesi"*, *"1 Anno"*.
    * **Grafico 1: Trend Mensile (Line Chart)**: Un grafico a linee cartesiano che occupa la prima metà della pagina. Sull'asse X sono riportati i mesi, sull'asse Y gli importi in euro. Una linea curva morbida e colorata mostra visivamente se le spese totali dell'utente stanno crescendo o diminuendo nel tempo.
    * **Grafico 2: Classifica Negozi (Bar Chart)**: Scorrendo verso il basso, un grafico a barre orizzontali mette a confronto i diversi supermercati frequentati. La barra più lunga rappresenta il negozio in cui l'utente ha lasciato la maggior quantità di denaro nel periodo selezionato.
    * **Sezione Insight / Risposte Rapide (Griglia di Card)**: In fondo alla pagina, l'interfaccia presenta una griglia a due colonne con card informative sintetiche:
        * *Card Spesa Media*: Mostra una lista testuale pulita con il calcolo matematico della spesa media per scontrino in ogni supermercato (es. *Esselunga: Spesa media 48,20 €*).
        * *Card Top Prodotti*: Mostra la classifica dei 5 o 10 prodotti più acquistati in assoluto dall'utente espressa in numero totale di pezzi (es. *1. Latte Scatola - 24 pezzi*).
* **Azioni dell'utente**:
    * Tap sui punti del grafico a linee per far apparire un fumetto (Tooltip) con la cifra esatta spesa in quel mese specifico.
  * Tap sul pulsante di esportazione nell'angolo in alto a destra per esportare i dati locali in CSV, JSON oppure creare uno ZIP con tutte le immagini salvate sul dispositivo. La funzione è riservata agli utenti Premium e non richiama Firebase.

### PAGINA 6: Impostazioni e Gestione Applicazione
* **Scopo**: Gestire le configurazioni tecniche, le categorie personalizzate, la privacy e la sicurezza dei dati.
* **Visualizzazione e Interfaccia**:
    * **Layout a Lista di Opzioni**: L'interfaccia utilizza un design pulito standard suddiviso in sezioni tematiche separate da divisori grigi.
    * **Sezione 1: Personalizzazione Categorie**: Mostra l'elenco delle macro-categorie usate dall'AI. Ogni riga ha un'icona, il nome della categoria e uno swatch colore modificabile dall'utente. Il colore scelto viene salvato in locale e usato in grafici, filtri e dettagli prodotto.
    * **Sezione 2: Gestione Dati e Privacy (Sicurezza)**: Contiene opzioni testuali con icone dedicate:
        * *"Esporta Database"*: Permette agli utenti Premium di esportare tutti i dati locali in formato CSV o JSON, oppure di creare uno ZIP con tutte le immagini locali degli scontrini. La stessa funzione è disponibile anche nel tab Statistiche e non richiama Firebase.
        * *"Scansioni Giornaliere"*: Indicatore nel tab Configurazione che mostra quante scansioni AI l'utente può ancora effettuare nel giorno corrente. Il contatore viene letto dalla Cloud Function, mantenuto in cache locale per 5 minuti per ridurre le chiamate, e si resetta automaticamente il giorno successivo.
        * *"Backup cloud"*: Interruttore disponibile solo per utenti Premium. Quando viene attivato, ScanTrak carica su Firebase tutti gli scontrini già salvati in locale, inclusi dati, articoli e immagini. Da quel momento ogni nuovo salvataggio viene sincronizzato automaticamente. Gli utenti Free vedono la voce bloccata con rimando al piano Premium.
        * *"Spazio cloud"*: Barra di utilizzo per utenti Premium. La quota iniziale è 200 MB per account Premium; al superamento di 150 MB l'app mostra un avviso per invitare l'utente a liberare spazio. Con immagini da 400-500 KB equivale a circa 400-500 immagini singole, oppure meno se uno scontrino lungo usa più pagine.
        * *"Pulizia backup cloud"*: Azione disponibile per utenti Premium con backup attivo. Prima di eliminare dati da Firebase, l'app crea uno ZIP locale con tutte le immagini degli scontrini presenti nel backup cloud e lo consegna all'utente tramite condivisione. Solo dopo vengono rimossi da Firebase i documenti cloud e le relative immagini; gli scontrini locali sul dispositivo restano intatti.
        * *"Cancella tutti i dati"*: Pulsante in testo rosso che avvia la procedura di formattazione totale del database locale.
    * **Sezione 3: Configurazione Intelligenza Artificiale**: Un'area in cui viene mostrato il motore OCR/AI attivo. Se l'app adotta un modello "Porta la tua chiave", include un campo di testo protetto per inserire la propria chiave API personale di Google AI Studio.
* **Azioni dell'utente**:
    * Tap sulla riga di una Categoria per modificarne il nome o associarle un colore differente.
    * Attivazione o disattivazione dei vari interruttori (Switch) di configurazione.

---

## 5. INTELLIGENZA ARTIFICIALE: STRATEGIA DI PROMPT ENGINEERING

Per far sì che l'AI restituisca i dati nel formato esatto richiesto dal database (Pagina 3), l'applicazione invierà l'immagine dello scontrino accompagnata da un **System Prompt** rigoroso.

### Modello di Prompt per LLM (es. Gemini):
```text
Sei un estrattore di dati specializzato in documenti commerciali e scontrini fiscali. 
Analizza l'immagine fornita ed estrai le informazioni strutturandole RIGOROSAMENTE nel formato JSON richiesto, senza aggiungere alcun testo discorsivo prima o dopo il codice JSON.

Istruzioni di pulizia:
1. Identifica il nome del negozio ("merchant"), la data nel formato YYYY-MM-DD ("date"), il totale pagato come numero decimale ("total") e il metodo di pagamento ("payment_method").
2. Per ogni riga di prodotto ("items"):
   - Mantieni il testo originale dello scontrino nel campo "raw_description".
   - Genera nel campo "clean_description" il nome commerciale standard e comprensibile del prodotto (es: se leggi "PASTA BAR.SPAGH 500G" converti in "Spaghetti Barilla 500g").
   - Estrai la quantità ("quantity") come numero intero. Se non specificata, è 1.
   - Calcola il prezzo unitario ("unit_price") e il prezzo di linea totale ("line_total").
   - Assegna una categoria coerente nel campo "category" scegliendo esclusivamente tra: [Alimentari, Casa, Cura Persona, Salute, Abbigliamento, Elettronica, Svago, Altro].

Formato di output richiesto:
{
  "merchant": "Nome Negozio",
  "date": "YYYY-MM-DD",
  "total": 0.00,
  "payment_method": "Carta",
  "items": [
    {
      "raw_description": "STRINGA GREZZA",
      "clean_description": "Stringa Pulita",
      "quantity": 1,
      "unit_price": 0.00,
      "line_total": 0.00,
      "category": "Categoria"
    }
  ]
}
```

---

## 6. ARCHITETTURA BACKEND: FIREBASE CLOUD FUNCTIONS

### 6.1 Motivazione

L'app utilizza una **Cloud Function come proxy** tra il client Flutter e l'API Gemini di Google. Questo approccio garantisce che la chiave API non venga mai distribuita all'interno dell'APK/IPA dell'applicazione, eliminando il rischio che utenti malintenzionati la estraggano e la utilizzino abusivamente.

| Approccio | Chiave API | Rischio |
| :--- | :--- | :--- |
| Chiamata diretta da app (precedente) | Inclusa nel binario dell'app | Alta esposizione |
| Proxy via Cloud Function (attuale) | Archiviata in Firebase Secrets | Nessuna esposizione |

### 6.2 Flusso della Richiesta

```
App Flutter
    │
    │  POST /analyzeReceipt
    │  { images: [base64...], categories: [...] }
    ▼
Firebase Cloud Function  (europe-west1)
    │
    │  Legge GEMINI_API_KEY da Firebase Secrets
  │  Verifica Auth/SSV e prenota la quota giornaliera AI
    │  POST https://generativelanguage.googleapis.com/...
    ▼
Google Gemini API
    │
    │  { candidates: [{ content: { parts: [{ text: "...JSON..." }] } }] }
    ▼
Firebase Cloud Function
    │
    │  { success: true, text: "...JSON string..." }
    ▼
App Flutter  →  parsing  →  Receipt.fromAiJson()  →  SQLite
```

### 6.3 Struttura dei File Firebase

```
Scantrak/
├── .firebaserc              ← project ID del progetto Firebase
├── firebase.json            ← configurazione deploy (source: functions/)
└── functions/
    ├── index.js             ← codice della Cloud Function
    └── package.json         ← dipendenze Node.js (axios, firebase-functions)
```

### 6.4 Configurazione e Deploy (Guida Passo-Passo)

#### Prerequisiti
- Node.js 20 o superiore installato
- Account Google con un progetto Firebase creato su [console.firebase.google.com](https://console.firebase.google.com)
- Piano **Blaze** (pay-as-you-go) abilitato sul progetto Firebase — necessario per le chiamate HTTP in uscita verso Gemini. Il piano gratuito include 2 milioni di invocazioni/mese, sufficiente per uso personale
- Una chiave API Gemini ottenuta da [aistudio.google.com](https://aistudio.google.com)

#### Passaggi

**1. Installa Firebase CLI**
```bash
npm install -g firebase-tools
```

**2. Autenticati con il tuo account Google**
```bash
firebase login
```

**3. Imposta il Project ID nel file `.firebaserc`**

Apri `.firebaserc` nella radice del repository e imposta il tuo Project ID (visibile nella Firebase Console):
```json
{
  "projects": {
    "default": "IL-TUO-FIREBASE-PROJECT-ID"
  }
}
```

**4. Installa le dipendenze della Cloud Function**
```bash
cd functions
npm install
```

**5. Configura il secret della chiave API Gemini**

Esegui il comando seguente e incolla la chiave quando richiesto (non viene mai salvata in chiaro nel codice):
```bash
firebase functions:secrets:set GEMINI_API_KEY
```

**6. Esegui il deploy della Cloud Function**
```bash
firebase deploy --only functions
```

**7. Recupera l'URL della funzione deployata**

Dopo il deploy, vai su **Firebase Console → Functions** e copia l'URL della funzione `analyzeReceipt`. Sarà nella forma:
```
https://analyzereceipt-65fo44gkaa-ew.a.run.app
```

**8. Aggiorna l'URL nell'app Flutter**

Apri `scantrak/lib/services/ai_service.dart` e aggiorna la costante:
```dart
const _kCloudFunctionUrl =
    'https://europe-west1-IL-TUO-PROJECT-ID.cloudfunctions.net/analyzeReceipt';
```

**9. Ricompila l'app**
```bash
cd scantrak
flutter pub get
flutter build apk        # Android
flutter build ipa        # iOS
```

### 6.5 Specifiche Tecniche della Cloud Function

| Parametro | Valore |
| :--- | :--- |
| Runtime | Node.js 20 |
| Regione | `europe-west1` |
| Timeout | 60 secondi |
| Memoria | 256 MB |
| Generazione | 1ª gen (firebase-functions v6) |
| Secret | `GEMINI_API_KEY` (Firebase Secret Manager) |
| Modello AI | `gemini-2.5-flash` |
| Limite immagini per richiesta | 3 immagini per scontrino |
| Limite giornaliero AI Free | 3 scansioni/giorno per utente |
| Limite giornaliero AI Premium | 10 scansioni/giorno per utente |

#### Payload di input (POST body)
```json
{
  "images": ["base64string1", "base64string2"],
  "categories": ["Alimentari", "Casa", "Cura Persona"]
}
```

#### Payload di output (risposta)
```json
{ "success": true,  "text": "{ ...JSON scontrino... }", "usage": { "used": 1, "limit": 3, "remaining": 2 } }
{ "success": false, "error": "Messaggio di errore" }
```

L'app può chiamare `GET /aiUsageStatus` prima di avviare l'annuncio o l'analisi per leggere il contatore del giorno corrente e bloccare subito la scansione se la quota è terminata.

### 6.6 Costi Stimati

Per un utilizzo personale tipico (es. 2–3 scansioni al giorno):

| Servizio | Quota gratuita | Utilizzo stimato | Costo mensile |
| :--- | :--- | :--- | :--- |
| Firebase Functions — invocazioni | 2.000.000/mese | ~90/mese | €0 |
| Firebase Functions — tempo CPU | 400.000 GB-sec/mese | ~5.000 GB-sec/mese | €0 |
| Google Gemini API | 500 req/giorno (free tier) | ~90 req/mese | €0 |

La Cloud Function mantiene un contatore giornaliero in `users/{uid}/ai_usage/{YYYY-MM-DD}` e blocca le chiamate eccedenti prima di inviare dati a Gemini: 3 scansioni al giorno per utenti Free e 10 scansioni al giorno per utenti Premium.

**Costo totale stimato: €0/mese** per uso personale rientrante nei limiti del free tier.

---

## 7. MONETIZZAZIONE — ADMOB E SERVER-SIDE VERIFICATION (SSV)

### 7.1 Panoramica

L'app usa **Google AdMob** con annunci **Rewarded** come gate obbligatorio prima di ogni scansione. L'utente deve guardare l'annuncio fino alla fine per sbloccare la chiamata a Firebase. Il meccanismo è protetto lato server tramite **Server-Side Verification (SSV)**: AdMob firma criptograficamente ogni reward e lo invia a una Cloud Function dedicata (`admobSsv`), che salva un token one-use in Firestore. La Cloud Function `analyzeReceipt` consuma il token atomicamente prima di chiamare Gemini — un bypass client-side non può funzionare senza un token valido.

### 7.2 Flusso SSV Completo

```
[Flutter App]
  1. Genera sessionId univoco (es. "ssv_1716829200000_348291")
  2. Carica l'annuncio rewarded con: serverSideVerificationOptions.customData = sessionId
  3. Mostra l'annuncio all'utente
                │
                │ utente guarda l'ad fino alla fine
                ▼
[AdMob Servers]
  4. Firma il callback con RSA-SHA256 (chiave privata Google)
  5. GET https://admobssv-65fo44gkaa-ew.a.run.app
          ?...&custom_data=sessionId&...&signature=BASE64URL&key_id=KEY_ID
                │
                ▼
[Firebase Cloud Function: admobSsv]
  6. Estrae il messaggio (query string prima di &signature=)
  7. Recupera la chiave pubblica Google da:
       https://www.gstatic.com/admob/reward/verifier-keys.json  (cache 1 ora)
  8. Verifica firma RSA-SHA256 → se non valida: risponde 400
  9. Scrive token in Firestore:
       ssv_tokens/{sessionId} = { used: false, expiresAt: +10 min }
 10. Risponde 200 OK ad AdMob
                │
                ▼
[Flutter App]
 11. onUserEarnedReward() → chiama analyzeReceipt(images, sessionId)
                │
                ▼
[Firebase Cloud Function: analyzeReceipt]
 12. Legge ssv_tokens/{sessionId} da Firestore
     (retry fino a 5 volte × 1.5s per gestire la latenza del callback SSV)
 13. Controlla: token esiste? non usato? non scaduto?
 14. Segna atomicamente il token come used: true  (previene double-spend)
 15. Chiama Gemini → restituisce il JSON dello scontrino
```

> **Nota sviluppo**: con gli annunci di TEST Google, AdMob NON invia callback SSV reali. La variabile `SSV_REQUIRED` in `functions/index.js` deve essere `false` durante lo sviluppo e `true` prima del rilascio.

### 7.3 File Coinvolti

| File | Ruolo |
| :--- | :--- |
| `lib/services/ad_service.dart` | Carica/mostra l'annuncio rewarded, genera sessionId, imposta SSV options |
| `lib/screens/validazione_screen.dart` | Gate: carica ad → mostra → se reward → analizza |
| `lib/services/ai_service.dart` | Include sessionId nel body della richiesta HTTP (solo in release) |
| `lib/providers/receipt_provider.dart` | Propaga sessionId fino ad AiService |
| `functions/index.js` — `admobSsv` | Verifica firma AdMob, salva token in Firestore |
| `functions/index.js` — `analyzeReceipt` | Valida e consuma il token SSV prima di chiamare Gemini |
| `android/app/src/main/AndroidManifest.xml` | App ID AdMob nella sezione `<application>` |
| `lib/main.dart` | `MobileAds.instance.initialize()` all'avvio |

### 7.4 Setup Completo (Guida Passo-Passo)

#### Prerequisiti
- Firestore abilitato nel progetto Firebase (vedi §7.4.1)
- Account AdMob creato su [admob.google.com](https://admob.google.com)
- Piano Blaze già attivo su Firebase (necessario per le Cloud Functions)

#### 7.4.1 Abilitare Firestore

**Passo 1 — Abilita l'API Firestore** aprendo questo link nel browser:
```
https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=scantrak-13943
```
Clicca **"Abilita"** e attendi qualche minuto.

**Passo 2 — Crea il database Firestore**

Vai su **Firebase Console → Build → Firestore Database → Crea database**:
- Modalità: **Produzione**
- Location: **`europe-west1`** (stessa region delle Cloud Functions)

**Passo 3 — Configura le Security Rules**

Nella sezione Firestore → Regole, sostituisci le regole di default con:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ssv_tokens: scrivibile solo dall'Admin SDK (Cloud Functions), non dai client
    match /ssv_tokens/{doc} {
      allow read, write: if false;
    }
  }
}
```

**Passo 4 — (Opzionale) Configura TTL automatico**

Per fare in modo che Firestore elimini automaticamente i token scaduti senza costi aggiuntivi:
1. **Firestore Console → Indici → TTL**
2. Nuova policy TTL: Collezione `ssv_tokens`, Campo `expiresAt`

#### 7.4.2 Configurare AdMob (produzione)

**Passo 1 — Crea un'app AdMob**

Su [admob.google.com](https://admob.google.com):
- Aggiungi app → Android (e iOS se necessario)
- Copia l'**App ID** (formato: `ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX`)

**Passo 2 — Crea un'unità pubblicitaria Rewarded**

Nell'app appena creata → Aggiungi unità pubblicitaria → Rewarded:
- Copia l'**Ad Unit ID** (formato: `ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX`)

**Passo 3 — Attiva SSV sull'unità pubblicitaria**

Nell'unità pubblicitaria → Impostazioni avanzate → **Verifica lato server**:
- Attiva la verifica
- Inserisci la URL della funzione `admobSsv` nel campo "URL callback SSV":
  ```
  https://admobssv-65fo44gkaa-ew.a.run.app
  ```
- Clicca **"Verifica"** — deve rispondere con HTTP 200

**Passo 4 — Aggiorna gli ID nell'app**

Sostituisci gli ID di test nei file seguenti con quelli reali:

`android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-TUO-APP-ID-REALE"/>
```

`lib/services/ad_service.dart`:
```dart
static const String _adUnitIdAndroid = 'ca-app-pub-XXXXXX/XXXXXXXXXX'; // PROD Android
static const String _adUnitIdIos    = 'ca-app-pub-XXXXXX/XXXXXXXXXX'; // PROD iOS
```

**Passo 5 — Attiva SSV nelle Cloud Functions**

In `functions/index.js` riga ~19, imposta:
```javascript
const SSV_REQUIRED = true;
```

**Passo 6 — Rideploya le functions**
```bash
cd functions
npm install
firebase deploy --only functions
```

**Passo 7 — Abilita obfuscation nel build Android**

Per rendere più difficile la reverse-engineering dell'APK:
```bash
flutter build appbundle --obfuscate --split-debug-info=build/debug-info
```

### 7.5 ID di Test AdMob (Sviluppo)

Durante lo sviluppo, usa sempre gli ID di test Google — non generano entrate ma non rischiano di essere bannati da AdMob:

| Parametro | Valore TEST |
| :--- | :--- |
| Android App ID | `ca-app-pub-3940256099942544~3347511713` |
| Android Rewarded Ad Unit | `ca-app-pub-3940256099942544/5224354917` |
| iOS Rewarded Ad Unit | `ca-app-pub-3940256099942544/1712485313` |
| `SSV_REQUIRED` in `index.js` | `false` |

> ⚠️ **Importante**: non pubblicare mai l'app con gli ID di test su Play Store / App Store.

### 7.6 Gestione Errori Lato Utente

| Scenario | Messaggio mostrato |
| :--- | :--- |
| `loadAd()` fallisce (no connessione, ad blocker) | "Pubblicità non disponibile. Verifica la connessione e riprova." |
| Utente chiude l'annuncio prima della fine | "Per usare la scansione devi guardare la pubblicità fino alla fine." |
| Token SSV scaduto o non trovato (raro) | "Al momento la funzionalità non è disponibile. Riprova più tardi." |

---