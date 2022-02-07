import React, { useEffect } from "react";
import { useTokenPro } from "../../providers/SessionProvider";
import { useHistory } from "react-router-dom";
import Background from "../Background/Background";

export default function Dashboard() {
  const [token] = useTokenPro();
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push("/login");
  }, [token, history]);

  return (
    <div>
      <Background />
    </div>
  );
}
