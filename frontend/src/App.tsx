import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./routes/protected-route";
import { PublicRoute } from "./routes/public-route";
import { SignIn } from "./pages/signIn";
import { Login } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { Users } from "./pages/users";


function App() {

  return (
     <Router>
      <Routes> 
        <Route path="/" element={<Navigate  to="/login" replace />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
        </Route>
        <Route element={<PublicRoute />}>
        <Route path="/sign-in" element={<SignIn />}/> 
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
  )
}

export default App
