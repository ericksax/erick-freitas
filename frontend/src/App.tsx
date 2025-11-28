import './App.css'
import { Header } from './components/header'
import { DashboardPage } from './pages/dashboard'
// import { LoginPage } from './pages/login'

function App() {

  return (
    <div className="App bg-[#0f1217c2] min-h-screen p-8">
      <Header/>
      <DashboardPage />
      {/* <LoginPage/> */}
    </div>
  )
}

export default App
