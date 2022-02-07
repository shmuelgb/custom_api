import React from "react";
import logo from "../../assets/CA_logo_figure.png";
import { Link, useHistory } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const history = useHistory();
  const navigateToHomepage = () => {
    history.push("/");
  };
  return (
    <div className="Nav">
      <img onClick={navigateToHomepage} src={logo} alt="logo" />
      <div className="nav__links">
        <Link className="btn" to="/about">
          About
        </Link>
        <Link className="btn" to="/docs">
          Docs
        </Link>
        <Link className="btn" to="/dashboard">
          My API
        </Link>
        <Link className="btn" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
