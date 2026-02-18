---
slug: "SAP BTP Lezione 4"
title: "Startegy Overview - Lezione 4"
date: "2026-02-12"
readTime: "15 min"
excerpt: "Scoprire la Terminologia Cloud"
---

# Scoprire la Terminologia Cloud

**Obiettivi della lezione**

- Apprendere le basi del Cloud Computing.

- Comprendere il ruolo degli Hyperscaler.

- Distinguere i diversi modelli di servizio (IaaS, PaaS, SaaS) e di deployment.

---

# 1. Cos'è il Cloud Computing?

Il Cloud Computing permette di utilizzare risorse informatiche (server, storage, database) on-demand tramite Internet, pagando solo per ciò che si usa.

**Vantaggi principali:**

- **Scalabilità**: Aumentare o diminuire le risorse in base al carico di lavoro.

- **Alta Disponibilità**: Ridondanza dei dati su più regioni geografiche.

- **Costi Ridotti**: Non è necessario costruire e mantenere data center fisici proprietari.

---

# 2. Gli Hyperscaler e il Multi-Cloud

Gli **Hyperscaler** sono i grandi fornitori di infrastrutture cloud globali. SAP collabora con i principali player per offrire BTP su diverse infrastrutture.

I **"Big Four"** Partner di SAP:

- Amazon Web Services (AWS)

- Microsoft Azure

- Google Cloud Platform (GCP)

- Alibaba Cloud


**Strategia Multi-Cloud**

SAP supporta un approccio **Multi-Cloud**, il che significa che SAP BTP è disponibile in diverse regioni gestite da questi fornitori. Questo garantisce bassa latenza e massima flessibilità: puoi combinare software SAP con servizi di terze parti ospitati sullo stesso cloud provider.

> SAP gestisce anche i propri data center, ma la tendenza attuale è quella di sfruttare le architetture degli hyperscaler per una maggiore resilienza.

---

# 3. Modelli di Servizio (IaaS, PaaS, SaaS)

![sap_btp_model_services](sap_btp_model_services.png)

La differenza principale risiede in **cosa gestisce il fornitore e cosa gestisce il cliente**.

| Modello                              | Descrizione                                                  | Cosa gestisce l'utente?              | Esempio                               |
|--------------------------------------|--------------------------------------------------------------|--------------------------------------|----------------------------------------|
| IaaS (Infrastructure as a Service)  | Noleggio di hardware virtuale: server, rete e storage.      | OS, Runtime, Dati, Applicazioni.     | AWS EC2, Azure VMs.                   |
| PaaS (Platform as a Service)        | Fornisce middleware, database e strumenti di sviluppo.      | Dati e Applicazioni.                 | SAP BTP.                              |
| SaaS (Software as a Service)        | Applicazioni pronte all'uso via web.                        | Solo configurazioni e utenti.        | SuccessFactors, S/4HANA Public Cloud. |

---

# 4. Modelli di Deployment

![sap_btp_deployment_models](sap_btp_deployment_models.png)

Indicano come e a chi viene erogato il servizio cloud.

**Public Cloud**

I servizi sono accessibili a chiunque via Internet. Le risorse sono condivise tra più clienti (multi-tenancy), ma i dati sono isolati.

- Esempi: SAP Business ByDesign, Google Docs.

**Private Cloud**

L'infrastruttura è dedicata esclusivamente a un'unica organizzazione. Offre i vantaggi del cloud (scalabilità) ma con i livelli di sicurezza e controllo di un ambiente on-premise.

**Hybrid Cloud**

Una combinazione di Public e Private. Ad esempio, un'azienda può tenere i dati sensibili in un Private Cloud (o on-premise) e utilizzare il Public Cloud per applicazioni meno critiche o per gestire picchi di traffico.

- Sfida: Richiede una classificazione rigorosa dei dati e dei processi.

---

# 5. SAP BTP nel panorama Cloud

SAP BTP si colloca principalmente nel settore PaaS. Offre le funzionalità di middleware necessarie per:

- Gestire la sicurezza (autenticazione/autorizzazione).

- Fornire servizi di database (HANA).

- Eseguire applicazioni personalizzate senza doversi preoccupare dell'infrastruttura sottostante (server e networking).

---

# Key Takeaways

- **On-demand**:: Paghi solo quello che usi.

- **Hyperscalers**: Partner fondamentali per la disponibilità globale di BTP.

- **PaaS**: SAP BTP è la piattaforma dove costruisci e integri, situata tra l'infrastruttura (IaaS) e l'applicazione finale (SaaS).