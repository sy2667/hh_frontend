import React from 'react'

export type RadioOption = {
  value: string
  label: string
}
type CustomRadioProps = {
  label: string
  name: string
  value: string
  options: RadioOption[]
  direction?: 'row' | 'col' // 라디오 배치
}

const CustomRadioGroup: React.FC<CustomRadioProps> = ({
  label,
  name,
  value,
  options,
  direction = 'row',
}) => {
  const baseItemClass = `
    flex items-center gap-2
    rounded-md border px-3 py-2
    text-sm
    bg-gray-50 dark:bg-gray-700
    transition
  `

  const wrapperClass =
    direction === 'row' ? 'flex flex-wrap gap-2' : 'flex flex-col gap-2'

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <div className={wrapperClass} role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const isChecked = opt.value === value

          return (
            <label
              key={opt.value}
              className={`
                ${baseItemClass}
                ${isChecked ? 'ring-2 ring-blue-500 border-blue-500' : ''}
              `}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                className="sr-only"
              />

              <span
                aria-hidden="true"
                className={`
                  flex h-4 w-4 items-center justify-center
                  rounded-full border
                  ${isChecked ? 'border-blue-600' : 'border-gray-400 dark:border-gray-300'}
                `}
              >
                <span
                  className={`
                    h-2 w-2 rounded-full
                    ${isChecked ? 'bg-blue-600' : 'bg-transparent'}
                  `}
                />
              </span>

              <span className="text-gray-800 dark:text-gray-100">
                {opt.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default CustomRadioGroup
