import React, { useCallback, useEffect, useState } from 'react'
import { Button, Radio, Group } from '@mantine/core'
import { getCategory } from '@api/category/category'
import type { CategoryReq, CategoryList } from '@/types/CategoryType'
import CategoryDetailModal from '@components/CategoryDetailModal.tsx'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function CategoryModal({ isOpen, onClose }: Props) {
  const [selectType, setSelectType] = useState('1')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryReq[]>([])
  const [mode, setMode] = useState<string>('init')
  const [caPk, setCaPk] = useState<string>('')

  const callCategory = useCallback(async () => {
    try {
      const res: CategoryReq[] = await getCategory(selectType)
      setCategories(res ?? [])
    } catch (e) {
      console.error(e)
      setCategories([])
    }
  }, [selectType])

  useEffect(() => {
    if (!isOpen) return
    void callCategory()
  }, [isOpen, callCategory])

  if (!isOpen) return null
  const onSuccess = () => {
    void callCategory()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold">카테고리 편집</div>
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              radius="lg"
              onClick={() => {
                setMode('init')
                setModalOpen(true)
              }}
            >
              추가
            </Button>
            <Button size="xs" radius="lg" color="red" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-4">
            <Radio.Group
              value={selectType}
              onChange={setSelectType}
              name="categoryType"
              styles={{
                label: {
                  textAlign: 'left',
                },
              }}
            >
              <Group mt="xs">
                <Radio value="1" label="수입" />
                <Radio value="2" label="지출" />
              </Group>
            </Radio.Group>
          </div>
          <ul className="space-y-2">
            {categories.length > 0 ? (
              categories.map((c) => (
                <li
                  key={c.categoryPk}
                  className="
                    flex items-center justify-between
                    rounded-lg border border-gray-200
                    bg-white px-3 py-2
                    text-sm text-gray-900
                    shadow-sm
                    hover:bg-gray-50 hover:shadow
                    cursor-pointer
                    transition
                  "
                  onClick={() => {
                    setCaPk(c.categoryPk)
                    setModalOpen(true)
                    setMode('update')
                  }}
                >
                  <span>{c.categoryName}</span>
                  <span className="text-xs text-gray-400">›</span>
                </li>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
                <div className="text-sm font-medium text-gray-900">
                  아직 등록된 카테고리가 없어요
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  + 여기를 눌러 카테고리를 추가해보세요.
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
      <CategoryDetailModal
        isOpen={modalOpen}
        onClose={() => {
          setMode('init')
          setCaPk('')
          setModalOpen(false)
        }}
        onSuccess={onSuccess}
        mode={mode}
        selectType={selectType}
        caPk={caPk}
      />
    </div>
  )
}
