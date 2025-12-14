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
      'http://localhost:5173',
    )

    window.close()
  }, [])
}

export default NaverCallback
