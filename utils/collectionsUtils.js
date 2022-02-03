const createModel = require("./createModel");
const mongoose = require("mongoose");

const createNewUserCollection = async (req, res) => {
  try {
    console.log("req.user", req.user);
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
    const { model, body } = req;
    const newDocument = new model(body);
    const savedDocument = await newDocument.save();
    res.send(savedDocument);
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};

const updateHoleDoc = async (req, res) => {
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

module.exports = { createNewUserCollection, createNewDocument, updateHoleDoc };
