import React, { useState, useEffect } from "react";
import { useTokenPro, useUserInfoPro } from "../../providers/SessionProvider";
import caServer from "../../api/ca_server";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [token, setToken] = useTokenPro();
  const [userInfo, setUserInfo] = useUserInfoPro();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { data } = await caServer.post("/login", {
        email,
        password,
      });
      setIsLoading(false);
      setToken(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserInfo(data.user);
      console.log({ userInfo });
      history.push("/dashboard");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err.response.data) setError(err.response.data.message);
    }
  };

  useEffect(() => {
    if (token) history.push("/dashboard");
  }, [token, history]);

  return (
    <div className="Login">
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
        <p className="error">{error}</p>
        <div>{/* <Link to="/reset">Forgot Password</Link> */}</div>
        <div>
          Don't have an account yet?
          <br />
          <Link className="register" to="/register">
            Register now
          </Link>
        </div>
        {isLoading && <figure className="spinner"></figure>}
      </div>
    </div>
  );
}
