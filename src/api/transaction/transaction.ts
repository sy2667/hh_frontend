import { api } from '../client'
import type { TransactionListRes } from '@app-types/transactionType'

export const searchTransactionToMonth = async (start: string, end: string) => {
  const res = await api.get<TransactionListRes>('/transactions', {
    params: {
      to: start,
      end: end,
      sortBy: 'date',
      order: 'DESC',
    },
  })

  return res.data
}
