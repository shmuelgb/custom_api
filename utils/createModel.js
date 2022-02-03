const mongoose = require("mongoose");
const UsersCollections = require("../mongo/models/collections");

const allCollections = {};

// Dynamically create a new user collection
const createNewCollection = async (docFields, collectionName, userId) => {
  let name = collectionName.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1);
  name = `${userId}_${name}`;
  const newSchema = createSchema(docFields);
  const model = createModel(name, newSchema);
  const collectionDoc = {
    name: name,
    userSchema: docFields,
    owners: [{ userId: userId }],
  };
  const newCollection = new UsersCollections(collectionDoc);
  return await newCollection.save();
};

// Initialize Mongoose.model instance, in order to interact with the database
const initializeModel = async (userId, collectionName) => {
  const collectionInfo = await UsersCollections.findOne({
    name: collectionName,
  });
  if (!collectionInfo) {
    throw new Error("Collection not found");
  }
  const newSchema = createSchema(collectionInfo.fields);
  const model = createModel(collectionInfo.name, newSchema);
  return model;
};

// Helper function to create a mongoose schema from an array of field names and types
const createSchema = (docFields) => {
  const newSchema = new mongoose.Schema({});
  docFields.forEach((field) => {
    newSchema.add(field);
  });
  return newSchema;
};

// Helper function to create a mongoose model from a schema
const createModel = (collectionName, newSchema) => {
  const strToEval1 = `new mongoose.model('${collectionName}', newSchema);`;
  allCollections[collectionName] = eval(strToEval1);
  return allCollections[collectionName];
};

module.exports = { initializeModel, createNewCollection, allCollections };
