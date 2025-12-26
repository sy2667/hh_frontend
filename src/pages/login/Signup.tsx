import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomInput from '@components/CustomInput'
import CustomButton from '@components/CustomButton'
import {
  defaultValues,
  type SignForm,
  type ValidateForm,
} from '@app-types/userType'
import { fetchMe, joinWithHome } from '@api/user/user'
import { useAuthStore } from '@hooks/common/useAuthStore.ts'
import { useAuth } from '@/contexts/AuthContext.tsx'

const Signup = () => {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)
  const { setLoginSuccess } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ValidateForm>({
    defaultValues: defaultValues,
    mode: 'onSubmit',
  })

  const pw = watch('password')

  const submit = async (data: SignForm) => {
    const payload: SignForm = {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    }

    try {
      await joinWithHome(payload)
      const user = await fetchMe()
      setUser(user)
      setLoginSuccess(true)

      navigate('/calendar/day')
    } catch (e) {
      console.error('회원가입 실패', e)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-xl font-semibold">회원가입</h1>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <CustomInput
          label="이메일"
          type="text"
          placeholder="email@example.com"
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
          error={errors.email?.message}
        />

        <CustomInput
          label="비밀번호"
          type="password"
          placeholder="8자 이상"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 8자 이상이어야 합니다.',
            },
          })}
          error={errors.password?.message}
        />

        <CustomInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 다시 입력"
          {...register('passwordConfirm', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (v) => v === pw || '비밀번호가 일치하지 않습니다.',
          })}
          error={errors.passwordConfirm?.message}
        />

        <CustomInput
          label="닉네임"
          type="text"
          placeholder="닉네임"
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
            minLength: { value: 2, message: '닉네임은 2글자 이상' },
            maxLength: { value: 12, message: '닉네임은 12글자 이하' },
          })}
          error={errors.nickname?.message}
        />

        <div className="flex justify-end gap-2">
          <CustomButton
            buttonType="delete"
            htmlType="button"
            onClick={() => navigate(-1)}
          >
            취소
          </CustomButton>

          <CustomButton buttonType="init" htmlType="submit">
            {isSubmitting ? '처리중' : '회원가입'}
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default Signup
