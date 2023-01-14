import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../LoginSignUp/Login'
import SignUp from '../LoginSignUp/SignUp'
import Navbar from '../NavBar/Navbar'
import Generator from '../QrCode/Generator/Generator'
import QrCodes from '../QrCode/Generator/QrCodes'
import Scanner from '../QrCode/Scanner/Scanner'

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/main" element={<Navbar />}>
          <Route path="generate" element={<Generator />}></Route>
          <Route path="scanner" element={<Scanner />}></Route>
        </Route>
        <Route path="qrcodes" element={<QrCodes />}></Route>
      </Routes>
    </>
  )
}

export default Router
