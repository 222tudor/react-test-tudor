import { useState } from 'react'

type AddWorkModalProps = {
    day: number
    month: number
    year: number
    operators: any[]
    tickets: any[]
    onClose: () => void
    onSave: () => void
}

export default function AddWorkModal({ day, month, year, operators, tickets, onClose, onSave }: AddWorkModalProps) {

    const pad = (n: number) => String(n).padStart(2, '0')
    const defaultDate = `${year}-${pad(month + 1)}-${pad(day)}T09:00`

    const [description, setDescription] = useState('')
    const [operatorId, setOperatorId] = useState('')
    const [ticketId, setTicketId] = useState('')
    const [creationDate, setCreationDate] = useState(defaultDate)
    const [endDate, setEndDate] = useState(defaultDate)

    function handleSubmit() {
        const nuovaLavorazione = {
            description,
            operatorId: parseInt(operatorId),
            ticketId: parseInt(ticketId),
            creationDate: new Date(creationDate).getTime(),
            endDate: new Date(endDate).getTime()
        }
        console.log('aggiungo lavorazione', nuovaLavorazione)
        fetch('http://localhost:12345/works', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuovaLavorazione)
        }).then(() => {
            onSave()
            onClose()
        })
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}>
            <div style={{ background: 'white', margin: '100px auto', padding: '24px', width: '400px' }}>
                <h3>Nuova Lavorazione - {day}/{month + 1}/{year}</h3>
                <div>
                    <label>Descrizione: </label>
                    <input value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Operatore: </label>
                    <select value={operatorId} onChange={e => setOperatorId(e.target.value)}>
                        <option value="">Seleziona</option>
                        {operators.map((o: any) => (
                            <option key={o.id} value={o.id}>{o.name} {o.surname}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Ticket: </label>
                    <select value={ticketId} onChange={e => setTicketId(e.target.value)}>
                        <option value="">Seleziona</option>
                        {tickets.map((t: any) => (
                            <option key={t.id} value={t.id}>{t.description}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Inizio: </label>
                    <input type="datetime-local" value={creationDate} onChange={e => setCreationDate(e.target.value)} />
                </div>
                <div>
                    <label>Fine: </label>
                    <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <button onClick={handleSubmit}>Salva</button>
                <button onClick={onClose}>Annulla</button>
            </div>
        </div>
    )
}
