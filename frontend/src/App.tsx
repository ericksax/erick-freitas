import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./routes/protected-route";
import { SignIn } from "./pages/SignIn";
import { PublicRoute } from "./routes/public-route";


function App() {

  return (
     <Router>
      <Routes> 
        <Route path="/" element={<Navigate  to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-in" element={<SignIn />}/> 
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}

export default App
