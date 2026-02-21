---
slug: "Lezione 21"
title: "Lezione 21"
date: "2026-02-14"
readTime: "10 min"
excerpt: "Slivers e CustomScrollView"
---

# Slivers e CustomScrollView

Gli Slivers sono porzioni di un'area scrollabile che possono essere configurate per comportarsi in modo speciale. Se vuoi ottenere effetti moderni come l'App Bar che si restringe, liste elastiche o griglie e liste mischiate nella stessa pagina, devi usare gli Slivers.

---

# 1. CustomScrollView

Per utilizzare gli Slivers, non possiamo usare una normale ListView. Dobbiamo usare un contenitore speciale chiamato CustomScrollView, che accetta una lista di widget nella proprietà slivers.

```dart
CustomScrollView(
  slivers: [
    // Qui vanno inseriti solo widget di tipo Sliver
  ],
)
```

---

# 2. SliverAppBar

È la versione "potenziata" della classica AppBar. Permette di creare testate che reagiscono allo scroll.

Proprietà chiave:

- **expandedHeight**: L'altezza massima quando la barra è totalmente aperta.

- **flexibleSpace**: Contenuto (spesso un FlexibleSpaceBar) che si ridimensiona o appare durante lo scroll.

- **pinned**: Se true, la barra rimane visibile in alto (bloccata) anche quando si scrolla giù.

- **floating**: Se true, la barra ricompare non appena l'utente inizia a scrollare verso l'alto, senza dover tornare in cima alla pagina.

```dart
SliverAppBar(
  expandedHeight: 200.0,
  pinned: true,
  floating: true,
  flexibleSpace: FlexibleSpaceBar(
    title: const Text("Titolo Animato"),
    background: Image.network('https://picsum.photos/400', fit: BoxFit.cover),
  ),
)
```

---

# 3. SliverList e SliverGrid

All'interno di una CustomScrollView, non si usano ListView o GridView standard, ma le loro versioni Sliver.

## SliverList

Utilizza un **SliverChildBuilderDelegate** per generare gli elementi in modo dinamico.

```dart
SliverList(
  delegate: SliverChildBuilderDelegate(
    (context, index) => ListTile(title: Text("Elemento $index")),
    childCount: 30,
  ),
)
```

## SliverGrid

Richiede un **gridDelegate** (per definire quante colonne avere) e un delegate per i contenuti.

```dart
SliverGrid(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    mainAxisSpacing: 10,
    crossAxisSpacing: 10,
  ),
  delegate: SliverChildBuilderDelegate(
    (context, index) => Container(color: Colors.red, child: Text("Grid $index")),
    childCount: 10,
  ),
)
```

---

# 4. SliverToBoxAdapter

Cosa succede se vuoi inserire un widget "normale" (come un Text, un Container o un Padding) che non è uno Sliver dentro una CustomScrollView?
Devi avvolgerlo in uno **SliverToBoxAdapter**. Questo widget fa da "ponte" tra il mondo degli Slivers e i widget standard.

```dart
SliverToBoxAdapter(
  child: Container(
    padding: const EdgeInsets.all(20),
    color: Colors.yellow,
    child: const Text("Questo è un widget normale dentro una lista di slivers"),
  ),
)
```

---

# Tips & Concetti Avanzati

- **Design Moderno**: Gli Slivers sono il segreto per le interfacce in stile iOS o le app moderne dove le immagini di testata scompaiono fluidamente lasciando posto al titolo.

- **Mix di Layout**: Con CustomScrollView puoi avere una SliverAppBar, seguita da una SliverGrid, poi un titolo fisso con SliverToBoxAdapter e infine una SliverList, tutto nella stessa area di scroll.

- **SliverPersistentHeader**: Citato come widget avanzato per creare header che rimangono "incollati" in cima mentre si scorre la lista (simile ai titoli delle sezioni dei contatti).