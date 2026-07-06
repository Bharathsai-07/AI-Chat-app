import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../screens/login.jsx'
import Register from '../screens/register.jsx'
import { Home } from '../screens/Home.jsx'

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default appRoutes