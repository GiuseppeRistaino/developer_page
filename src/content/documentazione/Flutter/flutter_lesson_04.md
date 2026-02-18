---
slug: "Lezione 4"
title: "Lezione 4"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Analisi della prima applicazione Flutter"
---

Appunti – Analisi della prima applicazione Flutter
▶️ Avvio dell’app

Selezionare un emulatore (Device Manager).

Avviare il progetto.

Prima build più lenta, poi app di esempio con:

Titolo in alto

Testo centrale

Pulsante “+”

Contatore che aumenta al click

📂 File principale

Tutto il codice si trova in:

lib/main.dart

1️⃣ Import iniziale
import 'package:flutter/material.dart';


Usa il Material Design di Google.

Flutter lavora con widget Material (stile Android).

2️⃣ Entry Point
void main() {
  runApp(MyApp());
}


main() = punto di ingresso.

runApp() lancia l’applicazione.

3️⃣ MyApp → StatelessWidget
class MyApp extends StatelessWidget


Widget senza stato.

Contiene:

MaterialApp

Titolo

Tema (es. colore primario blu)

home → schermata iniziale

MaterialApp fornisce:

Tema

Struttura base

Integrazione Material

4️⃣ HomePage → StatefulWidget
class MyHomePage extends StatefulWidget


Differenza:

Stateless → non mantiene dati che cambiano

Stateful → mantiene uno stato (variabili che cambiano)

Qui serve perché abbiamo un contatore.

5️⃣ Stato (State)
class _MyHomePageState extends State<MyHomePage>


Contiene:

int _counter = 0;


Metodo:

void _incrementCounter() {
  setState(() {
    _counter++;
  });
}

🔁 setState()

Aggiorna lo stato.

Ricostruisce la UI.

Ridisegna solo la parte modificata.

6️⃣ Metodo build()

Ogni widget ha:

Widget build(BuildContext context)


Costruisce ciò che vediamo a schermo.

Restituisce:

Scaffold

7️⃣ Scaffold

Struttura base dell’app:

appBar

body

floatingActionButton

Se lo rimuovi → rimane solo testo semplice, senza struttura.

8️⃣ Struttura UI

Nel body:

Center

Column

Testo descrittivo (statico)

Testo con _counter (dinamico)

Nel floatingActionButton:

Icona "+"

onPressed → chiama _incrementCounter

Flusso:

Click bottone

_incrementCounter()

setState()

UI si aggiorna

Contatore aumenta

⚡ Hot Reload

Icona fulmine in Android Studio.

Aggiorna solo la parte modificata.

Non ricompila tutta l’app.

Modifica visibile quasi istantaneamente.

Funziona perché Flutter:

Ricostruisce solo il widget cambiato

Ridipinge solo quella parte (rendering selettivo)

🎯 Concetti chiave introdotti

Widget

StatelessWidget

StatefulWidget

State

setState()

build()

Scaffold

Hot Reload

📌 Riassunto dell’app

App composta da:

MaterialApp

Scaffold

AppBar

Column con 2 testi

FloatingActionButton

Contatore aggiornato tramite stato.

Prossimo passo: approfondire cosa sono i Widget e come funzionano realmente 🚀