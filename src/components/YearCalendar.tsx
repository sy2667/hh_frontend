// src/components/YearCalendar.tsx
import React from 'react'

type YearCalendarProps = {
  year: number
  onChangeYear: (nextYear: number) => void
  onSelectMonth: (year: number, monthIndex: number) => void // monthIndex: 0~11
  selectedMonthIndex: number | null
}

const MONTH_LABELS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

const YearCalendar: React.FC<YearCalendarProps> = ({
  year,
  onChangeYear,
  onSelectMonth,
  selectedMonthIndex,
}) => {
  const prevYear = () => {
    onChangeYear(year - 1)
  }

  const nextYear = () => {
    onChangeYear(year + 1)
  }

  return (
    <div className="w-full">
      {/* 상단: 연도 이동 */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevYear}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ◀
        </button>
        <div className="font-semibold text-lg">{year}년</div>
        <button
          type="button"
          onClick={nextYear}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ▶
        </button>
      </div>

      {/* 1~12월 그리드 */}
      <div className="grid grid-cols-3 gap-4">
        {MONTH_LABELS.map((label, index) => {
          const isSelected = index === selectedMonthIndex

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectMonth(year, index)}
              className={`
                p-3 h-24 w-full text-left border rounded-lg shadow-sm
                flex flex-col justify-between transition
                ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <span className="text-base font-semibold">{label}</span>

              {/* 나중에 금액 부분 */}
              <div className="mt-1 text-[11px] leading-tight text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>수입</span>
                  <span className="text-blue-500">+0</span>
                </div>
                <div className="flex justify-between">
                  <span>지출</span>
                  <span className="text-red-500">-0</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default YearCalendar
