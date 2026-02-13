import React, { useMemo } from 'react'
import {
  Box,
  Group,
  Text,
  ActionIcon,
  SimpleGrid,
  Paper,
  UnstyledButton,
  Loader,
  Center,
} from '@mantine/core'
import styles from '@css/Calendar.module.css'
import type { TransactionMonthType } from '@/types/transactionType.ts'

type YearCalendarProps = {
  year: number
  onChangeYear: (nextYear: number) => void
  onSelectMonth: (year: number, monthIndex: number) => void
  selectedMonthIndex: number | null

  data: TransactionMonthType[]
  loading?: boolean
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

// 보기 좋게 천단위 콤마
const formatAmount = (n: number) => n.toLocaleString('ko-KR')

const YearCalendar: React.FC<YearCalendarProps> = ({
  year,
  onChangeYear,
  onSelectMonth,
  selectedMonthIndex,
  data,
  loading = false,
}) => {
  const prevYear = () => onChangeYear(year - 1)
  const nextYear = () => onChangeYear(year + 1)

  // ✅ month(1~12) -> 데이터 빠르게 찾기 위해 map 만들기
  const monthMap = useMemo(() => {
    const map: Record<number, TransactionMonthType> = {}
    data.forEach((m) => {
      map[m.month] = m
    })
    return map
  }, [data])

  return (
    <Box w="100%">
      <Group justify="space-between" align="center" mb={6}>
        <ActionIcon
          variant="default"
          radius="md"
          size={42}
          onClick={prevYear}
          aria-label="prev year"
        >
          ◀
        </ActionIcon>

        <Text fw={700} size="lg">
          {year}년
        </Text>

        <ActionIcon
          variant="default"
          radius="md"
          size={42}
          onClick={nextYear}
          aria-label="next year"
        >
          ▶
        </ActionIcon>
      </Group>

      {loading ? (
        <Center mih={320}>
          <Loader />
        </Center>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing={8}>
          {MONTH_LABELS.map((label, index) => {
            const isSelected = index === selectedMonthIndex

            const month = index + 1
            const monthData = monthMap[month]

            const income = monthData?.totalIncome ?? 0
            const expense = monthData?.totalExpense ?? 0

            return (
              <UnstyledButton
                key={index}
                onClick={() => onSelectMonth(year, index)}
                style={{ width: '100%' }}
              >
                <Paper
                  withBorder
                  radius="md"
                  p="sm"
                  bg={isSelected ? 'blue.0' : 'white'}
                  className={styles.dayCell}
                  style={{
                    width: '100%',
                    minHeight: 96,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    textAlign: 'left',
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
                  <Text fw={700} size="sm">
                    {label}
                  </Text>

                  <Box w="100%" mt={8}>
                    <Group justify="space-between" gap={8} wrap="nowrap">
                      <Text size="xs" c="dimmed">
                        수입
                      </Text>
                      <Text
                        size="xs"
                        c="blue"
                        fw={600}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        +{formatAmount(income)}
                      </Text>
                    </Group>

                    <Group justify="space-between" gap={8} wrap="nowrap">
                      <Text size="xs" c="dimmed">
                        지출
                      </Text>
                      <Text
                        size="xs"
                        c="red"
                        fw={600}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        -{formatAmount(expense)}
                      </Text>
                    </Group>
                  </Box>
                </Paper>
              </UnstyledButton>
            )
          })}
        </SimpleGrid>
      )}
    </Box>
  )
}

export default YearCalendar
