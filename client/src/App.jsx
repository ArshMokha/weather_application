import { useState } from 'react'
import BackgroundContainer from './components/BackgroundContainer.jsx'
import Signup from "./components/Signup.jsx"
import Login from "./components/Login.jsx"
import LandingPage from "./components/LandingPage.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/home" element={<BackgroundContainer />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
