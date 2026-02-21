---
slug: "Lezione 22"
title: "Lezione 22"
date: "2026-02-14"
readTime: "10 min"
excerpt: "StatelessWidget vs StatefulWidget"
---

# StatelessWidget vs StatefulWidget

In questa lezione affrontiamo il concetto di Stato e la differenza tra widget che non cambiano mai e widget che possono evolversi nel tempo in base alle interazioni dell'utente.

---

# 1. Il Concetto di Stato (Metafora)

Per capire gli stati, possiamo usare una metafora:

- **Stateless** (Sasso): Un sasso è statico. Non importa cosa accada attorno ad esso o dove lo metti, rimane un sasso, immutabile.

- **Stateful** (Persona): Una persona cambia continuamente. Cresce, impara nuove culture, cambia lavoro (da studente a lavoratore), cambia forma fisica. Questi sono "stati" che la persona assume nel tempo.

In Flutter, lo Stato è l'insieme delle informazioni che possono essere lette quando il widget viene costruito e che potrebbero cambiare durante la vita del widget stesso.

---

# 2. Limiti dello StatelessWidget

Se definiamo una variabile (es. un contatore) all'interno di uno StatelessWidget e proviamo a incrementarla con un bottone, noteremo che:

- La variabile cambia valore internamente (possiamo vederlo con un print in console).

- L'interfaccia grafica non si aggiorna. Questo accade perché lo StatelessWidget non ha il meccanismo per "ricostruirsi" quando i dati cambiano. È come un eremita isolato dal mondo: le cose accadono, ma lui non lo sa e non reagisce.

---

# 3. Lo StatefulWidget e setState()

Per rendere un widget interattivo, dobbiamo convertirlo in StatefulWidget. Questo widget è diviso in due classi:

- La classe del Widget stessa.

- La classe dello Stato, che contiene le variabili e il metodo build.

## Il metodo setState()

Non basta cambiare il valore di una variabile in uno StatefulWidget. Bisogna farlo all'interno della funzione setState().

- **Cosa fa?** Notifica al framework che lo stato interno è cambiato.

- **Risultato**: Flutter esegue nuovamente il metodo build, aggiornando solo ciò che è necessario a schermo.

---

# 4. Esempio Pratico: Il Contatore

```dart
import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  @override
  _CounterPageState createState() => _CounterPageState();
}

class _CounterPageState extends State<CounterPage> {
  // Variabile che rappresenta lo stato
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Flutter App Demo")),
      body: Center(
        child: Text(
          '$counter', // Il valore mostrato cambia dinamicamente
          style: const TextStyle(fontSize: 45, fontWeight: FontWeight.bold),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.plus_one),
        onPressed: () {
          // Utilizzo di setState per aggiornare l'interfaccia
          setState(() {
            counter++;
            print("Contatore logico: $counter");
          });
        },
      ),
    );
  }
}
```

---

# 5. Riepilogo Differenze

| Caratteristica     | StatelessWidget                     | StatefulWidget                          |
|--------------------|-------------------------------------|------------------------------------------|
| Mutabilità         | Immutabile (non cambia mai)         | Mutabile (può cambiare)                  |
| Performance        | Più leggero                         | Leggermente più complesso                |
| Trigger di Update  | Nessuno                             | Metodo setState()                        |
| Esempio            | Icona, Testo fisso, Logo            | Checkbox, Form, Contatore, Switch       |

---

# Tips della lezione

- **Conversione rapida**: In VS Code o Android Studio, puoi posizionare il cursore su StatelessWidget e usare la scorciatoia Alt + Invio per selezionare "Convert to StatefulWidget".

- **Hot Restart vs Hot Reload**: Se modifichi la struttura dello stato (es. aggiungi una variabile), spesso è necessario un Hot Restart per sincronizzare correttamente i cambiamenti.

- **Logica vs Visualizzazione**: Ricorda che la logica (il calcolo matematico) e la visualizzazione (il widget Text) sono due cose separate; setState è il ponte che le unisce.