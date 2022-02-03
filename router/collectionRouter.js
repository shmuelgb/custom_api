const express = require("express");
const router = new express.Router();
const collectionUtils = require("../utils/collectionsUtils");
const auth = require("../expressMiddleware/auth");
const prepareCollection = require("../expressMiddleware/prepareCollection");

router.get("/test", (req, res) => res.send("working"));

router.post("/createCollection", auth, collectionUtils.createNewUserCollection);

router.post(
  "/:collectionName/add",
  auth,
  prepareCollection,
  collectionUtils.createNewDocument
);

router.put(
  "/:collectionName/updateHole/:docId",
  auth,
  prepareCollection,
  collectionUtils.updateHoleDoc
);

module.exports = router;
