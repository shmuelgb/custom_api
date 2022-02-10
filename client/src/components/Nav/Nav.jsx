import React, { useEffect } from "react";
import { useTokenPro, useIsMobilePro } from "../../providers/SessionProvider";
import logo from "../../assets/CA_logo2.png";
import logoFigure from "../../assets/CA_logo_figure.png";
import { Link, useHistory } from "react-router-dom";
import caServer, { getAuthHeader } from "../../api/ca_server";
import "./Nav.css";

export default function Nav() {
  const [token, setToken] = useTokenPro();
  const [isMobile, setIsMobile] = useIsMobilePro();
  const history = useHistory();

  const navigateToHomepage = () => {
    history.push("/");
  };

  const handleLogout = async () => {
    try {
      const { data } = await caServer.post("/logout", {}, getAuthHeader());
      if (data) {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) setToken(existingToken);
    if (token) console.log("token");
  });
  useEffect(() => {
    if (window.innerWidth < 800) setIsMobile(true);
    else setIsMobile(false);
    console.log(isMobile);
  }, [isMobile, setIsMobile]);

  return (
    <div className="Nav">
      <img onClick={navigateToHomepage} src={logo} alt="logo" />
      <div className="nav__links">
        {isMobile && (
          <img
            onClick={navigateToHomepage}
            className="mobile-logo"
            src={logoFigure}
            alt="logo"
          />
        )}
        <Link className="btn" to="/about">
          About
        </Link>
        <Link className="btn" to="/docs">
          Docs
        </Link>
        <Link className="btn" to="/dashboard">
          My API
        </Link>
        {!token && (
          <Link className="btn" to="/login">
            Login
          </Link>
        )}
        {token && (
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
