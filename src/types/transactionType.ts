export interface TransactionForm {
  categoryPk: number
  transactionType: string
  amount: number
  description: string
}
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

export interface monthTrType {
  income: number
  expense: number
}

export const defaultValues: TransactionForm = {
  categoryPk: 1,
  transactionType: '1',
  amount: 0,
  description: '',
}
