import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home } from './Container/Home'
import { Login } from './Components/Login'
export default function App() {
    return (
        <Routes>
            <Route path='login' element={<Login />} />
            <Route path='/*' element={<Home />} />
        </Routes>
    )
}