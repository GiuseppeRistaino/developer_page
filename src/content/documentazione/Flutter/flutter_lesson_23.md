---
slug: "Lezione 23"
title: "Lezione 23"
date: "2026-02-14"
readTime: "10 min"
excerpt: "Esercizio Pratico sugli Stati"
---

# Esercizio Pratico sugli Stati

In questa lezione mettiamo in pratica i concetti di StatefulWidget e setState creando un componente tipico dei social network: una Card interattiva con un sistema di "Like" tramite doppio tocco (Double Tap).

---

# 1. Obiettivo dell'Esercizio

- Creare una Card contenente un'immagine.

- Inserire un'icona a forma di cuore (Like) posizionata sopra l'immagine.

- Implementare il cambio di stato: al Double Tap sulla card, l'icona deve passare da "vuota" a "rossa riempita" e viceversa.

---

# 2. Struttura del Widget (UI)

Per posizionare l'icona sopra l'immagine all'interno della Card, utilizziamo lo speciale widget Stack. Questo ci permette di sovrapporre i widget seguendo l'ordine della lista children.

Componenti utilizzati:

- **Card**: Per il contenitore arrotondato.

- **GestureDetector**: Per intercettare il gesto onDoubleTap.

- **Stack**: Per sovrapporre l'icona all'immagine.

- **Positioned**: Per ancorare l'icona in alto a destra.

---

# 3. Implementazione della Logica di Stato

La logica si basa su una variabile booleana che definisce se il post è tra i preferiti o meno.

```dart
bool isFavorite = false; // Stato iniziale: non preferito
```

## Operatore Ternario per l'icona:

Invece di usare blocchi if complessi, usiamo l'operatore ternario direttamente nel metodo build:

- condition ? valueIfTrue : valueIfFalse

## Il cambio di stato:

Ogni volta che l'utente fa doppio tocco, invertiamo il valore di isFavorite usando l'operatore NOT (!).

---

# 4. Codice Completo dell'Esercizio

```dart
class InstagramCard extends StatefulWidget {
  @override
  _InstagramCardState createState() => _InstagramCardState();
}

class _InstagramCardState extends State<InstagramCard> {
  // 1. Definiamo lo stato
  bool isFavorite = false;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: SizedBox(
        height: 300,
        width: 300,
        child: GestureDetector(
          // 2. Intercettiamo il doppio tocco
          onDoubleTap: () {
            setState(() {
              // Invertiamo il valore booleano
              isFavorite = !isFavorite;
            });
          },
          child: Card(
            clipBehavior: Clip.hardEdge,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Stack(
              children: [
                // Immagine di fondo
                Image.network(
                  'https://picsum.photos/300',
                  fit: BoxFit.cover,
                  width: double.infinity,
                  height: double.infinity,
                ),
                // Icona posizionata
                Positioned(
                  top: 10,
                  right: 10,
                  child: Icon(
                    // 3. Logica condizionale per l'icona
                    isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: isFavorite ? Colors.red : Colors.white,
                    size: 30,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
```

---

# Analisi e Tips Tecnici

- **Inversione dello stato**: L'espressione isFavorite = !isFavorite è il modo più elegante per creare un interruttore (toggle). Se è true diventa false, e viceversa.

- **Feedback Visivo**: Grazie a setState, Flutter ricostruisce istantaneamente il widget Icon con le nuove proprietà (colore e forma), dando all'utente la percezione di un'app reattiva.

- **Usi Reali**: Questo concetto si applica a moltissimi casi: cambiare il tema (Dark/Light), mostrare/nascondere una password, attivare/disattivare una notifica.