import { useState } from 'react'
import Layout from './admin/component/layout/Layout'
import { Route, Routes } from 'react-router'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'

function App() {


  return (
   <Routes>
      <Route path='/*' element={<UserRoutes/>}/>
      <Route path='/admin/*' element={<AdminRoutes/>}/>
   </Routes>
  )
}

export default App
