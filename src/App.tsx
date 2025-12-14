import './App.css'
import Navigation from './components/Navigation'
import { APP_TITLE } from './constants/navigation'
import Pages from './pages'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 헤더 */}
        <h1 className="text-2xl font-bold mb-4">{APP_TITLE}</h1>

        {/* 상단 네비게이션 (일/월/연 버튼) */}
        <Navigation />

        {/* 하단 콘텐츠: 여기서 Pages가 라우팅 처리 */}
        <main className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <Pages />
        </main>
      </div>
    </div>
  )
}

export default App
