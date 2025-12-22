export interface TransactionRes {
  transactionPk: number
  categoryPk: number
  categoryName: string
  transactionType: string
  amount: number
  description: string
  transactionDate: string
}

export interface TransactionListRes {
  totalIncome: number
  totalExpense: number
  totalBalance: number
  totalCount: number
  transactions: TransactionRes[]
}
