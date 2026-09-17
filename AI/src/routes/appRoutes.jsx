import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../screens/login.jsx'
import Register from '../screens/register.jsx'
import { Home } from '../screens/Home.jsx'
import Project from '../screens/Project.jsx'
import UserAuth from '../auth/userAuth.jsx'

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserAuth><Home /></UserAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/project' element={<UserAuth><Project /></UserAuth>} />
      </Routes>
    </BrowserRouter>
  )
}

export default appRoutes