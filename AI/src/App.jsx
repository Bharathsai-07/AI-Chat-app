import React from 'react'
import appRoutes from './routes/appRoutes.jsx'
import {UserProvider} from './context/user.context.jsx'

const App = () => {
  return (
    <UserProvider>
      {appRoutes()}
    </UserProvider>
  )
}

export default App