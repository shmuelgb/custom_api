import React from "react";
import "./styles/ViewCollectionData.css";

export default function ViewCollectionData({ collectionData, setPopup }) {
  const printData = () => {
    if (collectionData) {
      let str = JSON.stringify(collectionData, null, " ");
      str = str.replace(/\s\s+/g, " ");
      return str.split(" ").map((line, i) => {
        return (
          <p key={i}>
            {line} <br />
          </p>
        );
      });
    }
  };

  const handleExit = () => {
    setPopup("");
  };

  return (
    <div className="ViewCollectionData">
      <div className="data">
        <button onClick={handleExit} className="btn">
          x
        </button>
        <br />
        {printData()}
      </div>
    </div>
  );
}
