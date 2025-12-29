// src/pages/calendar/Day.tsx
import { useState, useEffect, useCallback } from 'react'
import Calendar from '@components/Calendar'
import CustomButton from '@components/CustomButton'
import { searchTransactionToMonth } from '@api/transaction/transaction'
import type {
  TransactionListRes,
  monthTrType,
} from '@/types/transactionType.ts'
import Modal from '@components/Modal'

const Day = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [monthMap, setMonthMap] = useState<Record<string, monthTrType>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'init' | 'update'>('init')
  const [fullDate, setFullDate] = useState<string>('')
  const [transactions, setTransactions] = useState<
    TransactionListRes['transactions']
  >([])

  const pad2 = (num: number) => String(num).padStart(2, '0')
  const toYmd = (date: Date) =>
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`

  const getMonthRangeFromMonth = (m: Date) => {
    const year = m.getFullYear()
    const mIdx = m.getMonth()
    const start = new Date(year, mIdx, 1)
    const end = new Date(year, mIdx + 1, 0)
    return { start: toYmd(start), end: toYmd(end) }
  }

  useEffect(() => {
    setFullDate(toYmd(selectedDate))
  }, [selectedDate])

  const callData = useCallback(async () => {
    try {
      const { start, end } = getMonthRangeFromMonth(selectedDate)
      const res: TransactionListRes = await searchTransactionToMonth(start, end)

      const map: Record<string, monthTrType> = {}

      res.transactions.forEach((tr) => {
        const trDay = tr.transactionDate.slice(0, 10)
        if (!map[trDay]) {
          map[trDay] = { income: 0, expense: 0 }
        }

        if (tr.transactionType === '1') {
          map[trDay].income += tr.amount
        } else {
          map[trDay].expense += tr.amount
        }
      })

      setMonthMap(map)
      setTransactions(res.transactions)
    } catch (e) {
      console.error('조회 에러', e)
    }
  }, [selectedDate])

  useEffect(() => {
    callData()
  }, [callData])

  const selectedYmd = toYmd(selectedDate)

  const dayTx = transactions.filter(
    (tr) => tr.transactionDate.slice(0, 10) === selectedYmd,
  )

  const incomeSum = dayTx
    .filter((tr) => tr.transactionType === '1')
    .reduce((acc, tr) => acc + tr.amount, 0)

  const expenseSum = dayTx
    .filter((tr) => tr.transactionType === '2')
    .reduce((acc, tr) => acc + tr.amount, 0)

  const total = incomeSum - expenseSum

  const formatWon = (n: number) => `${n.toLocaleString('ko-KR')}원`

  return (
    <div className="space-y-4">
      <Calendar
        month={month}
        selectedDate={selectedDate}
        dayMap={monthMap}
        onChangeMonth={(nextMonth) => {
          setMonth(nextMonth)
          setSelectedDate(nextMonth)
        }}
        onSelectDate={(date) => {
          setSelectedDate(date)
        }}
      />

      {/* 아래는 그냥 선택된 날짜가 뭔지 확인용 UI */}
      <div className="mt-4">
        {/* 일별 상세 영역 */}
        <section className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* 헤더 */}
          <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
            <div>
              <div className="text-sm text-gray-500">선택한 날짜</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {toYmd(selectedDate)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-gray-200 hover:bg-gray-100"
                onClick={() => {
                  setModalMode('init')
                  setIsModalOpen(true)
                }}
              >
                + 입력
              </button>
            </div>
          </div>

          {/* 요약 */}
          <div className="grid grid-cols-3 gap-2 px-4 pb-4 sm:px-5">
            <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-200">
              <div className="text-xs text-gray-500">수입</div>
              <div className="mt-1 text-base font-semibold text-gray-900">
                {formatWon(incomeSum)}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-200">
              <div className="text-xs text-gray-500">지출</div>
              <div className="mt-1 text-base font-semibold text-gray-900">
                {formatWon(expenseSum)}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-200">
              <div className="text-xs text-gray-500">합계</div>
              <div className="mt-1 text-base font-semibold text-gray-900">
                {formatWon(total)}
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="h-px bg-gray-200" />

          {/* 리스트 */}
          <div className="p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">거래 내역</h3>
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                정렬
              </button>
            </div>

            {dayTx.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
                <div className="text-sm font-medium text-gray-900">
                  아직 등록된 내역이 없어요
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  + 입력을 눌러 수입/지출을 추가해보세요.
                </div>
              </div>
            ) : (
              <ul className="space-y-2">
                {dayTx.map((tr) => {
                  const isIncome = tr.transactionType === '1'
                  const typeColorClass = isIncome
                    ? 'text-blue-500'
                    : 'text-red-500'

                  return (
                    <li
                      key={tr.transactionPk}
                      className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-gray-200 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold ${typeColorClass}`}
                        >
                          {isIncome ? '수입' : '지출'}
                        </span>

                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {tr.description}
                          </div>
                          <div className="text-xs text-gray-500">
                            {tr.categoryName ?? '카테고리'}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm font-semibold text-gray-900">
                        {isIncome ? '+' : '-'}
                        {formatWon(tr.amount)}
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
      <Modal
        date={fullDate}
        isOpen={isModalOpen}
        isMode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSuccess={callData}
      />
    </div>
  )
}

export default Day
