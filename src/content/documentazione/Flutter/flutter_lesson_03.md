---
slug: "Lezione 3"
title: "Lezione 3"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Creazione nuovo progetto Flutter"
---

Appunti – Creazione nuovo progetto Flutter
1️⃣ Creazione progetto

In Android Studio:

New → Flutter Project

Selezionare SDK di Flutter

Inserire:

Nome progetto

Organization (reverse domain) → es. com.nomecognome

Serve per creare un identificativo univoco (usato negli store)

Piattaforme: in questo corso focus su mobile (Android/iOS)

📂 Struttura del progetto
🔹 Cartelle principali

lib/

Contiene il codice Dart dell’app

File principale: main.dart

È dove scriveremo quasi tutto il codice

android/

Progetto Android nativo

Usato per configurazioni specifiche (Manifest, Gradle, ecc.)

ios/

Progetto iOS nativo (Xcode)

Configurazioni specifiche piattaforma

build/

File generati automaticamente alla compilazione

Non va modificata

test/

Per scrivere test automatici

🔹 File importanti

.gitignore

Indica a Git quali file ignorare

analysis_options.yaml

Configura il linter Dart

Controlli statici su errori, warning, suggerimenti

pubspec.yaml ⭐ (molto importante)
Serve per:

Definire dipendenze (pacchetti esterni)

Versione dell’app

SDK environment

Assets (immagini, file)

Fonts personalizzati

pubspec.lock

Contiene le versioni esatte di tutte le dipendenze (incluse quelle interne)

README.md

Descrizione del progetto

📦 Concetto di Dipendenze

Flutter usa pacchetti esterni.

Ogni pacchetto può dipendere da altri pacchetti.

È una “catena di dipendenze”.

Anche Flutter include internamente diversi pacchetti (es. Material, Cupertino, Dart SDK).

👉 Non è fondamentale capirlo subito, si approfondirà più avanti.

🎯 Obiettivo della lezione

Creare un nuovo progetto

Capire la struttura delle cartelle

Identificare i file importanti

Prepararsi ad analizzare main.dart nella prossima lezione

Nel prossimo step: avvio dell’app e analisi del codice iniziale 🚀