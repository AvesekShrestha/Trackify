interface IIncome {
    _id: string
    amount: number
    source?: string
    category?: string
    type: string
    ylabel: string
    date?: string
}

interface ITransactionRequest {
    source: string
    amount: number
    description?: string
}

export { IIncome, ITransactionRequest }
