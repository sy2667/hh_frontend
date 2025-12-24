import React from 'react'

type CustomInputProps = {
  label?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, className, disabled, ...rest }, ref) => {
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
      <div className="flex items-start gap-3">
        {label && (
          <label
            htmlFor={rest.name}
            className="w-24 shrink-0 pt-2 text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="flex-1">
          <input
            ref={ref}
            {...rest}
            disabled={disabled}
            className={`
              ${baseInputClass}
              ${error ? errorClass : normalClass}
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              ${className ?? ''}
            `}
          />

          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    )
  },
)

export default CustomInput
