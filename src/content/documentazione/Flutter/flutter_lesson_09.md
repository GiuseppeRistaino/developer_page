---
slug: "Lezione 9"
title: "Lezione 9"
date: "2026-02-12"
readTime: "7 min"
excerpt: "Immagini in Flutter"
---

📘 Appunti – Immagini in Flutter
🔹 1. Immagini come Asset (locali)

Le immagini precaricate nell’app devono essere:

Inserite nel progetto (es. cartella images/)

Dichiarate nel file pubspec.yaml sotto la voce assets:

Esempio struttura:

project/
 ├─ images/
 │   └─ montagna.webp
 ├─ fonts/
 └─ pubspec.yaml


Nel pubspec.yaml:

assets:
  - images/montagna.webp


⚠️ Attenzione agli spazi e all’indentazione, altrimenti non funziona.

Si può anche dichiarare direttamente l’intera cartella:

assets:
  - images/

🔹 2. Widget Image

Il widget principale è:

Image()


Può caricare immagini da diverse fonti:

Image.asset() → da asset locali

Image.network() → da URL

Image.file() → da file nel dispositivo

MemoryImage() → da memoria

✅ Metodo consigliato per asset
Image.asset("images/montagna.webp")


(È una scorciatoia rispetto a usare Image(image: AssetImage(...)))

🌐 Immagine da Internet
Image.network("https://url-immagine.com")


⚠️ Attenzione:

Verificare i diritti dell’immagine

Evitare immagini troppo pesanti

🔹 3. Proprietà principali di Image
📏 height e width
height: 200,
width: 300,


Permettono di controllare dimensioni.

🎨 color e colorBlendMode
color: Colors.red,
colorBlendMode: BlendMode.exclusion,


Permettono di:

Applicare un colore sopra l’immagine

Mischiarlo con vari effetti (come in Photoshop)

👉 Utile per:

Creare varianti della stessa immagine

Applicare filtri senza salvare più file

🔹 4. Fit (BoxFit)

Controlla come l’immagine si adatta al contenitore.

Si usa spesso dentro un Container.

Esempio:

fit: BoxFit.cover


Principali opzioni:

BoxFit.cover → riempie tutto (può tagliare parti)

BoxFit.contain → mostra tutta l’immagine (può lasciare spazio vuoto)

BoxFit.fill

BoxFit.fitWidth

BoxFit.fitHeight

📌 Non esiste una regola fissa: dipende dal layout e dall’immagine.

🔹 5. Alignment

Se l’immagine viene tagliata (es. con cover), si può decidere quale parte mostrare:

alignment: Alignment.bottomRight


Alcune opzioni:

Alignment.center

Alignment.topLeft

Alignment.bottomRight

ecc.

🔹 6. Container + Image

Spesso si inserisce l’immagine dentro un Container per controllare meglio dimensioni e layout:

```dart
Container(
  width: 300,
  height: 200,
  child: Image.asset(
    "images/montagna.webp",
    fit: BoxFit.cover,
  ),
)
```

🔹 7. Strumento utile dell’IDE

Con Alt + Enter (o quick fix) si può:

Wrappare un widget dentro un altro (Wrap with Container, ecc.)

Spostare widget su/giù

Modificare rapidamente la struttura

Molto utile per lavorare più velocemente.

🔹 8. Buone pratiche sulle immagini

⚠️ Importantissimo:

Non usare immagini troppo pesanti

Ridurre dimensioni prima di inserirle

Idealmente sotto i 100–200 KB

Ricordare che su mobile le risorse sono limitate

📌 Conclusione

Abbiamo visto:

Come inserire immagini locali (asset)

Come caricarle da internet

Proprietà principali (height, width, fit, alignment, color)

Come adattarle dentro un Container

Le immagini verranno riutilizzate più avanti per:

Animazioni

Card

Hero animation

ClipRRect

Per ora queste sono le basi fondamentali.