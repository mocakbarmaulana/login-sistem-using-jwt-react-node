import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

import "./Auth.css";

const initializeUser = { email: "", password: "" };

const Login = () => {
  const [user, setUser] = useState(initializeUser);
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/user/login",
        { ...user },
        { withCredentials: true }
      );

      localStorage.setItem("tmpLogin", true);

      window.location.href = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLogged) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div className="container-login">
        <div className="login-page">
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="input-form">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-form">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-form">
              <button type="submit">Login</button>
            </div>

            <div className="info-box">
              <p>
                Doesn't have a account ? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
