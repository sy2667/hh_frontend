import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserRes } from '@/types/userType.ts'

interface AuthState {
  user: UserRes | null
  setUser: (user: UserRes) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearAuth: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // user만 저장
    },
  ),
)
