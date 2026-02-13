import React from 'react'
import { Radio, Group } from '@mantine/core'
import styles from '@css/CustomRadioGroup.module.css'

export type RadioOption = {
  value: string
  label: string
}

type CustomRadioGroupProps = {
  label?: React.ReactNode
  value: string
  onChange: (value: string) => void
  options: RadioOption[]
  error?: React.ReactNode
}

export function CustomRadioGroup({
  label,
  value,
  onChange,
  options,
  error,
}: CustomRadioGroupProps) {
  return (
    <div className={styles.wrapper}>
      {label && <div className={styles.label}>{label}</div>}

      <div className={styles.content}>
        <Radio.Group value={value} onChange={onChange}>
          <Group gap="md" wrap="wrap">
            {options.map((opt) => (
              <Radio key={opt.value} value={opt.value} label={opt.label} />
            ))}
          </Group>
        </Radio.Group>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  )
}
