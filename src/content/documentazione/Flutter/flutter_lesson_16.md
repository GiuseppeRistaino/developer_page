---
slug: "Lezione 16"
title: "Lezione 16"
date: "2026-02-12"
readTime: "10 min"
excerpt: "ListView"
---

# ListView

n questa lezione viene introdotto il widget ListView, uno dei componenti più importanti per creare interfacce moderne. Viene spiegato come questo widget rappresenti una "scorciatoia" efficiente rispetto alla combinazione manuale di più widget.

---

# 1. Dal metodo manuale alla ListView

Prima di utilizzare la ListView, per creare una lista di elementi scrollabili avremmo dovuto combinare:

1. SingleChildScrollView (per lo scroll)

2. Padding (per lo spazio dai bordi)

3. Column (per disporre gli elementi verticalmente)

La ListView accorpa tutte queste funzionalità in un unico widget, riducendo la quantità di codice e semplificando la gerarchia dei widget.

```dart
SingleChildScrollView(
  child: Padding(
    padding: const EdgeInsets.all(8.0),
    child: Column(
      children: [
        for (int i = 0; i < 10; i++)
          Container(
            height: 100,
            margin: const EdgeInsets.only(bottom: 10),
            color: Colors.grey,
            child: Center(child: Text("Elemento $i")),
          ),
      ],
    ),
  ),
)
```

---

# 2. Implementazione con ListView

Con la ListView, il codice diventa più pulito. Il padding è integrato e lo scroll è automatico.

Proprietà principali:

- **children**: La lista di widget da mostrare.

- **padding**: Gestisce lo spazio interno alla lista.

- **scrollDirection**: Può essere Axis.vertical (default) o Axis.horizontal.

- **reverse**: Se true, inverte l'ordine degli elementi (utile per le chat).

```dart
ListView(
  padding: const EdgeInsets.all(8.0),
  children: [
    for (int i = 0; i < 10; i++)
      Container(
        height: 100,
        margin: const EdgeInsets.only(bottom: 10),
        color: Colors.grey,
        alignment: Alignment.center,
        child: Text("Elemento $i"),
      ),
  ],
)
```

---

# 3. ListView Orizzontale (Effetto Stories)

Per creare una lista a scorrimento orizzontale (come le Stories di Instagram), bisogna cambiare la scrollDirection.

- **Attenzione ai Vincoli** (Constraints): Quando si usa lo scroll orizzontale, non si può usare width: double.infinity perché la larghezza diventa potenzialmente infinita. Bisogna impostare una larghezza fissa per gli elementi e spesso avvolgere la ListView in un contenitore con altezza definita (es. SizedBox o Container).

```dart
SizedBox(
  height: 120, // Altezza fissa per limitare la ListView
  child: ListView(
    scrollDirection: Axis.horizontal,
    children: [
      for (int i = 0; i < 10; i++)
        Container(
          width: 100, // Larghezza fissa necessaria
          margin: const EdgeInsets.only(right: 10),
          color: Colors.orange,
          child: Center(child: Text("Story $i")),
        ),
    ],
  ),
)
```

---

# 4. Perché preferire le ListView?

**Meno codice**: Evita di annidare troppi widget (Boilerplate code).

**Gestione integrata**: Gestisce nativamente il padding e l'orientamento dello scroll.

**Performance**: Sebbene la ListView classica carichi tutti i figli insieme, prepara il terreno per versioni più avanzate come ListView.builder (che vedremo nelle prossime lezioni) che ottimizzano la memoria per liste lunghissime.

---

# Tips della lezione

- Se gli elementi "escono" dallo schermo lateralmente o verticalmente senza scrollare, Flutter mostrerà l'errore di Overflow. La ListView risolve questo problema automaticamente fornendo un'area scrollabile.

- Usando l'interpolazione di stringhe ${i} o semplicemente i.toString(), possiamo visualizzare dinamicamente l'indice del ciclo all'interno dei widget.