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
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
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
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

const logout = async (req, res) => {
  console.log("logout");
  try {
    const { user } = req;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send({ message: "Logged out" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ message: e.message });
  }
};

module.exports = { addUser, login, logout };
