import axios, { AxiosError } from 'axios'
import { useAuthStore } from '@hooks/common/useAuthStore'
import { refreshToken } from '@api/user/user.ts'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

async function getFreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshToken()
      .then(({ accessToken }) => {
        useAuthStore.getState().setAccessToken(accessToken)
        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined
    if (!original) return Promise.reject(error)

    if (useAuthStore.getState().loggedOut) {
      return Promise.reject(error)
    }

    if (original._retry) return Promise.reject(error)

    if (error.response?.status !== 401) return Promise.reject(error)

    const hasAnyAuthState =
      !!useAuthStore.getState().accessToken || !!useAuthStore.getState().user
    if (!hasAnyAuthState) {
      useAuthStore.getState().clearAuth()
      return Promise.reject(error)
    }

    original._retry = true

    try {
      const accessToken = await getFreshAccessToken()

      original.headers = original.headers ?? {}
      original.headers.Authorization = `Bearer ${accessToken}`
      return api(original)
    } catch (e) {
      useAuthStore.getState().clearAuth()
      return Promise.reject(e)
    }
  },
)
