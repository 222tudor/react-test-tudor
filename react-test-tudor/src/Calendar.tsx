
type CalendarProps = {
    month: number
    year: number
    works: any[]
    operators: any[]
}

export default function Calendar({ month, year, works, operators }: CalendarProps) {

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptySlots = Array.from({ length: firstDay }, (_, i) => i)

    const monthName = new Date(year, month, 1).toLocaleString('it-IT', { month: 'long', year: 'numeric' })

    return (
        <div>
            <h2>{monthName.toUpperCase()}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                <div>Lun</div>
                <div>Mar</div>
                <div>Mer</div>
                <div>Gio</div>
                <div>Ven</div>
                <div>Sab</div>
                <div>Dom</div>
                {emptySlots.map(i => (
                    <div key={'empty-' + i} />
                ))}
                {days.map(d => {
                    const dayWorks = works.filter(w => {
                        const d2 = new Date(w.creationDate)
                        return d2.getDate() === d && d2.getMonth() === month && d2.getFullYear() === year
                    })
                    return (
                        <div key={d} style={{ border: '1px solid #ccc', minHeight: '80px', padding: '4px' }}>
                            <strong>{d}</strong>
                            {dayWorks.map(w => {
                                const operator = operators.find((o: any) => o.id == w.operatorId)
                                return (
                                    <div key={w.id} style={{ fontSize: '12px', background: '#eef', marginTop: '4px', padding: '2px' }}>
                                        <span>{operator ? operator.surname : 'N/D'}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
