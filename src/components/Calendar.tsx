import React from 'react'

type CalendarProps = {
  month: Date
  selectedDate: Date | null
  onChangeMonth: (nextMonth: Date) => void
  onSelectDate: (date: Date) => void
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function isValidateDate(a: Date | null, b: Date | null) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function getDateFormat(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return `${year}년 ${month}월`
}

const Calendar: React.FC<CalendarProps> = ({
  month,
  selectedDate,
  onChangeMonth,
  onSelectDate,
}) => {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()

  const firstDay = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = getDaysInMonth(year, monthIndex)
  const cells: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) {
    cells.push(null)
  }

  for (let z = 1; z <= daysInMonth; z++) {
    cells.push(z)
  }

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  const prevMonth = () => {
    const prev = new Date(year, monthIndex - 1, 1)
    onChangeMonth(prev)
  }

  const nextMonth = () => {
    const next = new Date(year, monthIndex + 1, 1)
    onChangeMonth(next)
  }

  const selectDate = (day: number | null) => {
    if (!day) return
    const date = new Date(year, monthIndex, day)
    onSelectDate(date)
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ◀
        </button>
        <div className="font-semibold text-lg">{getDateFormat(month)}</div>
        <button
          type="button"
          onClick={nextMonth}
          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          ▶
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">
        <div>일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div>토</div>
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm">
        {weeks.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            if (day === null) {
              // 빈 칸
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="h-10 flex items-center justify-center"
                />
              )
            }

            const cellDate = new Date(year, monthIndex, day)
            const isSelected = isValidateDate(cellDate, selectedDate)

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                type="button"
                onClick={() => selectDate(day)}
                className={`
                  h-20 w-25 p-1 flex flex-col items-start justify-start 
                  border rounded-lg gap-[0px]
                  transition
                  ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {/* 날짜 */}
                <span className="text-sm font-medium mb-1">{day}</span>
                {/* 금액 (예시는 0원) */}
                <span className="text-[10px] text-blue-500 leading-none break-all max-w-full overflow-hidden">
                  5,000
                </span>
                <span className="text-[10px] text-red-500 leading-none break-all max-w-full overflow-hidden">
                  -10,000
                </span>
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}

export default Calendar
