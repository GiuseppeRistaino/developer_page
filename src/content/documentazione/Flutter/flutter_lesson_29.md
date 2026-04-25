---
slug: "Lezione 29"
title: "Lezione 29"
date: "2026-02-17"
readTime: "10 min"
excerpt: "Hero Animation"
---

# Hero Animation

La Hero Animation è un'animazione di transizione che permette a un elemento (un'immagine, un'icona, un testo) di "volare" da una schermata all'altra. Questo crea un senso di continuità visiva, facendo sembrare che l'oggetto si espanda o si sposti dalla posizione iniziale alla destinazione finale.

---

# 1. Come funziona il concetto di "Hero"

Nonostante sembri che l'oggetto si muova fisicamente tra le pagine, in realtà Flutter:

1. Identifica due widget identici in due schermate diverse tramite un Tag comune.

2. Calcola la differenza di posizione e dimensione tra i due widget.

3. Crea un'animazione fluida che sovrappone l'elemento durante il cambio di rotta (Navigation).

---

# 2. Implementazione Base

Per creare l'effetto, è necessario avvolgere il widget che si vuole animare in entrambe le pagine con il widget Hero.

**Proprietà fondamentale**:

- tag: Una stringa o un oggetto unico. Deve essere identico in entrambe le pagine affinché Flutter possa collegare i due widget.

## Pagina 1 (La Card di partenza)

```dart
Hero(
  tag: 'immagine_copertina', // Tag unico
  child: Image.asset('assets/montagna.jpg'),
)
```

## Pagina 2 (La Pagina di dettaglio)

```dart
Hero(
  tag: 'immagine_copertina', // Stesso tag della Pagina 1
  child: Image.asset('assets/montagna.jpg'),
)
```

---

# 3. Esempio Pratico: Transizione Immagine e Icona

Di seguito viene mostrato come applicare l'animazione non solo a immagini grandi, ma anche a piccoli elementi come le icone dei "preferiti".

## Codice per la Card (Pagina A)

```dart
Card(
  child: Column(
    children: [
      Hero(
        tag: 'cover_1',
        child: Image.asset('assets/corso_flutter.png'),
      ),
      ListTile(
        title: Text("Corso Flutter"),
        trailing: Hero(
          tag: 'fav_icon_1',
          child: Icon(Icons.favorite, color: Colors.red),
        ),
      ),
    ],
  ),
)
```

## Codice per il Dettaglio (Pagina B)

Quando l'utente preme sulla card e naviga verso la seconda pagina, gli elementi con lo stesso tag voleranno nelle nuove posizioni definite nel layout della pagina di destinazione.

---

# 4. Considerazioni Tecniche

- **Unicità del Tag**: Se hai una lista di 10 card, ogni card deve avere un tag unico (es. tag: 'immagine_${id}'). Se due Hero nella stessa schermata hanno lo stesso tag, Flutter restituirà un errore.

- **Transizione Inversa**: L'animazione funziona automaticamente anche all'indietro. Quando premi il tasto "Back" o fai il gesto di pop, l'elemento torna fluidamente nella sua posizione originale nella lista.

- **Layout**: L'animazione tiene conto dei padding e degli allineamenti. Se l'immagine nella Pagina A è centrata e nella Pagina B è in alto a sinistra, Flutter gestirà la traslazione e il ridimensionamento.

---

# Tips & Best Practices

- **Immagini ad alta risoluzione**: Poiché l'immagine si ingrandisce durante l'animazione, assicurati che la qualità sia sufficiente per non apparire sgranata nella pagina di dettaglio.

- **Velocità**: La durata della Hero Animation è legata alla durata della transizione della pagina (MaterialPageRoute). Non c'è bisogno di configurare timer manuali.

- **Esperienza Utente (UX)**: Usa la Hero Animation per guidare l'occhio dell'utente verso il contenuto principale. È perfetta per gallerie fotografiche, e-commerce (prodotto -> dettaglio) e profili social.