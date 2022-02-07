import React, { useState, useEffect } from "react";
import { useTokenPro } from "../../providers/SessionProvider";
import Background from "../Background/Background";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [setToken] = useTokenPro();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="Login">
      <Background />
      <div className="login__container">
        <h1>Log In</h1>
        <input
          type="text"
          name="email"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn">Login</button>

        <div>{/* <Link to="/reset">Forgot Password</Link> */}</div>
        <div>
          Don't have an account yet?
          <br />
          <Link className="register" to="/register">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
