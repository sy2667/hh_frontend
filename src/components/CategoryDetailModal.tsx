import React, { useEffect } from 'react'
import { Radio, Group, Button, Input } from '@mantine/core'
import { type CategoryForm, type CategoryReq } from '@app-types/CategoryType'
import { getCategory, createCategory } from '@api/category/category'
import type { CategoryList } from '@/types/CategoryType'
import { useForm } from '@mantine/form'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  mode: string
  selectType: string
  caPk?: string
}

export default function CategoryDetailModal({
  isOpen,
  onClose,
  onSuccess,
  mode,
  selectType,
  caPk,
}: Props) {
  const form = useForm<CategoryForm>({
    initialValues: {
      categoryPk: caPk,
      categoryName: '',
      categoryType: selectType,
    },
    validate: {
      categoryName: (value) => {
        if (value.trim().length === 0) return '카테고리 이름을 입력하세요'
        return null
      },
      categoryType: (value) => {
        if (value.trim().length === 0) return '카테고리 타입을 선택하세요'
        return null
      },
    },
  })

  useEffect(() => {
    if (!isOpen) return
    if (!caPk) return

    const run = async () => {
      const res = await getCategory(selectType)
      const categoryReq: CategoryReq[] = res ?? []

      const data = categoryReq.find((c) => c.categoryPk === caPk)
      if (!data) return

      form.setValues({
        categoryPk: data.categoryPk,
        categoryName: data.categoryName,
        categoryType: selectType,
      })
    }

    void run()
  }, [isOpen, caPk, selectType, form])

  useEffect(() => {
    if (isOpen) return

    form.setValues({
      categoryPk: '',
      categoryName: '',
      categoryType: selectType,
    })
    form.clearErrors()
  }, [isOpen, selectType])

  if (!isOpen) return null

  const submit = async (data: CategoryForm) => {
    try {
      if (mode === 'init') {
        await createCategory(data)
      } else {
        if (!caPk) return
        await createCategory(data)
      }

      onSuccess()
      handleClose()
    } catch (e) {
      console.error(e)
    }
  }

  const onDelete = async () => {}
  const handleClose = () => {
    form.setValues({
      categoryPk: '',
      categoryName: '',
      categoryType: selectType, // 현재 선택 타입 유지하고 싶으면
    })
    form.clearErrors()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-4">
        <form onSubmit={form.onSubmit(submit)}>
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold">
              카테고리 {mode === 'init' ? '추가' : '수정'}
            </div>
            <Button size="xs" radius="lg" color="red" onClick={handleClose}>
              닫기
            </Button>
          </div>

          <div className="mt-4">
            <div className="mb-4">
              <Radio.Group
                value={selectType}
                name="categoryType"
                styles={{
                  label: {
                    textAlign: 'left',
                  },
                }}
                {...form.getInputProps('categoryType')}
              >
                <Group mt="xs">
                  <Radio value="1" label="수입" />
                  <Radio value="2" label="지출" />
                </Group>
              </Radio.Group>
            </div>
            <div className="mb-4">
              <Input
                {...form.getInputProps('categoryName')}
                type="text"
                placeholder="예: 식비, 교통비, 집"
                rightSectionPointerEvents="auto"
                size="sm"
              />
            </div>
            <div className="flex justify-end">
              {mode === 'init' ? (
                <Button type="submit" size="xs" radius="lg">
                  추가
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="xs"
                    radius="lg"
                    color="gray"
                    onClick={onDelete}
                  >
                    삭제
                  </Button>
                  <Button type="submit" size="xs" radius="lg" color="yellow">
                    수정
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
