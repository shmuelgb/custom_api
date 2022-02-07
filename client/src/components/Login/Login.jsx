import React, { useState, useEffect } from "react";
import { useTokenPro } from "../../providers/SessionProvider";
import Background from "../Background/Background";
import caServer from "../../api/ca_server";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [token, setToken] = useTokenPro();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const { data } = await caServer.post("/login", {
        email,
        password,
      });
      setToken(data);
      localStorage.setItem("token", data.token);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (token) history.push("/dashboard");
  }, [token, history]);

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
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <p className="login__error">{error}</p>
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
