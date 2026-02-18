---
slug: "Lezione 8"
title: "Lezione 8"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Bottoni e Icone in Flutter"
---

Appunti – Bottoni e Icone in Flutter
🎯 Obiettivo

Comprendere i tipi di bottoni principali

Aggiungere icone ai bottoni

Personalizzare lo stile dei bottoni (ButtonStyle e ButtonStyle.from)

🔹 Tipi di bottoni (Material Design)

TextButton → solo testo, piatto, senza elevazione

ElevatedButton → testo + colore pieno, effetto 3D/ombreggiatura

OutlinedButton → testo + bordo, senza colore pieno

Tutti i bottoni richiedono un onPressed (funzione anonima se vuota) e un child (solitamente Text).

🔹 Proprietà base

onPressed → funzione da eseguire al click

child → widget all’interno del bottone (può essere anche un’icona o un container)

onLongPress → azione su pressione lunga

Disabilitare il bottone: onPressed: null

🔹 Bottoni con icone

Si possono usare icone nei bottoni (TextButton.icon, ElevatedButton.icon, OutlinedButton.icon)

Proprietà principali:

icon → widget Icon

label → testo

Esempio:

ElevatedButton.icon(
  onPressed: () {},
  icon: Icon(Icons.add),
  label: Text("Aggiungi"),
)

🔹 Stile dei bottoni
1️⃣ ButtonStyle

Permette di personalizzare:

foregroundColor → colore del testo/icone

backgroundColor → colore del bottone

padding → spaziatura interna (EdgeInsets)

shape → forma del bottone

minimumSize / maximumSize → dimensioni

Elevation, overlayColor, ecc.

⚠️ Alcune proprietà richiedono MaterialStateProperty perché i bottoni possono avere diversi stati (pressed, hovered, focused).

2️⃣ ButtonStyle.from

Alternativa più semplice a ButtonStyle

Permette di settare direttamente i colori, il padding e la forma senza gestire stati

Esempio:

ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    foregroundColor: Colors.red,
    backgroundColor: Colors.orange,
    padding: EdgeInsets.symmetric(vertical: 50, horizontal: 40),
  ),
  child: Text("Ciao"),
)


Consigliato all’inizio, perché evita complicazioni legate a MaterialStateProperty.

🔹 EdgeInsets

Serve per il padding interno dei bottoni

Tipi principali:

EdgeInsets.symmetric(vertical: X, horizontal: Y) → verticale e orizzontale

EdgeInsets.all(X) → uguale su tutti i lati

EdgeInsets.only(top: X, bottom: Y, left: Z, right: W)

🔹 MaterialStateProperty

Serve per personalizzare lo stile in base allo stato del bottone:

pressed → bottone premuto

hovered → bottone su cui si passa con il cursore

focused → bottone selezionato con tastiera

Più avanzato, utile per bottoni complessi su web/desktop

All’inizio si può ignorare e usare styleFrom.

📌 Suggerimenti

Iniziare con styleFrom per semplicità

Sperimentare colori, padding, forme

Le icone si possono usare come child o con i bottoni .icon

Evitare MaterialStateProperty all’inizio, concentrarsi su aspetto e funzione

Guardare la documentazione e usare i suggerimenti dell’IDE