import React from "react";
import { useTokenPro } from "../../providers/SessionProvider";

export default function TokenPopup({ setPopup }) {
  const [token] = useTokenPro();

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    handleClose();
  };

  const handleClose = () => {
    setPopup(false);
  };

  return (
    <div className="ViewCollectionData">
      <div className="data token">
        <button onClick={handleClose} className="btn">
          x
        </button>
        <h2>Token:</h2>
        <textarea cols="30" rows="10" value={`Token: ${token}`}>
          <p>{token}</p>
        </textarea>
        <button onClick={handleCopy} className="btn btn-copy">
          Copy!
        </button>
      </div>
    </div>
  );
}
