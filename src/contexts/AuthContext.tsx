import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { fetchMe } from '@api/user/user'
import { useAuthStore } from '@hooks/common/useAuthStore'

interface AuthContextType {
  loginSuccess: boolean
  setLoginSuccess: (success: boolean) => void
  bootstrapping: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false)
  const [bootstrapping, setBootstrapping] = useState<boolean>(true)

  const setUser = useAuthStore((s) => s.setUser)
  const once = useRef(false)

  useEffect(() => {
    if (once.current) return
    once.current = true
    ;(async () => {
      try {
        const user = await fetchMe()
        setUser(user)
        setLoginSuccess(true)
      } catch {
        setLoginSuccess(false)
      } finally {
        setBootstrapping(false)
      }
    })()
  }, [setUser])

  return (
    <AuthContext.Provider
      value={{ loginSuccess, setLoginSuccess, bootstrapping }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return ctx
}
