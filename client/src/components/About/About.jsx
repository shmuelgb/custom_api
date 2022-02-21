import React from "react";
import "./About.css";
import logo from "../../assets/CA_logo.png";

export default function About() {
  return (
    <div className="About">
      <header className="header">
        <img src={logo} alt="logo" />
        <h1>
          App Created By <br /> Shmuel Gabai
        </h1>
      </header>
      <div className="about-section">
        <h2>About The App</h2>
        <p>
          This app was created as a Full-stack final project for the Applseeds
          Full-stack Bootcamp.
          <br /> The client-side of this app is written in React and Scss.
          <br /> The server-side is written in Node.js with Express.
          <br /> The DB is on MongoDB with Mongoose. <br />
          More Features are yet to come! Please give me the benefits of your
          feedback, at shmuelgb.315@gmail.com, or contact me via{" "}
          <a
            target="blank"
            href="https://www.linkedin.com/in/shmuel-gabai-5ab380b4/"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
      <div className="about-section">
        <h2>About Me</h2>
        <p>
          I'm a full-stack web developer, experienced in Vanilla Javascript,
          React, and Node. I've Been experimenting with Coding since the age of
          11 (on pascal...), and have an outstanding passion for it. Also, I'm
          currently working as Tech Journalist at{" "}
          <a target="blank" href="https://www.tgspot.co.il/author/shmuelgb/">
            TGspot
          </a>{" "}
          website.
          <br />
          Please visit my LinkedIn profile:{" "}
          <a
            target="blank"
            href="https://www.linkedin.com/in/shmuel-gabai-5ab380b4/"
          >
            HERE
          </a>
          .
          <br />
          Please visit my GitHub:{" "}
          <a target="blank" href="https://github.com/shmuelgb">
            HERE
          </a>
          .
          <br />
          And my new articles about Tech news{" "}
          <a target="blank" href="https://www.tgspot.co.il/author/shmuelgb/">
            HERE
          </a>
          .
        </p>
      </div>
    </div>
  );
}
