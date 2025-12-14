import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from 'date-fns'

export function getMonthCalendar(date: Date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 }) // 일요일 시작
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 })

  const days = []
  let current = start

  while (current <= end) {
    days.push(current)
    current = addDays(current, 1)
  }

  return days
}
