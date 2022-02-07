const express = require("express");
const router = new express.Router();
const userUtils = require("../utils/usersUtils");
const auth = require("../expressMiddleware/auth");

router.get("/test", (req, res) => res.send("working"));

router.get("/checkToken", auth, (req, res) => res.send(true));

router.post("/signIn", userUtils.addUser);

router.post("/login", userUtils.login);

router.post("/logout", auth, userUtils.logout);

module.exports = router;
