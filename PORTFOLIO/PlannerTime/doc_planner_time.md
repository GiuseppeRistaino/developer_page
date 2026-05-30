# PlannerTime - Documentazione progetto

Ultimo aggiornamento: 30 maggio 2026

## 1. Panoramica

PlannerTime e' un'app Flutter per organizzare progetti, task e calendario in un unico flusso operativo. L'app combina:

- una dashboard progetti in stile Kanban;
- un calendario mensile con eventi collegati ai progetti e opzionalmente ai task;
- autenticazione Firebase con email/password e Google;
- verifica email per gli account email/password;
- protezione App Check su piattaforme supportate;
- crash reporting tramite Firebase Crashlytics;
- persistenza cloud su Cloud Firestore;
- allegati task salvati su Firebase Storage;
- progetti condivisi visibili solo ai membri;
- notifiche locali per promemoria degli eventi.

L'obiettivo e' dare all'utente una vista integrata tra pianificazione temporale e avanzamento dei task. I layout sono stati ricreati a partire dai file presenti nella directory `FIGMA`.

## 2. Stack tecnico

### Framework e linguaggio

- Flutter
- Dart SDK: vincolo `^3.10.8`
- Material Design 3
- Riverpod per lo stato applicativo

### Dipendenze principali

Le dipendenze sono definite in `pubspec.yaml`.

- `flutter_riverpod`: gestione stato e provider.
- `firebase_core`: inizializzazione Firebase.
- `firebase_auth`: autenticazione Firebase.
- `firebase_app_check`: protezione da client non autorizzati su Android/iOS.
- `firebase_crashlytics`: raccolta crash e errori fatal su piattaforme supportate.
- `firebase_messaging`: registrazione token FCM e ricezione push collaborative.
- `firebase_storage`: upload e rimozione allegati task.
- `file_picker`: selezione file dal dispositivo.
- `google_sign_in`: login con account Google.
- `cloud_firestore`: persistenza e sincronizzazione dati.
- `url_launcher`: apertura esterna degli allegati.
- `table_calendar`: supporto calendario.
- `intl`: formattazione date e orari.
- `uuid`: generazione ID locali.
- `flutter_local_notifications`: notifiche locali.
- `timezone` e `flutter_timezone`: gestione timezone per notifiche schedulate.
- `cupertino_icons`: icone Cupertino.

### Dev dependencies

- `flutter_test`: test widget/unitari Flutter.
- `flutter_lints`: lint consigliati Flutter.
- `flutter_launcher_icons`: generazione icone launcher.

## 3. Struttura repository

Struttura rilevante del progetto:

```text
PlannerTime/
  android/                      Configurazione Android e Gradle
  assets/images/                Asset grafici e icona app
  DOCUMENTAZIONE/               Documentazione di progetto
  FIGMA/                        Layout sorgenti usati per il redesign UI
  functions/                    Cloud Functions per notifiche FCM
  ios/                          Runner iOS generato da Flutter
  lib/
    main.dart                   Bootstrap app, Firebase, notifiche, routing auth
    firebase_options.dart       Opzioni generate da FlutterFire per Android
    models/                     Modelli dati dominio
    screens/                    Schermate principali
    services/                   Servizi infrastrutturali
    state/                      Riverpod state e provider
    theme/                      Tema visuale condiviso
    widgets/                    Componenti riutilizzabili
  macos/                        Runner macOS generato da Flutter
  test/                         Test widget
  web/                          Runner web generato da Flutter
  windows/                      Runner Windows generato da Flutter
  firestore.rules               Regole di sicurezza Firestore
  storage.rules                 Regole di sicurezza Firebase Storage
  firebase.json                 Configurazione FlutterFire/Firebase locale
  pubspec.yaml                  Metadati, dipendenze e asset Flutter
```

## 4. Directory `lib`

### `main.dart`

Responsabilita':

- inizializza Flutter bindings;
- inizializza Firebase;
- inizializza Firebase App Check dove supportato;
- inizializza Firebase Crashlytics dove supportato;
- inizializza `NotificationService`;
- crea il `ProviderScope` Riverpod;
- imposta tema chiaro/scuro;
- ascolta lo stato auth Firebase;
- mostra `AuthScreen` se l'utente non e' autenticato;
- mostra una schermata di verifica email se un account email/password non e' verificato;
- mostra `HomeShell` se l'utente e' autenticato;
- passa `uid`, `email` e `displayName` all'`AppStateNotifier`.

### `beta_plan_screen.dart`

Schermata raggiungibile dal drawer e dal profilo. Mostra il piano beta gratuito, i limiti applicativi attivi e alcuni indicatori di utilizzo corrente.

Nota: al momento l'inizializzazione Firebase e' `Firebase.initializeApp()` senza passare `DefaultFirebaseOptions.currentPlatform`. Su Android funziona tramite configurazione nativa `google-services.json`. Per supportare pienamente altre piattaforme conviene rigenerare la configurazione FlutterFire e inizializzare con le opzioni per piattaforma.

### `models`

Modelli principali:

- `Project`
  - `id`
  - `name`
  - `description`
  - `colorValue`
  - `ownerId`
  - `memberIds`
  - `members`

- `ProjectMember`
  - `uid`
  - `email`
  - `displayName`
  - `photoUrl`
  - getter `label`
  - getter `initials`
  - mapping Firestore con `toMap` e `fromMap`

- `BoardColumn`
  - rappresenta una colonna Kanban associata a un progetto.

- `TaskItem`
  - `id`
  - `projectId`
  - `title`
  - `description`
  - `statusColumnId`
  - `dueDate`
  - `assigneeIds`
  - `comments`
  - `images`
  - `priority`

- `AppComment`
  - commenti dei task con testo, timestamp e autore;
  - `authorId` identifica il proprietario del commento;
  - `authorName`, `authorEmail` e `authorPhotoUrl` permettono di mostrare identita' e avatar corretti.

- `CalendarEvent`
  - `id`
  - `projectId`
  - `taskId`
  - `title`
  - `start`
  - `end`
  - `reminderOffset`

- `TaskPriority`
  - priorita' task, usata anche per ordinamento dashboard.

### `state`

#### `auth_state.dart`

Espone:

- `firebaseAuthProvider`: wrapper Riverpod su `FirebaseAuth.instance`.
- `authStateChangesProvider`: stream dello stato auth Firebase.

#### `app_state.dart`

Contiene:

- `AppState`: stato immutabile dell'app.
- `AppStateNotifier`: operazioni applicative e sincronizzazione Firestore.

Campi principali dello stato:

- `activeUserId`
- `activeUserEmail`
- `activeUserName`
- `projects`
- `columns`
- `tasks`
- `events`

Responsabilita' di `AppStateNotifier`:

- caricare dati dell'utente autenticato;
- assicurare la presenza del profilo utente in `userProfiles`;
- migrare eventuali vecchi dati da `users/{uid}` alla nuova struttura condivisa;
- creare dati seed al primo accesso se non esistono progetti;
- creare, aggiornare ed eliminare progetti;
- aggiungere membri a un progetto via email;
- creare, rinominare, cancellare colonne;
- creare, aggiornare, spostare e cancellare task;
- aggiungere e rimuovere allegati task;
- gestire commenti;
- creare, aggiornare e cancellare eventi;
- schedulare o cancellare notifiche locali legate alle scadenze/eventi.
- applicare limiti del piano beta gratuito su progetti, membri, task, commenti e allegati.

### `config`

#### `app_limits.dart`

Contiene i limiti applicativi del piano beta gratuito:

- massimo 3 progetti visibili per utente;
- massimo 5 membri per progetto;
- massimo 80 caratteri per nome progetto;
- massimo 1000 caratteri per descrizione progetto;
- massimo 80 task per progetto;
- massimo 50 commenti per task;
- massimo 5 allegati per task;
- massimo 10 MB per allegato;
- massimo 120 caratteri per titolo task;
- massimo 2000 caratteri per descrizione task e commenti.

#### `firestore_providers.dart`

Provider stream per sincronizzazione real-time:

- `projectsStreamProvider(userId)`
- `columnsStreamProvider(({userId, projectId}))`
- `tasksStreamProvider(projectId)`
- `eventsStreamProvider(projectId)`

### `services`

#### `FirestoreService`

Servizio singleton che centralizza le operazioni Firestore.

Funzioni principali:

- `ensureUserProfile`
- `findUserProfileByEmail`
- `addProjectMemberByEmail`
- CRUD progetti
- CRUD colonne
- CRUD task
- CRUD commenti
- CRUD eventi
- `migrateLegacyUserData`
- `deleteAllUserData`

#### `NotificationService`

Gestisce notifiche locali e registrazione push FCM.

Responsabilita':

- inizializzare plugin notifiche;
- configurare timezone locale;
- richiedere permessi Android/iOS;
- schedulare promemoria evento;
- cancellare promemoria evento;
- usare fallback `inexactAllowWhileIdle` se Android nega gli alarm esatti;
- richiedere permessi push FCM su Android/iOS;
- salvare il token del dispositivo in `notificationTokens/{uid}/tokens/{tokenId}`;
- rimuovere il token al logout;
- mostrare in foreground le notifiche collaborative ricevute via FCM.

Le notifiche collaborative ad app chiusa non partono dal client: vengono inviate da Cloud Functions tramite Firebase Cloud Messaging.

Permessi Android usati:

- `INTERNET`
- `ACCESS_NETWORK_STATE`
- `POST_NOTIFICATIONS`
- `SCHEDULE_EXACT_ALARM`
- `USE_EXACT_ALARM`
- `RECEIVE_BOOT_COMPLETED`

### `functions`

La directory `functions` contiene Cloud Functions Node.js per notifiche FCM.

Trigger implementati:

- `notifyProjectMembershipChanged`: invia una notifica quando un utente viene aggiunto o rimosso da un progetto;
- `notifyTaskCommentCreated`: invia una notifica agli assegnatari del task quando viene creato un commento;
- `notifyTaskAssigneesChanged`: invia una notifica ai nuovi assegnatari quando un task viene assegnato.

Queste notifiche funzionano anche con app chiusa, purche' il dispositivo abbia un token FCM valido e i permessi notifica siano concessi.

#### `AttachmentService`

Gestisce gli allegati dei task.

Responsabilita':

- selezionare file dal dispositivo con `file_picker`;
- validare dimensione massima e formati supportati;
- caricare i file in Firebase Storage;
- restituire l'URL download salvato nel task;
- rimuovere da Storage gli allegati caricati dall'app.

### `screens`

Schermate principali:

- `AuthScreen`
  - login email/password;
  - registrazione email/password;
  - reset password;
  - login Google;
  - Apple login nascosto dietro flag `_showAppleSignIn => false`.

- `HomeShell`
  - shell principale dopo login;
  - app bar;
  - hamburger drawer laterale sinistro;
  - navigazione tra Calendario e Progetti;
  - accesso profilo;
  - logout.

- `CalendarScreen`
  - calendario mensile custom;
  - elenco eventi per giorno selezionato;
  - modifica/eliminazione evento;
  - apertura creazione evento.

- `CreateEventScreen`
  - creazione evento;
  - associazione a progetto;
  - associazione opzionale a task;
  - scelta orario inizio/fine;
  - scelta promemoria.

- `ProjectsScreen`
  - elenco/selettore progetti;
  - creazione progetto;
  - se esiste un solo progetto mostra direttamente la dashboard.

- `ProjectDashboardScreen`
  - board Kanban responsive;
  - vista desktop con colonne affiancate;
  - vista mobile con selettore colonna;
  - creazione task;
  - rinomina/eliminazione colonne;
  - spostamento task;
  - avatar membri progetto;
  - pulsante `+` per aggiungere utenti registrati al progetto.

- `TaskDetailScreen`
  - dettaglio task;
  - descrizione;
  - upload, anteprima, apertura e rimozione allegati;
  - commenti;
  - cambio stato;
  - completamento task;
  - eliminazione task.

- `ProfileScreen`
  - dati utente Firebase;
  - UID;
  - stato verifica email;
  - logout;
  - richiesta eliminazione account Firebase.

### `theme`

`app_theme.dart` contiene:

- palette `AppColors`;
- raggi `AppRadii`;
- spacing `AppSpacing`;
- `buildPlannerTheme` per tema light/dark;
- `surfaceDecoration` per superfici coerenti.

## 5. Funzionalita' applicative

### Autenticazione

Metodi supportati:

- email/password;
- registrazione email/password;
- recupero password via email;
- Google Sign-In;
- Apple Sign-In nascosto per uso futuro.

Dopo login o registrazione viene assicurato un profilo utente nella collezione `userProfiles`.

### Progetti condivisi

Ogni progetto ha:

- un proprietario/admin (`ownerId`), cioe' l'utente che ha creato il progetto;
- una lista di UID membri (`memberIds`);
- una mappa dati membri (`members`).

Un nuovo progetto nasce con un solo membro: l'utente che lo crea.

Premendo gli avatar vicino al titolo progetto si apre il menu membri. Il menu mostra admin e membri; solo l'admin puo' rimuovere altri utenti dal progetto.

Ogni utente ha un avatar personale unico. Se in profilo viene impostata una foto (`photoUrl`), la stessa immagine viene mostrata in profilo, drawer, header e lista membri progetto. Se non esiste una foto, l'app usa iniziali e colore stabile calcolato dall'UID.

Per aggiungere un membro:

1. l'utente deve essere gia' registrato nell'app;
2. il suo profilo deve esistere in `userProfiles`;
3. dalla dashboard progetto si preme il pulsante `+` vicino agli avatar;
4. si inserisce l'email;
5. `FirestoreService.findUserProfileByEmail` cerca `emailLowercase`;
6. se trovato, l'utente viene aggiunto a `memberIds` e `members`.

### Kanban

Ogni progetto ha colonne indipendenti. Le colonne iniziali sono:

- `Da Fare`
- `In Corso`
- `Fatto`

Azioni disponibili:

- creare colonne;
- rinominare colonne;
- eliminare colonne;
- creare task;
- spostare task tra colonne;
- eliminare task;
- ordinare task per priorita' e scadenza.

Se una colonna viene eliminata, i task vengono spostati nella prima colonna disponibile.

### Task

Un task contiene:

- titolo;
- descrizione;
- colonna/stato;
- progetto;
- data di scadenza opzionale;
- priorita' opzionale;
- commenti;
- allegati, salvati come URL nel campo `images` per compatibilita' con la struttura esistente.

Gli allegati vengono caricati su Firebase Storage nel percorso:

```text
projects/{projectId}/tasks/{taskId}/attachments/{timestamp}_{fileName}
```

Il task salva in Firestore solo gli URL download. Il limite beta e' 5 allegati per task e 10 MB per file.

Se il task viene creato con una scadenza, viene creato anche un evento calendario di tipo scadenza.

### Calendario

Il calendario mostra eventi legati ai progetti. Ogni evento puo' essere:

- indipendente;
- collegato a un task;
- con notifica/reminder;
- colorato in base al progetto.

### Notifiche locali

Le notifiche sono schedulate tramite `flutter_local_notifications`.

Per ogni evento con `reminderOffset`:

- l'app calcola `eventStart - reminderOffset`;
- se il momento e' futuro, crea una notifica locale;
- se l'evento viene aggiornato o cancellato, la notifica viene aggiornata o cancellata.

## 6. Architettura dati Firestore

Struttura corrente:

```text
userProfiles/{uid}
  uid: string
  email: string
  emailLowercase: string
  displayName: string|null
  photoUrl: string|null
  updatedAt: timestamp

notificationTokens/{uid}/tokens/{tokenId}
  token: string
  platform: string
  updatedAt: timestamp

projects/{projectId}
  id: string
  name: string
  description: string
  colorValue: number
  ownerId: string
  memberIds: string[]
  members: map<uid, memberData>
  createdAt: timestamp
  updatedAt: timestamp

projects/{projectId}/columns/{columnId}
  id: string
  projectId: string
  name: string
  order: number
  createdAt: timestamp
  updatedAt: timestamp

projects/{projectId}/tasks/{taskId}
  id: string
  projectId: string
  title: string
  description: string
  statusColumnId: string
  dueDate: timestamp|null
  assigneeIds: string[]
  priority: string|null
  images: string[]
  createdAt: timestamp
  updatedAt: timestamp

projects/{projectId}/tasks/{taskId}/comments/{commentId}
  id: string
  text: string
  timestamp: timestamp
  authorId: string
  authorName: string|null
  authorEmail: string|null
  authorPhotoUrl: string|null

projects/{projectId}/events/{eventId}
  id: string
  projectId: string
  taskId: string|null
  title: string
  start: timestamp
  end: timestamp
  reminderOffset: number|null
  createdAt: timestamp
  updatedAt: timestamp
```

Percorso legacy mantenuto solo per migrazione:

```text
users/{userId}/{document=**}
```

La vecchia struttura era privata per utente. La nuova struttura usa documenti progetto condivisi e controlla l'accesso tramite `memberIds`.

## 7. Regole Firestore

Il file sorgente e' `firestore.rules`.

Principi:

- solo utenti autenticati possono leggere/scrivere;
- `userProfiles` e' leggibile da utenti autenticati per permettere lookup email;
- ogni utente puo' creare/aggiornare solo il proprio profilo;
- i token FCM in `notificationTokens` sono scrivibili solo dal proprietario e non leggibili dai client;
- un progetto e' leggibile solo dai membri;
- un progetto puo' essere creato solo se contiene inizialmente il creatore;
- i membri possono aggiornare il progetto, ma non possono cambiare `ownerId`;
- i membri possono aggiungere altri membri, ma non possono rimuovere membri esistenti;
- solo l'owner/admin puo' rimuovere membri dal progetto;
- solo l'owner puo' eliminare il progetto;
- subcollection `columns`, `tasks` ed `events` sono accessibili solo ai membri;
- ogni membro del progetto puo' assegnare task a qualunque altro membro del progetto;
- `assigneeIds` dei task puo' contenere solo UID presenti in `memberIds` del progetto;
- i payload di task e commenti sono limitati nelle regole Firestore per ridurre abuso e costi;
- i commenti sono leggibili dai membri del progetto, ma creazione, modifica ed eliminazione sono consentite solo all'autore indicato da `authorId`;
- il path legacy `users/{uid}` resta accessibile solo al proprietario.

Deploy regole:

```powershell
firebase deploy --only firestore:rules
```

Controllo locale consigliato prima del deploy:

```powershell
firebase emulators:start --only firestore
```

## 8. Regole Firebase Storage

Il file sorgente e' `storage.rules`.

Principi:

- solo utenti autenticati possono accedere agli allegati;
- un allegato e' leggibile solo dai membri del progetto collegato;
- upload, aggiornamento ed eliminazione sono consentiti solo ai membri del progetto;
- ogni file non puo' superare 10 MB;
- sono ammessi immagini, PDF, documenti Office principali, testo, CSV e ZIP.

Deploy regole:

```powershell
firebase deploy --only storage
```

## 9. Configurazione Firebase

### Progetto Firebase

Progetto attuale:

```text
projectId: plannertime-32554
messagingSenderId: 1010788936731
storageBucket: plannertime-32554.firebasestorage.app
```

Configurazione locale:

- `firebase.json`
- `firestore.rules`
- `storage.rules`
- `functions/package.json`
- `functions/index.js`
- `android/app/google-services.json`
- `lib/firebase_options.dart`

### Cloud Messaging e notifiche collaborative

Per notifiche ad app chiusa serve Firebase Cloud Messaging con Cloud Functions.

Flusso implementato:

1. al login l'app richiede i permessi notifica e registra il token FCM del dispositivo;
2. il token viene salvato in `notificationTokens/{uid}/tokens/{tokenId}`;
3. quando Firestore cambia, le Cloud Functions leggono i token via Admin SDK;
4. FCM consegna la notifica al dispositivo anche se l'app e' chiusa.

Eventi notificati:

- utente aggiunto a un progetto;
- utente rimosso da un progetto;
- commento scritto su un task, notificato agli assegnatari del task;
- nuovo utente assegnato a un task.

Deploy Functions:

```powershell
Push-Location functions
npm install
Pop-Location
firebase deploy --only functions
```

### Android app Firebase

Il package Android attivo nel Gradle e':

```text
com.vrexas.plannertimes
```

Questo valore e' in `android/app/build.gradle.kts`:

```kotlin
applicationId = "com.vrexas.plannertimes"
namespace = "com.vrexas.plannertimes"
```

Attenzione: in `google-services.json` sono presenti client per `com.vrexas.plannertime` e `com.vrexas.plannertimes`. Per l'app Android corrente conta `com.vrexas.plannertimes`.

### Abilitare Authentication

In Firebase Console:

1. apri il progetto `plannertime-32554`;
2. vai in `Authentication`;
3. apri `Sign-in method`;
4. abilita `Email/Password`;
5. abilita `Google`;
6. imposta una email di supporto progetto;
7. salva.

### Configurare Google Sign-In Android

Per Google Sign-In Android servono SHA-1 e SHA-256 dell'ambiente di firma.

Per debug, su questa macchina sono stati rilevati:

```text
SHA-1 debug
C6:06:BD:BE:8A:B4:4D:BF:97:24:3E:15:7D:D1:D1:65:C8:28:C8:72

SHA-256 debug
02:EC:84:D7:AF:F9:CB:2E:47:04:8D:69:D6:46:06:BE:3E:31:91:78:54:10:9E:43:6E:0B:F6:99:93:C2:0F:46
```

Procedura Firebase:

1. Firebase Console;
2. ingranaggio `Impostazioni progetto`;
3. scheda `Generali`;
4. sezione `Le tue app`;
5. seleziona l'app Android `com.vrexas.plannertimes`;
6. clicca `Aggiungi impronta digitale`;
7. inserisci SHA-1;
8. ripeti per SHA-256;
9. salva;
10. riscarica `google-services.json`;
11. sostituisci il file in `android/app/google-services.json`;
12. esegui `flutter clean` e `flutter pub get` se necessario.

Comando per leggere la debug keystore:

```powershell
keytool -list -v -alias androiddebugkey -keystore "$env:USERPROFILE\.android\debug.keystore" -storepass android -keypass android | Select-String -Pattern "SHA1:|SHA256:"
```

Comando standard Gradle:

```powershell
Push-Location android
.\gradlew signingReport
Pop-Location
```

Nota: durante l'ultima verifica il comando `signingReport` si e' fermato con un errore Gradle generico. In quel caso si puo' usare `keytool` sulla keystore debug, come sopra.

### SHA release

Per distribuire l'app serve anche aggiungere in Firebase le impronte della keystore release.

Il progetto usa `android/key.properties` per leggere:

- `keyAlias`
- `keyPassword`
- `storeFile`
- `storePassword`

Non inserire password o file keystore nella documentazione pubblica. Non versionare credenziali reali.

Esempio comando per release, sostituendo i valori locali:

```powershell
keytool -list -v -alias NOME_ALIAS -keystore PERCORSO_KEYSTORE
```

Aggiungere anche queste impronte a Firebase, nella stessa sezione dell'app Android.

### Rigenerare configurazione FlutterFire

Se si aggiungono piattaforme Firebase o si cambia app/package:

```powershell
dart pub global activate flutterfire_cli
flutterfire configure --project=plannertime-32554
```

Poi verificare:

- `lib/firebase_options.dart`
- `android/app/google-services.json`
- eventuali file iOS/macOS come `GoogleService-Info.plist`

## 10. Setup locale da zero

### Prerequisiti

Installare:

- Git;
- Flutter SDK;
- Android Studio o Android SDK;
- Java/JDK compatibile con Gradle;
- Firebase CLI;
- un emulatore Android o device fisico;
- VS Code con estensioni Flutter/Dart consigliate.

Verifiche:

```powershell
flutter doctor
flutter --version
firebase --version
java -version
```

### Clonare e installare dipendenze

Dalla root del progetto:

```powershell
flutter pub get
```

Se il progetto e' in stato sporco dopo modifiche di dipendenze:

```powershell
flutter clean
flutter pub get
```

### Configurare Firebase locale

Verificare che siano presenti:

```text
android/app/google-services.json
firebase.json
firestore.rules
storage.rules
```

Per Android controllare che il package in Firebase coincida con:

```text
com.vrexas.plannertimes
```

### Avviare l'app

Elencare dispositivi:

```powershell
flutter devices
```

Avviare:

```powershell
flutter run
```

Avviare su device specifico:

```powershell
flutter run -d DEVICE_ID
```

### Validazione sviluppo

Analisi statica:

```powershell
flutter analyze
```

Test:

```powershell
flutter test
```

Test specifico:

```powershell
flutter test test/widget_test.dart
```

## 11. Build Android

### Debug APK

```powershell
flutter build apk --debug
```

### Release APK

Prima configurare `android/key.properties` e la keystore release.

Poi:

```powershell
flutter build apk --release
```

### App Bundle Play Store

```powershell
flutter build appbundle --release
```

Output tipici:

```text
build/app/outputs/flutter-apk/app-release.apk
build/app/outputs/bundle/release/app-release.aab
```

## 12. Configurazione icone

`pubspec.yaml` contiene:

```yaml
flutter_launcher_icons:
  android: "Planner Time"
  ios: "Planner Time"
  image_path: "assets/images/icon.png"
```

Per rigenerare le icone:

```powershell
dart run flutter_launcher_icons
```

## 13. Web site statico

La directory `WEB_SITE` contiene pagine HTML statiche:

- `index.html`
- `privacy_policy.html`

Queste pagine sono separate dall'app Flutter. Possono essere pubblicate come sito statico, ad esempio tramite hosting tradizionale o Firebase Hosting, se configurato.

## 14. Figma e design

La directory `FIGMA` contiene layout sorgenti usati per ricreare l'interfaccia:

```text
FIGMA/
  calendario/
  crea_evento/
  dashboard_progetti/
  dashboard_progetti_con_task_esempio/
  dettaglio_task/
  efficient_flow/
  login/
  registrazione/
```

Regola importante usata nel redesign:

- `dashboard_progetti_con_task_esempio` e' il layout giusto della dashboard;
- `dashboard_progetti` contiene post/task di esempio da recuperare come contenuto, non come struttura principale.

Il tema condiviso e' in `lib/theme/app_theme.dart`.

## 15. Flussi principali

### Primo login utente

1. Utente accede con email/password o Google.
2. Firebase Auth restituisce `User`.
3. `authStateChangesProvider` notifica l'app.
4. `AppEntryPoint` chiama `setActiveUser`.
5. `AppStateNotifier` salva/aggiorna `userProfiles/{uid}`.
6. L'app cerca progetti condivisi dove `memberIds` contiene l'UID.
7. Se non trova progetti, prova la migrazione legacy da `users/{uid}`.
8. Se non ci sono dati legacy, crea dati seed.
9. UI mostra calendario e progetti.

### Creazione progetto

1. Utente apre `Nuovo progetto`.
2. Inserisce nome e descrizione.
3. `AppStateNotifier.createProject` crea un ID UUID.
4. Crea `Project` con `ownerId = activeUserId`.
5. Inserisce solo l'utente corrente in `memberIds` e `members`.
6. Crea colonne default.
7. Aggiorna Firestore e stato locale.

### Aggiunta membro a progetto

1. Da dashboard progetto, l'utente preme il pulsante `+` accanto agli avatar.
2. Inserisce email del nuovo membro.
3. `findUserProfileByEmail` cerca in `userProfiles.emailLowercase`.
4. Se il profilo esiste, aggiorna `projects/{projectId}` con:
   - `memberIds: arrayUnion(uid)`;
   - `members.{uid}`.
5. Il membro vedra' il progetto al prossimo caricamento o refresh stream.

### Rimozione membro da progetto

1. Da dashboard progetto, l'utente preme gli avatar accanto al titolo.
2. Si apre il menu membri con lista utenti.
3. Se l'utente corrente e' admin (`ownerId`), puo' rimuovere i membri non admin.
4. L'admin non puo' rimuovere se stesso dal progetto.
5. La rimozione aggiorna `memberIds` e cancella `members.{uid}`.

### Creazione task con scadenza

1. Utente crea task dalla dashboard.
2. Il task viene salvato in `projects/{projectId}/tasks/{taskId}`.
3. Se esiste `dueDate`, viene creato un evento calendario collegato.
4. Se l'evento ha reminder, viene schedulata una notifica locale.

### Assegnazione task

1. Nel dettaglio task la sezione `Assegnatari` legge solo i membri del progetto.
2. Ogni membro del progetto puo' aprire la selezione e assegnare il task a uno o piu' membri.
3. Lo stato applicativo normalizza `assigneeIds` eliminando eventuali UID non presenti nel progetto.
4. Le regole Firestore bloccano create/update di task se `assigneeIds` contiene utenti esterni al progetto.

### Allegati task

1. Nel dettaglio task, l'utente preme `Carica` o il riquadro `Sfoglia`.
2. `AttachmentService` apre il file picker e valida formato e dimensione massima.
3. Il file viene caricato in Firebase Storage sotto il progetto/task corrente.
4. L'URL download viene aggiunto al campo `images` del task.
5. La griglia allegati mostra anteprima immagine quando possibile, altrimenti un riquadro file.
6. Toccando un allegato si puo' aprire il file o copiare il link.
7. Rimuovendo un allegato l'app prova a cancellare il file da Storage e poi rimuove l'URL dal task.

### Eliminazione task

1. L'app cerca eventuali eventi associati al task.
2. Cancella le notifiche correlate.
3. Cancella commenti e task su Firestore tramite batch.
4. Aggiorna stato locale.

### Commenti task

1. Quando un utente aggiunge un commento, l'app salva testo, timestamp e dati autore dell'utente corrente.
2. Nel dettaglio task ogni commento mostra nome/avatar dell'autore.
3. Il pulsante elimina compare solo sui commenti creati dall'utente corrente.
4. Le regole Firestore bloccano modifica ed eliminazione se `authorId` non corrisponde a `request.auth.uid`.

### Eliminazione progetto

1. Solo l'owner puo' eliminare secondo le regole Firestore.
2. `FirestoreService.deleteProject` cancella:
   - commenti;
   - task;
   - eventi;
   - colonne;
   - documento progetto.
3. Lo stato locale rimuove tutti gli elementi correlati.

## 16. Test

Attualmente e' presente `test/widget_test.dart`.

Il test verifica che la schermata auth venga renderizzata e che:

- compaia `Bentornato`;
- compaia `Accedi`;
- compaia `Google`;
- non compaia `Apple`;
- compaia `Registrati ora`.

Comandi:

```powershell
flutter test
flutter test test/widget_test.dart
```

## 17. Qualita' codice

Linter configurato in `analysis_options.yaml`:

```yaml
include: package:flutter_lints/flutter.yaml
```

Comando principale:

```powershell
flutter analyze
```

Prima di consegnare modifiche significative eseguire sempre:

```powershell
flutter analyze
flutter test
```

Per formattare Dart:

```powershell
dart format lib test
```

In VS Code si puo' usare anche il formatter Dart integrato.

## 18. Procedure operative Firebase

### Pubblicare regole Firestore

```powershell
firebase login
firebase use plannertime-32554
firebase deploy --only firestore:rules
```

### Pubblicare regole Storage

```powershell
firebase login
firebase use plannertime-32554
firebase deploy --only storage
```

### Pubblicare Cloud Functions

```powershell
firebase login
firebase use plannertime-32554
Push-Location functions
npm install
Pop-Location
firebase deploy --only functions
```

### Controllare progetto Firebase selezionato

```powershell
firebase projects:list
firebase use
```

### Aggiornare `google-services.json`

Ogni volta che si modificano SHA, package name o app Firebase:

1. Firebase Console;
2. impostazioni progetto;
3. app Android;
4. scarica nuovo `google-services.json`;
5. sostituisci `android/app/google-services.json`;
6. esegui:

```powershell
flutter clean
flutter pub get
flutter run
```

### Risolvere `ApiException: 10` Google Sign-In

Cause piu' comuni:

- Google non abilitato in Firebase Authentication;
- SHA-1 mancante;
- SHA-256 mancante;
- `google-services.json` vecchio;
- package Android non corrispondente;
- app installata con firma diversa da quella registrata in Firebase.

Checklist:

1. controllare `applicationId` in `android/app/build.gradle.kts`;
2. controllare app Android in Firebase;
3. aggiungere SHA-1 e SHA-256 debug;
4. aggiungere SHA-1 e SHA-256 release se si usa build release;
5. riscaricare `google-services.json`;
6. disinstallare app dal device;
7. eseguire `flutter clean`;
8. rilanciare `flutter run`.

## 19. Troubleshooting

### `Missing or insufficient permissions`

Controllare:

- utente autenticato;
- regole Firestore deployate;
- `memberIds` contiene l'UID dell'utente;
- documento progetto esiste in `projects/{projectId}`;
- subcollection sotto `projects/{projectId}` e non sotto `users/{uid}`.

### Utente non trovato quando aggiungo membro

Possibili cause:

- l'utente non si e' mai registrato;
- `userProfiles/{uid}` non esiste;
- email scritta in modo errato;
- `emailLowercase` non popolato.

Soluzione:

- far accedere almeno una volta l'utente;
- verificare `userProfiles` in Firestore;
- riprovare con email corretta.

### Login Google non riesce

Controllare:

- provider Google abilitato in Firebase Authentication;
- SHA-1/SHA-256 registrati;
- `google-services.json` aggiornato;
- device con Google Play Services funzionanti;
- connessione internet;
- eventuale VPN/DNS privato.

### Le notifiche non arrivano

Controllare:

- permesso notifiche Android 13+;
- permesso exact alarm;
- evento/reminder non nel passato;
- timezone locale corretta;
- impostazioni risparmio batteria del device.

### Firestore non mostra dati dopo login

Controllare:

- query `projects.where('memberIds', arrayContains: uid)`;
- `memberIds` del documento progetto;
- regole Firestore;
- console debug per eccezioni silenziose in `_initializeUserData`.

### Upload allegati non riesce

Controllare:

- Firebase Storage abilitato nel progetto;
- `storage.rules` deployate;
- utente autenticato e membro del progetto;
- file entro 10 MB;
- formato file tra quelli supportati;
- App Check non in enforcement prima di avere token validi sul client.

### Le notifiche collaborative non arrivano

Controllare:

- Firebase Cloud Messaging abilitato;
- Cloud Functions deployate;
- `firestore.rules` deployate per consentire scrittura dei token;
- permesso notifiche concesso sul device;
- documento token presente in `notificationTokens/{uid}/tokens`;
- app installata con `google-services.json` aggiornato;
- App Check non in enforcement prima di avere token validi sul client e sulle Functions.

### `flutter run` fallisce su Android

Controllare:

```powershell
flutter doctor
flutter clean
flutter pub get
flutter analyze
```

Se il problema riguarda Gradle:

```powershell
Push-Location android
.\gradlew --stacktrace assembleDebug
Pop-Location
```

## 20. Limiti noti e debito tecnico

- `firebase_options.dart` contiene solo configurazione Android; web/iOS/macOS/windows/linux non sono configurati per Firebase.
- `main.dart` usa `Firebase.initializeApp()` senza `DefaultFirebaseOptions.currentPlatform`.
- Il lookup membri via email rende `userProfiles` leggibile agli utenti autenticati; valutare restrizioni/Cloud Functions per privacy avanzata.
- La migrazione legacy copia dati da `users/{uid}` ma non elimina automaticamente i dati legacy.
- Gli allegati dei task sono salvati come URL nel campo storico `images`; in futuro si puo' introdurre un modello `attachments` con nome, dimensione, autore e content type.
- Le notifiche collaborative richiedono Cloud Functions deployate e Firebase Cloud Messaging configurato; su web non e' ancora configurato un service worker FCM.
- Apple Sign-In e' nascosto ma non implementato.
- Il test coverage e' minimo e copre solo la schermata auth.
- Alcune schermate usano stato locale aggiornato manualmente dopo le operazioni Firestore; in futuro si puo' centralizzare meglio la sincronizzazione stream.

## 21. Roadmap consigliata

Priorita' alta:

- completare configurazione Firebase per release Android;
- deployare e testare regole Firestore;
- aggiungere test per membership progetto;
- gestire errori `_initializeUserData` con logging visibile;
- completare cancellazione dati utente chiamando anche `deleteAllUserData` prima/durante delete account.

Priorita' media:

- modello allegati dedicato con metadati completi;
- inviti progetto con stato pending;
- preferenze notifiche per utente e canali email/push;
- ruoli progetto avanzati oltre owner/admin e membro semplice;
- trasferimento ownership;

Priorita' futura:

- supporto Firebase per iOS/macOS/web;
- Apple Sign-In;
- ricerca globale;
- filtri avanzati task/eventi;
- statistiche avanzamento progetto;
- modalita' offline esplicita e gestione conflitti.

## 22. Comandi rapidi

Installazione dipendenze:

```powershell
flutter pub get
```

Avvio:

```powershell
flutter run
```

Analisi:

```powershell
flutter analyze
```

Test:

```powershell
flutter test
```

Pulizia:

```powershell
flutter clean
flutter pub get
```

Build APK debug:

```powershell
flutter build apk --debug
```

Build APK release:

```powershell
flutter build apk --release
```

Build AAB release:

```powershell
flutter build appbundle --release
```

Deploy regole Firestore:

```powershell
firebase deploy --only firestore:rules
```

Deploy regole Storage:

```powershell
firebase deploy --only storage
```

Deploy Cloud Functions:

```powershell
firebase deploy --only functions
```

SHA debug Android:

```powershell
keytool -list -v -alias androiddebugkey -keystore "$env:USERPROFILE\.android\debug.keystore" -storepass android -keypass android | Select-String -Pattern "SHA1:|SHA256:"
```

Gradle signing report:

```powershell
Push-Location android
.\gradlew signingReport
Pop-Location
```

## 23. Checklist nuovo ambiente

Usare questa checklist quando si configura il progetto su una nuova macchina:

- Flutter installato e `flutter doctor` senza errori bloccanti.
- Android SDK/emulatore configurato.
- Firebase CLI installata.
- `flutter pub get` completato.
- `android/app/google-services.json` presente e aggiornato.
- Firebase Authentication abilita Email/Password e Google.
- SHA-1/SHA-256 debug registrati in Firebase.
- Firestore Database creato.
- `firestore.rules` deployate.
- Firebase Storage abilitato.
- `storage.rules` deployate.
- Firebase Cloud Messaging abilitato.
- Cloud Functions deployate.
- `flutter analyze` pulito.
- `flutter test` pulito.
- `flutter run` avvia l'app.
- Login email/password verificato.
- Login Google verificato.
- Creazione progetto verificata.
- Aggiunta membro via email verificata con un secondo utente.
- Notifica push per aggiunta/rimozione membro verificata su device reale.
- Notifica push per commento task e nuova assegnazione verificata su device reale.
- Creazione task/evento verificata.
- Upload/apertura/rimozione allegato task verificati.
- Notifica locale verificata su device reale.

## 24. Note di sicurezza

- Non committare keystore private o password.
- Proteggere `android/key.properties` se contiene credenziali reali.
- Le API key Firebase lato client non sono segreti, ma il progetto deve essere protetto da regole Firestore corrette.
- Verificare sempre regole Firestore e Storage prima del deploy.
- Evitare di esporre piu' dati del necessario in `userProfiles`.
- Per funzionalita' inviti piu' sensibili, valutare Cloud Functions lato server.

## 25. Riferimenti file principali

- App entrypoint: `lib/main.dart`
- Auth UI: `lib/screens/auth_screen.dart`
- Shell e drawer: `lib/screens/home_shell.dart`
- Calendario: `lib/screens/calendar_screen.dart`
- Creazione evento: `lib/screens/create_event_screen.dart`
- Progetti: `lib/screens/projects_screen.dart`
- Dashboard progetto: `lib/screens/project_dashboard_screen.dart`
- Dettaglio task: `lib/screens/task_detail_screen.dart`
- Profilo: `lib/screens/profile_screen.dart`
- Stato app: `lib/state/app_state.dart`
- Provider auth: `lib/state/auth_state.dart`
- Provider Firestore: `lib/state/firestore_providers.dart`
- Servizio Firestore: `lib/services/firestore_service.dart`
- Servizio allegati: `lib/services/attachment_service.dart`
- Servizio notifiche: `lib/services/notification_service.dart`
- Tema: `lib/theme/app_theme.dart`
- Regole Firestore: `firestore.rules`
- Regole Storage: `storage.rules`
- Config Android Firebase: `android/app/google-services.json`
- Config Gradle Android: `android/app/build.gradle.kts`
- Dipendenze: `pubspec.yaml`
