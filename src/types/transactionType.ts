export interface TransactionForm {
  categoryPk: string
  transactionType: string
  amount: number
  description: string
  transactionDate: string
}

export interface TransactionModalForm {
  transactionPk: string
  transactionType: string
  amount: string
  description: string
}

export interface TransactionRes {
  transactionPk: string
  categoryPk: string
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
export interface TransactionMonthType {
  month: number
  totalIncome: number
  totalExpense: number
  totalBalance: number
  totalCount: number
}

export interface MonthTransactionRes {
  totalIncome: number
  totalExpense: number
  totalBalance: number
  totalCount: number
  months: TransactionMonthType[]
}

export const defaultValues: TransactionForm = {
  categoryPk: '1',
  transactionType: '1',
  amount: 0,
  description: '',
  transactionDate: '',
}

export interface CategorySlice {
  categoryPk: number
  categoryName: string
  amount: number
}

export interface MonthCategoryPieRes {
  month: number
  totalExpense: number
  categories: CategorySlice[]
}
