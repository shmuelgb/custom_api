import React from "react";
import "./Home.css";
import logo from "../../assets/CA_logo.png";

export default function Home() {
  return (
    <div className="Home">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="text-container">
        <h2>Custom API</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quasi
          blanditiis nihil impedit doloremque similique amet facere enim omnis
          ea sed, tempore magnam libero perferendis hic! Odio rerum pariatur
          cumque.
        </p>
      </div>
    </div>
  );
}
