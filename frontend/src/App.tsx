import './App.css'
import { Header } from './components/header'
import { DashboardPage } from './pages/dashboard'

function App() {

  return (
    <div className="App bg-[#0f1217c2] min-h-screen p-8">
      <Header/>
      <DashboardPage />
    </div>
  )
}

export default App
