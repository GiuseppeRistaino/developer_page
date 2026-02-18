---
slug: "Lezione 6"
title: "Lezione 6"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Personalizzazione della AppBar in Flutter"
---

Appunti – Personalizzazione della AppBar in Flutter
🎯 Obiettivo della lezione

Prendere confidenza con le principali proprietà della AppBar, senza approfondire tutto (alcune funzionalità verranno viste più avanti).

🔹 Proprietà principali della AppBar

Basta scrivere AppBar( e vedere i parametri disponibili suggeriti dall’IDE.

1️⃣ leading
leading: Icon(Icons.access_time),


Richiede un Widget

Solitamente si usa un’Icon

È l’elemento a sinistra della AppBar

Si può modificare anche lo spazio con:

leadingWidth: 100,

2️⃣ Drawer e leading automatico

Se nello Scaffold aggiungiamo:

drawer: Drawer(),


👉 Flutter inserisce automaticamente l’icona “menu” nella AppBar.

Per evitarlo:

automaticallyImplyLeading: false,


Blocca l’aggiunta automatica di elementi (come il bottone del drawer o la freccia “back”).

3️⃣ title
title: Text("Titolo"),


Opzioni utili:

centerTitle: true → centra il titolo

titleSpacing → gestisce lo spazio laterale

4️⃣ actions (icone a destra)

Richiede una lista di widget:

actions: [
  IconButton(
    icon: Icon(Icons.access_time),
    onPressed: () {
      print("Cliccato");
    },
  ),
]


Di solito si usano IconButton

Possono essere più di una

Si possono inserire anche immagini o avatar

5️⃣ Uso di const (Performance)

Se un widget non cambia mai, è buona pratica usare const:

const Icon(Icons.access_time)


Perché?

Flutter sa che quel widget è costante

Non lo ricostruisce inutilmente

Migliora le performance

⚠️ Non si può usare const con valori dinamici.

6️⃣ Colori

foregroundColor → colore testo e icone

backgroundColor → colore sfondo

foregroundColor: Colors.red,
backgroundColor: Colors.orange,

7️⃣ Status Bar (System UI)

Per cambiare il colore delle icone in alto (batteria, ora, ecc.):

systemOverlayStyle: SystemUiOverlayStyle.light,


Serve quando lo sfondo è scuro o chiaro per mantenere leggibilità.

8️⃣ Elevation (ombra)
elevation: 10,


Aumenta l’ombra sotto la AppBar

Colore ombra:

shadowColor: Colors.green,

9️⃣ Altezza
toolbarHeight: 100,


Default ≈ 56.

🔟 Opacità
toolbarOpacity: 0.5,


Modifica la trasparenza.

1️⃣1️⃣ Stile del testo
titleTextStyle: TextStyle(...)


Permette di modificare:

Font

Dimensione

Peso

Colore

ecc.

(Verrà approfondito nella lezione sui TextStyle)

💡 Metodo di apprendimento consigliato

Guardare i suggerimenti dell’IDE

Passare sopra le proprietà per vedere il tipo richiesto

Provare e sperimentare

Consultare la documentazione se necessario

📌 Concetti chiave della lezione

La AppBar ha moltissime proprietà personalizzabili.

Alcune funzionalità vengono aggiunte automaticamente (es. drawer).

const migliora le performance per widget statici.

IDE e suggerimenti aiutano molto nello sviluppo.

Sperimentare è fondamentale per imparare.

➡️ Prossimo argomento: Text e TextStyle. 🚀