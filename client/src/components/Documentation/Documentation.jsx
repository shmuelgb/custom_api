import React from "react";
import "./Documentation.css";
import logo from "../../assets/CA_logo.png";
import { Link } from "react-router-dom";

export default function Documentation() {
  return (
    <div className="Documentation">
      <header className="header">
        <img src={logo} alt="logo" />
        <h3>
          Custom API lets you create and pre-define your own Database. Once you
          have you're Database up and running, you'd be able to perform all CRUD
          operations from any environment, with REST API.
        </h3>
      </header>
      <div className="documentation-content">
        <div className="doc-section">
          <h2>Creating Your Database:</h2>
          <ul>
            <li>
              You can create a new database <Link to={"/dashboard"}>Here</Link>{" "}
              by clicking the "Create New Resource" button.
            </li>
            <li>
              When setting up a new DB, you'll be required to define the schema
              for your DB, specifying which fields can be saved into the DB, and
              the type of values stored in them (boolean, number, string, etc.)
            </li>
            <li>
              After setting up your DB, the REST API would be created
              automatically, ready to use.
            </li>
          </ul>
        </div>
        <div className="doc-section">
          <h2>Using The REST API:</h2>
          <ul>
            <li>
              The REST API lets you perform all CRUD operations, reading, saving
              updating, and deleting documents from your DB.
            </li>
            <li>
              You Can find the exact routs and endpoint{" "}
              <Link to={"/dashboard"}>HERE</Link> by clicking on the DB card.
            </li>
            <li>
              NOTE: All requests must include an Authorization header with your
              token.
              <br />
              For example:
              <span>
                {"Axios.get(URL,{headers: Authorization: 'Bearer [token]'});"}
              </span>
            </li>
            <li>
              You can Generate new Authorization token{" "}
              <Link to={"/dashboard"}>HERE</Link> by clickcing on the 'Generate
              Auth Token.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
