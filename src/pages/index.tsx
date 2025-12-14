// src/pages/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import CalendarPages from './calendar'
import LoginPages from './login'
import ProtectedRoute from '../components/ProtectedRoute'
import NaverCallBack from './naver/NaverCallback'
// import ChartPages from './chart'

const Pages = () => {
  return (
    <Routes>
      <Route path="/login/*" element={<LoginPages />} />
      <Route path="/naver/callback" element={<NaverCallBack />} />

      {/* 루트 → 캘린더 일별로 */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/calendar/day" replace />
          </ProtectedRoute>
        }
      />

      {/* 캘린더 섹션 */}
      <Route
        path="/calendar/*"
        element={
          <ProtectedRoute>
            <CalendarPages />
          </ProtectedRoute>
        }
      />

      {/* 차트 섹션 */}
      {/*<Route path="/chart/*" element={<ChartPages />} />*/}

      {/* 알 수 없는 경로 → 캘린더 일별로 */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Navigate to="/calendar/day" replace />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Pages
