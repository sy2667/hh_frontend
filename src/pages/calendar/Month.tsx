// src/pages/calendar/Month.tsx
import { useState } from 'react'
import YearCalendar from '@components/YearCalendar'

const Month = () => {
  // 현재 보고 있는 연도
  const [year, setYear] = useState(() => {
    const today = new Date()
    return today.getFullYear()
  })

  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(
    null,
  )

  const handleSelectMonth = (y: number, monthIndex: number) => {
    setSelectedMonthIndex(monthIndex)
    console.log(`${y}년 ${monthIndex + 1}월 클릭`)
  }

  return (
    <div className="space-y-4">
      <YearCalendar
        year={year}
        onChangeYear={(nextYear) => setYear(nextYear)}
        selectedMonthIndex={selectedMonthIndex}
        onSelectMonth={handleSelectMonth}
      />

      {/* 선택된 월 텍스트 (선택사항) */}
      <div className="mt-4">
        <div className="font-semibold mb-2">선택된 월</div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {selectedMonthIndex !== null
            ? `${year}년 ${selectedMonthIndex + 1}월`
            : '아직 선택되지 않았습니다.'}
        </p>
      </div>
    </div>
  )
}

export default Month
