const jwt = require("jsonwebtoken");
const User = require("./mongo/models/users");

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

    if (!user) throw new Error("Unable to login");

    console.log("decoded", decoded);
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};
module.exports = auth;
