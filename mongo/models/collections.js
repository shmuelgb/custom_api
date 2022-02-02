const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owners: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    userCollection: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { strict: false }
);

const Collection = mongoose.model("Collections", collectionSchema);

const myCollection = new Collection({
  name: "myCollection",
  owners: [{ userId: new mongoose.Types.ObjectId() }],
  userCollection: {
    someData: "someData",
    someOtherData: "someOtherData",
  },
});

myCollection.save();

module.exports = Collection;
