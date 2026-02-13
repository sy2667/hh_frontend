import React from 'react'
import type { monthTrType } from '@/types/transactionType.ts'
import {
  Box,
  Group,
  Text,
  ActionIcon,
  SimpleGrid,
  Paper,
  UnstyledButton,
} from '@mantine/core'
import styles from '@css/Calendar.module.css'

type CalendarProps = {
  month: Date
  selectedDate: Date | null
  onChangeMonth: (nextMonth: Date) => void
  onSelectDate: (date: Date) => void
  dayMap: Record<string, monthTrType>
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
  dayMap,
}) => {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()

  const firstDay = new Date(year, monthIndex, 1).getDay()
  const daysInMonth = getDaysInMonth(year, monthIndex)
  const cells: (number | null)[] = []

  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let z = 1; z <= daysInMonth; z++) cells.push(z)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))

  const prevMonth = () => onChangeMonth(new Date(year, monthIndex - 1, 1))
  const nextMonth = () => onChangeMonth(new Date(year, monthIndex + 1, 1))

  const selectDate = (day: number | null) => {
    if (!day) return
    onSelectDate(new Date(year, monthIndex, day))
  }

  return (
    <Box w="100%">
      {/* 상단 헤더 (980px 가운데 정렬) */}
      <Group justify="space-between" align="center" maw={980} mx="auto" mb={6}>
        <ActionIcon
          variant="default"
          radius="md"
          size={42}
          onClick={prevMonth}
          aria-label="prev month"
        >
          ◀
        </ActionIcon>

        <Text fw={700} size="lg">
          {getDateFormat(month)}
        </Text>

        <ActionIcon
          variant="default"
          radius="md"
          size={42}
          onClick={nextMonth}
          aria-label="next month"
        >
          ▶
        </ActionIcon>
      </Group>

      {/* 요일 헤더 */}
      <SimpleGrid cols={7} spacing={8} maw={980} mx="auto" mb={6}>
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <Text key={d} ta="center" size="xs" fw={600} c="dimmed">
            {d}
          </Text>
        ))}
      </SimpleGrid>

      {/* 날짜 그리드 */}
      <SimpleGrid cols={7} spacing={8} maw={980} mx="auto">
        {weeks.flatMap((week, weekIndex) =>
          week.map((day, dayIndex) => {
            if (day === null) {
              return (
                <Box
                  key={`${weekIndex}-${dayIndex}`}
                  style={{ aspectRatio: '1 / 1' }}
                />
              )
            }

            const cellDate = new Date(year, monthIndex, day)
            const isSelected = isValidateDate(cellDate, selectedDate)

            const mm = String(monthIndex + 1).padStart(2, '0')
            const dd = String(day).padStart(2, '0')
            const dayKey = `${year}-${mm}-${dd}`
            const summary = dayMap[dayKey]
            const hasValue =
              !!summary && (summary.income > 0 || summary.expense > 0)

            return (
              <UnstyledButton
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => selectDate(day)}
                styles={{
                  root: {
                    width: '100%',
                    borderRadius: 12,
                    transition: 'transform 120ms ease',
                  },
                }}
              >
                <Paper
                  withBorder
                  radius="md"
                  p={6}
                  bg={isSelected ? 'blue.0' : 'white'}
                  className={styles.dayCell}
                  style={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 2,
                    textAlign: 'left',
                    overflow: 'hidden',
                    borderColor: isSelected
                      ? 'var(--mantine-color-blue-4)'
                      : undefined,
                    transition:
                      'transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease, border-color 120ms ease',
                    boxShadow: isSelected
                      ? '0 6px 16px rgba(0,0,0,0.08)'
                      : '0 1px 2px rgba(0,0,0,0.04)',
                  }}
                >
                  <Text fw={700} size="sm" lh={1} mb={{ base: 0, sm: 4 }}>
                    {day}
                  </Text>

                  {hasValue && summary && (
                    <Box visibleFrom="sm" w="100%" mt="auto">
                      <Group justify="space-between" gap={6} wrap="nowrap">
                        <Text size="xs" c="dimmed">
                          수입
                        </Text>
                        <Text
                          size="xs"
                          c="blue"
                          fw={600}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {summary.income.toLocaleString()}
                        </Text>
                      </Group>

                      <Group justify="space-between" gap={6} wrap="nowrap">
                        <Text size="xs" c="dimmed">
                          지출
                        </Text>
                        <Text
                          size="xs"
                          c="red"
                          fw={600}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {summary.expense.toLocaleString()}
                        </Text>
                      </Group>
                    </Box>
                  )}

                  <Box hiddenFrom="sm" w="100%" mt={4}>
                    {summary && summary.income > 0 && (
                      <Box
                        h={4}
                        mb={2}
                        style={{
                          borderRadius: 4,
                          backgroundColor: 'var(--mantine-color-blue-5)',
                        }}
                      />
                    )}

                    {summary && summary.expense > 0 && (
                      <Box
                        h={4}
                        style={{
                          borderRadius: 4,
                          backgroundColor: 'var(--mantine-color-red-5)',
                        }}
                      />
                    )}
                  </Box>
                </Paper>
              </UnstyledButton>
            )
          }),
        )}
      </SimpleGrid>
    </Box>
  )
}

export default Calendar
