const User = require("../mongo/models/users");

const addUser = async (req, res) => {
  console.log("addUSer", req.body);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const newUser = new User(user);
    const token = await newUser.generateAuthToken();
    const createdUser = await newUser.save();
    res.send({ createdUser, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const login = async (req, res) => {
  console.log("login", req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { addUser, login };