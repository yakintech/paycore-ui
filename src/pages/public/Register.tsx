import React, {useState, useContext} from 'react'
import { AuthContext, AuthContextType } from '../../context/AuthContext';
import axios from 'axios';

function Register() {

    const [email, setRegisterEMail] = useState('')
    const [password, setpassword] = useState('')
    const { setisLogin, setloading} = useContext(AuthContext) as AuthContextType;


    const login = () => {
        axios.post('https://localhost:7114/api/auth/register', {
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token',res.data.accessToken)
            localStorage.setItem('refreshToken',res.data.refreshToken)
            localStorage.setItem('userEMail',email)
            setloading(false)   
            setisLogin(true)
        })
        .catch(err => {
            alert("Login Failed")
        })
    }

  return (<>
  <h1>Register Page</h1>
    <div>
        <label>EMail</label>
        <input type='text' onChange={(e) => setRegisterEMail(e.target.value) } />
    </div>
    <div>
        <label>Password</label>
        <input type='password' onChange={(e) => setpassword(e.target.value) } />
    </div>
    <div>
        <button onClick={login}>Register</button>
    </div>
  </>
  )
}

export default Register