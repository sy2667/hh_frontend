// src/components/common/CommonButton.tsx
import React from 'react'

type ButtonType = 'init' | 'delete' | 'edit'

interface CustomButtonProp {
  buttonType: ButtonType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children?: React.ReactNode
}

const typeClassMap: Record<ButtonType, string> = {
  init: 'bg-blue-400 hover:bg-blue-600 text-white',
  delete: 'bg-red-400 hover:bg-red-600 text-white',
  edit: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
}

const typeLabelMap: Record<ButtonType, string> = {
  init: '입력',
  delete: '삭제',
  edit: '수정',
}

const CustomButton: React.FC<CustomButtonProp> = ({
  buttonType,
  onClick,
  children,
}) => {
  const colorClass = typeClassMap[buttonType]
  const label = children ?? typeLabelMap[buttonType] // children 없으면 기본 텍스트 사용

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center justify-center m-1
        px-4 py-2 rounded-md text-sm font-medium
        shadow-sm transition
        ${colorClass}
      `}
    >
      {label}
    </button>
  )
}

export default CustomButton
