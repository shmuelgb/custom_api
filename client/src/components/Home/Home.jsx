import React from "react";
import "./Home.css";
import logo from "../../assets/CA_logo.png";
import Nav from "../Nav/Nav";
import { useIsMobilePro } from "../../providers/SessionProvider";

export default function Home() {
  const [isMobile] = useIsMobilePro();

  return (
    <div className="Home">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="right-side">
        <Nav />
        <div className="text-container">
          {isMobile && <img src={logo} alt="logo" />}
          <div className="text-container__content">
            <h2>Custom API</h2>
            <p>
              Custom API lets you create and pre-define your own Database. Once
              you have you're Database up and running, you'd be able to perform
              all CRUD operations with REST API.
            </p>
          </div>
        </div>
        <figure></figure>
      </div>
    </div>
  );
}
