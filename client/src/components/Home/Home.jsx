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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              quasi blanditiis nihil impedit doloremque similique amet facere
              enim omnis ea sed, tempore magnam libero perferendis hic! Odio
              rerum pariatur cumque.
            </p>
          </div>
        </div>
        <figure></figure>
      </div>
    </div>
  );
}
