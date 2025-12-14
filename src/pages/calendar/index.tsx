// src/pages/calendar/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Day from './Day'
import Month from './Month'

const CalendarPages = () => {
  return (
    <Routes>
      {/* /calendar → /calendar/day 로 리다이렉트 */}
      <Route index element={<Navigate to="day" replace />} />

      {/* /calendar/day */}
      <Route path="day" element={<Day />} />

      {/* /calendar/month */}
      <Route path="month" element={<Month />} />

      {/* 그 외 /calendar/... → /calendar/day */}
      <Route path="*" element={<Navigate to="day" replace />} />
    </Routes>
  )
}

export default CalendarPages
