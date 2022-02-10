import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import caServer, { getAuthHeader } from "../../api/ca_server";
import {
  useTokenPro,
  useUserInfoPro,
  useUserCollectionsPro,
} from "../../providers/SessionProvider";
import "./styles/Dashboard.css";
import ResourceCard from "./ResourceCard";
import ViewCollectionData from "./ViewCollectionData";
import CreateCollection from "./CreateCollection";
import TokenPopup from "./TokenPopup";

export default function Dashboard() {
  const [token] = useTokenPro();
  const [userCollections, setUserCollections] = useUserCollectionsPro();
  const [userInfo] = useUserInfoPro();
  const history = useHistory();
  const [popup, setPopup] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        setIsLoading(true);
        let { data } = await caServer.get("/collections", getAuthHeader());
        data = data.map((collection) => {
          collection.name = collection.name.split("_")[1];
          return collection;
        });
        setIsLoading(false);
        setUserCollections(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    if (!userCollections) fetchUserCollections();
  }, [userCollections, setUserCollections]);

  const generateCards = () => {
    if (userCollections) {
      console.log({ userCollections });
      return userCollections.map((collection) => {
        return (
          <ResourceCard
            key={collection._id}
            collection={collection}
            setPopup={setPopup}
          />
        );
      });
    }
  };

  const displayPopup = () => {
    if (popup.type === "view")
      return (
        <ViewCollectionData collectionData={popup.data} setPopup={setPopup} />
      );
    if (popup.type === "edit")
      return (
        <CreateCollection
          setPopup={setPopup}
          collectionName={popup.collectionName}
          oldSchema={popup.oldSchema}
        />
      );
    if (popup.type === "create")
      return <CreateCollection setPopup={setPopup} refresh={handleRefresh} />;
    if (popup.type === "token") return <TokenPopup setPopup={setPopup} />;
  };

  const handleDocs = () => {
    history.push("/docs");
  };

  const handleCreate = () => {
    setPopup({ type: "create" });
  };

  const handleRefresh = () => {
    setUserCollections(null);
  };

  return (
    <div className="Dashboard">
      {popup && displayPopup()}
      <div className={`dashboard-wrapper`}>
        {userInfo && <h1>Hello {userInfo.name.split(" ")[0]}!</h1>}
        <h2>Here's Your API:</h2>
        <div className="dashboard-content">
          <div className="dashboard-content__cards">{generateCards()}</div>
          <div className="dashboard-content__controllers">
            <button onClick={handleCreate} className="btn">
              Create New Resource
            </button>
            <button onClick={() => setPopup({ type: "token" })} className="btn">
              Generate Auth Token
            </button>
            <button onClick={handleDocs} className="btn">
              How To Use?
            </button>
            <button onClick={handleRefresh} className="btn">
              Refresh
            </button>
            {isLoading && <figure className="spinner"></figure>}
          </div>
        </div>
      </div>
    </div>
  );
}
