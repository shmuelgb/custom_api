const mongoose = require("mongoose");

const allCollections = {};

async function createCollection(userSchema, collectionName, userId) {
  let name = collectionName.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1);
  const newSchema = new mongoose.Schema({});
  userSchema.forEach((field) => {
    newSchema.add(field);
  });
  console.log("newSchema", newSchema);
  const strToEval1 = `new mongoose.model('${name}', newSchema);`;
  console.log(strToEval1);

  allCollections[collectionName] = eval(strToEval1);
  console.log(allCollections);
}
module.exports = { allCollections, createCollection };
