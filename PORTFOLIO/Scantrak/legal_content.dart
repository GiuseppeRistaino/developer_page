import '../models/app_user.dart';

class LegalContent {
  static const privacyTitle = 'Informativa Privacy';
  static const termsTitle = 'Termini di utilizzo';
  static const dataControllerName = 'Giuseppe Ristaino';
  static const dataControllerEmail = 'vrexas.developer@gmail.com';
  static const dataControllerLocation = 'Italia';

  static const privacySummary = [
    'ScanTrak salva gli scontrini principalmente sul dispositivo.',
    'Il backup cloud è disponibile solo per utenti Premium e salva scontrini e immagini su Firebase quando viene attivato.',
    'La scansione invia le immagini a firebase per estrarre i dati dello scontrino, senza salvare nessuna informazione.',
    'Gli utenti Free devono completare una pubblicita rewarded prima della scansione.',
  ];

  static const requiredConsentText =
      'Accettando confermi di aver letto Termini e Informativa Privacy e di aver compreso che la scansione AI invia temporaneamente immagini e dati dello scontrino ai servizi cloud di ScanTrak per l\'analisi.';

  static const privacyPolicy =
      '''
Versione: $kPrivacyPolicyVersion

ScanTrak è progettata con un approccio locale: gli scontrini, le immagini e le statistiche sono salvati prima di tutto sul dispositivo.

Titolare del trattamento
Il titolare del trattamento dei dati e $dataControllerName.
Contatto privacy: $dataControllerEmail.
Paese: $dataControllerLocation.

Dati trattati
- Account: email, nome visualizzato, identificativo utente Firebase, piano attuale e stato Premium.
- Scontrini: negozio, data, totale, metodo di pagamento, articoli, categorie e immagini dello scontrino.
- Uso AI: conteggio giornaliero delle scansioni e immagini inviate per l'analisi.
- Backup cloud: dati e immagini caricati su Firebase solo se l'utente Premium attiva la funzione.
- Pubblicita: per gli utenti Free possono essere usati servizi Google AdMob e il flusso Google UMP per gestire il consenso pubblicitario.

Finalita
- Creare e gestire l'account utente.
- Estrarre automaticamente i dati dagli scontrini tramite AI.
- Mostrare statistiche e archivi locali.
- Applicare limiti giornalieri e funzionalita del piano.
- Eseguire backup cloud se attivato dall'utente Premium.
- Mostrare annunci rewarded agli utenti Free prima della scansione AI.
- Gestire la richiesta di eliminazione account e cancellare i dati associati.

Cloud e AI
Quando usi la scansione AI, le immagini selezionate vengono inviate alle Cloud Functions di ScanTrak per l'analisi. Il risultato viene restituito all'app e salvato localmente. Il backup cloud e separato dalla scansione: se l'utente Premium lo attiva, ScanTrak salva su Firebase scontrini, articoli, totali, categorie e immagini associate.

Pubblicita
Gli utenti Free devono completare un annuncio rewarded per usare la scansione AI. Il consenso pubblicitario viene gestito tramite Google UMP quando richiesto dalla normativa applicabile.

Conservazione e controllo
I dati locali restano sul dispositivo finche l'utente non li elimina. I dati cloud possono essere rimossi usando le funzioni di pulizia cloud disponibili nell'app. L'utente puo esportare i dati locali con le funzioni Premium.

Eliminazione account
Dalla pagina Config puoi eliminare l'account. L'operazione rimuove il profilo Firebase, l'account Firebase Auth, gli scontrini e le immagini presenti nel backup cloud, i contatori AI collegati all'utente e i dati locali salvati sul dispositivo, incluse immagini e preferenze. Per sicurezza puo essere richiesta una nuova autenticazione con password o Google.

Diritti dell'utente
Puoi gestire consensi, backup cloud, esportazione, cancellazione dati ed eliminazione account dalla sezione Dati e Privacy e dalla pagina Config. Per richieste privacy puoi scrivere a $dataControllerEmail.
''';

  static const terms =
      '''
Versione: $kTermsVersion

ScanTrak aiuta a digitalizzare scontrini, leggere dati tramite AI e consultare statistiche personali di spesa.

Uso dell'app
- L'utente e responsabile della correttezza dei dati salvati e puo modificarli prima del salvataggio.
- L'analisi AI puo commettere errori: i risultati vanno verificati prima dell'uso.
- Gli utenti Free hanno limiti giornalieri e devono completare un annuncio rewarded prima della scansione AI.
- Gli utenti Premium hanno funzionalita aggiuntive come assenza pubblicita, export e backup cloud opzionale.

Backup cloud
Il backup cloud e facoltativo e riservato al piano Premium. Quando viene attivato, salva su Firebase gli scontrini e le immagini associate. Disattivarlo blocca nuovi upload; per rimuovere dati gia caricati serve usare la pulizia cloud.

Disponibilita
Alcune funzioni dipendono da Firebase, Google Sign-In, AdMob, connessione internet e servizi AI. In caso di indisponibilita temporanea, l'app puo limitare alcune operazioni.

Eliminazione account
L'utente puo eliminare l'account dalla pagina Config. La cancellazione rimuove account, profilo e dati Firebase associati, oltre ai dati locali sul dispositivo. L'operazione e definitiva e puo richiedere una nuova autenticazione.

Contatti
Per richieste su account, privacy o supporto puoi scrivere a $dataControllerEmail.

Aggiornamenti
Termini, Informativa Privacy e consensi possono essere aggiornati. In caso di nuova versione rilevante, l'app puo richiedere una nuova accettazione.
''';
}
