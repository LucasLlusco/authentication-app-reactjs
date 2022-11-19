import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { useDarkModeContext } from './context/darkModeContext'
import EditProfile from './pages/EditProfile/EditProfile'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import RecoverPassword from './pages/RecoverPassword/RecoverPassword'
import Register from './pages/Register/Register'
import "./app.scss" 
import { useAuthContext } from './context/authContext'
import { Navigate } from 'react-router-dom'; 


function App() {
  const { darkMode } = useDarkModeContext();
  const { currentUser } = useAuthContext();

  return (
    <main className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path='/edit' element={
          <ProtectedRoute>
            <EditProfile/>
          </ProtectedRoute>
        } />
        <Route path='/login' element={currentUser? <Navigate to={'/'} /> : <Login/>} />
        <Route path='/register' element={currentUser? <Navigate to={'/'} /> : <Register/>} />
        <Route path='/recover_password' element={currentUser? <Navigate to={'/'} /> : <RecoverPassword/>} />
      </Routes>
    </main>
  )
}

export default App

