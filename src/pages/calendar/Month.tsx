import { useState, useCallback, useEffect, useMemo } from 'react'
import { Stack, Box, Text, Group, Paper } from '@mantine/core'
import YearCalendar from '@components/YearCalendar'
import {
  getMonthTransaction,
  getMonthCategoryPie,
} from '@api/transaction/transaction.ts'
import type { MonthTransactionRes } from '@/types/transactionType.ts'

import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
} from 'chart.js'
import TotalHeader from '@components/TotalHeader.tsx'
import CalendarModeSelect from '@components/CalendarMondeSelect.tsx'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieItem = {
  name: string
  value: number
}

const Month = () => {
  const [year, setYear] = useState(() => new Date().getFullYear())
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(
    null,
  )

  const [data, setData] = useState<MonthTransactionRes | null>(null)
  const [pieData, setPieData] = useState<PieItem[]>([])
  const [totalBalance, setTotalBalance] = useState<number>(0)

  const callData = useCallback(async (targetYear: number) => {
    try {
      const res: MonthTransactionRes = await getMonthTransaction(
        String(targetYear),
      )
      setData(res)
      setTotalBalance(res.totalBalance)

      // 🔥 데이터 로드 후 1월 자동 선택
      setSelectedMonthIndex(0)
      void callPie(targetYear, 1)
    } catch (e) {
      console.error('월별 조회 에러', e)
      setData(null)
      setPieData([])
    }
  }, [])

  const callPie = useCallback(async (targetYear: number, month: number) => {
    try {
      const res = await getMonthCategoryPie(String(targetYear), month)
      setPieData(
        res.categories.map((c) => ({
          name: c.categoryName,
          value: c.amount,
        })),
      )
    } catch (e) {
      console.error('파이 조회 에러', e)
      setPieData([])
    }
  }, [])

  useEffect(() => {
    void callData(year)
  }, [year, callData])

  const handleSelectMonth = (y: number, monthIndex: number) => {
    setSelectedMonthIndex(monthIndex)
    void callPie(y, monthIndex + 1)
  }

  const backgroundColors = useMemo(() => {
    const rand = () => `hsl(${Math.floor(Math.random() * 360)}, 70%, 55%)`
    return pieData.map(() => rand())
  }, [pieData])

  const chartData = useMemo(() => {
    return {
      labels: pieData.map((d) => d.name),
      datasets: [
        {
          data: pieData.map((d) => d.value),
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    }
  }, [pieData, backgroundColors])

  const chartOptions = useMemo<ChartOptions<'pie'>>(() => {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'center',
        },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<'pie'>) => {
              const v = Number(ctx.parsed)
              return `${ctx.label}: ${v.toLocaleString('ko-KR')}원`
            },
          },
        },
      },
    }
  }, [])

  return (
    <Stack gap="md">
      <Box w="100%" maw={980} mx="auto">
        <Group justify="space-between" align="center" mt="md" mb="sm">
          <TotalHeader type="year" total={totalBalance} />
          <CalendarModeSelect value="month" />
        </Group>

        <YearCalendar
          year={year}
          onChangeYear={(nextYear) => setYear(nextYear)}
          selectedMonthIndex={selectedMonthIndex}
          onSelectMonth={handleSelectMonth}
          data={data?.months ?? []}
        />

        <Paper withBorder radius="md" p="md" mt="md">
          <Text fw={700} mb="xs">
            월별 지출 카테고리
          </Text>

          {selectedMonthIndex === null ? (
            <Text size="sm" c="dimmed">
              월을 선택하면 카테고리별 지출 파이를 보여줄게.
            </Text>
          ) : pieData.length === 0 ? (
            <Text size="sm" c="dimmed">
              {year}년 {selectedMonthIndex + 1}월 지출 데이터가 없습니다.
            </Text>
          ) : (
            <Box
              mt="md"
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box w="100%" maw={500}>
                <Pie data={chartData} options={chartOptions} />
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Stack>
  )
}

export default Month
