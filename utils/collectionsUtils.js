const createModel = require("./createModel");
const mongoose = require("mongoose");
const UserCollection = require("../mongo/models/collections");
const User = require("../mongo/models/users");

const createNewUserCollection = async (req, res) => {
  try {
    console.log({ body: req.body });
    const userId = req.user._id;
    const collectionName = req.body.name;
    const fields = req.body.schema;
    const newUserCollection = await createModel.createNewCollection(
      fields,
      collectionName,
      userId
    );
    res.send(newUserCollection);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const createNewDocument = async (req, res) => {
  try {
    const { model, body, user } = req;
    const newDocument = new model(body);
    const savedDocument = await newDocument.save();
    user.collections.forEach((collection) => {
      if (collection.name === model.collection.name) {
        collection.docsSum += 1;
      }
    });
    await user.save();
    res.send(savedDocument);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const updateDoc = async (req, res) => {
  try {
    const { model, body } = req;
    const docId = req.params.docId;
    const updatedDoc = await model.findByIdAndUpdate(docId, body, {
      new: true,
      runValidators: true,
    });
    res.send(updatedDoc);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const deleteDoc = async (req, res) => {
  try {
    const { model, user } = req;
    const docId = req.params.docId;
    const deletedDoc = await model.findByIdAndDelete(docId);
    user.collections.forEach((collection) => {
      if (collection.name === model.collection.name) {
        collection.docsSum += 1;
      }
    });
    await user.save();
    res.send(deletedDoc);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const dropCollection = async (req, res) => {
  try {
    const { model, collectionInfo, user } = req;
    const deletedCollection = await mongoose.connection.dropCollection(
      model.collection.name
    );
    await UserCollection.findByIdAndDelete(collectionInfo._id);
    user.collections = user.collections.filter(
      (collection) => collection.name !== collectionInfo.name
    );
    await user.save();
    res.send(deletedCollection);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const getAllCollections = async (req, res) => {
  try {
    const { user } = req;
    const collections = user.collections;
    res.send(collections);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const getCollection = async (req, res) => {
  try {
    const { model, collectionInfo } = req;
    const collection = await model.find({});
    res.send({ collection, collectionInfo });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const getDocument = async (req, res) => {
  try {
    const { model } = req;
    const document = await model.findById(req.params.docId);
    res.send(document);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const updateSchema = async (req, res) => {
  try {
    const userId = req.user._id;
    const collectionName = req.params.collectionName;
    const fields = req.body.schema;
    const name = createModel.computeCollectionName(userId, collectionName);
    await UserCollection.findOneAndUpdate(
      { name: name },
      { userSchema: fields }
    );
    const { collectionInfo } = await createModel.initializeModel(
      userId,
      collectionName
    );
    res.send(collectionInfo);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

//TODO: ability to create many documents with faker

module.exports = {
  createNewUserCollection,
  createNewDocument,
  updateDoc,
  deleteDoc,
  dropCollection,
  getAllCollections,
  getCollection,
  getDocument,
  updateSchema,
};
