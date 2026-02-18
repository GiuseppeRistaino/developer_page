---
slug: "Lezione 12"
title: "Lezione 12"
date: "2026-02-12"
readTime: "12 min"
excerpt: "Container e Padding"
---

# Container e Padding

In questa lezione analizziamo due dei widget più utilizzati per la gestione dello spazio e della decorazione: **Container** e **Padding**. Sebbene possano sembrare simili, hanno scopi e complessità differenti.

---

# 1. Il Widget Container

Il **Container** è un widget versatile che combina diverse funzionalità: pittura (painting), posizionamento e dimensionamento.

Proprietà principali:

- **color**: Imposta il colore di sfondo.

- **child**: Accetta un singolo widget figlio.

- **width / height**: Definisce le dimensioni fisse. Se non specificate, il container tende ad adattarsi alla dimensione del figlio o a occupare tutto lo spazio disponibile (se il padre lo permette).

- **alignment**: Allinea il figlio all'interno del container (es. Alignment.center, Alignment.bottomRight).

- **transform**: Permette di ruotare, scalare o traslare il widget tramite matrici (es. Matrix4).

# Il Box Model (Margini, Bordi, Padding)

Il Container segue il concetto di "Box Model" tipico del web:

- **Contenuto**: Il widget figlio (child).

- **Padding**: Spazio vuoto interno tra il contenuto e il bordo del container.

- **Bordo**: La linea perimetrale del box (configurabile tramite decoration).

- **Margine**: Spazio vuoto esterno tra il bordo del container e gli altri widget circostanti.

```dart
Container(
  width: 300,
  height: 300,
  color: Colors.orange,
  margin: const EdgeInsets.all(20), // Spazio esterno
  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20), // Spazio interno
  alignment: Alignment.bottomRight, // Allineamento del figlio
  transform: Matrix4.rotationZ(0.2), // Rotazione del container
  child: const Text("Ciao Flutter!"),
)
```

---

# 2. Decoration e Bordi

Quando vogliamo aggiungere bordi arrotondati, ombre o bordi colorati, usiamo la proprietà decoration.

> **Nota Bene**: Se utilizzi decoration, il parametro color deve essere spostato all'interno di BoxDecoration. Lasciarlo fuori causerà un errore.

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.red, // Colore spostato qui dentro
    border: Border.all(
      color: Colors.indigo,
      width: 10,
    ),
    borderRadius: BorderRadius.circular(15), // Angoli arrotondati
  ),
  child: const Text("Box Decorato"),
)
```
---

# 3. Il Widget Padding

Il widget Padding serve a uno scopo specifico: aggiungere spazio vuoto attorno a un widget figlio. È meno pesante di un Container perché non ha proprietà di decorazione o trasformazione.

## Perché usare Padding invece di Container?

- **Specificità**: Se hai bisogno solo di spazio, Padding è semanticamente più corretto.

- **Leggerezza**: È un widget più semplice e ottimizzato per un solo compito.

- **Pulizia del codice**: Se l'IDE (Android Studio/VS Code) ti avvisa che un Container non è necessario, solitamente è perché lo stai usando solo per il padding senza sfruttare altre proprietà.

```dart
Padding(
  padding: const EdgeInsets.all(8.0),
  child: const Text("Testo con spazio attorno"),
)
```

---

# 4. Riepilogo differenze

| Funzionalità        | Container | Padding |
|---------------------|-----------|---------|
| Spazio interno      | ✅ Sì     | ✅ Sì   |
| Colore di sfondo    | ✅ Sì     | ❌ No   |
| Bordi e Ombre       | ✅ Sì     | ❌ No   |
| Dimensioni fisse    | ✅ Sì     | ❌ No   |
| Trasformazioni      | ✅ Sì     | ❌ No   |

## Regola generale:

- Usa **Padding** quando vuoi solo distanziare un elemento dai bordi o da altri elementi.

- Usa **Container** quando devi creare una "scatola" con stile (colori, bordi, dimensioni precise, rotazioni).