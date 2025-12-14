// src/components/common/CommonButton.tsx
import React from 'react'

type CustomInputProps = {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
  placeholder?: string
  disabled: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
}) => {
  const baseInputClass = `
    w-full px-3 py-2 rounded-md border text-sm
    bg-gray-50 dark:bg-gray-700
    outline-none
    focus:ring-2
    transition
  `

  const normalClass = `
    border-gray-300 dark:border-gray-600
    focus:ring-blue-500
    focus:border-blue-500
  `

  const errorClass = `
    border-red-400
    focus:ring-red-500
    focus:border-red-500
  `

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          ${baseInputClass}
          ${error ? errorClass : normalClass}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default CustomInput
