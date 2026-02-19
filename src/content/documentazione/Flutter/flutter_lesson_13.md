---
slug: "Lezione 13"
title: "Lezione 13"
date: "2026-02-12"
readTime: "10 min"
excerpt: "Dimensioni e Vincoli"
---

# Dimensioni e Vincoli

In questa lezione esploriamo tre widget fondamentali che non servono a "disegnare" qualcosa a schermo, ma a gestire lo spazio e i limiti degli altri widget: SizedBox, Expanded e ConstrainedBox.

---

# 1. SizedBox

Il SizedBox è una "scatola" di dimensioni fisse. È il widget più semplice per imporre larghezza (width) e altezza (height) a un figlio.

Utilizzi principali:

- **Dimensioni fisse**: Per forzare un widget figlio ad avere una grandezza specifica.

- **Spacer**: Molto usato per creare spazio vuoto tra due widget in una Column o una Row (senza ricorrere al Padding).

- **Dimensioni infinite**: Usando double.infinity, il widget occupa tutto lo spazio concesso dal padre.

```dart
Column(
  children: [
    Container(height: 100, color: Colors.red),
    // Usato come separatore
    const SizedBox(height: 20), 
    const SizedBox(
      width: double.infinity, // Prende tutta la larghezza
      height: 50,
      child: ElevatedButton(onPressed: null, child: Text("Bottone")),
    ),
  ],
)
```

---

# 2. Expanded

Expanded è un widget che permette a un figlio di una Row o Column di occupare tutto lo spazio rimanente lungo l'asse principale.

Caratteristiche:

- Se in una Column ci sono widget con altezza fissa e un Expanded, quest'ultimo si "allungherà" per riempire il vuoto.

- Proprietà flex: Se ci sono più widget Expanded, la proprietà flex (un intero) determina la proporzione di spazio da assegnare a ciascuno.

```dart
Column(
  children: [
    Container(height: 100, color: Colors.orange), // Altezza fissa
    Expanded(
      child: Container(
        color: Colors.blue,
        child: const Center(child: Text("Prendo tutto lo spazio rimasto")),
      ),
    ),
    Container(height: 50, color: Colors.green), // Altezza fissa
  ],
)
```

---

# 3. ConstrainedBox

A differenza di SizedBox, che impone una misura esatta, ConstrainedBox impone dei limiti minimi e massimi (Constraints).

## BoxConstraints:

Si definisce tramite l'oggetto BoxConstraints, che accetta:

- minWidth / maxWidth

- minHeight / maxHeight

Se il widget figlio prova a essere più piccolo del minimo o più grande del massimo, ConstrainedBox lo costringerà a restare nei limiti definiti.

```dart
ConstrainedBox(
  constraints: const BoxConstraints(
    minHeight: 100, // Non sarà mai più basso di 100
    maxHeight: 200, // Non sarà mai più alto di 200
  ),
  child: Container(
    // Anche se dichiaro 500, verrà tagliato a 200 dal ConstrainedBox
    height: 500, 
    color: Colors.red,
  ),
)
```
---

# Riepilogo e Confronto

| Widget         | Scopo Principale                                           | Parametri Chiave   |
|---------------|------------------------------------------------------------|--------------------|
| SizedBox     | Impostare una grandezza esatta o creare spazi vuoti.       | width, height      |
| Expanded     | Riempire lo spazio avanzato in Row/Column.                 | flex               |
| ConstrainedBox | Definire un range di dimensioni (min/max).               | constraints        |

> Molte di queste proprietà sono integrate nel widget Container (che ha sia width/height che constraints). Tuttavia, usare i widget specifici rende il codice più leggibile e leggero quando non serve una decorazione completa.

