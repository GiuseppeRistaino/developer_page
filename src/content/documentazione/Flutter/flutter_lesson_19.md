---
slug: "Lezione 19"
title: "Lezione 19"
date: "2026-02-14"
readTime: "10 min"
excerpt: "Il Widget Card"
---

# Il Widget Card

La Card è un componente fondamentale del Material Design. Si presenta come un foglio di materiale con bordi arrotondati e un'ombreggiatura (elevation) che suggerisce profondità rispetto alla superficie sottostante.

---

# 1. Proprietà Principali della Card

Il widget Card offre diverse proprietà per personalizzarne l'aspetto estetico senza dover costruire tutto da zero con un Container.

- **elevation**: Definisce l'altezza della card e, di conseguenza, la dimensione dell'ombra.

- **shadowColor**: Permette di cambiare il colore dell'ombra (utile per design particolari).

- **color**: Definisce il colore di sfondo del cartoncino.

- **margin**: Gestisce lo spazio esterno alla card.

- **shape**: Definisce la geometria della card (es. quanto devono essere arrotondati i bordi).

- **clipBehavior**: Determina come il contenuto all'interno della card debba essere tagliato rispetto ai bordi.

---

# 2. Personalizzare i Bordi (shape)

Di default la Card ha bordi leggermente arrotondati. Se vogliamo accentuare questo effetto, utilizziamo la proprietà shape.

```dart
Card(
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(20), // Bordi molto arrotondati
  ),
  elevation: 10,
  child: const Padding(
    padding: EdgeInsets.all(16.0),
    child: Text("Contenuto della Card"),
  ),
)
```

---

# 3. Gestire il contenuto e il ritaglio (clipBehavior)

Un problema comune si presenta quando inseriamo un'immagine come primo elemento di una Card arrotondata: l'immagine ha angoli retti e copre l'arrotondamento della card stessa.

Per risolvere questo problema, usiamo clipBehavior: Clip.hardEdge. Questa proprietà istruisce la Card a "tagliare" tutto ciò che esce dai suoi bordi definiti nella shape.

```dart
SizedBox(
  height: 350,
  width: 300,
  child: Card(
    clipBehavior: Clip.hardEdge, // Fondamentale per tagliare l'immagine
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
    child: Column(
      children: [
        Image.network(
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
          height: 200,
          width: double.infinity,
          fit: BoxFit.cover,
        ),
        const ListTile(
          title: Text("Splendida Montagna"),
          subtitle: Text("Località: Alpi"),
          trailing: Icon(Icons.favorite_border),
        ),
      ],
    ),
  ),
)
```

---

# 4. Riepilogo Tecnico

| Proprietà     | Tipo         | Descrizione                                                                 |
|--------------|-------------|-----------------------------------------------------------------------------|
| elevation    | double      | Intensità dell'ombra (0 per card piatta).                                  |
| color        | Color       | Colore di sfondo del pannello.                                             |
| clipBehavior | Clip        | Impostare su Clip.hardEdge per arrotondare anche i figli (es. immagini).   |
| shape        | ShapeBorder | Usare RoundedRectangleBorder per gestire il raggio dei bordi.              |

---

# Tips & Best Practices

- **SizedBox vs Container**: Se devi solo dare una dimensione fissa alla Card, usa un SizedBox come genitore. È più leggero di un Container poiché non ha proprietà di decorazione che la Card gestisce già da sola.

- **Elevation**: Non eccedere con valori di elevation troppo alti (es. 50) a meno che non sia strettamente necessario per il design, poiché potrebbe risultare poco naturale.

- **Composizione**: La Card non ha un'altezza predefinita; si adatta al suo contenuto (child). È prassi comune usare una Column all'interno per inserire Immagine, Titolo e Azioni (Bottoni).