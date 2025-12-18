import CustomInput from '@components/CustomInput'
import CustomButton from '@components/CustomButton'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from '../../contexts/AuthContext.tsx'
import NaverLoginButton from '@components/NaverLoginButton.tsx'
import { useNavigate } from 'react-router-dom'
import { loginWithNaver } from '@api/user/user'
import { useAuthStore } from '@hooks/common/useAuthStore'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pwError, setPwError] = useState('')
  const { loginSuccess, setLoginSuccess } = useAuth()
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const naverLoggingRef = useRef(false)
  const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN

  const onLoginSuccess = useCallback(
    async (code: string, state: string) => {
      try {
        const user = await loginWithNaver(code, state)
        setUser(user)
        setLoginSuccess(true)
      } catch (err) {
        console.error('네이버 로그인 실패', err)
        naverLoggingRef.current = false
      }
    },
    [setUser, setLoginSuccess],
  )

  useEffect(() => {
    const temp = async (e: MessageEvent) => {
      console.log('오리진 이전')
      if (e.origin !== APP_ORIGIN) return
      console.log('오리진 이후')
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
  }, [onLoginSuccess])

  useEffect(() => {
    if (loginSuccess) navigate('/calendar/day')
  }, [loginSuccess, navigate])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    setEmailError('')
    setPwError('')

    if (!email) {
      setEmailError('이메일을 입력해주세요.')
      return
    }
    if (!password) {
      setPwError('비밀번호를 입력해주세요.')
      return
    }

    if (email === 'admin' && password === 'admin') {
      setLoginSuccess(true)
    }

    console.log('로그인 시도', { email, password })
  }

  return (
    <div className="space-y-4">
      {/* 아래는 그냥 선택된 날짜가 뭔지 확인용 UI */}
      <div className="mt-4">
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 gap-y-4">
          <div className="flex items-center justify-center">이메일</div>
          <div className="col-span-2 ">
            <CustomInput
              label=""
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              disabled={false}
              error={emailError}
            />
          </div>
          <div className="flex items-center justify-center">비밀번호</div>
          <div className="col-span-2">
            <CustomInput
              label=""
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              disabled={false}
              error={pwError}
            />
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-2 mt-6">
          소셜 계정으로 로그인
        </div>
        <div className="grid grid-cols-4 mt-10 place-items-center">
          <NaverLoginButton />
        </div>
        <div className="pt-2 flex justify-end gap-2">
          <CustomButton buttonType="init" onClick={submit}>
            로그인
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default Login
