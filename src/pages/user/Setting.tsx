import { useState } from 'react'
import CategoryModal from '@components/CategoryModal.tsx'
const Setting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <ul className="space-y-2">
        <li
          className="flex items-center justify-between rounded-xl bg-white p-3 ring-1 ring-gray-200 hover:bg-gray-50"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <div className="text-sm font-semibold text-gray-900">
            카테고리 편집
          </div>
        </li>
      </ul>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}

export default Setting
