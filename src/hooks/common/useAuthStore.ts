import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRes } from '@/types/userType.ts'

interface AuthState {
  user: UserRes | null
  accessToken: string | null
  loggedOut: boolean
  setAuth: (user: UserRes, accessToken: string) => void
  setUser: (user: UserRes | null) => void
  setAccessToken: (token: string | null) => void
  markLoggedOut: () => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      loggedOut: false,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, loggedOut: false }),
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),

      markLoggedOut: () =>
        set({ user: null, accessToken: null, loggedOut: true }),
      clearAuth: () => set({ user: null, accessToken: null, loggedOut: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
)
