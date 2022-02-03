const { initializeModel } = require("../utils/createModel");

// Prepare user collection for interaction
const prepareCollection = async (req, res, next) => {
  try {
    const collectionName = req.params.collectionName;
    const { model, collectionInfo } = await initializeModel(
      req.user._id,
      collectionName
    );
    req.model = model;
    req.collectionInfo = collectionInfo;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
};
module.exports = prepareCollection;
