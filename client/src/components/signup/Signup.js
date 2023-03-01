import React, { useState } from "react";
import "./Signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = require("../../config.json");

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let submitData = () => {
    console.log("Ok");
    console.log(config.dev_url);
    console.log(username);
    console.log(email);
    console.log(password);

    let data = {
      username,
      email,
      password,
    };
    //Promise Chain
    fetch(`${config.dev_url}/api/auth/local/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        //Make our Json data Readable
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (response.error) {
          toast("Please fill the details carefully");
        }
        if (response.user) {
          navigate("/login");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button
          type="button"
          className="signup-button"
          onClick={() => {
            submitData();
          }}
        >
          Sign Up
        </button>
        <p>Don't have an account ? </p>
        <Link to="/login">
          <p>Login</p>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
