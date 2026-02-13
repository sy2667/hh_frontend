import React from 'react'
import { Select } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export type CalendarMode = 'day' | 'month'

type CalendarModeSelectProps = {
  value: CalendarMode
  w?: number
}

const CalendarModeSelect: React.FC<CalendarModeSelectProps> = ({
  value,
  w = 140,
}) => {
  const navigate = useNavigate()
  return (
    <Select
      w={w}
      data={[
        { value: 'day', label: '일별' },
        { value: 'month', label: '월별' },
      ]}
      value={value}
      allowDeselect={false}
      onChange={(mode) => {
        if (mode === 'day' || mode === 'month') {
          navigate(`/calendar/${mode}`)
        }
      }}
    />
  )
}

export default CalendarModeSelect
