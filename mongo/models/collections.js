const mongoose = require("mongoose");
const User = require("./users");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userSchema: {
      type: mongoose.Schema.Types.Mixed,
    },
    owners: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
      },
    ],
  },
  { strict: false }
);

// Update owner user to include collection
collectionSchema.pre("save", async function (next) {
  if (this.isModified("owners")) {
    this.owners.forEach(async (owner) => {
      const user = await User.findById(owner.userId);
      user.collections.push({
        name: this.name,
        reference: this._id,
      });
      user.save();
    });
  }
  next();
});

const AllCollections = mongoose.model("Collections", collectionSchema);

module.exports = AllCollections;
