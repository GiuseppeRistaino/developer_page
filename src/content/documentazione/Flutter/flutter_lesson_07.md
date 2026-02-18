---
slug: "Lezione 7"
title: "Lezione 7"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Widget Text e TextStyle"
---

Appunti – Widget Text e TextStyle
🎯 Obiettivo della lezione

Approfondire:

Text

TextStyle

Personalizzazione del testo

Importazione di un font personalizzato

🔹 Widget Text
Text("Ciao mondo")

Proprietà base
1️⃣ textAlign

Allineamento del testo:

textAlign: TextAlign.center


Opzioni principali:

left

right

center

justify

start

end

⚠️ Si usa la classe TextAlign.

2️⃣ textDirection

Direzione del testo:

textDirection: TextDirection.ltr


ltr → left to right (default)

rtl → right to left (es. arabo)

🔹 TextStyle (la parte più importante)
style: TextStyle(...)


Permette di personalizzare completamente il testo.

🎨 Colori
color: Colors.red,
backgroundColor: Colors.yellow,

🔠 Dimensione e Peso
fontSize: 30,
fontWeight: FontWeight.w800,


FontWeight.bold

FontWeight.normal

valori numerici (100–900)

🌫 Ombra (Shadow)
shadows: [
  Shadow(
    blurRadius: 10,
    color: Color.fromARGB(255, 0, 0, 0),
    offset: Offset(5, 5),
  ),
]


Proprietà:

blurRadius → sfocatura

color

offset → spostamento orizzontale/verticale

⚠️ È una lista → si possono aggiungere più ombre.

🔡 Spaziatura
letterSpacing: 5,   // spazio tra lettere
wordSpacing: 10,    // spazio tra parole

🔹 Uso dell’IDE

Android Studio:

Mostra il tipo richiesto per ogni proprietà

Evidenzia parentesi abbinate

Mostra commenti automatici di chiusura widget

Aiuta con suggerimenti e autocomplete

👉 Sfruttare sempre i suggerimenti dell’IDE.

🔹 Font Family (Font personalizzato)

È possibile:

Usare Google Fonts (con libreria)

Oppure importare manualmente un font

📥 Importazione manuale di un font
1️⃣ Scaricare il font

Esempio: da Google Fonts (es. “Climate Crisis”).

2️⃣ Creare cartella fonts

Dentro la root del progetto:

/fonts


Copiare il file .ttf dentro.

3️⃣ Modificare pubspec.yaml

Aggiungere:

fonts:
  - family: ClimateCrisis
    fonts:
      - asset: fonts/ClimateCrisis-Regular.ttf


⚠️ Attenzione all’indentazione (spazi corretti!).

4️⃣ Usare il font nel TextStyle
style: TextStyle(
  fontFamily: "ClimateCrisis",
)


⚠️ Se non funziona:

Fare stop completo dell’app

Rieseguire (Hot Restart non sempre basta)

📌 Concetti Chiave

Text gestisce il contenuto.

TextStyle gestisce l’aspetto.

Moltissime proprietà personalizzabili.

Le ombre sono una lista.

fontFamily permette font personalizzati.

Attenzione agli spazi in pubspec.yaml.

Sperimentare è fondamentale.

🚀 Conclusione

TextStyle è uno dei widget più importanti in Flutter.

Conviene:

Provare le proprietà

Leggere i suggerimenti dell’IDE

Consultare la documentazione

Fare pratica modificando i parametri

Il testo è uno degli elementi più usati in qualsiasi app → va padroneggiato bene.