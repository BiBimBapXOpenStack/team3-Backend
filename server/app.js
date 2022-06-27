const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const api = require("./src/routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

let corsOpions = {
  origin: "*",
  credential: true,
};
app.use(cors(corsOpions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    key: "loginData",
    secret: "testSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { expire: 60 * 60 * 24 },
  })
);
app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
