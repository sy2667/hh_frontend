// src/pages/calendar/index.tsx
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

const LoginPages = () => {
  return (
    <Routes>
      <Route index element={<Login />} />

      {/* /login/signup */}
      <Route path="signup" element={<Signup />} />
    </Routes>
  )
}

export default LoginPages
