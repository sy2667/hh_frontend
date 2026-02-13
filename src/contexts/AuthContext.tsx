import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { fetchMe, refreshToken } from '@api/user/user'
import { useAuthStore } from '@hooks/common/useAuthStore'

interface AuthContextType {
  bootstrapping: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [bootstrapping, setBootstrapping] = useState(true)
  const once = useRef(false)

  const setUser = useAuthStore((s) => s.setUser)
  const setAccessToken = useAuthStore((s) => s.setAccessToken)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  useEffect(() => {
    if (once.current) return
    once.current = true
    ;(async () => {
      try {
        if (useAuthStore.getState().loggedOut) {
          return
        }

        const { accessToken } = await refreshToken()
        setAccessToken(accessToken)

        const me = await fetchMe()
        setUser(me)
      } catch {
        clearAuth()
      } finally {
        setBootstrapping(false)
      }
    })()
  }, [setAccessToken, setUser, clearAuth])

  return (
    <AuthContext.Provider value={{ bootstrapping }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
