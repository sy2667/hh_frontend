import React, { useEffect } from 'react'
import CustomInput from '@components/CustomInput.tsx'
import CustomRadio from '@components/CustomRadio.tsx'
import CustomButton from '@components/CustomButton'
import { defaultValues, type TransactionForm } from '@app-types/transactionType'
import { useForm } from 'react-hook-form'

type ModalMode = 'init' | 'update'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  isMode: ModalMode
}

export default function Modal({ isOpen, onClose, isMode }: ModalProps) {
  const mode = isMode === 'init' ? '입력' : '수정'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionForm>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const onSubmit = async (data: TransactionForm) => {
    console.log(data)
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

                {/*<CustomRadio
                  label={''}
                  name={'transaction_type'}
                  value={'1'}
                  options={[
                    { value: '1', label: '수입' },
                    { value: '2', label: '지출' },
                  ]}
                />*/}
                <CustomInput
                  label="금액"
                  type="text"
                  inputMode="numeric"
                  placeholder="ex) 5000, 40000"
                  {...register('amount', {
                    required: '금액을 입력해주세요.',
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '')
                    },
                  })}
                  error={errors.amount?.message}
                />
              </div>
            )}
            <CustomButton buttonType="init" htmlType="submit" />
          </form>
        </div>
      </div>
    </div>
  )
}
