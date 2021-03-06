const jwt = require("jsonwebtoken");
const User = require("../mongo/models/users");

// Authenticate user
const auth = async (req, res, next) => {
  console.log("auth");
  const secret = process.env.JWT_SECRET;
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("user not found");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: "Please login" });
  }
};

module.exports = auth;
