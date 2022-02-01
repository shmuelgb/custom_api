const express = require("express");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

const publicDirectoryPath = path.join(__dirname, "client/build");
app.use(express.static(publicDirectoryPath));

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});
