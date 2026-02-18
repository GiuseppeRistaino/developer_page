---
slug: "Lezione 10"
title: "Lezione 10"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Il Catalogo dei Widget"
---

# Appunti Flutter - Lezione 10: Il Catalogo dei Widget

In questa lezione viene esplorato il panorama completo dei widget di Flutter. L'obiettivo non è impararli tutti a memoria, ma capire come sono categorizzati per sapere cosa cercare quando si presenta un problema di sviluppo.

# Risorse Utili

Per consultare l'elenco completo, la risorsa ufficiale è il [Widget Catalog](https://docs.flutter.dev/ui/widgets) (o cercando su Google "Flutter Widget Catalog").

---

# Macro-Categorie di Widget

I widget di Flutter sono divisi in categorie funzionali. Ecco le principali analizzate:

## 1. Accessibilità (Accessibility)

Widget dedicati a rendere l'app fruibile da utenti con disabilità (es. lettori di schermo).

## 2. Animazioni e Motion

Permettono di gestire transizioni e movimenti.

  - Implicitly Animated Widgets: Widget che animano automaticamente il cambio di proprietà (es. AnimatedContainer, AnimatedOpacity, AnimatedAlign). Funzionano in modo simile alle transizioni CSS.

  - Hero: Utilizzato per animazioni di transizione fluide tra diverse schermate.

## 3. Asset, Immagini e Icone

Icon: Per inserire icone vettoriali.

  - Image: Supporta diversi costruttori come .asset, .network, .file e .memory.

## 4. Async (Dati Asincroni)

Fondamentali per gestire dati che arrivano nel tempo (es. chiamate API):

  - FutureBuilder: Costruisce il widget basandosi sull'ultimo "snapshot" di un'interazione con un Future (un singolo valore che arriverà).

  - StreamBuilder: Costruisce il widget basandosi su un flusso costante di dati (es. chat, quotazioni di borsa, live score).

## 5. Basics (I Fondamentali)

I mattoni essenziali per ogni app:

  - Scaffold, AppBar, Container, Column, Row, Text, Icon, ElevatedButton.

## 6. Cupertino (iOS Style) vs Material (Android Style)

Flutter offre due librerie di design specifiche:

  - Material Components: Seguono le linee guida del design di Google (Android).

  - Cupertino: Seguono il design di Apple (iOS). Utile se si vuole un look nativo specifico per iPhone.

## 7. Input e Interazioni

Input: Widget come TextField e Form per raccogliere dati dall'utente.

  - Interaction Models: Gestiscono il tocco, il trascinamento (Draggable) e la navigazione tra pagine (Navigator).

## 8. Layout

La categoria più corposa, che determina la struttura dello schermo:

  - Align, AspectRatio, Center.

  - Padding, SizedBox, Expanded.

  - Column (verticale), Row (orizzontale), Stack (elementi sovrapposti).

  - ListView, GridView (per liste e griglie).

  - Slivers: Widget per effetti di scorrimento avanzati e dinamici.

## 9. Painting ed Effetti

Widget per manipolare l'aspetto visivo:

  - Clip: Per ritagliare elementi (es. ClipRRect per arrotondare i bordi di un'immagine).

  - Opacity, DecoratedBox, Transform (per rotazioni e trasformazioni 3D).

---

# Consigli del Docente

- Sperimentazione su IDE: Anziché perdersi nella documentazione scritta (a volte confusionaria), è più utile passare il cursore sopra un widget in Android Studio/VS Code per vedere le proprietà disponibili e testarle immediatamente.

- Non reinventare la ruota: Molto spesso esiste già un widget specifico per quello che vuoi fare (es. invece di usare un Container con margini vuoti, usa un Padding o un SizedBox).

- Visione d'insieme: I widget non sono infiniti. Una volta capita la divisione in categorie, diventa facile trovare lo strumento giusto per ogni necessità di layout o funzionalità.