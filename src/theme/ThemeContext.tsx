// src/theme/ThemeContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import { type ThemeMode, resolveTheme } from './theme'

type ThemeContextValue = {
  theme: ThemeMode // 현재 선택된 테마
  resolvedTheme: ThemeMode // 사실상 theme와 동일
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const THEME_STORAGE_KEY = 'hh-theme'

const THEME_CLASSNAMES = ['light', 'dark', 'theme-blue', 'theme-green'] as const

const applyThemeToDocument = (theme: ThemeMode) => {
  const root = document.documentElement

  THEME_CLASSNAMES.forEach((cls) => root.classList.remove(cls))

  const resolved = resolveTheme(theme) // 그냥 theme 그대로

  if (resolved === 'light') root.classList.add('light')
  if (resolved === 'dark') root.classList.add('dark')
  if (resolved === 'blue') root.classList.add('theme-blue')
  if (resolved === 'green') root.classList.add('theme-green')
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    return saved ?? 'light' // 기본은 라이트
  })

  const resolvedTheme = resolveTheme(theme)

  useEffect(() => {
    applyThemeToDocument(theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (next: ThemeMode) => setThemeState(next)

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
