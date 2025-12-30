import React from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { Radio, Group } from '@mantine/core'

export type RadioOption = {
  value: string
  label: string
}

type CustomRadioGroupProps<T extends FieldValues> = {
  label?: string
  name: Path<T>
  control: Control<T>
  options: RadioOption[]
  rules?: RegisterOptions<T, Path<T>>
  onChange?: (value: string) => void
}

export function CustomRadioGroup<T extends FieldValues>({
  label,
  name,
  control,
  options,
  rules,
  onChange,
}: CustomRadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex items-start gap-3 m-2 min-h-10">
          {label && (
            <div className="w-24 shrink-0 pt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              {label}
            </div>
          )}

          <div className="flex-1 min-h-10 flex items-center">
            <Radio.Group
              value={field.value == null ? '' : String(field.value)}
              onChange={(val) => {
                field.onChange(val)
                onChange?.(val)
              }}
            >
              <Group gap="md" wrap="wrap">
                {options.map((opt) => (
                  <Radio key={opt.value} value={opt.value} label={opt.label} />
                ))}
              </Group>
            </Radio.Group>
          </div>

          {fieldState.error && (
            <p className="mt-1 text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}
