const createModel = require("./createModel");

const createNewUserCollection = async (req, res) => {
  try {
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
module.exports = { createNewUserCollection };
