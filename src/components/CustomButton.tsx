import React from 'react'
import { Button } from '@mantine/core'

type ButtonType = 'init' | 'delete' | 'edit' | 'modify'
type HtmlButtonType = 'button' | 'submit' | 'reset'

interface CustomButtonProp {
  buttonType: ButtonType
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  htmlType?: HtmlButtonType
  children?: React.ReactNode
}

const typeColorMap: Record<ButtonType, string> = {
  init: 'blue',
  delete: 'red',
  edit: 'yellow',
  modify: 'gray',
}

const typeVariantMap: Record<ButtonType, 'filled' | 'light'> = {
  init: 'filled',
  delete: 'filled',
  edit: 'light',
  modify: 'light',
}

const typeLabelMap: Record<ButtonType, string> = {
  init: '입력',
  delete: '삭제',
  edit: '수정',
  modify: '취소',
}

const CustomButton: React.FC<CustomButtonProp> = ({
  buttonType,
  onClick,
  htmlType = 'button',
  children,
}) => {
  const label = children ?? typeLabelMap[buttonType]

  return (
    <Button
      type={htmlType}
      onClick={onClick}
      color={typeColorMap[buttonType]}
      variant={typeVariantMap[buttonType]}
      radius="md"
      size="sm"
      style={{ margin: 4 }}
    >
      {label}
    </Button>
  )
}

export default CustomButton
