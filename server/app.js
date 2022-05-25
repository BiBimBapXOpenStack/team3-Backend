const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const api = require("./src/routes/index");

let corsOpions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOpions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
