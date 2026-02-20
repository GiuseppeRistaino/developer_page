---
slug: "Lezione 17"
title: "Lezione 17"
date: "2026-02-13"
readTime: "10 min"
excerpt: "GridView"
---

# GridView

In questa lezione esploriamo il widget GridView, lo strumento principale di Flutter per disporre elementi in una griglia scrollabile. Esistono due modi principali per implementarla: GridView.count e GridView.builder.

---

# 1. GridView.count

È il metodo più semplice quando si conosce a priori il numero di elementi o si ha una lista finita. Funziona in modo simile a una Column o una ListView, accettando una lista di children.

Proprietà Fondamentali:

- **crossAxisCount**: (Obbligatorio) Definisce il numero di elementi per riga (se lo scroll è verticale).

- **crossAxisSpacing**: Spazio orizzontale tra le colonne.

- **mainAxisSpacing**: Spazio verticale tra le righe.

- **padding**: Spazio vuoto attorno all'intera griglia.

```dart
GridView.count(
  crossAxisCount: 3, // 3 elementi per riga
  crossAxisSpacing: 8,
  mainAxisSpacing: 8,
  padding: const EdgeInsets.all(8),
  children: [
    for (int i = 0; i < 10; i++)
      Container(
        color: Colors.blue,
        child: Center(child: Text("Elemento $i")),
      ),
  ],
)
```

---

# 2. GridView.builder

È il metodo più efficiente e "dinamico". Viene usato per liste molto lunghe o infinite, poiché costruisce i widget solo quando stanno per apparire sullo schermo (lazy loading).

Concetti Chiave:

- **gridDelegate**: Gestisce la struttura della griglia. Il delegato più comune è SliverGridDelegateWithFixedCrossAxisCount.

- **itemBuilder**: Una funzione che riceve il BuildContext e l'indice (index) e ritorna il widget da visualizzare.

- **itemCount**: Definisce il numero totale di elementi. Se omesso, la griglia sarà infinita.

- **childAspectRatio**: Permette di cambiare la proporzione degli elementi (es. 1.0 è un quadrato, 2.0 è un rettangolo largo).

```dart
GridView.builder(
  itemCount: 50, // Numero limitato di elementi
  padding: const EdgeInsets.all(8),
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,       // 2 colonne
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 1.0,   // Rapporto 1:1 (quadrati)
  ),
  itemBuilder: (context, index) {
    return Container(
      color: Colors.orange,
      child: Center(child: Text("Index $index")),
    );
  },
)
```

---

# 3. Differenze tra Count e Builder

| Caratteristica | GridView.count | GridView.builder |
|---------------|----------------|------------------|
| Utilizzo | Liste piccole e statiche | Liste grandi o dinamiche (API) |
| Performance | Carica tutti i figli subito | Carica i figli "on-demand" (migliore) |
| Struttura | Proprietà dirette (es. `crossAxisCount`) | Richiede un `gridDelegate` |
| Figli | Proprietà `children` (List) | Proprietà `itemBuilder` (Function) |

---

# 4. Analisi del BuildContext e Index

All'interno del itemBuilder, Flutter passa due parametri:

- **BuildContext** context: Rappresenta il "dove" il widget si trova nell'albero dei widget. Serve a Flutter per gestire temi, navigazione e localizzazione.

- **int** index: È la posizione dell'elemento che si sta costruendo in quel momento (parte da 0).

---

# Tips della lezione

- **Effetto Instagram**: Un profilo Instagram è essenzialmente una GridView con crossAxisCount: 3 e childAspectRatio: 1.0.

- **Spreco di Widget**: Evita di avvolgere una GridView in un Padding se puoi usare la proprietà padding interna al widget stesso; rende il codice più pulito e performante.

- **Infinite Scroll**: Se non si imposta itemCount nel builder, si può creare un flusso infinito di dati, ideale per feed di social network.