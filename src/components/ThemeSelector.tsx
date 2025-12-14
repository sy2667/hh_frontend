// src/components/ThemeSelector.tsx
import { themeOptions, type ThemeMode } from '../theme/theme.ts'
import { useTheme } from '../theme/ThemeContext'

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-gray-600 dark:text-gray-300">테마</span>
      <select
        className="
          border rounded-md px-2 py-1 bg-white dark:bg-gray-800
          text-gray-800 dark:text-gray-100
        "
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeMode)}
      >
        {themeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.icon} {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ThemeSelector
