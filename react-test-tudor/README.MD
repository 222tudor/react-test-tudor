### Implementare una maschera in stile master-detail di un calendario per l'assegnazione delle ore alle lavorazioni dei clienti.

## Lettura

# Master (Calendario)
    - Deve presentarsi sotto la forma di un calendario che mostri il mese selezionato (inizialmente quello corrente).
    - Ogni giorno deve elencare le diverse lavorazioni eseguite con la quantità minima possibile di dettagli per poterle distinguere in modo sommario, es: nome operatore, nome cliente.
    - Il calendario deve poter essere filtrabile per mostrare solo le lavorazioni eseguite da un certo operatore o assegnate a un certo cliente. Altri filtri opzionali, ma graditi.

# Detail (Giornata lavorativa)
    - Cliccando una lavorazione è possibile vederla in dettaglio.
    - Il dettaglio deve comprendere:
        Le informazioni dell'operatore
        Il informazioni del cliente
        La descrizione della lavorazione
        Le informazioni del ticket relativo alla lavorazione
        Le ore impegnate dalla lavorazione

## Scrittura

# Aggiunta lavorazione
    - Nella schermata Master ogni giorno del calendario deve avere la possibilità di aggiungere una lavorazione in cui specificare i dati fondamentali alla sua creazione

# Modifica lavorazione
    - Nella schermata di dettaglio si deve avere la possibilità di entrare in modalità di edit e quindi di modificarne ogni campo

- Per avviare json-server esegui 
    npm run db
- Per il live-server di vite esegui
    npm run dev

nel file api.yaml è presente la documentazione dell'API