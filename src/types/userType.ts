export interface UserRes {
  userPk: number
  email?: string
  nickName: string
}

export interface LoginResponse {
  success: boolean
  data: UserRes
  message?: string
}

export interface SignForm {
  email: string
  password: string
  nickname: string
}

export interface ValidateForm {
  email: string
  password: string
  passwordConfirm: string
  nickname: string
}

export interface LoginForm {
  email: string
  password: string
}

export const defaultValues: ValidateForm = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
}

export type LoginRes = {
  user: UserRes
  accessToken: string
}

export type TokenRes = {
  accessToken: string
}
