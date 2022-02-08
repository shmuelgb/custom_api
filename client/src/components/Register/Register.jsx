import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useTokenPro, useUserInfoPro } from "../../providers/SessionProvider";
import caServer from "../../api/ca_server";
import "./Register.css";

export default function Register() {
  const [token, setToken] = useTokenPro();
  const [userInfo, setUserInfo] = useUserInfoPro();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const { data } = await caServer.post("/signIn", {
        name,
        email,
        password,
      });
      setToken(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      setUserInfo(data.user);
      console.log({ userInfo });
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
    <div className="Register">
      <div className="register__container">
        <h1>Register</h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
        <p className="register__error">{error}</p>
        <div>
          Already have an account?
          <br />
          <Link className="login" to="/login">
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
}
