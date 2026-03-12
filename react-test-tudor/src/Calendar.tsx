import styles from './Calendar.module.scss'

type CalendarProps = {
    month: number
    year: number
    works: any[]
    operators: any[]
    tickets: any[]
    customers: any[]
    filterOperatorId: string
    filterCustomerId: string
    onWorkClick: (work: any) => void
    onAddWork: (day: number) => void
}

export default function Calendar({ month, year, works, operators, tickets, customers, filterOperatorId, filterCustomerId, onWorkClick, onAddWork }: CalendarProps) {

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    const emptySlots = Array.from({ length: firstDay }, (_, i) => i)

    const monthName = new Date(year, month, 1).toLocaleString('it-IT', { month: 'long', year: 'numeric' })

    return (
        <div className={styles.calendar}>
            <h2 className={styles.monthTitle}>{monthName.toUpperCase()}</h2>
            <div className={styles.grid}>
                <div className={styles.dayHeader}>Lun</div>
                <div className={styles.dayHeader}>Mar</div>
                <div className={styles.dayHeader}>Mer</div>
                <div className={styles.dayHeader}>Gio</div>
                <div className={styles.dayHeader}>Ven</div>
                <div className={styles.dayHeader}>Sab</div>
                <div className={styles.dayHeader}>Dom</div>
                {emptySlots.map(i => (
                    <div key={'empty-' + i} />
                ))}
                {days.map(d => {
                    const dayWorks = works.filter(w => {
                        const d2 = new Date(w.creationDate)
                        const matchesDay = d2.getDate() === d && d2.getMonth() === month && d2.getFullYear() === year
                        const matchesOperator = filterOperatorId === '' || w.operatorId == filterOperatorId
                        const workTicket = tickets.find((t: any) => t.id == w.ticketId)
                        const matchesCustomer = filterCustomerId === '' || workTicket?.customerId == filterCustomerId
                        return matchesDay && matchesOperator && matchesCustomer
                    })
                    return (
                        <div key={d} className={styles.dayCell}>
                            <div className={styles.dayCellHeader}>
                                <span className={styles.dayNumber}>{d}</span>
                                <button className={styles.addButton} onClick={() => onAddWork(d)}>+</button>
                            </div>
                            {dayWorks.map(w => {
                                const operator = operators.find((o: any) => o.id == w.operatorId)
                                const ticket = tickets.find((t: any) => t.id == w.ticketId)
                                const customer = customers.find((c: any) => c.id == ticket?.customerId)
                                console.log(customers)
                                return (
                                    <div key={w.id} className={styles.workItem} onClick={() => onWorkClick(w)}>
                                        <span>{operator ? operator.surname : 'N/D'}</span>
                                        <span> - {customer ? customer.name : 'N/D'}</span>
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
