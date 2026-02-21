---
slug: "Lezione 20"
title: "Lezione 20"
date: "2026-02-14"
readTime: "10 min"
excerpt: "Painting e Trasformazioni"
---

# Painting e Trasformazioni

In questa lezione esploriamo i widget che permettono di modificare l'aspetto estetico, la trasparenza, la forma e la posizione spaziale dei componenti.

---

# 1. Opacity (Opacità)

Il widget Opacity permette di rendere un figlio parzialmente o totalmente trasparente.

- **Valore**: Accetta un double da 0.0 (completamente invisibile) a 1.0 (completamente opaco).

```dart
Opacity(
  opacity: 0.5, // Trasparenza al 50%
  child: Container(color: Colors.red, height: 300),
)
```

---

# 2. Transform (Trasformazioni)

Il widget Transform permette di applicare trasformazioni geometriche ai widget figli. Invece di usare matrici complesse, Flutter offre costruttori semplificati:

## A. Transform.rotate

Ruota il widget di un determinato angolo (espresso in radianti).

```dart
Transform.rotate(
  angle: 1.57, // Circa 90 gradi
  child: Container(color: Colors.red, height: 100, width: 100),
)
```

## B. Transform.scale

Ingrandisce o rimpicciolisce il widget rispetto alla dimensione originale.

```dart
Transform.scale(
  scale: 2.0, // Raddoppia la dimensione
  child: Container(color: Colors.red, height: 100, width: 100),
)
```

## C. Transform.translate

Sposta il widget dalla sua posizione originale usando un Offset (X, Y).

```dart
Transform.translate(
  offset: const Offset(100.0, 50.0), // Sposta a destra di 100 e in basso di 50
  child: Container(color: Colors.red, height: 100, width: 100),
)
```

---

# 3. Clip (Ritaglio)

I widget "Clip" vengono utilizzati per tagliare il contenuto dei figli in forme specifiche.

- **ClipOval**: Taglia il figlio in forma ellittica o circolare.

- **ClipRRect** (Rounded Rect): Taglia il figlio con angoli arrotondati. È molto utile per widget che non supportano nativamente il borderRadius.

```dart
ClipRRect(
  borderRadius: const BorderRadius.only(
    bottomLeft: Radius.circular(20),
    bottomRight: Radius.circular(20),
  ),
  child: Container(color: Colors.red, height: 300),
)
```

---

# 4. DecoratedBox e BoxDecoration

DecoratedBox è un widget che disegna una decorazione (BoxDecoration) prima o dopo il suo bambino. È spesso preferito a un Container quando serve solo la parte estetica di sfondo.

Proprietà di BoxDecoration:

- **image**: Per impostare un'immagine di sfondo (DecorationImage).

- **shape**: Può essere BoxShape.rectangle o BoxShape.circle.

- **gradient**: Per creare sfumature (es. LinearGradient).

- **backgroundBlendMode**: Permette di miscelare il colore di sfondo con l'immagine o il gradiente (es. BlendMode.difference).

```dart
DecoratedBox(
  decoration: BoxDecoration(
    shape: BoxShape.rectangle,
    image: const DecorationImage(
      image: NetworkImage('https://example.com/montagna.jpg'),
      fit: BoxFit.fill,
    ),
    gradient: LinearGradient(
      colors: [Colors.orange, Colors.green.withOpacity(0.5)],
    ),
  ),
  child: const SizedBox(height: 300, width: double.infinity),
)
```

---

# Tips della lezione

- **Offset**: Ricorda che l'origine (0,0) è l'angolo in alto a sinistra. Valori positivi di X spostano a destra, valori positivi di Y spostano in basso.

- **SizedBox come segnaposto**: Se usi DecoratedBox e vuoi che si veda lo sfondo senza aggiungere contenuti testuali, usa un SizedBox con altezza e larghezza per dare forma al widget.

- **Matrix4**: Sebbene Transform supporti Matrix4, i costruttori .rotate, .scale e .translate coprono il 99% dei casi d'uso comuni in modo molto più semplice.