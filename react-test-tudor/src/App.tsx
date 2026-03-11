import { useEffect, useState } from 'react'
import Calendar from './Calendar'

export default function App(){

    const [works, setWorks] = useState([])

    useEffect(() => {
        fetch('http://localhost:12345/works')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setWorks(data)
            })
    }, [])

    return (
        <div>
            <h1>Calendario Lavorazioni</h1>
            <Calendar month={2} year={2025} works={works} />
        </div>
    )
}