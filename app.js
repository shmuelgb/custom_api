const express = require("express");
const path = require("path");
const cors = require("cors");
const usersRoute = require("./router/usersRoute");
const collectionRouter = require("./router/collectionRouter");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// connect to MongoDB
const connectionUri = process.env.MONGO_URI;
mongoose.connect(connectionUri);

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", usersRoute);
app.use("/api/collections", collectionRouter);

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.get("/*", (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, "index.html"));
});

// Get server up and running
app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
