import { useEffect, useState } from 'react'
import Calendar from './Calendar'

export default function App(){

    const [works, setWorks] = useState([])
    const [operators, setOperators] = useState([])
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())

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

    function prevMonth() {
        setMonth(month - 1)
    }

    function nextMonth() {
        setMonth(month + 1)
    }

    return (
        <div>
            <h1>Calendario Lavorazioni</h1>
            <div>
                <button onClick={prevMonth}>{'<'}</button>
                <button onClick={nextMonth}>{'>'}</button>
            </div>
            <Calendar month={month} year={year} works={works} operators={operators} />
        </div>
    )
}