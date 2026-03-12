import { useState } from 'react'
import styles from './WorkDetail.module.scss'

type WorkDetailProps = {
    work: any
    onClose: () => void
    onSave: () => void
    operators?: any[]
    tickets: any[]
    customers: any[]
}

export default function WorkDetail({ work, onClose, onSave, operators = [], tickets, customers }: WorkDetailProps) {

    const [editMode, setEditMode] = useState(false)
    const [editDescription, setEditDescription] = useState('')
    const [editOperatorId, setEditOperatorId] = useState('')
    const [editTicketId, setEditTicketId] = useState('')
    const [editCustomerId, setEditCustomerId] = useState('')

    if (!work) return null

    const operator = operators.find((o: any) => o.id == work.operatorId)
    const ticket = tickets.find((t: any) => t.id == work.ticketId)
    const customer = customers.find((c: any) => c.id == ticket?.customerId)
    const ore = (work.endDate - work.creationDate) / 3600000

    function handleEdit() {
        setEditDescription(work.description)
        setEditOperatorId(work.operatorId)
        setEditTicketId(work.ticketId)
        setEditCustomerId(customer ? customer.id : '')
        setEditMode(true)
    }

    function handleSave() {
        const aggiornata = {
            description: editDescription,
            operatorId: parseInt(editOperatorId),
            ticketId: parseInt(editTicketId)
        }
        console.log('salvo modifiche', aggiornata)
        fetch(`http://localhost:12345/works/${work.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aggiornata)
        }).then(() => {
            setEditMode(false)
            onSave()
        })
    }

    return (
        <div className={styles.panel}>
            <button className={styles.closeButton} onClick={onClose}>Chiudi</button>
            <h3 className={styles.title}>Dettaglio Lavorazione</h3>

            {!editMode ? (
                <>
                    <p className={styles.field}><strong>Descrizione:</strong> {work.description}</p>
                    <p className={styles.field}><strong>Operatore:</strong> {operator ? operator.name + ' ' + operator.surname : 'N/D'}</p>
                    <p className={styles.field}><strong>Cliente:</strong> {customer ? customer.name : 'N/D'}</p>
                    <p className={styles.field}><strong>Ticket:</strong> {ticket ? ticket.description : 'N/D'}</p>
                    <p className={styles.field}><strong>Ore:</strong> {ore}</p>
                    <button onClick={handleEdit}>Modifica</button>
                </>
            ) : (
                <>
                    <div className={styles.field}>
                        <label><strong>Descrizione:</strong></label>
                        <input value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label><strong>Operatore:</strong></label>
                        <select value={editOperatorId} onChange={e => setEditOperatorId(e.target.value)}>
                            {operators.map((o: any) => (
                                <option key={o.id} value={o.id}>{o.name} {o.surname}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label><strong>Ticket:</strong></label>
                        <select value={editTicketId} onChange={e => setEditTicketId(e.target.value)}>
                            {tickets.map((t: any) => (
                                <option key={t.id} value={t.id}>{t.description}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label><strong>Cliente:</strong></label>
                        <select value={editCustomerId} onChange={e => setEditCustomerId(e.target.value)}>
                            {customers.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <p className={styles.field}><strong>Ore:</strong> {ore}</p>
                    <button onClick={handleSave}>Salva</button>
                    <button onClick={() => setEditMode(false)}>Annulla</button>
                </>
            )}
        </div>
    )
}
