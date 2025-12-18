import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

interface Prop {
  children: ReactNode
}

const ProtectedRoute = ({ children }: Prop) => {
  const { loginSuccess, bootstrapping } = useAuth()

  if (bootstrapping) {
    return <div>Loading...</div>
  }

  if (!loginSuccess) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
