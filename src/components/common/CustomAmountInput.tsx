import React from 'react'
import { Box, Text, NumberInput } from '@mantine/core'
import styles from '@css/CustomAmountInput.module.css'

type CustomAmountInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof NumberInput>,
  'label' | 'error'
> & {
  label?: React.ReactNode
  error?: React.ReactNode
}

const CustomAmountInput = React.forwardRef<
  HTMLInputElement,
  CustomAmountInputProps
>(({ label, error, disabled, ...props }, ref) => {
  return (
    <Box className={styles.wrapper}>
      {label && (
        <Text size="sm" fw={500} className={styles.label}>
          {label}
        </Text>
      )}

      <Box className={styles.content}>
        <NumberInput
          ref={ref}
          disabled={disabled}
          error={error}
          thousandSeparator=","
          allowDecimal={false}
          min={0}
          clampBehavior="strict"
          inputMode="numeric"
          {...props}
        />
      </Box>
    </Box>
  )
})

CustomAmountInput.displayName = 'CustomAmountInput'
export default CustomAmountInput
