export interface UserRes {
  userPk: number
  email?: string
  nickname: string
}

export interface LoginResponse {
  success: boolean
  data: UserRes
  message?: string
}
