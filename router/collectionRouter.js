const express = require("express");
const router = new express.Router();
const collectionUtils = require("../utils/collectionsUtils");
const auth = require("../expressMiddleware/auth");
const prepareCollection = require("../expressMiddleware/prepareCollection");

router.post("/createCollection", auth, collectionUtils.createNewUserCollection);

// Create new document
router.post(
  "/:collectionName",
  auth,
  prepareCollection,
  collectionUtils.createNewDocument
);

// Update a hole document
router.put(
  "/:collectionName/:docId",
  auth,
  prepareCollection,
  collectionUtils.updateDoc
);

// Update document partially
router.patch(
  "/:collectionName/:docId",
  auth,
  prepareCollection,
  collectionUtils.updateDoc
);

// delete document
router.delete(
  "/:collectionName/:docId",
  auth,
  prepareCollection,
  collectionUtils.deleteDoc
);

// delete collection
router.delete(
  "/:collectionName",
  auth,
  prepareCollection,
  collectionUtils.dropCollection
);

// Get all collections
router.get("/", auth, collectionUtils.getAllCollections);

// Get a collection
router.get(
  "/:collectionName",
  auth,
  prepareCollection,
  collectionUtils.getCollection
);

// Get a document
router.get(
  "/:collectionName/:docId",
  auth,
  prepareCollection,
  collectionUtils.getDocument
);

// Update schema
router.patch("/:collectionName/schema", auth, collectionUtils.updateSchema);

//todo: Share collection with other user

module.exports = router;
