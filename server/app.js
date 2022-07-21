const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8000;
const api = require("./src/routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("./src/module/winston");
global.logger || (global.logger = require("./src/module/winston"));
const morgan = require("./src/middleware/myMorgan");
require("dotenv").config();

let corsOpions = {
  origin: "*",
  credential: true,
};

app.use(cors(corsOpions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
//app.use(morgan);
app.use("/", api);
app.use((err, req, res, next) => {
  logger.Error(err.stack);
  res.json({ result: "failed", message: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
