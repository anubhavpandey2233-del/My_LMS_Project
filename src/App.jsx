import { useState } from 'react'
import Layout from './admin/component/layout/Layout'
import { Route, Routes } from 'react-router'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {


  return (
    <>
     <Provider store={store}>
      <Routes>
        <Route path='/*' element={<UserRoutes />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
      </Provider>
    </>
  )
}

export default App
