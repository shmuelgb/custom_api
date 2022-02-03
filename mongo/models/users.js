const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //TODO validate email
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  collections: [
    {
      name: {
        type: String,
      },
      reference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collections",
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ _id: this._id }, secret);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Unable to login");
  return user;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
