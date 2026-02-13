import React from 'react'
import { Box, Text, Select } from '@mantine/core'
import styles from '@css/CustomSelect.module.css'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

type CustomSelectProps = Omit<
  React.ComponentPropsWithoutRef<typeof Select>,
  'data' | 'value' | 'onChange' | 'label' | 'error'
> & {
  label?: React.ReactNode
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  error?: React.ReactNode
}

export const CustomSelect = React.forwardRef<
  HTMLInputElement,
  CustomSelectProps
>(({ label, options, value, onChange, error, disabled, ...props }, ref) => {
  return (
    <Box className={styles.wrapper}>
      {label && (
        <Text size="sm" fw={500} className={styles.label}>
          {label}
        </Text>
      )}

      <Box className={styles.content}>
        <Select
          ref={ref}
          data={options}
          value={value || null}
          onChange={(val) => onChange(val ?? '')}
          disabled={disabled}
          error={error}
          {...props}
        />
      </Box>
    </Box>
  )
})

CustomSelect.displayName = 'CustomSelect'
