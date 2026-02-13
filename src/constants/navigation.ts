import type { Icon } from '@tabler/icons-react'
import { IconSettings, IconCalendar, IconChartPie } from '@tabler/icons-react'

export type NavItem = {
  path: string
  label: string
  icon?: Icon
  show: boolean
}

export const NAVIGATION_ITEMS: NavItem[] = [
  { path: '/calendar/day', label: '캘린더', icon: IconCalendar, show: true },
  { path: '/calendar/stats', label: '통계', icon: IconChartPie, show: false },
  {
    path: '/user/transactionSetting',
    label: '설정',
    icon: IconSettings,
    show: true,
  },
]

export const APP_TITLE = '💰 가계부 앱'

export const THEME_LABELS = {
  light: '라이트',
  dark: '다크',
  blue: '블루',
  green: '그린',
} as const
