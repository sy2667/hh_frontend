import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'
import { useAuthStore } from '@hooks/common/useAuthStore'

interface Prop {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Prop) => {
  const { bootstrapping } = useAuth()
  const user = useAuthStore((s) => s.user)
  const isLoggedIn = !!user

  if (bootstrapping) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
