import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./routes/protected-route";
import { PublicRoute } from "./routes/public-route";
import { SignIn } from "./pages/SignIn";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";


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
