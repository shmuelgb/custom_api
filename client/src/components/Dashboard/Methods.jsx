import React from "react";

export default function Methods({ collectionName }) {
  const endpoint = `http://sgb-custom-api.herokuapp.com/api/collections`;
  return (
    <div className="Methods">
      <ul>
        <li>
          <h3>Endpoint:</h3>
          <br />
          <p>{endpoint}</p>
        </li>
        <li>
          <h3>GET</h3>
          <p>/{collectionName}</p>
          <br />
          <p>Get Complete Resource</p>
        </li>
        <li>
          <h3>GET</h3>
          <p>/{collectionName}/:_id</p>
          <br />
          <p>Get a Document</p>
        </li>
        <li>
          <h3>POST</h3>
          <p>/{collectionName}</p>
          <br />
          <p>Post Document</p>
        </li>
        <li>
          <h3>PUT</h3>
          <p>/{collectionName}/:_id</p>
          <br />
          <p>Update a Hole Document</p>
        </li>
        <li>
          <h3>PATCH</h3>
          <p>/{collectionName}/:_id</p>
          <br />
          <p>Update Certain Fields In a Document</p>
        </li>
        <li>
          <h3>DELETE</h3>
          <p>/{collectionName}/:_id</p>
          <br />
          <p>Delete Document</p>
        </li>
      </ul>
    </div>
  );
}
