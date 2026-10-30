import { useState } from 'react'
import Layout from './admin/component/layout/Layout'
import { Route, Routes } from 'react-router'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ThemeProvider } from './context/reducer/ThemeContext'

function App() {


  return (
    <ThemeProvider>
      <Provider store={store}>


        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>


      </Provider>
    </ThemeProvider>
  )
}

export default App
