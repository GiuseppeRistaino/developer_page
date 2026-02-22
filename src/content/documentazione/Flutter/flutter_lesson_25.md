---
slug: "Lezione 25"
title: "Lezione 25"
date: "2026-02-15"
readTime: "10 min"
excerpt: "Librerie Esterne e Google Fonts"
---

# Librerie Esterne e Google Fonts

In Flutter, le librerie (o pacchetti) esterne permettono di aggiungere funzionalità complesse (video, icone, gestione dati, font) senza dover scrivere tutto il codice da zero. Il punto di riferimento assoluto per questi pacchetti è il sito ufficiale [pub.dev](https://pub.dev).

---

# 1. Il Repository Pub.dev

Su pub.dev è possibile trovare migliaia di pacchetti open source per Dart e Flutter.

- **Flutter Favorites**: Sono i pacchetti più affidabili e utilizzati (es. Bloc per lo stato, Font Awesome per le icone).

- **Documentazione**: Ogni pacchetto ha una sezione README (istruzioni), Installing (come installarlo) ed Example (esempi di codice). È fondamentale leggere sempre queste sezioni poiché ogni libreria ha regole d'uso proprie.

---

# 2. Come installare un pacchetto

Esistono due metodi principali per aggiungere una dipendenza al progetto:

## **Metodo A**: Manuale tramite pubspec.yaml

- 1. Cerca il pacchetto su pub.dev.

- 2. Copia il nome e la versione nella sezione dependencies del file pubspec.yaml.

- 3. Esegui il comando flutter pub get (o clicca sull'icona del download nel tuo IDE).

## **Metodo B**: Tramite Terminale (Più veloce)

- Esegui il comando direttamente nel terminale della cartella del tuo progetto:

```flutter
flutter pub add google_fonts
```

Questo comando aggiorna automaticamente il file pubspec.yaml e scarica la libreria.

---

# 3. Esempio Pratico: Google Fonts

Il pacchetto google_fonts permette di utilizzare centinaia di font gratuiti senza dover scaricare manualmente i file .ttf e inserirli negli asset.

## Importazione

```dart
import 'package:google_fonts/google_fonts.dart';
```

## Utilizzo nel widget Text

Puoi applicare un font specifico direttamente nella proprietà style di un widget Text. La prima volta che l'app viene avviata, il font viene scaricato da internet e salvato in cache.

```dart
Text(
  'Questo è un font personalizzato',
  style: GoogleFonts.lato(
    fontSize: 30,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)
```

## Utilizzo Dinamico (GetFont)

Se hai bisogno di caricare un font il cui nome è contenuto in una variabile (es. da una lista), puoi usare il metodo getFont:

```dart
Text(
  'Testo dinamico',
  style: GoogleFonts.getFont('Roboto', fontSize: 20),
)
```

---

# 4. Altre librerie comuni: Video e Media

Oltre ai font, è possibile integrare contenuti multimediali come i video di YouTube tramite pacchetti come Youtubeer_flutter.
Questi pacchetti solitamente richiedono un Controller per gestire la riproduzione (play, pausa, loop, autoplay).

---

# Tips della lezione

- **Cache**: Google Fonts scarica i file via HTTP alla prima esecuzione, ma per la distribuzione finale (pubblicazione) è possibile configurarlo per includere i font direttamente negli asset se si teme l'assenza di connessione.

- **Permessi**: Alcune librerie (come quelle video o per i font su macOS) richiedono di abilitare permessi specifici nei file di configurazione nativi (Android Manifest o Info.plist di iOS).

- **Ricerca**: Se cerchi una funzione specifica, scrivi su Google "[nome funzione] flutter pub" (es: "youtube player flutter pub") per finire direttamente sulla pagina corretta.