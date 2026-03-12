
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
        <div style={{ border: '1px solid #333', padding: '16px', marginTop: '16px' }}>
            <button onClick={onClose}>Chiudi</button>
            <h3>Dettaglio Lavorazione</h3>
            <p><strong>Descrizione:</strong> {work.description}</p>
            <p><strong>Operatore:</strong> {operator ? operator.name + ' ' + operator.surname : 'N/D'}</p>
            <p><strong>Cliente:</strong> {customer ? customer.name : 'N/D'}</p>
            <p><strong>Ticket:</strong> {ticket ? ticket.description : 'N/D'}</p>
            <p><strong>Ore:</strong> {ore}</p>
        </div>
    )
}
