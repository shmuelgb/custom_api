const express = require("express");
const path = require("path");
const cors = require("cors");
const usersRoute = require("./router/usersRoute");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", usersRoute);

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
