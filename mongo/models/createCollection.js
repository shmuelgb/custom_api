const mongoose = require("mongoose");

const allCollections = {};

async function createCollection(userSchema, collectionName, userId) {
  let name = collectionName.toLowerCase();
  name = name[0].toUpperCase() + name.slice(1);
  const newSchema = new mongoose.Schema({});
  for (let key in userSchema) {
    newSchema[key] = userSchema[key];
  }
  const strToEval1 = `new mongoose.model('${name}', newSchema);`;
  console.log(strToEval1);

  allCollections[collectionName] = eval(strToEval1);
  console.log(allCollections);
}
module.exports = { allCollections, createCollection };

// const collectionSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     owners: [
//       {
//         userId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "User",
//           required: true,
//         },
//       },
//     ],
//     userCollection: {
//       type: mongoose.Schema.Types.Mixed,
//       required: true,
//     },
//   },
//   { strict: false }
// );

// const Collection = mongoose.model("Collections", collectionSchema);
