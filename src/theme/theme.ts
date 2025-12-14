// src/constants/theme.ts

// 'system' 제거
export type ThemeMode = 'light' | 'dark' | 'blue' | 'green'

// 테마 옵션 (UI용)
export const themeOptions: { value: ThemeMode; label: string; icon: string }[] =
  [
    { value: 'light', label: '라이트', icon: '☀️' },
    { value: 'dark', label: '다크', icon: '🌙' },
    { value: 'blue', label: '블루', icon: '💙' },
    { value: 'green', label: '그린', icon: '💚' },
  ]

// 더 이상 system 따질 게 없으니 그냥 자기 자신 리턴
export const resolveTheme = (theme: ThemeMode): ThemeMode => theme
