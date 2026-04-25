---
slug: "Lezione 28"
title: "Lezione 28"
date: "2026-02-17"
readTime: "10 min"
excerpt: "Animazioni Implicite"
---

# Animazioni Implicite

In Flutter, molte animazioni possono essere gestite automaticamente senza dover scrivere complessi algoritmi di movimento. Questi widget sono chiamati Animated Widget (es. AnimatedContainer, AnimatedPadding, AnimatedOpacity).

---

# 1. Concetto di Animazione Implicita

Un'animazione avviene quando un widget passa da uno Stato A a uno Stato B.

- In un widget normale (es. Container), il cambio di proprietà è istantaneo.

- In un widget animato (es. AnimatedContainer), Flutter calcola automaticamente i frame intermedi per rendere il passaggio fluido.

**Requisito fondamentale**: Poiché c'è un cambio di stato, è necessario utilizzare uno StatefulWidget.

---

# 2. Il widget AnimatedContainer

È uno dei widget animati più potenti. Può animare quasi ogni proprietà: larghezza, altezza, colore, bordi, ombre, ecc.

**Proprietà Chiave**: 

- duration: (Obbligatoria) Definisce quanto tempo dura l'animazione.

- curve: Definisce il "ritmo" dell'animazione (es. Curves.bounceOut per un effetto rimbalzo o Curves.easeInOut).

---

# 3. Esempio Pratico: Container Randomico

In questo esempio, al click di un pulsante, il contenitore cambia dimensioni e colore in modo casuale e animato.

## Logica (Variabili di Stato)

```dart
double _width = 200;
double _height = 200;
Color _color = Colors.green;
double _padding = 10;
```

## Implementazione dell'animazione

```dart
AnimatedPadding(
  padding: EdgeInsets.all(_padding),
  duration: const Duration(seconds: 1),
  child: AnimatedContainer(
    width: _width,
    height: _height,
    duration: const Duration(seconds: 1), // Durata dell'animazione
    curve: Curves.fastOutSlowIn,         // Tipo di curva
    decoration: BoxDecoration(
      color: _color,
      borderRadius: BorderRadius.circular(20),
    ),
  ),
)
```

## Trigger (Cambio di Stato)

Per generare numeri casuali, importiamo il pacchetto dart:math.

```dart
import 'dart:math';

// ... dentro l'onPressed di un bottone
setState(() {
  final random = Random();
  
  // Genera dimensioni casuali tra 0 e 300
  _width = random.nextInt(300).toDouble();
  _height = random.nextInt(300).toDouble();
  
  // Genera un colore casuale RGB
  _color = Color.fromRGBO(
    random.nextInt(256), // Red
    random.nextInt(256), // Green
    random.nextInt(256), // Blue
    1,                   // Opacity
  );
  
  _padding = random.nextInt(50).toDouble();
});
```

---

# 4. Altri Widget Animati comuni

Tutti seguono la stessa logica: basta cambiare il valore della proprietà dentro un setState.

| Widget                    | Cosa anima                                           |
|----------------------------|------------------------------------------------------|
| AnimatedOpacity            | La trasparenza (da 0.0 a 1.0).                      |
| AnimatedAlign              | La posizione all'interno di un genitore.            |
| AnimatedDefaultTextStyle   | Dimensione, colore e stile del testo.               |
| AnimatedPositioned         | Coordinate (top, left, ecc.) dentro uno Stack.      |

---

# Tips & Best Practices

- **Semplicità**: Se devi solo cambiare un colore o una dimensione, usa sempre i widget Animated.... Sono ottimizzati e gestiti interamente dal framework.

- **Duration**: Non esagerare con i tempi. Animazioni tra 200ms e 500ms sono solitamente le più piacevoli per l'utente.

- **Curve**: Sperimenta con Curves. Una curva Curves.elasticOut può dare molta personalità a un pulsante rispetto a una lineare.