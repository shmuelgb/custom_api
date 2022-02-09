import React from "react";
import "./styles/ViewCollectionData.css";

export default function ViewCollectionData({ collectionData, setPopup }) {
  const PrettyPrintJson = React.memo(({ data }) => (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  ));

  const printData = () => {
    if (collectionData) {
      return <PrettyPrintJson data={collectionData} />;
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
