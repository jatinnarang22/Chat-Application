
import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import "../style/Register.css"
import logo from "../assets/icon.gif"

function Register() {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
  return (
    <>
      <div className='RegisterContainer'>
        <form action="" >
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>ChatVerse</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link  to="/login">Login.</Link>
          </span>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Register