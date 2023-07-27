import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import "../style/Login.css"
import logo from "../assets/icon.gif"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';





//Toast Functions
const notifyA = (msg) => {
  toast.error(msg);
};
const notifysuccess = (msg) => {
  toast.success(msg);
};



function Login() {
  
//useEffect
useEffect(()=>{
  const token = localStorage.getItem('Token');

  if(token){
    navigate('/');
  }
},[]);



    const [login, setlogin] = useState("");
    const [password, setpassword] = useState("");
    const navigate=useNavigate();


    const   postData = () =>{

      const postdatavalue = {
        email: login,
        password: password,
      };

      const apiUrl = 'http://localhost:5000/create-session';
      axios.post( apiUrl , postdatavalue )
      .then((Response)=>{
        if(Response.data.error){
          notifyA("U have successfuly register");
          navigate('/register')
        }
        else{
          notifysuccess();
          localStorage.setItem('Token',Response.data.success);
          navigate("/")
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }


  return (
    <div className='FormContainer'>
      <form action="" >
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>ChatVerse</h1>
        </div>
        <input
          type="text"
          placeholder="Email"
          name="email"
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
        <input className='button'  type=" "
        onChange={(e)=>{
          
        }}
            onClick={() => {
              postData();
            }}
            value="Log In"
            />
        <span>
          Don't have an account ? <Link to="/register">Create One.</Link>
        </span>
      </form>
    </div>
  )
}

export default Login