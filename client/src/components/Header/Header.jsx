import React, { useEffect } from "react";
import { useTokenPro } from "../../providers/SessionProvider";
import Nav from "../Nav/Nav";
import "./Header.css";

export default function Header() {
  const [token, setToken] = useTokenPro();

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) setToken(existingToken);
    if (token) console.log("token");
  });

  return (
    <div className="Header">
      <Nav />
    </div>
  );
}
