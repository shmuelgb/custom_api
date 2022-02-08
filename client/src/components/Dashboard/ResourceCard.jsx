import React, { useState, useEffect } from "react";
import ca_server, { getAuthHeader } from "../../api/ca_server";
import {
  useUserInfoPro,
  useUserCollectionsPro,
} from "../../providers/SessionProvider";
import "./styles/ResourceCard.css";

export default function ResourceCard({ collection, setPopup }) {
  const [resource, setResource] = useState(null);
  const [userCollections, setUserCollections] = useUserCollectionsPro();
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

  const handleView = () => {
    setPopup({ type: "view", data: resource });
    console.log({ resource });
  };

  const handleEdit = () => {
    setPopup({ type: "edit", schema: collectionInfo.userSchema });
  };

  const handleDelete = async () => {
    try {
      const { data } = await ca_server.delete(
        `collections/${collection.name}`,
        getAuthHeader()
      );
      console.log({ deleted: data });
      if (userCollections) setUserCollections(null);
    } catch (err) {
      console.log(err);
    }
  };

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
        <button onClick={handleEdit} className="btn">
          Edit
        </button>
        <button onClick={handleView} className="btn">
          View
        </button>
        <button onClick={handleDelete} className="btn">
          Delete
        </button>
      </div>
    </div>
  );
}
