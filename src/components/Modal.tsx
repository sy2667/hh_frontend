import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children?: ReactNode
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 내용 영역 클릭 시는 닫히지 않게
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
