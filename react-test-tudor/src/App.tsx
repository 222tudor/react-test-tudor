import { useEffect, useState } from 'react'
import Calendar from './Calendar'
import WorkDetail from './WorkDetail'

export default function App(){

    const [works, setWorks] = useState([])
    const [operators, setOperators] = useState([])
    const [tickets, setTickets] = useState([])
    const [customers, setCustomers] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [filterOperatorId, setFilterOperatorId] = useState('')
    const [filterCustomerId, setFilterCustomerId] = useState('')
    const [selectedWork, setSelectedWork] = useState<any>(null)

    useEffect(() => {
        fetch('http://localhost:12345/works')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWorks(data)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:12345/operators')
            .then(res => res.json())
            .then(data => setOperators(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:12345/tickets')
            .then(res => res.json())
            .then(data => setTickets(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:12345/customers')
            .then(res => res.json())
            .then(data => setCustomers(data))
    }, [])

    function prevMonth() {
        if (month === 0) {
            setMonth(11)
            setYear(year - 1)
        } else {
            setMonth(month - 1)
        }
    }

    function nextMonth() {
        if (month === 11) {
            setMonth(0)
            setYear(year + 1)
        } else {
            setMonth(month + 1)
        }
    }

    return (
        <div>
            <h1>Calendario Lavorazioni</h1>
            <div>
                <button onClick={prevMonth}>{'<'}</button>
                <button onClick={nextMonth}>{'>'}</button>
            </div>
            <div>
                <label>Operatore: </label>
                <select value={filterOperatorId} onChange={e => {
                    console.log("filter", e.target.value)
                    setFilterOperatorId(e.target.value)
                }}>
                    <option value="">Tutti</option>
                    {operators.map((o: any) => (
                        <option key={o.id} value={o.id}>{o.name} {o.surname}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Cliente: </label>
                <select value={filterCustomerId} onChange={e => setFilterCustomerId(e.target.value)}>
                    <option value="">Tutti</option>
                    {customers.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>
            <Calendar month={month} year={year} works={works} operators={operators} tickets={tickets} customers={customers} filterOperatorId={filterOperatorId} filterCustomerId={filterCustomerId} onWorkClick={(w) => {
                console.log('lavorazione selezionata', w)
                setSelectedWork(w)
            }} />
            <WorkDetail work={selectedWork} onClose={() => setSelectedWork(null)} operators={operators} tickets={tickets} customers={customers} />
        </div>
    )
}