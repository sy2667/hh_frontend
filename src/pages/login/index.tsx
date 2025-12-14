// src/pages/calendar/index.tsx
import { Routes, Route } from 'react-router-dom'
import Login from './Login'

const LoginPages = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  )
}

export default LoginPages
