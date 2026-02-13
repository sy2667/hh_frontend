import { Link, useLocation, useNavigate } from 'react-router-dom'
import { NAVIGATION_ITEMS } from '../constants/navigation'
import { useAuthStore } from '@hooks/common/useAuthStore'
import { logout } from '@api/user/user.ts'
import { Paper, Group, Button, Text } from '@mantine/core'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const user = useAuthStore((s) => s.user)
  const nickname = user?.nickName
  const isLoggedIn = !!user

  const isActive = (path: string) => location.pathname === path

  const authClick = async () => {
    if (isLoggedIn) {
      try {
        await logout()
      } finally {
        useAuthStore.getState().markLoggedOut()
        navigate('/login')
      }
      return
    }

    navigate('/login')
  }

  return (
    <Paper withBorder radius="lg" p="md" mb="md" bg="gray.0">
      <Group justify="space-between" align="center">
        {/* 왼쪽 메뉴 */}
        <Group gap="sm">
          {isLoggedIn && nickname && (
            <Text size="sm" fw={600} c="dimmed">
              {nickname} 님!
            </Text>
          )}

          <Button
            onClick={authClick}
            color={isLoggedIn ? 'red' : 'blue'}
            variant={isLoggedIn ? 'filled' : 'light'}
            radius="md"
          >
            {isLoggedIn ? '로그아웃' : '로그인'}
          </Button>
        </Group>

        {/* 오른쪽 메뉴 */}
        <Group gap="sm">
          {NAVIGATION_ITEMS.filter((item) => item.show) // 🔥 show가 false면 제외
            .map(({ path, label, icon: Icon }) => {
              const active = isActive(path)

              return (
                <Button
                  key={path}
                  component={Link}
                  to={path}
                  variant={active ? 'filled' : 'subtle'}
                  color={active ? 'blue' : 'gray'}
                  radius="md"
                  leftSection={
                    Icon ? <Icon size={18} stroke={1.8} /> : undefined
                  }
                >
                  {label}
                </Button>
              )
            })}
        </Group>
      </Group>
    </Paper>
  )
}

export default Navigation
