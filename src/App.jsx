import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import ConsulationsPage from "./pages/Consultations"
import DoctorsPage from './pages/Doctors';
import SimpleInterrogations from "./pages/SimpleIntterogations"
import ComplexInterrogations from "./pages/ComplexIntterogations"
import ConsultationsPage from "./pages/Consultations"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consultations"
          element={
            <ProtectedRoute>
              <ConsultationsPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/simple-interogations"
          element={
            <ProtectedRoute>
              <SimpleInterrogations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complex-interogations"
          element={
            <ProtectedRoute>
              <ComplexInterrogations />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App