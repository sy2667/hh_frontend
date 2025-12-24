import CustomInput from '@components/CustomInput'
import CustomButton from '@components/CustomButton'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext.tsx'
import NaverLoginButton from '@components/NaverLoginButton.tsx'
import { useNavigate } from 'react-router-dom'
import { loginWithNaver, fetchMe } from '@api/user/user'
import { useAuthStore } from '@hooks/common/useAuthStore'
import { type LoginForm } from '@app-types/userType'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { setLoginSuccess } = useAuth()
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const naverLoggingRef = useRef(false)
  const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  const onLoginSuccess = useCallback(
    async (code: string, state: string) => {
      try {
        await loginWithNaver(code, state)
        const user = await fetchMe()
        setUser(user)
        setLoginSuccess(true)
        navigate('/calendar/day')
      } catch (err) {
        console.error('네이버 로그인 실패', err)
        naverLoggingRef.current = false
      }
    },
    [setUser, setLoginSuccess, navigate],
  )

  useEffect(() => {
    const temp = async (e: MessageEvent) => {
      if (e.origin !== APP_ORIGIN) return
      if (e.data?.provider !== 'NAVER') return

      if (naverLoggingRef.current) return
      naverLoggingRef.current = true

      const { code, state } = e.data
      if (!code || !state) return

      const storedState = sessionStorage.getItem('naver_state')
      if (storedState !== state) {
        console.log('state 값 불일치')
        return
      }

      await onLoginSuccess(code, state)
    }

    window.addEventListener('message', temp)
    return () => window.removeEventListener('message', temp)
  }, [onLoginSuccess, APP_ORIGIN])

  const submit = (data: LoginForm) => {
    if (data.email === 'admin' && data.password === 'admin') {
      setLoginSuccess(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="mt-4">
        <form>
          <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-y-4">
            <div className="flex items-center justify-center">이메일</div>
            <div className="col-span-2 ">
              <CustomInput
                label=""
                type="email"
                placeholder="email@example.com"
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                })}
                error={errors.email?.message}
              />
            </div>
            <div className="flex items-center justify-center">비밀번호</div>
            <div className="col-span-2">
              <CustomInput
                label=""
                type="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                })}
                error={errors.password?.message}
              />
            </div>
          </div>
        </form>
        <div className="text-sm text-gray-600 mb-2 mt-6">
          소셜 계정으로 로그인
        </div>
        <div className="grid grid-cols-4 mt-10 place-items-center">
          <NaverLoginButton />
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <CustomButton buttonType="init" htmlType={'submit'}>
            로그인
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default Login
