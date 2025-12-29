import React, { useEffect, useState } from 'react'
import CustomInput from '@components/CustomInput'
import { CustomRadioGroup } from '@components/CustomRadio'
import { CustomSelect } from '@components/CustomSelect'
import CustomButton from '@components/CustomButton'
import { defaultValues, type TransactionForm } from '@app-types/transactionType'
import { useForm } from 'react-hook-form'
import { getCategory } from '@api/category/category'
import { createTransaction } from '@api/transaction/transaction'
import type { CategoryReq } from '@/types/CategoryType.ts'

type ModalMode = 'init' | 'update'
type ModalProps = {
  date: string
  isOpen: boolean
  onClose: () => void
  isMode: ModalMode
  onSuccess: () => void
}

export default function Modal({
  date,
  isOpen,
  onClose,
  isMode,
  onSuccess,
}: ModalProps) {
  const mode = isMode === 'init' ? '입력' : '수정'
  const [selectType, setSelectType] = useState<string>('1')
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([])

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionForm>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
  })

  const amountReg = register('amount', {
    required: '금액을 입력해주세요.',
    min: {
      value: 0,
      message: '0원 이상 입력해주세요.',
    },
    setValueAs: (value: string) => {
      if (value == null) return 0
      const str = String(value)
      const cleaned = str.replaceAll(',', '')
      return cleaned === '' ? 0 : Number(cleaned)
    },
  })

  useEffect(() => {
    if (!isOpen) return

    const run = async () => {
      try {
        const data = await getCategory(selectType)

        const opts = data.map((c: CategoryReq) => ({
          value: String(c.categoryPk),
          label: c.categoryName,
        }))
        setCategoryOptions(opts)
      } catch (e) {
        console.error(e)
      }
    }

    void run()
  }, [isOpen, selectType])

  useEffect(() => {
    if (!isOpen) return
    reset(defaultValues)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, reset])

  if (!isOpen) {
    return null
  }

  const digits = (str: string) => {
    return str.replace(/[^\d]/g, '')
  }

  const stripLeadingZeros = (str: string) => {
    return str.replace(/^0+(?=\d)/, '')
  }
  const formatComma = (str: string): string => {
    if (str === '') return ''
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const onSubmit = async (form: TransactionForm) => {
    try {
      form.transactionDate = date
      console.log(form)
      await createTransaction(form)

      reset(defaultValues)
      onSuccess()
      onClose()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      date
      <button className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">수입/지출 {mode}</h2>
            <button onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isMode === 'init' && (
              <div className="text-sm text-gray-500">
                <CustomInput
                  label="내용"
                  type="text"
                  placeholder="ex) 카페, 외식"
                  {...register('description', {
                    required: '내용을 입력해주세요',
                  })}
                  error={errors.description?.message}
                />

                <CustomRadioGroup<TransactionForm>
                  label="구분"
                  name="transactionType"
                  control={control}
                  options={[
                    { value: '1', label: '수입' },
                    { value: '2', label: '지출' },
                  ]}
                  rules={{ required: '구분을 선택해주세요.' }}
                  onChange={(val) => {
                    setSelectType(val)
                  }}
                />

                <CustomSelect<TransactionForm>
                  name="categoryPk"
                  control={control}
                  label="카테고리"
                  placeholder="선택하세요"
                  options={categoryOptions}
                  rules={{ required: '카테고리를 선택해주세요.' }}
                />

                <CustomInput
                  label="금액"
                  type="text"
                  inputMode="numeric"
                  placeholder="ex) 5000, 40000"
                  {...amountReg}
                  onChange={(e) => {
                    let digit = digits(e.target.value)
                    digit = stripLeadingZeros(digit)

                    e.target.value = digit === '' ? '' : formatComma(digit)
                    void amountReg.onChange({
                      ...e,
                      target: {
                        ...e.target,
                        value: digit,
                      },
                    })
                  }}
                  error={errors.amount?.message}
                />
              </div>
            )}
            <div className="flex justify-end mt-4">
              <CustomButton buttonType="init" htmlType="submit" />
              <CustomButton
                buttonType="delete"
                htmlType="button"
                onClick={onClose}
              >
                취소
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
