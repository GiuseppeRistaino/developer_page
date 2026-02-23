---
slug: "Lezione 26"
title: "Lezione 26"
date: "2026-02-16"
readTime: "10 min"
excerpt: "Il Sistema dei Temi (ThemeData)"
---

# Il Sistema dei Temi (ThemeData)

In Flutter, il tema permette di centralizzare lo stile (colori, font, forme) dell'intera applicazione. Invece di definire il colore di ogni singolo widget, lo definiamo una volta nel punto più alto dell'app (MaterialApp), garantendo coerenza visiva e facilità di manutenzione.

---

# 1. Perché usare i Temi?

- **Centralizzazione**: Modificando una riga nel tema, aggiorni l'aspetto di centinaia di widget in tutta l'app.

- **Scalabilità**: Fondamentale in progetti aziendali dove designer (UI/UX) forniscono una palette specifica.

- **Gestione Dark Mode**: Permette di scambiare facilmente tra tema chiaro e scuro.

---

# 2. Definizione del Tema in MaterialApp

Il widget MaterialApp offre tre proprietà principali per gestire lo stile:

- **theme**: Il tema predefinito (Light).

- **darkTheme**: Il tema utilizzato quando il dispositivo è in modalità scura.

- **themeMode**: Per forzare una modalità (ThemeMode.light, .dark, o .system).

```dart
MaterialApp(
  theme: ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.orange, // Crea una palette automatica partendo dall'arancione
  ),
  darkTheme: ThemeData(
    brightness: Brightness.dark,
  ),
)
```

---

# 3. ColorScheme e TextTheme

## A. ColorScheme

È il modo moderno di gestire i colori. Invece di colori singoli, si definisce uno schema (colori per superfici, errori, colori primari, ecc.).

- **fromSwatch**: Metodo rapido per generare uno schema partendo da un colore base.

```dart
theme: ThemeData(
  colorScheme: ColorScheme.fromSwatch(
    primarySwatch: Colors.indigo,
    accentColor: Colors.pink, // Colore per elementi di risalto come i FloatingActionButton
  ),
),
```

## B. TextTheme

Permette di definire stili globali per i testi (titoli, paragrafi, scritte sui bottoni).

- **headlineLarge/Medium**: Per i titoli (sostituiscono i vecchi Headline 1-6).

- **bodyMedium**: Lo stile predefinito per il testo normale (sostituisce BodyText2).

```dart
textTheme: const TextTheme(
  bodyMedium: TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.bold,
    color: Colors.black87,
  ),
),
```

---

# 4. Temi Specifici per i Widget

Puoi personalizzare globalmente l'aspetto di widget specifici come la AppBar o il FloatingActionButton.

```dart
theme: ThemeData(
  appBarTheme: const AppBarTheme(
    backgroundColor: Colors.pink,
    elevation: 0,
    centerTitle: true,
  ),
),
```

---

# 5. Accedere e Sovrascrivere il Tema nel Codice

## Richiamare il tema (Ereditarietà a cascata)

Per usare un colore definito nel tema all'interno di un widget figlio, si usa Theme.of(context):

```dart
Container(
  color: Theme.of(context).colorScheme.primary, // Prende il colore primario del tema
  child: Text(
    "Testo con stile del tema",
    style: Theme.of(context).textTheme.bodyMedium,
  ),
)
```

## Sovrascrivere (Estendere) il tema per un'eccezione

Se vuoi che un solo widget sia diverso dal tema globale, puoi avvolgerlo in un widget Theme e usare copyWith:

```dart
Theme(
  data: Theme.of(context).copyWith(
    cardColor: Colors.yellow, // Cambia solo questa proprietà per questo sotto-albero
  ),
  child: MyWidget(),
)
```

---

# Tips della lezione

- **Priorità**: Lo stile definito direttamente in un widget (es. TextStyle dentro un Text) vince sempre sul tema globale. È un'eccezione alla regola.

- **Google Fonts & Temi**: Puoi integrare GoogleFonts direttamente nel tema per applicarlo a tutta l'app: ThemeData(textTheme: GoogleFonts.latoTextTheme()).

- **Manutenzione**: Se devi cambiare il "colore dell'app" dopo mesi di lavoro, ringrazierai di aver usato i temi centralizzati invece di aver scritto Colors.blue in 50 file diversi.