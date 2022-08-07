import React, {useState, useContext}from 'react'
import axios from 'axios'
import { AppContext } from '../../context/context';


import './Login.css'
// import { axiosInstance } from '../../config';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const{dispatch} = useContext(AppContext)
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const credentials = {
        username: username.toLowerCase(), password: password.toLowerCase()
      }
      try{
        const res = await axios.post('/api/admin/login', credentials)
        console.log(res)
        dispatch({type: 'CREATE_USER', payload: res.data})
        res.data && window.location.replace('/admin')
      }
      catch(error){
        setErrors(error.response.data.error)
        setTimeout(() => setErrors(''), 5000)
      }
      
    }
  

  return (
    <div className="login">
        <span className="loginTitle">Login</span>

        <form className="loginForm" onSubmit={handleSubmit}>

            <label>Username</label>

            <input type="text" 
            className="loginInput" 
            placeholder='username is woko'
            onChange = {(e) =>setUsername(e.target.value) }
             />
            

            <label>Password</label>
            <input type="password" 
            className="loginInput" 
            placeholder='password is woko'
            onChange = {(e) =>setPassword(e.target.value) }
             />


            <button className="loginButton" type ="submit">Login</button>
            {errors && <p style={{color: 'red', marginLeft: 30}}>{errors}</p>}
        </form>
    
    </div>
  )
}

export default Login