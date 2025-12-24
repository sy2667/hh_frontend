// src/pages/calendar/Day.tsx
import { useState, useEffect } from 'react'
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
    const callData = async () => {
      try {
        const { start, end } = getMonthRangeFromMonth(selectedDate)
        const res: TransactionListRes = await searchTransactionToMonth(
          start,
          end,
        )

        const map: Record<string, monthTrType> = {}

        res.transactions.forEach((tr) => {
          const trDay = tr.transactionDate.slice(0, 10)
          if (!map[trDay]) {
            map[trDay] = {
              income: 0,
              expense: 0,
            }
          }

          if (tr.transactionType === '1') {
            map[trDay].income += tr.amount
          } else {
            map[trDay].expense += tr.amount
          }
        })

        setMonthMap(map)
      } catch (e) {
        console.error('조회 에러', e)
      }
    }

    callData()
  }, [month])

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
        <div className="font-semibold mb-2">
          선택된 날짜:{' '}
          {selectedDate
            ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
            : '없음'}
        </div>
        <div className="flex flex-row-reverse">
          <CustomButton
            buttonType="init"
            onClick={() => {
              setModalMode('init')
              setIsModalOpen(true)
            }}
          />
        </div>
        <div className="flex flex-col">1</div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          나중에 여기다가 이 날짜의 수입/지출, 거래 리스트를 보여줄 거예요.
        </p>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={'수입/지출'}
        isMode={modalMode}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default Day
