---
slug: "Lezione 5"
title: "Lezione 5"
date: "2026-02-12"
readTime: "7 min"
excerpt: "I Widget in Flutter"
---

Appunti – I Widget in Flutter
🔹 Cos’è un Widget?

In Flutter tutto è un widget.

Un widget è:

Un blocco di costruzione dell’interfaccia

Un elemento visibile (es. testo, bottone)

Oppure un elemento “invisibile” che gestisce layout o comportamento

👉 Pensali come mattoncini LEGO: un’app è l’unione di tanti widget.

🔹 Differenza rispetto al Web

Nel Web:

HTML → tag (div, input, button…)

Layout meno “a blocchi strutturati”

In Flutter:

Ogni elemento è formalmente un widget

Anche le strutture di layout sono widget

Per chi viene dal web può essere inizialmente poco intuitivo.

🔹 Tipi di Widget
1️⃣ Widget visibili

Text

Icon

AppBar

FloatingActionButton

Bottoni vari

Sono elementi che vediamo a schermo.

2️⃣ Widget “contenitori” (invisibili o strutturali)

Scaffold

Center

Column

Row

Container

Non sempre hanno una forma visiva evidente, ma:

Organizzano altri widget

Gestiscono layout e struttura

📌 Esempio:
Column è come una “bustina trasparente” che organizza elementi in verticale.

🔹 Tutto è Widget (Esempio nel codice)

runApp() accetta un Widget

MyApp è un Widget

MaterialApp è un Widget

HomePage è un Widget

Scaffold è un Widget

AppBar è un Widget

Text è un Widget

FloatingActionButton è un Widget

👉 Non esiste nulla nell’interfaccia che non sia un widget.

🔹 Widget Tree (Albero dei Widget)

L’interfaccia è organizzata come un albero gerarchico.

Esempio semplificato:

MaterialApp
 └── Scaffold
      ├── AppBar
      │    └── Text
      ├── Body (Column)
      │    ├── Text
      │    └── Text
      └── FloatingActionButton
           └── Icon


Si parte dalla radice e si scende nei figli.

👉 Questo si chiama Widget Tree.

🔹 Child vs Children

Ogni widget può avere:

child → un solo figlio

children → lista di figli

Esempi:

Center → ha un child

Column → ha children

Dipende dal tipo di widget.

🔹 Concetti fondamentali

Un’app Flutter = insieme di widget

Anche una schermata intera è un widget

I widget possono contenere altri widget

Alcuni gestiscono layout

Alcuni sono puramente visivi

Alcuni gestiscono logica

🔹 Perché sono importanti?

Flutter è basato interamente sui widget.

Per questo:

È fondamentale capirli bene

Esistono tantissimi widget diversi

Spesso si può ottenere lo stesso risultato in modi diversi

🎯 Riassunto Finale

Tutto è widget.

Un’app è un insieme di widget annidati.

I widget formano un albero (Widget Tree).

Possono essere visibili o strutturali.

Possono avere uno o più figli.

Imparare Flutter significa imparare a combinare correttamente i widget.

Nel prossimo step si approfondirà un widget specifico (es. AppBar) e come personalizzarlo. 🚀