---
slug: "Lezione 2"
title: "Lezione 2"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Installazione Flutter (Windows)"
---

Lezione 2: Installazione Flutter (Windows)
1️⃣ Requisiti iniziali

Sistema operativo: Windows 10 o superiore

Installare:

PowerShell

Git

Scaricare l’SDK di Flutter (file .zip)

2️⃣ Installazione Flutter SDK

Scaricare il file zip.

Estrarlo in:

C:\src\flutter


(creare la cartella src se non esiste).

Aprire PowerShell nella cartella Flutter.

Eseguire:

flutter doctor


→ Controlla cosa manca nel sistema.

3️⃣ Variabili d’ambiente (PATH)

Aprire “Variabili d’ambiente” di Windows.

Modificare il Path.

Aggiungere:

C:\src\flutter\bin


Riavviare eventualmente il PC.

Testare da CMD:

flutter doctor

4️⃣ Installazione Android Studio

Scaricare e installare Android Studio

Installare plugin:

Flutter

Dart

5️⃣ Configurazione Android SDK

In Android Studio:

Settings → Android SDK

Installare:

Android SDK Platform Tools

Android Emulator

Android SDK Build Tools

Command-line Tools

Google USB Driver

HAXM (se disponibile)

Accettare tutte le licenze.

6️⃣ Creazione Emulatore

Tools → Device Manager (Virtual Device Manager)

Create Device

Selezionare modello telefono

Scaricare versione Android (es. Android 13)

Avviare l’emulatore (tasto Play)

7️⃣ Accettazione licenze Android

Da terminale:

flutter doctor --android-licenses


Accettare tutto.

Poi:

flutter doctor


→ Tutto deve risultare verde.

Se errore su Windows:

flutter channel master
flutter upgrade

8️⃣ Sviluppo Desktop (opzionale)

Per app Windows desktop serve:

Visual Studio 2022
(con componenti C++)

⚠️ Non necessario per questo corso (focus mobile).

9️⃣ Alternativa IDE

Possibile usare:

Visual Studio Code

Installare estensioni Flutter e Dart

👉 Nel corso si usa principalmente Android Studio.

🎯 Obiettivo della lezione

Avere:

Flutter installato

Android Studio configurato

Emulatore funzionante

flutter doctor tutto verde

Pronti per iniziare a sviluppare app mobile con Flutter 🚀