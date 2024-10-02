import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import About from './pages/About'
import SignOut from './pages/SignOut'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/privateRoute'
import CreateListing from './pages/CreateListing'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/createListing" element={<CreateListing />} />
      </Routes>
    </BrowserRouter>
  )
}