import React, { useEffect, useState } from 'react'
import CustomInput from '@components/common/CustomInput'
import CustomAmountInput from '@components/common/CustomAmountInput'
import { CustomRadioGroup } from '@components/common/CustomRadioGroup'
import { CustomSelect } from '@components/common/CustomSelect'
import CustomButton from '@components/CustomButton'
import {
  defaultValues,
  type TransactionForm,
  type TransactionRes,
} from '@app-types/transactionType'
import { useForm } from '@mantine/form'

// API
import { getCategory } from '@api/category/category'
import {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} from '@api/transaction/transaction'
import type { CategoryReq } from '@/types/CategoryType.ts'

type ModalMode = 'init' | 'update'
type ModalProps = {
  date: string
  isOpen: boolean
  onClose: () => void
  isMode: ModalMode
  onSuccess: () => void
  trPk?: string
}

export default function Modal({
  date,
  isOpen,
  onClose,
  isMode,
  onSuccess,
  trPk,
}: ModalProps) {
  const mode = isMode === 'init' ? '입력' : '수정'
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([])
  const [loadingUpdate, setLoadingUpdate] = useState(false)

  const form = useForm<TransactionForm>({
    initialValues: defaultValues,
    validate: {
      description: (v) => (v?.trim() ? null : '내용을 입력해주세요'),
      transactionType: (v) => (v ? null : '구분을 선택해주세요'),
      categoryPk: (v) => (v ? null : '카테고리를 선택해주세요'),
      amount: (v) =>
        v != null && Number(v) >= 0 ? null : '0원 이상 입력해주세요',
    },
  })

  const transactionType = form.values.transactionType

  useEffect(() => {
    if (!isOpen) return

    const init = async () => {
      if (isMode === 'init') {
        setLoadingUpdate(false)
        form.setValues({
          ...defaultValues,
          transactionDate: date,
          transactionType: '1',
          categoryPk: '',
        })
        return
      }

      if (!trPk) return
      setLoadingUpdate(true)

      const tr: TransactionRes = await getTransaction(trPk)

      form.setValues({
        categoryPk: String(tr.categoryPk),
        transactionType: String(tr.transactionType),
        amount: tr.amount,
        description: tr.description ?? '',
        transactionDate: tr.transactionDate?.slice(0, 10) ?? date,
      })

      setLoadingUpdate(false)
    }

    void init()
  }, [isOpen, isMode, trPk, date])

  useEffect(() => {
    if (!isOpen) return
    if (!transactionType) return
    if (isMode === 'update' && loadingUpdate) return

    const run = async () => {
      const category = await getCategory(transactionType)
      const opts = category.map((c: CategoryReq) => ({
        value: String(c.categoryPk),
        label: c.categoryName,
      }))
      setCategoryOptions(opts)

      if (isMode === 'init' && !form.values.categoryPk) {
        form.setFieldValue('categoryPk', opts[0]?.value ?? '')
      }
    }

    void run()
  }, [isOpen, transactionType, isMode, loadingUpdate])

  if (!isOpen) return null

  const onSubmit = async (values: TransactionForm) => {
    const payload = { ...values, transactionDate: date }

    if (isMode === 'init') {
      await createTransaction(payload)
    } else {
      if (!trPk) return
      await updateTransaction(trPk, payload)
    }

    form.setValues(defaultValues)
    onSuccess()
    onClose()
  }

  const onDelete = async () => {
    if (!trPk) return
    await deleteTransaction(trPk)
    form.setValues(defaultValues)
    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">수입/지출 {mode}</h2>
            <button onClick={onClose}>✕</button>
          </div>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <div className="text-sm text-gray-500">
              <CustomInput
                label="내용"
                placeholder="ex) 카페, 외식"
                {...form.getInputProps('description')}
              />

              <CustomRadioGroup
                label="구분"
                value={form.values.transactionType}
                onChange={(val) => {
                  form.setFieldValue('transactionType', val)
                  form.setFieldValue('categoryPk', '')
                }}
                options={[
                  { value: '1', label: '수입' },
                  { value: '2', label: '지출' },
                ]}
                error={form.errors.transactionType}
              />

              <CustomSelect
                label="카테고리"
                placeholder="선택하세요"
                options={categoryOptions}
                value={form.values.categoryPk}
                onChange={(val) => form.setFieldValue('categoryPk', val)}
                error={form.errors.categoryPk}
              />

              <CustomAmountInput
                label="금액"
                placeholder="ex) 5000"
                value={form.values.amount}
                onChange={(val) =>
                  form.setFieldValue('amount', Number(val ?? 0))
                }
                error={form.errors.amount}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                {isMode === 'update' && (
                  <CustomButton
                    buttonType="delete"
                    htmlType="button"
                    onClick={onDelete}
                  >
                    삭제
                  </CustomButton>
                )}
              </div>
              <div className="flex gap-2">
                <CustomButton
                  buttonType="modify"
                  htmlType="button"
                  onClick={onClose}
                >
                  취소
                </CustomButton>
                <CustomButton buttonType="init" htmlType="submit" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
