---
slug: "Lezione 24"
title: "Lezione 24"
date: "2026-02-14"
readTime: "10 min"
excerpt: "Refactoring e Sotto-Widget"
---

# Refactoring e Sotto-Widget

In questa lezione impariamo a esternalizzare i widget, ovvero a dividere un'interfaccia complessa in componenti più piccoli, leggibili e riutilizzabili.

---

# 1. Perché dividere l'applicazione?

Man mano che un'app cresce, il file main.dart può diventare enorme e difficile da gestire. Esistono tre motivi principali per creare dei sotto-widget:

- **Leggibilità**: Il codice del body diventa una lista chiara di nomi di widget invece di un muro di righe annidate.

- **Manutenzione**: Se devi cambiare il colore di un pulsante presente in tutta l'app, lo fai in un unico file invece di cercarlo in ogni schermata.

- **Riutilizzo**: Un widget creato per la Home può essere usato anche nella pagina Profilo senza riscrivere il codice.

- **Performance**: Possiamo rendere Stateful solo la piccola parte di interfaccia che deve cambiare, lasciando il resto dell'app come Stateless.

---

# 2. Creazione di un Widget Personalizzato (Stateless)

Per passare dei dati (come un indice o un titolo) a un sotto-widget, usiamo i parametri nel costruttore.

## Esempio: Card Video (Stateless)

```dart
class CardVideo extends StatelessWidget {
  final int numero; // Dato passato dall'esterno

  // Costruttore con parametro nominato e richiesto
  const CardVideo({super.key, required this.numero});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      color: Colors.orange[700],
      alignment: Alignment.center,
      child: Text("Video #$numero"),
    );
  }
}
```

---

# 3. Widget con Stato (Stateful) e accesso ai dati

Quando creiamo un sotto-widget Stateful, le variabili del costruttore si trovano nella classe "Widget", mentre la logica è nella classe "State". Per accedere ai dati del costruttore dalla classe dello stato, usiamo la parola chiave widget..

## Esempio: Card Testo (Stateful)

```dart
class CardTesto extends StatefulWidget {
  final int numero;
  const CardTesto({super.key, required this.numero});

  @override
  State<CardTesto> createState() => _CardTestoState();
}

class _CardTestoState extends State<CardTesto> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 100,
      color: Colors.orange[300],
      alignment: Alignment.center,
      // Accediamo a 'numero' tramite widget.numero
      child: Text("Testo #${widget.numero}"),
    );
  }
}
```

---

# 4. Organizzazione dei file (File Splitting)

La pratica corretta prevede di spostare questi widget in file separati:

- Crea una cartella widgets/ dentro lib/.

- Crea un file per ogni widget (es. card_video.dart).

- Importa package:flutter/material.dart in ogni nuovo file.

- Nel file principale (main.dart), importa i file creati: import 'widgets/card_video.dart';.

---

# 5. Implementazione nella ListView

Ecco come appare il body dopo il refactoring: pulito e logico.

```dart
ListView.builder(
  itemCount: 10,
  itemBuilder: (context, index) {
    // Logica per alternare i widget
    if (index % 2 == 0) {
      return CardVideo(numero: index); // Richiamo del sotto-widget
    } else {
      return CardTesto(numero: index); // Richiamo del sotto-widget
    }
  },
)
```

---

# Tips & Best Practices

- **Snippet**: Digita stless o stful per generare istantaneamente la struttura di un widget.

- **Naming**: Se una variabile nel costruttore si chiama numero, richiamala con nomeWidget(numero: valore).

- **Manutenibilità**: Se decidi che tutti i "Video" devono avere un'icona Play, ti basta aggiungerla nel file card_video.dart e l'intera app si aggiornerà automaticamente.