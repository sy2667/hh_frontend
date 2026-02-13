import React from 'react'
import { Box, Text, TextInput } from '@mantine/core'
import styles from '@css/CustomInput.module.css'

type CustomInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof TextInput>,
  'label' | 'error'
> & {
  label?: React.ReactNode
  error?: React.ReactNode
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, disabled, ...props }, ref) => {
    return (
      <Box className={styles.wrapper}>
        {label && (
          <Text size="sm" fw={500} className={styles.label}>
            {label}
          </Text>
        )}

        <Box className={styles.content}>
          <TextInput ref={ref} disabled={disabled} error={error} {...props} />
        </Box>
      </Box>
    )
  },
)

CustomInput.displayName = 'CustomInput'
export default CustomInput
