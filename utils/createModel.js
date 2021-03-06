const mongoose = require("mongoose");
const UsersCollections = require("../mongo/models/collections");

const allCollections = {};

// Dynamically create a new user collection
const createNewCollection = async (docFields, collectionName, userId) => {
  const name = computeCollectionName(userId, collectionName);
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
  const name = computeCollectionName(userId, collectionName);
  const collectionInfo = await UsersCollections.findOne({ name: name });
  if (!collectionInfo) {
    throw new Error("Collection not found");
  }
  const newSchema = createSchema(collectionInfo.userSchema);
  const model = createModel(collectionInfo.name, newSchema);
  return { model, collectionInfo };
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
  if (!allCollections[collectionName]) {
    const strToEval1 = `new mongoose.model('${collectionName}', newSchema, '${collectionName}');`;
    allCollections[collectionName] = eval(strToEval1);
  }
  return allCollections[collectionName];
};

const computeCollectionName = (userId, collectionName) => {
  let name = collectionName.toLowerCase();
  name = name.replace(/[^a-zA-Z0-9_]/g, "");
  name = name[0].toUpperCase() + name.slice(1);
  name = `${userId}_${name}`;
  return name;
};

module.exports = {
  computeCollectionName,
  initializeModel,
  createNewCollection,
  initializeModel,
  allCollections,
};
