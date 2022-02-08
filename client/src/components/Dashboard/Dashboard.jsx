import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import caServer, { getAuthHeader } from "../../api/ca_server";
import {
  useTokenPro,
  useUserInfoPro,
  useUserCollectionsPro,
} from "../../providers/SessionProvider";
import "./styles/Dashboard.css";
import ResourceCard from "./ResourceCard";

export default function Dashboard() {
  const [token] = useTokenPro();
  const [userCollections, setUserCollections] = useUserCollectionsPro();
  const [userInfo] = useUserInfoPro();
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        let { data } = await caServer.get("/collections", getAuthHeader());
        data = data.map((collection) => {
          collection.name = collection.name.split("_")[1];
          return collection;
        });
        setUserCollections(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!userCollections) fetchUserCollections();
  }, [userCollections, setUserCollections]);

  const generateCards = () => {
    if (userCollections) {
      console.log({ userCollections });
      return userCollections.map((collection) => {
        return <ResourceCard key={collection._id} collection={collection} />;
      });
    }
  };

  return (
    <div className="Dashboard">
      <h1>Hello {userInfo.name.split(" ")[0]}!</h1>
      <h2>Here's Your API:</h2>
      <div className="dashboard-content">
        <div className="dashboard-content__cards">{generateCards()}</div>
        <div className="dashboard-content__controllers">
          <button className="btn">Create new resource</button>
          <button className="btn">How To Use?</button>
        </div>
      </div>
    </div>
  );
}
