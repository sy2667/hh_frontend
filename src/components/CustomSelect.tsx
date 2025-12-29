import React from 'react'
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { Select } from '@mantine/core'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type CustomSelectProps<T extends FieldValues> = {
  label?: string
  name: Path<T>
  control: Control<T>
  options: SelectOption[]
  placeholder?: string
  rules?: RegisterOptions<T, Path<T>>
  disabled?: boolean
}

export function CustomSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder,
  rules,
  disabled,
}: CustomSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex items-start gap-3 m-2">
          {label && (
            <div className="w-24 shrink-0 pt-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              {label}
            </div>
          )}

          <div className="flex-1">
            <Select
              data={options}
              placeholder={placeholder}
              value={field.value ?? null}
              onChange={field.onChange}
              onBlur={field.onBlur}
              disabled={disabled}
              error={fieldState.error?.message}
            />
          </div>
        </div>
      )}
    />
  )
}
