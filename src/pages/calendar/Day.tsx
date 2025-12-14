// src/pages/calendar/Day.tsx
import { useState } from 'react'
import Calendar from '@components/Calendar'
import CustomButton from '@components/CustomButton'

const Day = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  // 2) 선택된 날짜 상태 (초기값: 오늘)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <div className="space-y-4">
      <Calendar
        month={month}
        selectedDate={selectedDate}
        onChangeMonth={(nextMonth) => {
          setMonth(nextMonth)
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
