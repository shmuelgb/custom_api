const express = require("express");
const router = new express.Router();
const userUtils = require("../utils/usersUtils");

router.get("/test", (req, res) => res.send("working"));

router.post("/signIn", userUtils.addUser);

router.post("/login", userUtils.login);

module.exports = router;
