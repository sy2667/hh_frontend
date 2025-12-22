// src/pages/calendar/Day.tsx
import { useState, useEffect } from 'react'
import Calendar from '@components/Calendar'
import CustomButton from '@components/CustomButton'
import { searchTransactionToMonth } from '@api/transaction/transaction'
import type { TransactionListRes } from '@/types/transactionType.ts'

const Day = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const pad2 = (n: number) => String(n).padStart(2, '0')
  const toYmd = (d: Date) =>
    `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

  const getMonthRangeFromMonth = (m: Date) => {
    const y = m.getFullYear()
    const mIdx = m.getMonth()
    const start = new Date(y, mIdx, 1)
    const end = new Date(y, mIdx + 1, 0)
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
        console.log(res)
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
            buttonType="delete"
            onClick={() => console.log('clicked')}
          />
          <CustomButton
            buttonType="init"
            onClick={() => console.log('clicked')}
          />
        </div>
        <div className="flex flex-col">1</div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          나중에 여기다가 이 날짜의 수입/지출, 거래 리스트를 보여줄 거예요.
        </p>
      </div>
    </div>
  )
}

export default Day
