import { api } from '../client'
import type { UserRes } from '@/types/userType.ts'

export const loginWithNaver = async (code: string, state: string) => {
  const res = await api.post<UserRes>('/users/login/naver', {
    code,
    state,
  })
  return res.data
}

export const fetchMe = async () => {
  const res = await api.get<UserRes>('/users/auth/me')
  return res.data
}

export const logout = async () => {
  await api.post('/users/logout')
}
