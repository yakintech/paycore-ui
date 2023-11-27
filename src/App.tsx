import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/public/Login'
import Categories from './pages/private/Categories'
import axios from 'axios'
import { AuthContext, AuthContextType } from './context/AuthContext'
import Register from './pages/public/Register'

function App() {

  const { isLogin, setisLogin, loading, setloading } = useContext(AuthContext) as AuthContextType;



  const logout = () => {
    localStorage.removeItem('token')
    setisLogin(false)
  }

  return (<>
    {
      loading ? <>
        <h1>loading...</h1>
      </> : <>
        {
          isLogin ? <>
          <h1>Dashboard</h1>
          <ul>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
          <Routes>
            <Route path='/' element={<Categories />}></Route>
          </Routes>
          </> : <>
          <ul>
            <li><Link to='/'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
            <Routes>
             <Route path='/register' element={<Register />}></Route>
             <Route path='/' element={<Login />}></Route>
            </Routes>
          </>
        }
      </>
    }

  </>
  )
}

export default App

