---
slug: "Lezione 27"
title: "Lezione 27"
date: "2026-02-16"
readTime: "10 min"
excerpt: "Navigazione e Routing (1.0)"
---

# Navigazione e Routing (1.0)

La navigazione permette di spostarsi tra diverse schermate (Screen). In Flutter, le schermate sono semplicemente dei widget che vengono sovrapposti seguendo una logica a Pila (Stack).

---

# 1. Il Concetto di Pila (Stack)

Immagina un mazzo di carte:

- **Push**: Quando navighi verso una nuova pagina, stai "spingendo" una nuova carta sopra il mazzo. La nuova schermata copre la precedente.

- **Pop**: Quando torni indietro, stai "togliendo" la carta più in alto per rivelare quella sottostante.

---

# 2. Navigazione Base: Navigator.push e pop

Il metodo più immediato per cambiare pagina senza configurazioni preventive.

## Spostarsi in avanti (Push)

Si utilizza MaterialPageRoute per gestire la transizione predefinita della piattaforma (es. scorrimento dal basso su iOS, dissolvenza su Android).

```dart
ElevatedButton(
  child: const Text("Vai alla Seconda Pagina"),
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const SecondaPagina(data: "Ciao!")),
    );
  },
)
```

## Tornare indietro (Pop)

Non serve specificare la destinazione; Flutter chiude semplicemente la schermata attuale.

```dart
ElevatedButton(
  child: const Text("Torna Indietro"),
  onPressed: () => Navigator.pop(context),
)
```

---

# 3. Named Routes (Rotte Nominate)

Per evitare di ripetere il codice di MaterialPageRoute in tutta l'app, possiamo mappare i nomi delle pagine nel MaterialApp.

Configurazione nel main.dart:

```dart
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (context) => const PrimaPagina(),
    '/seconda': (context) => const SecondaPagina(data: "Dato fisso"),
  },
);
```

## Utilizzo:

```dart
Navigator.pushNamed(context, '/seconda');
```

Limite: Questo metodo è ottimo per rotte statiche, ma è difficile passare dati dinamici complessi tramite il costruttore.

---

# 4. Navigazione Avanzata: onGenerateRoute

È l'approccio più professionale. Utilizza un "Generatore di Rotte" esterno per gestire la logica di creazione delle pagine e il passaggio di dati dinamici.

## Creazione del RouteGenerator:

Si crea una classe dedicata che analizza i RouteSettings (nome della rotta e argomenti).

```dart
class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    // Recuperiamo gli argomenti passati (es. una stringa o un oggetto)
    final args = settings.arguments;

    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const PrimaPagina());
      case '/seconda':
        // Validazione del tipo di dato
        if (args is String) {
          return MaterialPageRoute(builder: (_) => SecondaPagina(data: args));
        }
        return _errorRoute(); // Pagina di errore se il dato è sbagliato
      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(builder: (_) => const Scaffold(body: Center(child: Text("Errore: Rotta non trovata"))));
  }
}
```

## Integrazione nel main.dart:

```dart
MaterialApp(
  onGenerateRoute: RouteGenerator.generateRoute,
);
```

## Navigazione con dati dinamici:

```dart
Navigator.pushNamed(context, '/seconda', arguments: "Dato Dinamico");
```

---

# Riepilogo e Best Practices

- **Navigator 1.0**: Perfetto per app di piccole/medie dimensioni. È semplice, basato su imperativi (spingi, togli).

- **Organizzazione**: Dividi sempre i widget delle schermate in una cartella dedicata (es. lib/screens/).

- **Passaggio Dati**: Se hai bisogno di passare dati tra pagine, onGenerateRoute è la scelta più scalabile e pulita.

- **Pagine di Errore**: Gestisci sempre il caso default nel tuo router per evitare crash se chiami una rotta inesistente.