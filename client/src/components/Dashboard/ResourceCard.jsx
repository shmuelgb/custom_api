import React, { useState, useEffect } from "react";
import ca_server, { getAuthHeader } from "../../api/ca_server";
import { useUserInfoPro } from "../../providers/SessionProvider";
import "./styles/ResourceCard.css";

export default function ResourceCard({ collection }) {
  const [resource, setResource] = useState(null);
  const [userInfo] = useUserInfoPro();
  const [collectionInfo, setCollectionInfo] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        let { data } = await ca_server.get(
          `/collections/${collection.name}`,
          getAuthHeader()
        );
        setResource(data.collection);
        setCollectionInfo(data.collectionInfo);
      } catch (err) {
        console.log(err);
      }
    };
    if (!resource) fetchResource();
  });

  return (
    <div className="ResourceCard">
      <ul>
        <li>
          <span>
            <h2>{collection.name}</h2>
          </span>
        </li>
        <li>
          Data: <span>{collection.docsSum}</span>
        </li>
        <li>
          Admins: <span>{userInfo.name}</span>
        </li>
      </ul>
      <div className="resourceCard__buttons">
        <button className="btn">Edit</button>
        <button className="btn">View</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
}
