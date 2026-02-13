// src/pages/calendar/Day.tsx
import { useState, useEffect, useCallback } from 'react'
import {
  Stack,
  Card,
  Group,
  Box,
  Text,
  Button,
  SimpleGrid,
  Divider,
  Badge,
  UnstyledButton,
  Select,
} from '@mantine/core'
import Calendar from '@components/Calendar'
import { searchTransactionToMonth } from '@api/transaction/transaction'
import type {
  TransactionListRes,
  monthTrType,
} from '@/types/transactionType.ts'
import Modal from '@components/Modal'
import TotalHeader from '@components/TotalHeader.tsx'
import CalendarModeSelect from '@components/CalendarMondeSelect.tsx'

const Day = () => {
  const [month, setMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [monthMap, setMonthMap] = useState<Record<string, monthTrType>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'init' | 'update'>('init')
  const [fullDate, setFullDate] = useState<string>('')
  const [transactions, setTransactions] = useState<
    TransactionListRes['transactions']
  >([])
  const [selectedTrPk, setSelectedTrPk] = useState<string>('')
  const [totalBalance, setTotalBalance] = useState<number>(0)

  const pad2 = (num: number) => String(num).padStart(2, '0')
  const toYmd = (date: Date) =>
    `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`

  const getMonthRangeFromMonth = (m: Date) => {
    const year = m.getFullYear()
    const mIdx = m.getMonth()
    const start = new Date(year, mIdx, 1)
    const end = new Date(year, mIdx + 1, 0)
    return { start: toYmd(start), end: toYmd(end) }
  }

  useEffect(() => {
    setFullDate(toYmd(selectedDate))
  }, [selectedDate])

  const callData = useCallback(async () => {
    try {
      const { start, end } = getMonthRangeFromMonth(selectedDate)
      const res: TransactionListRes = await searchTransactionToMonth(start, end)

      const map: Record<string, monthTrType> = {}

      res.transactions.forEach((tr) => {
        const trDay = tr.transactionDate.slice(0, 10)
        if (!map[trDay]) {
          map[trDay] = { income: 0, expense: 0 }
        }

        if (tr.transactionType === '1') {
          map[trDay].income += tr.amount
        } else {
          map[trDay].expense += tr.amount
        }
      })

      setMonthMap(map)
      setTransactions(res.transactions)
      setTotalBalance(res.totalBalance)
    } catch (e) {
      console.error('조회 에러', e)
    }
  }, [selectedDate])

  useEffect(() => {
    void callData()
  }, [callData])

  const selectedYmd = toYmd(selectedDate)

  // 하루 Total 금액
  const dayTx = transactions.filter(
    (tr) => tr.transactionDate.slice(0, 10) === selectedYmd,
  )

  const incomeSum = dayTx
    .filter((tr) => tr.transactionType === '1')
    .reduce((acc, tr) => acc + tr.amount, 0)

  const expenseSum = dayTx
    .filter((tr) => tr.transactionType === '2')
    .reduce((acc, tr) => acc + tr.amount, 0)

  const total = incomeSum - expenseSum

  const formatWon = (n: number) => `${n.toLocaleString('ko-KR')}원`

  return (
    <Stack gap="md">
      <Box w="100%" maw={980} mx="auto">
        <Group justify="space-between" align="center" mt="md" mb="sm">
          <TotalHeader type="month" total={totalBalance} />
          <CalendarModeSelect value="day" />
        </Group>
        <Calendar
          month={month}
          selectedDate={selectedDate}
          dayMap={monthMap}
          onChangeMonth={(nextMonth) => {
            setMonth(nextMonth)
            setSelectedDate(nextMonth)
          }}
          onSelectDate={(date) => setSelectedDate(date)}
        />
        <Card mt="md" radius="xl" withBorder shadow="sm" p={0}>
          <Group justify="space-between" align="flex-start" p="md">
            <Box>
              <Text fw={700} size="sm">
                선택한 날짜
              </Text>
              <Text mt={4} fw={700} size="lg">
                {toYmd(selectedDate)}
              </Text>
            </Box>

            <Button
              variant="light"
              radius="md"
              onClick={() => {
                setModalMode('init')
                setIsModalOpen(true)
                setSelectedTrPk('')
              }}
            >
              + 입력
            </Button>
          </Group>

          {/* Summary */}
          <Box px="md" pb="md">
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
              <Card radius="lg" withBorder p="sm" bg="gray.0">
                <Text size="xs" c="dimmed">
                  수입
                </Text>
                <Text mt={6} fw={700}>
                  {formatWon(incomeSum)}
                </Text>
              </Card>

              <Card radius="lg" withBorder p="sm" bg="gray.0">
                <Text size="xs" c="dimmed">
                  지출
                </Text>
                <Text mt={6} fw={700}>
                  {formatWon(expenseSum)}
                </Text>
              </Card>

              <Card radius="lg" withBorder p="sm" bg="gray.0">
                <Text size="xs" c="dimmed">
                  합계
                </Text>
                <Text mt={6} fw={700}>
                  {formatWon(total)}
                </Text>
              </Card>
            </SimpleGrid>
          </Box>

          <Divider />

          {/* List */}
          <Box p="md">
            <Group justify="space-between" mb="sm">
              <Text fw={700} size="sm">
                거래 내역
              </Text>

              {/*<Button variant="subtle" size="xs" c="dimmed">
                정렬
              </Button>*/}
            </Group>

            {dayTx.length === 0 ? (
              <Card
                withBorder
                radius="lg"
                p="xl"
                style={{ borderStyle: 'dashed' }}
              >
                <Text fw={700} ta="center">
                  아직 등록된 내역이 없어요
                </Text>
                <Text size="sm" c="dimmed" ta="center" mt={6}>
                  + 입력을 눌러 수입/지출을 추가해보세요.
                </Text>
              </Card>
            ) : (
              <Stack gap="xs">
                {dayTx.map((tr) => {
                  const isIncome = tr.transactionType === '1'

                  return (
                    <UnstyledButton
                      key={tr.transactionPk}
                      onClick={() => {
                        setSelectedTrPk(String(tr.transactionPk))
                        setModalMode('update')
                        setIsModalOpen(true)
                      }}
                      style={{ width: '100%' }}
                    >
                      <Card withBorder radius="lg" p="sm">
                        <Group justify="space-between" wrap="nowrap">
                          <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
                            <Badge
                              variant="light"
                              color={isIncome ? 'blue' : 'red'}
                              radius="xl"
                            >
                              {isIncome ? '수입' : '지출'}
                            </Badge>

                            <Box style={{ minWidth: 0 }}>
                              <Text fw={600} size="sm" lineClamp={1}>
                                {tr.description}
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={1}>
                                {tr.categoryName ?? '카테고리'}
                              </Text>
                            </Box>
                          </Group>

                          <Text
                            fw={800}
                            size="sm"
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {isIncome ? '+' : '-'}
                            {formatWon(tr.amount)}
                          </Text>
                        </Group>
                      </Card>
                    </UnstyledButton>
                  )
                })}
              </Stack>
            )}
          </Box>
        </Card>

        <Modal
          date={fullDate}
          isOpen={isModalOpen}
          isMode={modalMode}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTrPk('')
          }}
          onSuccess={callData}
          trPk={selectedTrPk}
        />
      </Box>
    </Stack>
  )
}

export default Day
