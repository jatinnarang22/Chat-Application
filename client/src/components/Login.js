import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import "../style/Login.css"
import logo from "../assets/icon.gif"
function Login() {
    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
  return (
    <div className='FormContainer'>
      <form action="" >
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>ChatVerse</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={login}
          onChange={(e) => setlogin(e.target.value)}
          min="3"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Log In</button>
        <span>
          Don't have an account ? <Link to="/register">Create One.</Link>
        </span>
      </form>
    </div>
  )
}

export default Login