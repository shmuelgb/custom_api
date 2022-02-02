const mongoose = require("mongoose");
const jwtSecret = require("../../authorization/jwtSecret");

const secret = process.env.JWT_SECRET || jwtSecret;

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
        required: true,
      },
    },
  ],
});

// userSchema.methods.generateAuthToken = async function () {
//   const token = jwt.sign({ user_id: this.user_id }, secret);
//   this.tokens = this.tokens.concat({ token });
//   await this.save();
//   return token;
// };

// userSchema.statics.findByCredentials = async (user_id, password) => {
//   const user = await User.findOne({ user_id });
//   if (!user) {
//     throw new Error("Unable to login");
//   }
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) throw new Error("Unable to login");
//   return user;
// };

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

const User = mongoose.model("Users", userSchema);
module.exports = User;
