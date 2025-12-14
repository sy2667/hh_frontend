import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  loginSuccess: boolean
  setLoginSuccess: (success: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{ loginSuccess, setLoginSuccess }}>
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
