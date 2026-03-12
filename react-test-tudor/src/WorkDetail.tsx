import styles from './WorkDetail.module.scss'

type WorkDetailProps = {
    work: any
    onClose: () => void
    operators?: any[]
    tickets: any[]
    customers: any[]
}

export default function WorkDetail({ work, onClose, operators = [], tickets, customers }: WorkDetailProps) {

    if (!work) return null

    const operator = operators.find((o: any) => o.id == work.operatorId)
    const ticket = tickets.find((t: any) => t.id == work.ticketId)
    const customer = customers.find((c: any) => c.id == ticket?.customerId)
    const ore = (work.endDate - work.creationDate) / 3600000

    return (
        <div className={styles.panel}>
            <button className={styles.closeButton} onClick={onClose}>Chiudi</button>
            <h3 className={styles.title}>Dettaglio Lavorazione</h3>
            <p className={styles.field}><strong>Descrizione:</strong> {work.description}</p>
            <p className={styles.field}><strong>Operatore:</strong> {operator ? operator.name + ' ' + operator.surname : 'N/D'}</p>
            <p className={styles.field}><strong>Cliente:</strong> {customer ? customer.name : 'N/D'}</p>
            <p className={styles.field}><strong>Ticket:</strong> {ticket ? ticket.description : 'N/D'}</p>
            <p className={styles.field}><strong>Ore:</strong> {ore}</p>
        </div>
    )
}
