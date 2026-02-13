import { api } from '../client'
import type {
  UserRes,
  SignForm,
  LoginForm,
  LoginRes,
  TokenRes,
} from '@app-types/userType.ts'

export const loginWithNaver = async (code: string, state: string) => {
  const res = await api.post<LoginRes>('/users/login/naver', {
    code,
    state,
  })
  return res.data
}

export const joinWithHome = async (form: SignForm) => {
  const res = await api.post<LoginRes>('/users/login/joinWithHome', form)

  return res.data
}

export const loginWithHome = async (form: LoginForm) => {
  const res = await api.post<LoginRes>('/users/login/loginWithHome', form)

  return res.data
}

export const fetchMe = async () => {
  const res = await api.get<UserRes>('/users/auth/me')
  return res.data
}

export const logout = async () => {
  await api.post('/users/logout')
}

export const refreshToken = async () => {
  const res = await api.post<TokenRes>('/users/auth/refresh')
  return res.data
}
