export type Operator = {
    id: number
    name: string
    surname: string
    email: string
}

export type Customer = {
    id: number
    name: string
    email: string
}

export type Ticket = {
    id: number
    description: string
    customerId: number
    priorityId: number
}

export type Work = {
    id: number
    description: string
    operatorId: number
    ticketId: number
    creationDate: number
    endDate: number
}
