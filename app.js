const express = require("express");
const path = require("path");
const cors = require("cors");
const usersRoute = require("./router/usersRoute");
const mongoose = require("mongoose");
const clusterAccess = require("./mongo/clusterAccess");
//
const connectionUri = process.env.MONGO_URI || clusterAccess;

mongoose.connect(connectionUri, {
  useNewUrlParser: true,
});

//!=============================>
const {
  createCollection,
  allCollections,
} = require("./mongo/models/createCollection");
// console.log(allCollections);
// createCollection([{ price: "number" }], "Shoes", "5e9e8f8f8f8f8f8f8f8f8f8");
// allCollections.Shoes.find({}).then((data) => console.log(data));
// console.log("!", mongoose.modelNames());
// console.log("!!!", allCollections);
// const myshoe = new allCollections.Shoes({ price: "svds" });
// myshoe.save().then(() => console.log("saved"));
// allCollections["Shoes"].find({}).then((data) => console.log(data));
mongoose
  .model("shoes")
  .find({})
  .then((data) => console.log(data));
//!=============================>

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", usersRoute);

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

// const myCollection = new Collection({
//   name: "22222",
//   owners: [{ userId: new mongoose.Types.ObjectId() }],
//   userCollection: {
//     someData: "22222",
//     someOtherData: "someOtherData",
//   },
// });

// myCollection.save();

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
