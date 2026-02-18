---
slug: "Lezione 11"
title: "Lezione 11"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Row e Column"
---

# Lezione 11: Row e Column

In questa lezione vengono analizzati i due widget fondamentali per il posizionamento degli elementi nello spazio: **Row** (riga) e **Column** (colonna).

# Differenze Base

- Container: Accetta un solo figlio (child). Se non ha figli o dimensioni specificate, spesso non è visibile.

- Row / Column: Sono widget multi-figlio. Accettano una lista di widget tramite la proprietà children: [].

---

# Assi Principali e Incrociati

Il concetto più importante per padroneggiare questi widget è la distinzione tra gli assi, che si invertono a seconda del widget usato:

| Widget | Main Axis (Asse Principale) | Cross Axis (Asse Incrociato) |
|--------|----------------------------|------------------------------|
| Column | Verticale (Y)              | Orizzontale (X)              |
| Row    | Orizzontale (X)            | Verticale (Y)                |

# Proprietà di Allineamento

## 1. MainAxisAligment (Allineamento asse principale)

Definisce come i figli vengono distribuiti lungo l'asse principale.

- start: Elementi raggruppati all'inizio.

- end: Elementi raggruppati alla fine.

- center: Elementi raggruppati al centro.

- spaceBetween: Spazio solo tra gli elementi (il primo e l'ultimo toccano i bordi).

- spaceAround: Spazio attorno a ogni elemento (lo spazio tra due elementi è il doppio di quello ai bordi).

- spaceEvenly: Lo spazio tra gli elementi e quello ai bordi è esattamente identico.

## 2. CrossAxisAlignment (Allineamento asse incrociato)

Definisce come i figli vengono allineati rispetto all'asse opposto.

- start / end / center.

- stretch: Forza i figli a espandersi per occupare tutto lo spazio disponibile nell'asse incrociato.

## 3. MainAxisSize

Definisce quanto spazio deve occupare il widget stesso lungo il suo asse principale:

- MainAxisSize.max (Default): Occupa tutto lo spazio possibile.

- MainAxisSize.min: Si stringe fino a occupare solo lo spazio necessario ai suoi figli.

---

# Direzione del contenuto

- textDirection: Gestisce l'orientamento orizzontale (es. TextDirection.ltr da sinistra a destra o rtl da destra a sinistra).

- verticalDirection: Gestisce l'ordine verticale.

  - VerticalDirection.down (Default): Dall'alto verso il basso.

  - VerticalDirection.up: Dal basso verso l'alto (inverte l'ordine visivo dei figli).

---

# Casi d'uso Comuni (Esempi)

- Card di un profilo: Una Row che contiene un'immagine a sinistra e una Column a destra per titolo e sottotitolo.

- Layout di una notizia: Una Column che contiene in ordine: Immagine, Titolo e Descrizione.

---

# Scorciatoie IDE

In Android Studio o VS Code, è possibile avvolgere velocemente un widget esistente in una Row o Column usando la combinazione Alt + Invio (o Cmd + . su Mac) e selezionando "Wrap with Row" o "Wrap with Column".