import React, { useState } from "react";
import "./styles/CreateCollection.css";
import Methods from "./Methods";
import ca_server, { getAuthHeader } from "../../api/ca_server";

export default function CreateCollection({
  setPopup,
  oldSchema,
  collectionName,
  refresh,
}) {
  const [schemaFields, setSchemaFields] = useState(oldSchema);
  const [name, setName] = useState(collectionName || "");
  const [error, setError] = useState("");

  const handleExit = () => {
    setPopup("");
  };

  const handleSave = () => {
    !oldSchema && postNewCollection();
    oldSchema && updateSchema();
  };

  const postNewCollection = async () => {
    try {
      if (!schemaFields) throw new Error("No schema fields");
      if (!name) throw new Error("Please provide a name!");
      const body = JSON.stringify({ name, schema: schemaFields });
      const { data } = await ca_server.post(
        "/collections/createCollection",
        body,
        getAuthHeader()
      );
      console.log({ data });
      refresh();
      handleExit();
    } catch (e) {
      setError(e.message);
      console.log(e);
    }
  };

  const updateSchema = async () => {
    try {
      if (!schemaFields) throw new Error("No schema fields");
      const body = JSON.stringify({ schema: schemaFields });
      const { data } = await ca_server.patch(
        `/collections/${name}/schema`,
        body,
        getAuthHeader()
      );
      console.log({ data });
      refresh();
      handleExit();
    } catch (e) {
      console.log(e);
    }
  };

  const addFieldToSchema = (name, type) => {
    if (!schemaFields) {
      setSchemaFields([{ [name]: type }]);
    } else setSchemaFields([...schemaFields, { [name]: type }]);
  };

  const updateSchemaFields = (isName, value, i, toDelete) => {
    let schemaCopy = [...schemaFields];
    if (isName) {
      schemaCopy[i] = { [value]: schemaCopy[i][Object.keys(schemaCopy[i])[0]] };
    } else {
      schemaCopy[i] = { [Object.keys(schemaCopy[i])[0]]: value };
    }
    if (toDelete) schemaCopy.splice(i, 1);
    setSchemaFields(schemaCopy);
  };

  const generateHeader = () => {
    if (oldSchema) {
      return (
        <header className="header">
          <h1>Update Schema</h1>
        </header>
      );
    } else {
      return (
        <header className="header">
          <h1>Create New Resource</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Collection Name"
          />
        </header>
      );
    }
  };

  const generateFields = () => {
    if (schemaFields) {
      return schemaFields.map((field, i) => {
        return (
          <div key={i} className="fields">
            <input
              type="text"
              value={Object.keys(field)[0]}
              onChange={(e) => updateSchemaFields(true, e.target.value, i)}
              placeholder="Field Name"
            />
            <select
              onChange={(e) => updateSchemaFields(false, e.target.value, i)}
              value={field[Object.keys(field)[0]]}
            >
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="array">Array</option>
              <option value="object">Object</option>
            </select>
            <button
              onClick={() => updateSchemaFields(false, null, i, true)}
              className="btn btn-remove-field"
            >
              x
            </button>
          </div>
        );
      });
    }
  };

  return (
    <div className="CreateCollection">
      <div className="window">
        <button onClick={handleExit} className="btn btn-exit">
          x
        </button>
        {generateHeader()}
        <div className="schema">
          {generateFields()}
          <div className="addFields">
            <button
              onClick={() => addFieldToSchema("Field Name", "string")}
              className="btn btn-plus"
            >
              +
            </button>
            Add New Field
          </div>
        </div>
        <Methods collectionName={name} />
        <button className="btn btn-save" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-save" onClick={handleExit}>
          Cancel
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
