---
id: "13"
title: "Il bot prende vita (e mi insegna l'umiltà)"
date: "2026-06-11"
readTime: "9 min"
description: "Ho costruito il trading bot di cui avevo parlato. Ecco cosa fa, e la verità onesta sui numeri."
tags: ["Trading", "Crypto", "Python", "Bot"]
---

Qualche tempo fa ho scritto un articolo intitolato *L'idea di far soldi*, in cui promettevo una cosa precisa: avrei costruito un bot di trading per criptovalute, in parallelo a questo blog, raccontando ogni passo. Errori compresi.

Bene. Il bot esiste. Funziona. E mi ha già preso a schiaffi in faccia con una lezione che vale più di qualsiasi guadagno. Mettetevi comodi.

## Cosa ho costruito, in due parole

L'idea era semplice da dire e fastidiosa da realizzare: un programma che guarda il grafico di una criptovaluta e dice **comprare, vendere o aspettare**. Niente magie, niente promesse di ricchezza. Un sistema, non un oracolo.

Alla fine il bot è una piccola catena di montaggio, ogni pezzo fa una cosa sola:

1. **Scarica i dati** di mercato (le candele) da un exchange, in tempo reale.
2. **Calcola gli indicatori** tecnici — quelli da manuale: medie mobili, RSI, MACD, Bollinger Bands. La matematica che i trader fissano da decenni.
3. **Applica delle strategie**: ognuna guarda gli indicatori e vota. "Io comprerei." "Io venderei." "Io non farei niente."
4. **Mette ai voti** le strategie e tira fuori una decisione unica, con tanto di spiegazione del perché.
5. **Mostra tutto** in una dashboard con il grafico a candele e il segnale del momento.

C'è anche un **conto virtuale**: il bot può "operare" con soldi finti, in modo che io possa guardarlo fare le sue mosse senza rischiare un centesimo vero. Perché — e lo ripeto perché è importante — questo non è un sistema per diventare ricchi. È un esperimento di ingegneria.

Fin qui, la parte bella. La parte in cui ti senti bravo perché hai scritto del codice che gira.

## Il momento della verità

Poi arriva la domanda che conta: *ma funziona?*

E qui ho fatto la cosa più importante di tutto il progetto, quella che il 90% delle persone che inseguono "l'idea di far soldi" salta a piè pari. L'ho **provato sul passato**.

Ho preso i dati veri dal 1° gennaio 2024 a oggi e ho lasciato che il bot "rigiocasse" la storia, candela per candela, comprando e vendendo come avrebbe fatto in diretta. Si chiama backtesting, ed è il modo onesto per scoprire se una strategia vale qualcosa **prima** di metterci dei soldi.

Il risultato, con le strategie di base?

Disastroso.

Partendo da 10.000 euro virtuali su Bitcoin, il bot ne avrebbe lasciati sul tavolo circa 1.700: **−17%**. E la cosa più umiliante: se avessi semplicemente comprato Bitcoin all'inizio e me ne fossi dimenticato — il famigerato "compra e tieni" — ne avrei guadagnati. Il mio bot intelligente faceva peggio del non fare assolutamente niente.

Su Ethereum e Solana, anche peggio.

C'era pure il dettaglio crudele: il 70% delle operazioni erano in guadagno. Sembra un successo, no? E invece no. Tante piccole vincite e poche, grosse perdite. Il classico errore di chi taglia i profitti e lascia correre le perdite — solo che a farlo era una macchina, con la mia stessa stupidità codificata dentro.

Le strategie "da manuale", da sole, non battono il mercato. Lo sapevo in teoria. Vederlo nei miei numeri è un'altra cosa.

## Non mi sono arreso (un po')

Qui potevo fare due cose. Buttare tutto e tornare a Monkey Island, oppure capire *perché* perdeva e provare a sistemarlo.

Il problema più evidente era che il bot non aveva nessun senso del **trend**. Comprava e vendeva sui singoli segnali, ma se ne fregava della direzione generale del mercato. Come uno che si mette a comprare ombrelli durante la siccità perché "ha visto una nuvola".

Così ho aggiunto un **filtro di trend**: una regola semplice che dice "finché il prezzo è sopra la sua media di lungo periodo, stai dalla parte dei compratori; quando scende sotto, togliti dai piedi". Poi ho lasciato che un ottimizzatore provasse decine di combinazioni di parametri per trovare la migliore.

E qui scatta la trappola in cui cascano tutti.

## La lezione che vale più dei soldi

Quando ottimizzi una strategia sul passato, è facilissimo ingannare sé stessi. Trovi i parametri perfetti per i dati che hai, festeggi, e poi nella realtà perdi tutto. Perché non hai trovato una strategia: hai semplicemente **imparato a memoria il passato**. In gergo si chiama *overfitting*, ed è il peccato originale di chi gioca con i dati.

Per non cascarci, ho diviso il tempo in due. Ho ottimizzato il bot **solo sul 2024**, e poi l'ho messo alla prova sul **2025 fino a oggi** — un periodo che durante l'ottimizzazione il bot non aveva mai visto. Se funziona anche lì, su dati "nuovi", allora forse vale qualcosa. Se crolla, era solo un'illusione.

I numeri, sul periodo mai visto:

- **Bitcoin**: il "compra e tieni" avrebbe perso il **−37%** (era un periodo brutto). Il bot ottimizzato ha fatto **+10%**. Si è tolto dal mercato durante il crollo. Esattamente il suo lavoro.
- **Solana**: "compra e tieni" **−64%**. Il bot: **−25%**. Ancora in perdita, ma ha dimezzato il danno.
- **Ethereum**: e qui la doccia fredda. Sul 2024 l'ottimizzatore aveva scelto di **disattivare** il filtro di trend, perché su quei dati specifici rendeva di più. Risultato sul periodo nuovo? **−47%**, peggio del "compra e tieni". Si era affezionato al passato e ha sbagliato il futuro.

Tre monete, tre storie diverse. Su due il bot ha funzionato sorprendentemente bene, schivando i crolli. Su una si è fatto fregare dall'overfitting — **e l'ho scoperto solo perché ho avuto la disciplina di testarlo su dati che non aveva mai visto.**

Questa, per me, è la vera vincita del progetto. Non il +10% su Bitcoin. È aver costruito un metodo abbastanza onesto da dirmi quando mi sto illudendo.

## Dove siamo

Oggi il bot gira con la configurazione migliorata: il filtro di trend è attivo di default, e nella dashboard posso vedere il segnale del momento per le monete che scelgo, con la spiegazione del perché. Opera su un conto virtuale, traccia i guadagni e le perdite, e — soprattutto — non tocca un euro vero.

E lì resterà ancora a lungo. Perché la differenza tra un esperimento divertente e un buon modo per perdere i risparmi è tutta nella pazienza di non avere fretta.

L'idea di far soldi, come dicevo nel primo articolo, era la scusa. Quello che cercavo davvero era capire come funzionano le cose. E in queste settimane ho capito una cosa che vale per il trading come per la vita: il mercato non premia chi è più intelligente, premia chi è più onesto con sé stesso.

Il bot continua. E anche questa storia.
