const express = require("express");
const router = new express.Router();
const collectionUtils = require("../utils/collectionsUtils");
const auth = require("../ExpressMiddleware");

router.get("/test", (req, res) => res.send("working"));

router.post("/createCollection", auth, collectionUtils.createNewUserCollection);

module.exports = router;
