
type WorkDetailProps = {
    work: any
    onClose: () => void
}

export default function WorkDetail({ work, onClose }: WorkDetailProps) {

    if (!work) return null

    return (
        <div style={{ border: '1px solid #333', padding: '16px', marginTop: '16px' }}>
            <button onClick={onClose}>Chiudi</button>
            <h3>Dettaglio Lavorazione</h3>
            <p><strong>Descrizione:</strong> {work.description}</p>
            <p><strong>Operatore ID:</strong> {work.operatorId}</p>
            <p><strong>Ticket ID:</strong> {work.ticketId}</p>
        </div>
    )
}
