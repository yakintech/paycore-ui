import axios from 'axios';
import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { AuthContext, AuthContextType } from '../../context/AuthContext';


function Login() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const { isLogin, setisLogin, loading, setloading } = useContext(AuthContext) as AuthContextType;

    const navigate = useNavigate();

    const login = () => {
        axios.post('https://localhost:7114/api/auth', {
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token',res.data.accessToken)
            localStorage.setItem('refreshToken',res.data.refreshToken)
            setloading(false)   
            setisLogin(true)
        })
        .catch(err => {
            alert("Login Failed")
        })
    }

  return (<>
    <div>
        <label>EMail</label>
        <input type='text' onChange={(e) => setemail(e.target.value) } />
    </div>
    <div>
        <label>Password</label>
        <input type='password' onChange={(e) => setpassword(e.target.value) } />
    </div>
    <div>
        <button onClick={login}>Login</button>
    </div>
  </>
  )
}

export default Login