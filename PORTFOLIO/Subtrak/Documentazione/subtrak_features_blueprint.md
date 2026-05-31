# SubTrak — Smart Subscription Tracker & Automation (v2)

Benvenuto nel repository ufficiale di **SubTrak**, l'applicazione intelligente progettata per monitorare, ottimizzare e gestire tutti i tuoi abbonamenti ricorrenti (Netflix, Amazon Prime, Spotify, ecc.) in modo completamente automatizzato e in tempo reale.

---

## 🎯 Visione del Progetto
La maggior parte dei tracker di abbonamenti richiede l'inserimento manuale di ogni singola transazione. **SubTrak** elimina l'errore umano e la pigrizia introducendo sistemi di tracciamento automatico guidati dagli eventi finanziari e di notifica dell'utente.

L'applicazione si concentra su tre pilastri fondamentali:
1. **Automazione Istantanea:** Rilevamento in tempo reale delle transazioni.
2. **Consapevolezza Finanziaria:** Statistiche chiare sui flussi di cassa in uscita (Outflow).
3. **Prevedibilità:** Algoritmi predittivi per avvisare l'utente *prima* che il rinnovo avvenga.

---

## 📱 Flusso UX e Architettura delle Schermate (UI Wireframes)

Per garantire un'esperienza utente fluida, l'applicazione è strutturata in **5 schermate principali**, ottimizzate sia per l'inserimento automatico che per la consultazione rapida.

### 1. Dashboard Principale (Home View)
La schermata principale offre una panoramica immediata sullo stato finanziario degli abbonamenti dell'utente.
*   **KPI Card Superiore:** Mostra la spesa totale mensile corrente (es. `47,90 € / mese`) e la variazione percentuale rispetto al mese precedente.
*   **Indicatore di "Drenaggio" (Outflow Pulse):** Un grafico lineare o un cerchio di progresso dinamico che mostra quanti giorni mancano al prossimo picco di addebiti consecutivi.
*   **Lista degli Abbonamenti Attivi:** Ordinati per data di scadenza imminente. Ogni riga include:
    *   Logo del servizio (es. Netflix).
    *   Nome e piano attivo (es. *Netflix Premium*).
    *   Costo e data del prossimo rinnovo (es. `17,99 € — Tra 3 giorni`).
    *   Badge di tracciamento: un'icona che indica se l'abbonamento è tracciato via `Email`, `Bank` o `Manual`.
*   **FAB (Floating Action Button):** Un pulsante "+" nell'angolo in basso a destra che permette di forzare un inserimento manuale o avviare una scansione manuale immediata delle fonti automatiche.

### 2. Hub di Automazione & Connessioni (Sync Center)
Questa è la schermata strategica dove l'utente configura i "sensori" dell'applicazione per permettere l'aggiornamento automatico istantaneo.
*   **Sezione Open Banking:** Interruttore per attivare la connessione PSD2 (es. tramite Nordigen/GoCardless). Mostra lo stato del conto connesso (`Conto Intesa Sanpaolo — Sincronizzato 10m fa`).
*   **Sezione Email Parsing Engine:** Pulsante "Accedi con Google / Outlook". Consente all'app di attivare i webhook di lettura delle ricevute digitali.
*   **Sezione Android Notification Listener:** Switch per abilitare il servizio in background. Include una lista di controllo delle app bancarie autorizzate (es. *Abilitato per Revolut, Disabilitato per Amazon Shopping*).
*   **Log In tempo Reale (Activity Feed):** Un terminale visivo o una lista cronologica delle ultime transazioni intercettate e processate (es. `[11:15] Intercettata notifica Revolut -> Rilevato pagamento Netflix: +17.99€ registrati`).

### 3. Analisi e Statistiche Avanzate (Analytics Workspace)
Schermata dedicata al controllo analitico del budget per evitare gli "abbonamenti vampiro".
*   **Grafico a Torta (Breakdown delle Categorie):** Suddivisione visiva delle spese (es. 40% Intrattenimento, 30% Produttività, 20% Software, 10% Altro).
*   **Grafico a Barre (Storico Annuale):** Consente di vedere l'andamento della spesa mese per mese durante l'anno, evidenziando i mesi con scadenze annuali pesanti (es. Amazon Prime o assicurazioni).
*   **Sezione "Vampire Alert":** Un algoritmo analizza gli abbonamenti inutilizzati o ridondanti. Se l'utente ha sia *Disney+* che *Netflix* ma non ha registrato transazioni o interazioni collegate per mesi (o se ci sono duplicati di categorie), l'app mostra una card di avviso: `⚠️ Consigliata disdetta: Hai 3 servizi di streaming attivi, potresti risparmiare 12,99€ questo mese`.

### 4. Dettaglio Singolo Abbonamento (Subscription Deep Dive)
Si apre cliccando su un qualsiasi abbonamento dalla Dashboard principale.
*   **Header Dinamico:** Colore di sfondo coordinato con il brand del servizio (es. Rosso per Netflix, Blu per Prime) con il costo mensile/annuale in macro-font.
*   **Dati di Fatturazione:**
    *   Ciclo di fatturazione (Mensile, Annuale).
    *   Metodo di pagamento associato (es. *Carta di credito **** 1234* intercettata da notifica).
*   **Cronologia dei Pagamenti:** Una tabella o lista con lo storico di tutte le volte che l'app ha intercettato quel pagamento nei mesi passati, utile per verificare eventuali rincari nascosti del canone.
*   **Pulsante d'Azione "Disdici con un Click":** Un link rapido che reindirizza direttamente alla pagina ufficiale di gestione abbonamento del fornitore per facilitare la cancellazione.

### 5. Centro Notifiche e Impostazioni (Settings & Smart Alerts)
Pannello di configurazione delle preferenze globali e degli avvisi predittivi.
*   **Configurazione Smart Alerts:** slider per impostare con quanti giorni di anticipo ricevere la notifica prima del rinnovo (es. `3 giorni prima` e `24 ore prima`).
*   **Canali di Notifica:** Gestione dei canali (Notifica Push sul telefono, Email di riepilogo settimanale, o messaggio Telegram tramite Bot dedicato).
*   **Preferenze di Valuta e Sicurezza:** Configurazione della valuta principale (EUR, USD, GBP) e attivazione del blocco biometrico (Sblocco con impronta digitale o FaceID) per proteggere i dati finanziari visualizzati nell'app.

---

## 🚀 Funzionalità Principali (Riepilogo Tecnico)

### 1. Sincronizzazione dei Pagamenti in Tempo Reale
SubTrak offre due modalità di rilevamento automatico più l'inserimento manuale:

*   **Open Banking (PSD2 Integration):** API bancarie sicure per intercettare i movimenti del conto corrente non appena vengono confermati. Richiede almeno 2 occorrenze con cadenza mensile prima di creare l'abbonamento (stesso algoritmo del `SubscriptionDetector`).
*   **Android Notification Listener:** Servizio in background che intercetta le notifiche push delle app bancarie. Implementa una logica di staging a due fasi per evitare falsi positivi (vedi sezione dedicata).
*   **Inserimento Manuale:** L'utente può aggiungere abbonamenti direttamente dalla dashboard tramite il FAB "+".

---

### Android Notification Listener — Logica di Staging

Il listener usa un sistema a **due fasi** per distinguere abbonamenti ricorrenti da acquisti singoli.

#### Flusso decisionale

```
Notifica bancaria ricevuta
        │
        ▼
Estrai importo + nome servizio
        │
        ├─ Importo non trovato → IGNORA
        ├─ Servizio non noto   → IGNORA
        │
        ▼
L'abbonamento è già in dashboard?
        │
   Sì ──┤── Aggiorna importo e prossimo rinnovo
        │   Logga transazione nell'activity feed
        │
   No ──▼
È in staging (pending_subscriptions)?
        │
   No ──┤── FASE 1: Salva come candidato in pending
        │   Non appare in dashboard
        │
   Sì ──▼
Verifica ricorrenza:
   giorni dall'ultima occorrenza + tolleranza importo (±10%)
        │
        ├─ < 20 giorni         → IGNORA (stesso mese, non è una ricorrenza)
        ├─ 20–45 giorni + ✓€   → FASE 2: PROMUOVI ad abbonamento reale ✅
        ├─ > 45 giorni + ✓€    → Aggiorna staging, attendi (cadenza non mensile)
        └─ Importo diverso     → Aggiorna timestamp staging (acquisto diverso)
```

#### Tabella `pending_subscriptions`

| Campo | Descrizione |
|---|---|
| `serviceKey` | Chiave del servizio (es. `"netflix"`) |
| `serviceName` | Nome visualizzato (es. `"Netflix"`) |
| `amount` | Importo della prima occorrenza |
| `firstSeenMs` | Timestamp prima notifica |
| `lastSeenMs` | Timestamp ultima notifica |
| `occurrences` | Numero di volte rilevato |
| `packageName` | App bancaria che ha generato la notifica |

#### Parametri di configurazione

| Parametro | Valore | Motivazione |
|---|---|---|
| `MIN_DAYS_BETWEEN` | 20 giorni | Copre mesi corti (febbraio) |
| `MAX_DAYS_BETWEEN` | 45 giorni | Tolleranza per ritardi bancari |
| `AMOUNT_TOLERANCE` | ±10% | Copre rincari e variazioni di cambio |

#### Servizi supportati (30+)
Netflix, Spotify, Amazon Prime, Disney+, Apple (iCloud/Music/TV), Google One, Microsoft 365, Adobe Creative Cloud, Dropbox, PlayStation Plus, Xbox Game Pass, Nintendo Online, YouTube Premium, DAZN, Notion, Canva, 1Password e relativi alias (`"prime video"`, `"ps plus"`, `"game pass"`, `"creative cloud"`…)

#### App bancarie monitorate
Revolut, N26, Satispay, UniCredit, Intesa Sanpaolo, BNL, Mediolanum, Fineco, Hype, Banca Sella.

---

## 🛠️ Architettura Tecnica e Database

### Struttura Dati Consigliata (MVP Database Schema)

```sql
-- Tabella Utenti
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Abbonamenti Attivi
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,          -- es. 'Netflix'
    price DECIMAL(10, 2) NOT NULL,       -- es. 17.99
    currency VARCHAR(3) DEFAULT 'EUR',
    billing_cycle VARCHAR(20) NOT NULL,   -- 'monthly', 'yearly'
    next_billing_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'paused', 'cancelled'
    category VARCHAR(50),
    auto_detected BOOLEAN DEFAULT TRUE
);

-- Log delle transazioni intercettate
CREATE TABLE transaction_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    source VARCHAR(50) NOT NULL,         -- 'gmail_api', 'open_banking', 'notification'
    raw_payload TEXT,
    processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🛡️ Sicurezza e Privacy
Trattandosi di un'app che elabora dati finanziari, la privacy è al primo posto:
*   I token di accesso alle API (Gmail/Banche) vengono crittografati tramite algoritmi **AES-256**.
*   Nel caso dell'intercettazione delle notifiche Android, i dati vengono elaborati **esclusivamente in locale (On-Device)** e non vengono mai salvati su server esterni se non corrispondono a pattern di abbonamenti noti.
