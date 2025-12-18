import naverPng from '../assets/naver_button.png'

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID
const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_RETURN_URL

const NaverLoginButton = () => {
  const handleClick = () => {
    const state =
      crypto.randomUUID?.() ?? Math.random().toString(36).substring(2)

    sessionStorage.setItem('naver_state', state)

    const loginUrl =
      `https://nid.naver.com/oauth2.0/authorize` +
      `?response_type=code` +
      `&client_id=${NAVER_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(NAVER_CALLBACK_URL)}` +
      `&state=${state}`

    window.open(
      loginUrl,
      'naverLoginPopup',
      'width=500,height=600,menubar=no,toolbar=no,status=no,scrollbars=yes',
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        w-12 h-12
        rounded-full
        overflow-hidden
        shadow-md
        hover:brightness-110
        transition
      "
    >
      <img
        src={naverPng}
        alt="네이버 로그인"
        className="w-full h-full object-cover"
      />
    </button>
  )
}

export default NaverLoginButton
