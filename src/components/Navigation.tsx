import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../constants/navigation'
import CustomButton from './CustomButton'
import { useAuth } from '../contexts/AuthContext'
import { useAuthStore } from '@hooks/common/useAuthStore'

const Navigation = () => {
  const location = useLocation()
  const { loginSuccess, setLoginSuccess } = useAuth()
  const clearAuth = useAuthStore((s) => s.clearAuth)

  const isActive = (path: string) => location.pathname === path
  const navigate = useNavigate()
  const authClick = () => {
    if (loginSuccess) {
      setLoginSuccess(false)
      clearAuth()
      console.log('로그아웃')
    } else {
      navigate('/login')
      console.log('로그인')
    }
  }

  return (
    <nav
      className="
      bg-gray-100
      dark:bg-gray-800
      theme-blue:bg-theme-blue-800
      theme-green:bg-theme-green-800
      p-4 rounded-lg mb-6
    "
    >
      <div className="flex justify-between items-center">
        <ul className="flex gap-4">
          {NAVIGATION_ITEMS.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`
                px-4 py-2 rounded-lg font-medium transition-all inline-block
                ${
                  isActive(path)
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 theme-blue:text-theme-blue-100 theme-green:text-theme-green-100 hover:bg-gray-200 dark:hover:bg-gray-700 theme-blue:hover:bg-theme-blue-700 theme-green:hover:bg-theme-green-700'
                }
              `}
              >
                <span className="mr-2">{icon}</span>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <CustomButton
          buttonType={loginSuccess ? 'delete' : 'init'}
          onClick={authClick}
        >
          {loginSuccess ? '로그아웃' : '로그인'}
        </CustomButton>
      </div>
    </nav>
  )
}

export default Navigation
