import React from 'react'
import { Card, Group, Text, Box } from '@mantine/core'

type TotalHeaderProps = {
  type: string
  total: number
}

const TotalHeader: React.FC<TotalHeaderProps> = ({ type, total }) => {
  const color = total > 0 ? 'blue' : total < 0 ? 'red' : 'dimmed'

  const sign = total > 0 ? '+' : ''

  return (
    <Box w="35%" maw={980} mb={'md'}>
      <Card radius="lg" withBorder p="sm" bg="gray.0">
        <Group justify="space-between" align="center">
          <Text fw={700} size="sm">
            {type === 'month' ? '이번달' : '이번년도'} 총 금액
          </Text>

          <Text fw={800} size="lg" c={color}>
            {sign}
            {total.toLocaleString('ko-KR')}원
          </Text>
        </Group>
      </Card>
    </Box>
  )
}

export default TotalHeader
