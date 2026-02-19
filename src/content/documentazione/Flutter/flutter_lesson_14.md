---
slug: "Lezione 14"
title: "Lezione 14"
date: "2026-02-12"
readTime: "10 min"
excerpt: "Il Widget Stack e il posizionamento assoluto"
---

# Il Widget Stack e il posizionamento assoluto

In questa lezione viene introdotto il widget Stack, fondamentale per sovrapporre elementi e posizionarli in modo "assoluto" all'interno della schermata o di un contenitore specifico.

---

# 1. Che cos'è lo Stack?

Lo Stack (letteralmente "pila") permette di posizionare i widget uno sopra l'altro. A differenza di Row e Column, che dispongono i figli in modo sequenziale (orizzontale o verticale), lo Stack li sovrappone seguendo l'ordine della lista children: il primo elemento della lista sarà quello più in fondo, l'ultimo sarà quello più in primo piano.

Casi d'uso principali:

- Elementi sovrapposti: Mettere del testo o un'icona sopra un'immagine.

- Elementi fissi: Creare pulsanti o icone che rimangono fissi in una posizione specifica (es. il cuore per il "like" su una card o un tasto di aiuto fisso).

- Posizionamento assoluto: Simile al position: absolute del CSS nel web design.

---

# 2. Posizionamento con il widget Positioned

Per muovere con precisione i figli all'interno di uno Stack, si utilizza il widget Positioned. Questo widget deve essere un figlio diretto dello Stack.

Proprietà di Positioned:

- top, bottom, left, right: Permettono di definire la distanza dai bordi dello Stack.

- width, height: Permettono di forzare le dimensioni dell'elemento posizionato.

- Regola dei valori: I valori positivi (es. left: 50) spostano l'elemento verso l'interno rispetto al bordo indicato. Valori negativi lo spostano all'esterno.

```dart
Stack(
  children: [
    Container(
      width: 300,
      height: 300,
      color: Colors.red,
    ),
    Positioned(
      top: 20,
      right: 20,
      child: Icon(Icons.star, color: Colors.white, size: 50),
    ),
  ],
)
```

---

# 3. Positioned.fill

Una variante utile è Positioned.fill. Questo costruttore forza il widget figlio a riempire tutto lo spazio disponibile dello Stack, a meno che non vengano specificati dei margini (top, bottom, ecc.).

```dart
Stack(
  children: [
    // Questo container riempirà tutto lo spazio dello Stack
    Positioned.fill(
      child: Container(color: Colors.orange.withOpacity(0.5)),
    ),
    const Center(child: Text("Testo al centro")),
  ],
)
```

---

# 4. Stack vs Scaffold

Il docente sottolinea un aspetto importante sul raggio d'azione dello Stack:

Nello Scaffold (Body): Se lo Stack è il figlio del body dello Scaffold, prenderà come riferimento l'area di lavoro principale (sotto l'AppBar).

Fuori dallo Scaffold: Se vogliamo che gli elementi siano posizionati rispetto all'intera area dello schermo (compresa l'area dell'AppBar o della barra di stato), lo Stack deve avvolgere lo Scaffold o essere gestito a un livello superiore.

---

# 5. Tips & Troubleshooting

**Errore "Costante"**: Se ricevi un errore rosso e sei sicuro che il codice sia corretto, controlla se hai la parola chiave const davanti allo Stack o al widget padre. Se i figli (come un Container con colore variabile) non possono essere costanti, rimuovi il const.

**Dimensioni dello Stack**: Di default, uno Stack si ridimensiona in base al figlio più grande che non è "posizionato" (ovvero i figli semplici, non avvolti da Positioned).