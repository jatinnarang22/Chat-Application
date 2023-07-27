import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Register.css";
import logo from "../assets/icon.gif";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//Toast Functions
const notifyA = (msg) => {
  toast.error(msg);
};
const notifysuccess = (msg) => {
  toast.success(msg);
};

function Register() {
  //useEffect
  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    if (token) {
      navigate("/");
    }
  }, []);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const navigate = useNavigate();

  const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const postData = () => {
    const postdatavalue = {
      username: username,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    };

    if (!emailregex.test(email)) {
      notifyA("Invalid email");
      return;
    } else if (!passwordregex.test(password)) {
      notifyA("Minimum eight characters, at least one letter and one number");

      return;
    }

    const apiUrl = "http://localhost:5000/create";
    axios
      .post(apiUrl, postdatavalue)
      .then((response) => {
        // console.log(response);
        // notifysuccess(response.success);
        // navigate("/SignIn");
        if (response.data.error) {
          notifyA(response.error);
        } else {
          notifysuccess(response.data.success);
          navigate("/login");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        notifyA(error.response.data.error);
      });
  };
  return (
    <>
      <div className="RegisterContainer">
        <form action="">
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
          <input
            className="button"
            type=" "
            onChange={(e)=>{
          
            }} 
            onClick={() => {
              postData();
            }}
            value="Create User"
          />
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Register;
