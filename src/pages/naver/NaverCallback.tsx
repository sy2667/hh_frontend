import { useEffect } from 'react'

declare global {
  interface Window {
    naver: {
      LoginWithNaverId: new (options: {
        clientId: string
        callbackUrl: string
        isPopup: boolean
        loginButton?: {
          color: string
          type: number
          height: number
        }
      }) => {
        init: () => void
      }
    }
  }
}

const NaverCallback = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    console.log('네이버 callback!', { code, state, params })

    window.opener?.postMessage(
      { provider: 'NAVER', code, state },
      window.location.origin,
    )

    console.log(window.location.origin)

    // window.close()
  }, [])

  return <div>네이버 로그인 처리 중...</div>
}

export default NaverCallback
