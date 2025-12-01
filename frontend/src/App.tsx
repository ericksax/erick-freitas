import './App.css'
import { Outlet } from '@tanstack/react-router'

function App() {

  return (
    <div className="flex items-center justify-center bg-[#0f1217c2] min-h-screen">
      <Outlet />
    </div>
  )
}

export default App
