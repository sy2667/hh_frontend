// src/pages/user/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Setting from './Setting'

const SettingPage = () => {
  return (
    <Routes>
      {/* transactionSetting 리다이렉트 */}
      <Route index element={<Navigate to="transactionSetting" replace />} />

      {/* transactionSetting */}
      <Route path="transactionSetting" element={<Setting />} />

      {/* 그 외 transactionSetting */}
      <Route path="*" element={<Navigate to="transactionSetting" replace />} />
    </Routes>
  )
}

export default SettingPage
