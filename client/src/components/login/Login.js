import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const config = require("../../config.json");

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  let login = () => {
    console.log("okokok");
    console.log(identifier);
    console.log(password);
    axios
      .post(`${config.dev_url}/api/auth/local`, {
        identifier: identifier,
        password: password,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem("userinfo", JSON.stringify(response.data.user));
        toast("Login Successfully");
        navigate("/");

        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error...
        console.log("An error occurred:", error.response);
        toast("Check the username or password");
      });
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="identifier"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="passowrd"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
        </div>
        <button
          type="button"
          className="login-button"
          onClick={() => {
            login();
          }}
        >
          Login
        </button>
        <p>Don't have an account ? </p>
        <Link to="/signup">
          <p>Sign Up</p>
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
