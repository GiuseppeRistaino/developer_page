---
slug: "Lezione 18"
title: "Lezione 18"
date: "2026-02-13"
readTime: "10 min"
excerpt: "ListTile e GridTile"
---

# ListTile e GridTile

Questi due widget sono progettati per implementare i pattern grafici più comuni del Material Design. Servono a creare i "singoli pezzi" che compongono una lista o una griglia, fornendo una struttura già pronta (immagini, testi, icone) che altrimenti richiederebbe l'uso di molti widget annidati (Row, Column, Padding).

---

# 1. ListTile

Il widget ListTile è la soluzione standard per creare righe di una lista (stile contatti WhatsApp, impostazioni, ecc.).

Struttura del ListTile:

- **leading**: Il widget posizionato all'inizio della riga (es. un avatar o un'icona).

- **title**: Il testo principale (spesso in grassetto).

- **subtitle**: Testo secondario, posizionato sotto il titolo.

- **trailing**: Il widget posizionato alla fine della riga (es. un'icona di azione o un checkbox).

- **tileColor**: Colore di sfondo della riga.

```dart
ListView(
  children: [
    ListTile(
      leading: CircleAvatar(
        radius: 30,
        backgroundImage: NetworkImage('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd11074586583045'),
      ),
      title: const Text("Luca Rossi"),
      subtitle: const Text("Ciao, come stai?"),
      trailing: const Icon(Icons.drag_handle),
      tileColor: Colors.grey[200],
      onTap: () {
        // Azione al click
      },
    ),
  ],
)
```

---

# 2. GridTile

GridTile è il widget corrispondente per le griglie (GridView). È particolarmente utile per creare gallerie fotografiche dove l'immagine ha un'intestazione o una didascalia sovrapposta.

Struttura del GridTile:

- **child**: Il widget principale (solitamente un'immagine).

- **header**: Un widget sovrapposto nella parte superiore.

- **footer**: Un widget sovrapposto nella parte inferiore (molto usato per nomi di file o pulsanti "Like").

```dart
GridView.count(
  crossAxisCount: 2,
  crossAxisSpacing: 8,
  mainAxisSpacing: 8,
  children: [
    GridTile(
      header: Container(
        color: Colors.black45,
        padding: const EdgeInsets.all(4),
        child: const Text("Foto 1", style: TextStyle(color: Colors.white)),
      ),
      footer: Container(
        color: Colors.black45,
        child: const Icon(Icons.favorite, color: Colors.red),
      ),
      child: Image.network(
        'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd11074586583045?s=250',
        fit: BoxFit.cover,
      ),
    ),
  ],
)
```

---

# 3. Perché usare questi widget?

| Caratteristica | Metodo Manuale (Row/Column) | ListTile / GridTile |
|---------------|----------------------------|---------------------|
| Complessità | Molti widget annidati | Struttura fissa e chiara |
| Velocità | Lento da implementare | Rapidissimo |
| Allineamento | Va gestito manualmente | Già ottimizzato (Material Design) |
| Interattività | Richiede `InkWell` o `GestureDetector` | `onTap` integrato (per `ListTile`) |

---

# Tips della lezione

- **CircleAvatar**: È il compagno perfetto del leading in un ListTile per creare le foto profilo tonde.

- **BoxFit.cover**: Quando usi immagini nelle griglie, usa sempre fit: BoxFit.cover per far sì che l'immagine riempia tutto lo spazio del tile senza lasciare buchi bianchi.

- **Footer semitrasparente**: Usando un Container con un colore che ha opacità (es. Colors.black45) come footer, puoi mostrare informazioni sopra l'immagine senza coprirla del tutto.