import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface prop {
  children: ReactNode
}

const ProtectedRoute = ({ children }: prop) => {
  const { loginSuccess } = useAuth()

  if (!loginSuccess) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
