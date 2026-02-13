import styles from '@css/App.module.css'
import Navigation from './components/Navigation'
import { APP_TITLE } from './constants/navigation'
import Pages from './pages'

function App() {
  return (
    <div className={styles.appRoot}>
      <div className={styles.container}>
        <h1 className={styles.title}>{APP_TITLE}</h1>

        <Navigation />

        <main className={styles.mainCard}>
          <Pages />
        </main>
      </div>
    </div>
  )
}

export default App
