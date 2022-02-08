import React from "react";
import "./styles/CreateCollection.css";

export default function CreateCollection({ setPopup }) {
  const handleExit = () => {
    setPopup("");
  };
  return (
    <div className="CreateCollection">
      <div className="window">
        <button onClick={handleExit} className="btn">
          x
        </button>
      </div>
    </div>
  );
}
