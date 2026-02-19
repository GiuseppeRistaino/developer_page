---
slug: "Lezione 15"
title: "Lezione 15"
date: "2026-02-12"
readTime: "10 min"
excerpt: "Scrolling e Scrollbar"
---

# Scrolling e Scrollbar

In questa lezione impariamo a gestire il contenuto che eccede le dimensioni dello schermo, risolvendo l'errore di Overflow e aggiungendo una barra di scorrimento personalizzata.

---

# 1. L'errore di Overflow

Quando il contenuto di un widget (come una Column) è più lungo dello spazio fisico dello schermo, Flutter mostra un avviso visivo (una banda a strisce gialle e nere) e un errore in console: Bottom overflowed by X pixels.
Questo accade perché, di default, widget come Column non sono scrollabili.

---

# 2. SingleChildScrollView

Per rendere un contenuto scrollabile, il metodo più semplice è avvolgere il widget (ad esempio la Column) nel widget SingleChildScrollView.

Proprietà principali:

- **scrollDirection**: Definisce l'asse di scorrimento. Axis.vertical (default) o Axis.horizontal.

- **reverse**: Se impostato su true, lo scroll parte dal fondo invece che dall'inizio.

- **padding**: Permette di aggiungere spazio vuoto attorno al contenuto scrollabile.

- **controller**: (Avanzato) Permette di controllare la posizione dello scroll via codice (es. per creare un tasto "Torna su").

```dart
SingleChildScrollView(
  padding: const EdgeInsets.all(20),
  scrollDirection: Axis.vertical,
  child: Column(
    children: [
      Text("Lungo testo..."),
      // Altri widget che eccedono lo schermo
    ],
  ),
)
```

---

# 3. Aggiungere la Scrollbar

In Flutter, la barra di scorrimento non è sempre visibile di default. Per mostrarla e personalizzarla, dobbiamo avvolgere il nostro SingleChildScrollView con il widget Scrollbar.

Personalizzazione della Scrollbar:

- **thumbVisibility**: Se true, la barra rimane sempre visibile (sostituisce il vecchio isAlwaysShown).

- **trackVisibility**: Mostra il "binario" su cui scorre la barra.

- **thickness**: Spessore della barra in pixel.

- **radius**: Arrotondamento degli angoli (es. Radius.circular(20)).

- **scrollbarOrientation**: Posiziona la barra (es. ScrollbarOrientation.left per averla a sinistra).

```dart
Scrollbar(
  thumbVisibility: true, // Sempre visibile
  thickness: 10,         // Spessore maggiorato
  radius: const Radius.circular(10), 
  child: SingleChildScrollView(
    child: Column(
      children: List.generate(50, (i) => Text("Elemento $i")),
    ),
  ),
)
```

---

# 4. Stack e Scroll: Elementi Fissi

Un concetto potente spiegato nella lezione è l'unione di Stack e SingleChildScrollView.
Se mettiamo un SingleChildScrollView all'interno di uno Stack insieme a un widget Positioned, quest'ultimo rimarrà fisso sullo schermo mentre il contenuto del primo scorre sotto di esso.

```dart
Stack(
  children: [
    // Livello 1: Contenuto che scorre
    SingleChildScrollView(
      child: Column(
        children: [ /* Molto testo qui */ ],
      ),
    ),
    // Livello 2: Elemento fisso sopra lo scroll
    Positioned(
      bottom: 20,
      right: 20,
      child: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.arrow_upward),
      ),
    ),
  ],
)
```

---

# Note Finali

- **Scorrimento Orizzontale**: Ricorda che se imposti la Scrollbar su bottom o top, anche il SingleChildScrollView deve avere scrollDirection: Axis.horizontal, altrimenti Flutter restituirà un errore di incompatibilità.

- **StatefulWidget**: Per usare i ScrollController in modo avanzato (es. per sapere esattamente quanti pixel l'utente ha scrollato), sarà necessario utilizzare gli StatefulWidget, che verranno approfonditi in seguito.