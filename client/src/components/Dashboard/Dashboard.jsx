import React, { useEffect } from "react";
import { useTokenPro, useUserInfoPro } from "../../providers/SessionProvider";
import { useHistory } from "react-router-dom";
import "./styles/Dashboard.css";

export default function Dashboard() {
  const [token] = useTokenPro();
  const [userInfo] = useUserInfoPro();
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  const generateCards = () => {};

  return (
    <div className="Dashboard">
      <h1>Hello {userInfo.name}!</h1>
      <h2>Here's Your API:</h2>
      <div className="dashboard-content">
        <div className="dashboard-content__cards">{generateCards()}</div>
        <div className="dashboard-content__controllers">
          <button>Create new resource</button>
          <button>How To Use?</button>
        </div>
      </div>
    </div>
  );
}
